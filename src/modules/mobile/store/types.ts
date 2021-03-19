export interface Notification {
  id: number;
  profile_id: number | null;
  title: string;
  body: string;
  icon_url: string | null;
  fa: string | null;
  created_at: string;
  readed: boolean;
}

export interface MobileState {
  notifications: Notification[];
  unreaded: number;
}

export interface NotificationsResponse {
  notifications: Notification[];
  unreaded: number;
}
