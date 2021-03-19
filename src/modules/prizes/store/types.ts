export type PaymentType = 'phone' | 'yandex' | 'qiwi' | 'webmoney' | 'card' | 'rbs' | 'catalog';
export type PaymentStatus = 'waiting' | 'new' | 'processing' | 'success' | 'fail' | 'rollback';
export type CatalogStatus = 'waiting' | 'new' | 'ordered' | 'partiallyReady' | 'ready'
  | 'rejected' | 'rollback' | 'userCancel';
export type ShopOrderStatus = 'new' | 'delivery' | 'completed' | 'rollback';

export interface ShopCategory {
  id: number;
  name: string;
}

export interface ShopProduct {
  id: number;
  name: string;
  description: string | null;
  vendor_code: string | null;
  model: string | null;
  price: number;
  picture_url: string;
  position: number;
  category: ShopCategory | null;
  sizes: string[];
}

export interface ShopPosition {
  id: number;
  product: ShopProduct;
  qty: number;
  size: string | null;
  price: number;
}

export interface ShopOrder {
  order_id: number;
  profile_id: number;
  status: ShopOrderStatus;
  status_label?: string | null;
  phone_mobile: string;
  email: string;
  delivery_address: string;
  items_cost: number;
  delivery_cost: number;
  total_cost: number;
  comment: string | null;
  created: string;
  items: ShopPosition[];
}

export interface PaymentParameters {
  phone_mobile?: string;
  first_name?: string;
  last_name?: string;
}

export interface PaymentSettings {
  id: number;
  type: PaymentType;
  profile_commission: number;
  company_commission: number;
  position: number;
  enabled: boolean | number;
  title: string;
  additional_agreement: boolean | number;
  additional_agreement_label: string | null;
}

export interface Payment {
  ms_payment_id: number;
  profile_id: number;
  amount: number;
  type: PaymentType;
  type_label: string;
  status: PaymentStatus;
  status_label: string;
  parameters: PaymentParameters;
  created_at: string;
  updated_at: string;
}

export interface PaymentCommissionResponse {
  type: PaymentType;
  title: string;
  message: string;
  amount: number;
  commission: number;
  totalAmount: number;
}

export interface CardNominal {
  nominal: number;
  price: number;
  taxText: string;
}

export interface CatalogCard {
  id: number;
  type: string;
  id1c: string;
  title: string;
  name: string;
  nominals: number[];
  nominals_text: CardNominal[];
  image: string;
  is_allow_to_order: number | boolean;
  is_plastic: number | boolean;
  description: string;
  order: null | number;
}

export interface OrderedCard {
  ms_card_id: number;
  card: string;
  card_title: string;
  card_name: string;
  id1c: string;
  nominal: number;
  qty: number;
  status: CatalogStatus;
  status_label: string;
  image: string;
  cards: CardItem[];
}

export interface CardItem {
  ms_card_id: number;
  card_data: any;
  created_at: string;
  nominal: number;
  type: string;
}

export interface CatalogOrder {
  ms_order_id: number;
  profile_id: number;
  status: CatalogStatus;
  status_label: string;
  amount: number;
  delivery_email: string;
  delivery_phone_mobile: string;
  delivery_address: null | string;
  is_allow_cancel: number | boolean;
  is_canceled: number | boolean;
  can_be_canceled: boolean;
  created_at: string;
  updated_at: string;
  items: OrderedCard[];
}

export interface Cart {
  positions: CartPositon[];
  length: number;
  summary: number;
}

export interface CartPositon {
  card?: CatalogCard;
  cardNominal?: CardNominal;
  product?: ShopProduct;
  nominal: number;
  qty: number;
}

export interface PrizesState {
  paymentSettings: PaymentSettings[];
  payments: Payment[];
  catalogCards: CatalogCard[];
  catalogOrders: CatalogOrder[];
  shopProducts: ShopProduct[];
  shopOrders: ShopOrder[];
  cart: Cart;
}
