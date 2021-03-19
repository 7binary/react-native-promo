import { createAsyncThunk, createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { ax, FormSelectOption } from '@pmk-team/common';
import { Ticket, TicketsResponse, TicketsState } from './types';

const initialState: TicketsState = {
  counter_profile: 0,
  tickets: [],
  topic_options: [],
  contact_options: [],
  success_message: 'Обращение отправлено! Ожидайте ответ в ближайшее время',
};

// ACTIONS
const getTickets = createAsyncThunk('tickets/getTickets', async (_, { getState }) => {
  const res = await ax().post<TicketsResponse>('tickets/api/no-log/get-my-tickets', {
    profile_id: getState().auth.profile_id,
  });
  return res.data;
});

// REDUCER
const slice = createSlice({
  name: 'tickets',
  initialState,
  extraReducers: {
    [getTickets.fulfilled.type]: (state, action: PayloadAction<TicketsResponse>) => {
      const { counter_profile, tickets, success_message, contact_options, topic_options } = action.payload;
      const topicOptions: FormSelectOption[] = topic_options
        .map((o: {id: number, name: string}) => ({ label: o.name, value: `${o.id}` }));
      const contactOptions: FormSelectOption[] = [];
      for (const [key, value] of Object.entries(contact_options)) {
        contactOptions.push({ label: value, value: key });
      }

      state.counter_profile = counter_profile;
      state.tickets = tickets;
      state.success_message = success_message;
      state.topic_options = topicOptions;
      state.contact_options = contactOptions;
    },
  },
  reducers: {
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets.unshift(action.payload);
    },
  },
});
const { addTicket } = slice.actions;

// EXPORT
export * from './types';
export const ticketsReducer = slice.reducer as Reducer<typeof initialState>;
export const ticketsActions = { addTicket, getTickets };
