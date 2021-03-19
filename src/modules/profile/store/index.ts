import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
  Reducer,
} from '@reduxjs/toolkit';
import FastImage from 'react-native-fast-image';
import { ax, Page } from '@pmk-team/common';
import { Banner, Passport, ProfileState, Transaction, User } from './types';

const initialState: ProfileState = {
  user: null,
  transactions: [],
  passport: null,
  banners: [],
  rulesPage: null,
};

// ACTIONS
const getProfile = createAsyncThunk('profile/getProfile', async (_, { getState }) => {
  const res = await ax().post<{profile: User}>('profiles/api/auth/get-profile', {
    profile_id: getState().auth.profile_id,
  });
  return res.data.profile;
});

const getTransactions = createAsyncThunk('profile/getTransactions', async (_, { getState }) => {
  const res = await ax().post<{transactions: Transaction[]}>('profiles/api/transaction/list', {
    profile_id: getState().auth.profile_id,
  });
  return res.data.transactions;
});

const getPassport = createAsyncThunk('profile/getPassport', async (_, { getState }) => {
  const res = await ax().post<{form: Passport | null}>('taxes/api/passport', {
    profile_id: getState().auth.profile_id,
  });
  return res.data.form;
});

const getBanners = createAsyncThunk('profile/getBanners',
  async (group: string = 'guest-index') => {
    const res = await ax().post<{banners: Banner[]}>('posters/api/posters/by-group', { group });
    FastImage.preload(
      res.data.banners.filter(b => !!b.mobile_banner_url).map(b => ({ uri: b.mobile_banner_url })),
    );
    return res.data.banners;
  });

const getRules = createAsyncThunk('profile/getRules', async () => {
  const res = await ax().post<{page: Page | null}>('pages/api/pages', { url: 'rules' });
  return res.data.page;
});

// REDUCER
export const slice = createSlice({
  name: 'profile',
  initialState,
  extraReducers: {
    [getProfile.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    [getTransactions.fulfilled.type]: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    [getPassport.fulfilled.type]: (state, action: PayloadAction<Passport | null>) => {
      state.passport = action.payload;
    },
    [getBanners.fulfilled.type]: (state, action: PayloadAction<Banner[]>) => {
      state.banners = action.payload;
    },
    [getRules.fulfilled.type]: (state, action: PayloadAction<Page | null>) => {
      state.rulesPage = action.payload;
    },
  },
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    unsetUser: state => {
      state.user = null;
      state.passport = null;
      state.transactions = [];
    },
  },
});
const { setUser, unsetUser } = slice.actions;

// EXPORT
export * from './types';
export const profileReducer = slice.reducer as Reducer<typeof initialState>;
export const profileActions = {
  setUser,
  unsetUser,
  getProfile,
  getPassport,
  getBanners,
  getTransactions,
  getRules,
};

const selectSelf = (rootState: {profile: ProfileState}) => rootState.profile;
export const userSelector = createSelector(selectSelf, state => state.user);
export const passportSelector = createSelector(selectSelf, state => state.passport);
