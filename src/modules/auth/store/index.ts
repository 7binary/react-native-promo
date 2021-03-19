import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
  Reducer,
} from '@reduxjs/toolkit';
import { ax, Settings } from '@pmk-team/common';
import { AuthState, ApiSettings, LoginParams, LoginResponse } from './types';

const initialState: AuthState = {
  profile_id: null,
  token: null,
  settings: null,
};

// ACTIONS
const getApiSettings = createAsyncThunk('auth/getApiSettings', async () => {
  const res = await ax().post<{settings: ApiSettings}>('api/settings');
  return res.data.settings;
});

const login = createAsyncThunk('auth/login',
  async ({ client, values, onSuccess }: LoginParams) => {
    const res = await client.post<LoginResponse>('api/login', values);
    onSuccess && onSuccess();
    return res.data;
  });

const userLoginState = (state: AuthState, action: PayloadAction<LoginResponse>) => {
  const { token, profile_id } = action.payload;
  Settings.api.jwtToken = token;
  state.token = token;
  state.profile_id = profile_id;
};

// REDUCER
const slice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [getApiSettings.fulfilled.type]: (state, action: PayloadAction<ApiSettings>) => {
      state.settings = action.payload;
    },
    [login.fulfilled.type]: userLoginState,
  },
  reducers: {
    userLogin: userLoginState,
    userLogout: state => {
      Settings.api.jwtToken = null;
      state.token = null;
      state.profile_id = null;
    },
  },
});
const { userLogin, userLogout } = slice.actions;

// EXPORT
export * from './types';
export * from './useTestFeature';
export const authReducer = slice.reducer as Reducer<typeof initialState>;
export const authActions = {
  userLogin,
  userLogout,
  login,
  getApiSettings,
};

const selectSelf = (rootState: {auth: AuthState}) => rootState.auth;
export const profileIdSelector = createSelector(selectSelf, state => state.profile_id);
export const settingsSelector = createSelector(selectSelf, state => state.settings);
export const tokenSelector = createSelector(selectSelf, state => state.token);
