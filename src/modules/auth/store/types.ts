import { AxiosInstance } from 'axios';

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  profile_id: number;
  token: string
}

export interface LoginParams {
  client: AxiosInstance;
  values: LoginRequest;
  onSuccess?: Function;
}

export interface ApiSettings {
  review: boolean;
  sidemenu: boolean;
  testFeatures: string[];
  testProfileIds: number[];
}

export interface AuthState {
  profile_id: number | null;
  token: string | null;
  settings: ApiSettings | null;
}
