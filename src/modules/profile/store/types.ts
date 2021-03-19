import { Page } from '@pmk-team/common';

export type PassportStatus = 'new' | 'redo' | 'approved' | 'declined';

export interface PassportComment {
  id: number;
  created_at: string;
  status_old: PassportStatus | null;
  status_new: PassportStatus | null;
  comment: string | null;
  note: string | null;
  admin_id: number | null;
}

export interface PassportDocument {
  url?: string | null;
  file?: string | null;
  webpath?: string | null;
}

export interface Passport {
  id?: number;
  profile_id?: number;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  birthday_on_local: string | null | undefined;
  inn: string;
  address: string;
  document_series_and_number: string;
  comments: PassportComment[];
  status: PassportStatus;
  status_label: string;
  document1_api: PassportDocument | null;
  document2_api: PassportDocument | null;
}

interface PassportAccount {
  status: PassportStatus;
  status_label: string;
}

interface BannersGroup {
  height: number;
  id: number;
  name: string;
  slider: boolean
  title: string
  width: number;
}

export interface Banner {
  banner_url: string;
  company_id: number | null
  group: BannersGroup[];
  height: number | null;
  id: number;
  link: string;
  mobile_banner_url: string;
  mobile_height: number | null;
  mobile_on: number;
  mobile_width: number | null;
  position: number;
  rotate_with_id: number | null;
  width: number | null;
}

export interface User {
  profile_id: number;
  specialty: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  full_name: string;
  phone_mobile: string;
  email: string | null;
  birthday_on: string | null;
  role: string;
  blocked_at: string | null;
  blocked_reason: string | null;
  banned_at: string | null;
  banned_reason?: string | null;
  created_at: string | null;
  registered_at: string | null;
  is_market: boolean;
  is_checked: boolean;
  checked_at: string | null;
  balance: number;
  account: PassportAccount | null;
}

export type TransactionType = 'in' | 'out';

export interface Transaction {
  id: number,
  amount: number,
  balance_before: number,
  balance_after: number,
  title: string,
  comment: string | null,
  type: TransactionType,
  created_at: string,
}

export interface ProfileState {
  user: User | null;
  transactions: Transaction[];
  passport: Passport | null;
  banners: Banner[];
  rulesPage: Page | null;
}
