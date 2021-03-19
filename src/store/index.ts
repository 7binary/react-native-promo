import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector as _useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';

import { RootState, rootReducer } from './rootReducer';
import { Settings } from '@pmk-team/common';

const persistConfig = {
  timeout: 0,
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const rehydrationCallback = () => {
  Settings.api.jwtToken = store.getState().auth.token;
};
const persistor = persistStore(store, null, rehydrationCallback);

// exports
export * from './rootReducer';
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;
export { store, persistor };

// hints for getState/dispatch @ createAsyncThunk
declare module '@reduxjs/toolkit' {
  type AsyncThunkConfig = {
    state?: unknown;
    dispatch?: AppDispatch;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
  };

  function createAsyncThunk<Returned,
    ThunkArg = void,
    ThunkApiConfig extends AsyncThunkConfig = {
      state: RootState;
    }>(
    typePrefix: string,
    payloadCreator: AsyncThunkPayloadCreator<Returned,
      ThunkArg,
      ThunkApiConfig>,
    options?: any,
  ): AsyncThunk<Returned, ThunkArg, ThunkApiConfig>;
}
