import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
  Reducer,
} from '@reduxjs/toolkit';
import firebase from 'react-native-firebase';
import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { ax } from '@pmk-team/common';
import { MobileState, NotificationsResponse } from './types';

const initialState: MobileState = {
  notifications: [],
  unreaded: 0,
};

// ACTIONS
const getNotifications = createAsyncThunk('mobile/getNotifications', async (_, { getState }) => {
  const res = await ax().post<NotificationsResponse>('mobile/api/notifications', {
    profile_id: getState().auth.profile_id,
  });
  return res.data;
});

const readNotifications = createAsyncThunk('mobile/readNotifications', async (_, { getState }) => {
  const profile_id = getState().auth.profile_id;
  const notifications = getState().mobile.notifications;
  if (!profile_id || notifications.length === 0) {
    return;
  }
  const notification_ids = notifications.map(n => n.id);
  return ax().post('mobile/api/notifications/readed', { profile_id, notification_ids });
});

const registerFirebaseDevice = createAsyncThunk('mobile/registerFirebaseDevice', async (_, { getState }) => {
  await firebase.messaging().requestPermission();
  const token = await firebase.messaging().getToken();
  return ax().post('mobile/api/firebase/register-device', {
    profile_id: getState().auth.profile_id,
    token,
    platform: Platform.OS,
  });
});

const registerMobileDevice = createAsyncThunk('mobile/registerMobileDevice', async (_, { getState }) => {
  const manufacturer = await DeviceInfo.getManufacturer();
  const payload = {
    profile_id: getState().auth.profile_id,
    manufacturer,
    platform: Platform.OS,
    version: DeviceInfo.getVersion(),
    device_version: DeviceInfo.getSystemVersion(),
    device: DeviceInfo.getDeviceId(),
    screen_width: Math.round(Dimensions.get('window').width),
    screen_height: Math.round(Dimensions.get('window').height),
  };
  return ax().post('mobile/api/devices/add', payload);
});

// REDUCER
const slice = createSlice({
  name: 'mobile',
  initialState,
  extraReducers: {
    [getNotifications.fulfilled.type]: (state, action: PayloadAction<NotificationsResponse>) => {
      const { notifications, unreaded } = action.payload;
      state.notifications = notifications;
      state.unreaded = unreaded;
    },
  },
  reducers: {},
});

// EXPORT
export * from './types';
export const mobileReducer = slice.reducer as Reducer<typeof initialState>;
export const mobileActions = {
  getNotifications,
  readNotifications,
  registerFirebaseDevice,
  registerMobileDevice,
};

const selectSelf = (rootState: {mobile: MobileState}) => rootState.mobile;
export const unreadedSelector = createSelector(selectSelf, state => state.unreaded);
