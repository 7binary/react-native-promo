import { createAsyncThunk, createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { ax } from '@pmk-team/common';
import { Action, Sale, SalesState } from './types';

const initialState: SalesState = {
  actions: [],
  sales: [],
};

// ACTIONS
const getActions = createAsyncThunk('sales/getActions', async (_, { getState }) => {
  const res = await ax().post<{actions: Action[]}>('actions/api/action/current-list', {
    profile_id: getState().auth.profile_id,
  });
  return res.data.actions;
});

const getSales = createAsyncThunk('sales/getSales', async (_, { getState }) => {
  const res = await ax().post<{sales: Sale[]}>('sales/api/sale/list', {
    profile_id: getState().auth.profile_id,
  });
  return res.data.sales;
});

// REDUCER
const slice = createSlice({
  name: 'surveys',
  initialState,
  extraReducers: {
    [getActions.fulfilled.type]: (state, action: PayloadAction<Action[]>) => {
      state.actions = action.payload;
    },
    [getSales.fulfilled.type]: (state, action: PayloadAction<Sale[]>) => {
      state.sales = action.payload;
    },
  },
  reducers: {},
});

// EXPORT
export * from './types';
export const salesReducer = slice.reducer as Reducer<typeof initialState>;
export const salesActions = { getActions, getSales };
