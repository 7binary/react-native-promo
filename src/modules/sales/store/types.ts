export interface Action {
  id: number;
  title: string;
  description: string;
  short_description: string;
  planForAction: number[];
  start_on: string;
  end_on: string;
  has_products: boolean;
  is_actual: boolean;
  is_confirmed: boolean;
  show_price: boolean;
  sale_ids: number[];
  olap_period: string;
}

export interface Sale {
  documents: SaleDocument[];
  positions: SalePosition[];
  history: SaleHistory[];
  action: Action;
  id: number;
  action_id: number;
  status: string;
  status_label: string;
  bonuses: number;
  sold_on_local: string;
  created_at: string;
  number: string;
}

export interface SaleDocument {
  id?: number | null;
  name?: string | null;
  url?: string | null;
  base64?: string | null;
}

export interface SaleHistory {
  id: number;
  created_at: string;
  note: string;
  comment: string | null;
}

export interface SalePosition {
  product: SaleProduct;
  product_id: number;
  quantity: number;
  bonuses: number;
}

export interface SaleProduct {
  group: SaleGroup;
  category: SaleCategory;
  unit: SaleUnit;
  id: number;
  group_id: number;
  category_id: number;
  unit_id: number;
  name: string;
  shortName: string;
  title: string;
  code: string;
  enabled: boolean;
  weight: number;
  price: number;
}

export interface SaleGroup {
  id: number;
  name: string;
}

export interface SaleCategory {
  id: number;
  name: string;
}

export interface SaleUnit {
  id: number;
  name: string;
  short_name: string;
  quantity_divider: number;
}

export interface SalesState {
  actions: Action[];
  sales: Sale[];
}
