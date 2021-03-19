import { createAsyncThunk, createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { ax } from '@pmk-team/common';
import { Faq, FeedbackMessage, FeedbackState } from './types';

const initialState: FeedbackState = {
  faqs: [],
  messages: [],
};

// ACTIONS
const getFaqs = createAsyncThunk('feedback/getFaqs', async () => {
  const res = await ax().post<{faqs: Faq[]}>('feedback/api/feedback/faq');
  return res.data.faqs;
});

const getFeedbackMessages = createAsyncThunk('feedback/getFeedbackMessages', async (_, { getState }) => {
  const res = await ax().post<{messages: FeedbackMessage[]}>('feedback/api/feedback/my-questions', {
    profile_id: getState().auth.profile_id,
  });
  const messages = res.data.messages;
  messages.sort((msg1: FeedbackMessage, msg2: FeedbackMessage): number => {
    const date1 = Date.parse(msg1.created_at);
    const date2 = Date.parse(msg2.created_at);
    if (date1 === date2) {
      return 0;
    }
    return date1 > date2 ? 1 : -1;
  });
  return messages;
});

// REDUCER
const slice = createSlice({
  name: 'feedback',
  initialState,
  extraReducers: {
    [getFaqs.fulfilled.type]: (state, action: PayloadAction<Faq[]>) => {
      state.faqs = action.payload;
    },
    [getFeedbackMessages.fulfilled.type]: (state, action: PayloadAction<FeedbackMessage[]>) => {
      state.messages = action.payload;
    },
  },
  reducers: {},
});

// EXPORT
export * from './types';
export const feedbackReducer = slice.reducer as Reducer<typeof initialState>;
export const feedbackActions = { getFaqs, getFeedbackMessages };
