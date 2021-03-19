import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
  Reducer,
} from '@reduxjs/toolkit';
import FastImage from 'react-native-fast-image';
import { ax } from '@pmk-team/common';
import {
  Cart,
  CartPositon,
  CatalogCard,
  CatalogOrder,
  Payment,
  PaymentSettings,
  PrizesState,
  ShopOrder,
  ShopProduct,
} from './types';

const initialState: PrizesState = {
  paymentSettings: [],
  payments: [],
  catalogCards: [],
  catalogOrders: [],
  shopProducts: [],
  shopOrders: [],
  cart: {
    positions: [],
    length: 0,
    summary: 0,
  },
};

// ACTIONS
const getPaymentSettings = createAsyncThunk('prizes/getPaymentSettings', async () => {
  const res = await ax().post<{settings: PaymentSettings[]}>('payments/api-v3/settings/view');
  return res.data.settings;
});

const getPayments = createAsyncThunk('prizes/getPayments', async (_, { getState }) => {
  const res = await ax().post<{payments: Payment[]}>('payments/api-v3/payments/by-profile', {
    profile_id: getState().auth.profile_id,
  });
  return res.data.payments;
});

const getCatalogCards = createAsyncThunk('prizes/getCatalogCards', async () => {
  const res = await ax().post<{cards: CatalogCard[]}>('catalog/api-v3/cards/list');
  const cards = res.data.cards;
  FastImage.preload(
    cards.filter(c => !!c.image).map(c => ({ uri: c.image })),
  );
  return cards;
});

const getCatalogOrders = createAsyncThunk('prizes/getCatalogOrders', async (_, { getState }) => {
  const res = await ax().post<{orders: CatalogOrder[]}>('catalog/api-v3/users/orders', {
    profile_id: getState().auth.profile_id,
  });
  return res.data.orders;
});

const getShopProducts = createAsyncThunk('prizes/getShopProducts', async (_, { getState }) => {
  const res = await ax().post<{products: ShopProduct[]}>('shop/api-v3/product/list', {
    profile_id: getState().auth.profile_id,
  });
  return res.data.products;
});

const getShopOrders = createAsyncThunk('prizes/getShopOrders', async (_, { getState }) => {
  const res = await ax().post<{orders: ShopOrder[]}>('shop/api-v3/order/list', {
    profile_id: getState().auth.profile_id,
  });
  return res.data.orders;
});

// REDUCER
const slice = createSlice({
  name: 'prizes',
  initialState,
  extraReducers: {
    [getPaymentSettings.fulfilled.type]: (state, action: PayloadAction<PaymentSettings[]>) => {
      state.paymentSettings = action.payload;
    },
    [getPayments.fulfilled.type]: (state, action: PayloadAction<Payment[]>) => {
      state.payments = action.payload;
    },
    [getCatalogCards.fulfilled.type]: (state, action: PayloadAction<CatalogCard[]>) => {
      state.catalogCards = action.payload;
    },
    [getCatalogOrders.fulfilled.type]: (state, action: PayloadAction<CatalogOrder[]>) => {
      state.catalogOrders = action.payload;
    },
    [getShopProducts.fulfilled.type]: (state, action: PayloadAction<ShopProduct[]>) => {
      state.shopProducts = action.payload;
    },
    [getShopOrders.fulfilled.type]: (state, action: PayloadAction<ShopOrder[]>) => {
      state.shopOrders = action.payload;
    },
  },
  reducers: {
    resetCart: (state, action: PayloadAction<'card' | 'product'>) => {
      if (action.payload === 'card') {
        state.cart.positions = state.cart.positions.filter(pos => pos.card == null);
      } else if (action.payload === 'product') {
        state.cart.positions = state.cart.positions.filter(pos => pos.product == null);
      }
      state.cart = calculateCart(state.cart);
    },
    changeCartQty: (state, action: PayloadAction<{position: CartPositon, qty: number}>) => {
      const { qty, position } = action.payload;
      const { card, product, nominal } = position;
      let cart = state.cart;

      for (let i = 0; i < cart.positions.length; i++) {
        const positionCard = cart.positions[i].card;
        const positionProduct = cart.positions[i].product;
        //  если добавляем/удаляем продукт
        if (positionProduct && product && positionProduct.id === product.id) {
          cart.positions[i].qty += qty;
          if (cart.positions[i].qty <= 0) {
            cart.positions = cart.positions.filter((pos: CartPositon) => {
              if (!pos.product) {return true;}
              if (pos.product.id !== cart.positions[i]?.product?.id) {return true;}
              return false;
            });
          }
        }
        //  если добавляем/удаляем сертификат
        if (positionCard && card && positionCard.type === card.type && cart.positions[i].nominal === nominal) {
          cart.positions[i].qty += qty;
          if (cart.positions[i].qty <= 0) {
            cart.positions = cart.positions.filter((pos: CartPositon) => {
              if (!pos.card
                || pos.card.type !== cart.positions[i]?.card?.type
                || pos.nominal !== cart.positions[i].nominal) {
                return true;
              }
              return false;
            });
          }
          break;
        }
      }
      state.cart = calculateCart(cart);
    },
    addToCart: (state, action: PayloadAction<CartPositon>) => {
      const position = action.payload;
      const { card, product, nominal, qty } = position;
      let cart = state.cart;
      let hasPosition = false;

      for (let i = 0; i < cart.positions.length; i++) {
        const positionCard = cart.positions[i].card;
        const positionProduct = cart.positions[i].product;
        // проверяем что такой товар уже лежит в корзине
        if (positionProduct && product && positionProduct.id === product.id) {
          cart.positions[i].qty += qty;
          hasPosition = true;
          break;
        }
        // проверяем что такой сертификат уже лежит в корзине
        if (positionCard && card && positionCard.type === card.type && cart.positions[i].nominal === nominal) {
          cart.positions[i].qty += qty;
          hasPosition = true;
          break;
        }
      }
      if (!hasPosition) {
        cart.positions.push(position);
      }
      state.cart = calculateCart(cart);
    },
  },
});
const { resetCart, changeCartQty, addToCart } = slice.actions;

// HELPERS
function calculateCart(cartOrig: Cart): Cart {
  const cart = { ...cartOrig };
  let cartLength = 0;
  let cartSummary = 0;

  for (let i = 0; i < cart.positions.length; i++) {
    cartLength += cart.positions[i].qty;
    if (cart.positions[i].cardNominal) {
      cartSummary += cart.positions[i].qty * cart.positions[i].cardNominal!.price;
    } else {
      cartSummary += cart.positions[i].qty * cart.positions[i].nominal;
    }
  }

  cart.length = cartLength;
  cart.summary = cartSummary;

  return cart;
}

// EXPORT
export * from './types';
export const prizesReducer = slice.reducer as Reducer<typeof initialState>;
export const prizesActions = {
  resetCart,
  changeCartQty,
  addToCart,
  getPaymentSettings,
  getPayments,
  getCatalogCards,
  getCatalogOrders,
  getShopProducts,
  getShopOrders,
};

const selectSelf = (rootState: {prizes: PrizesState}) => rootState.prizes;
export const cartSelector = createSelector(selectSelf, state => state.cart);

