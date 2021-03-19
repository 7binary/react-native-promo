import { createAsyncThunk, createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { ax } from '@pmk-team/common';
import { SurveysResponse, SurveysState } from './types';

const initialState: SurveysState = {
  surveys: [],
  survey_profile: [],
};

// ACTIONS
const getSurveys = createAsyncThunk('surveys/getSurveys',
  async (onSuccess: Function | undefined, { getState }) => {
    const res = await ax().post<SurveysResponse>('survey/api/surveys/surveys-list', {
      profile_id: getState().auth.profile_id,
    });
    onSuccess && onSuccess();
    return res.data;
  });

const declineSurvey = createAsyncThunk('surveys/declineSurvey',
  async (survey_id: number, { getState, dispatch }) => {
    await ax().post('survey/api/surveys/survey-answer', {
      profile_id: getState().auth.profile_id,
      survey_id,
      type: 'not',
    });
    dispatch(getSurveys);
  });

// REDUCER
const slice = createSlice({
  name: 'surveys',
  initialState,
  extraReducers: {
    [getSurveys.fulfilled.type]: (state, action: PayloadAction<SurveysResponse>) => {
      const { surveys, completed } = action.payload;
      state.surveys = surveys;
      state.survey_profile = completed;
    },
  },
  reducers: {},
});

// EXPORT
export * from './types';
export const surveysReducer = slice.reducer as Reducer<typeof initialState>;
export const surveysActions = { getSurveys, declineSurvey };
