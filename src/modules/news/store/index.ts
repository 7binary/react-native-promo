import { createAsyncThunk, createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import FastImage from 'react-native-fast-image';
import { ax } from '@pmk-team/common';
import { Instruction, NewsState, Publication } from './types';

const initialState: NewsState = {
  news: [],
  instructions: [],
};

// ACTIONS
const getNews = createAsyncThunk('news/getNews', async (_, { getState }) => {
  const res = await ax().post<{news: Publication[]}>('news/api/news', {
    profile_id: getState().auth.profile_id,
  });
  const { news } = res.data;
  FastImage.preload(
    news.filter(p => !!p.image_preview_url).map(p => ({ uri: p.image_preview_url })),
  );
  return news;
});

const getInstructions = createAsyncThunk('news/getInstructions', async (_, { getState }) => {
  const res = await ax().post<{instructions: Instruction[]}>('news/api/instructions', {
    profile_id: getState().auth.profile_id,
  });
  const { instructions } = res.data;
  FastImage.preload(
    instructions.filter(i => !!i.image_preview_url).map(i => ({ uri: i.image_preview_url })),
  );
  return instructions;
});

const readPublication = createAsyncThunk('news/readPublication',
  async (publication: Publication, { getState }) => {
    return ax().post('news/api/news/readed', {
      profile_id: getState().auth.profile_id,
      news_id: publication.id,
    });
  });

const readInstruction = createAsyncThunk('news/readInstruction',
  async (instruction: Instruction, { getState }) => {
    return ax().post('news/api/instructions/readed', {
      profile_id: getState().auth.profile_id,
      instruction_id: instruction.id,
    });
  });

// REDUCER
const slice = createSlice({
  name: 'news',
  initialState,
  extraReducers: {
    [getNews.fulfilled.type]: (state, action: PayloadAction<Publication[]>) => {
      state.news = action.payload;
    },
    [getInstructions.fulfilled.type]: (state, action: PayloadAction<Instruction[]>) => {
      state.instructions = action.payload;
    },
  },
  reducers: {},
});

// EXPORT
export * from './types';
export const newsReducer = slice.reducer as Reducer<typeof initialState>;
export const newsActions = {
  getNews,
  getInstructions,
  readPublication,
  readInstruction,
};
