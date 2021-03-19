import { createAsyncThunk, createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import FastImage from 'react-native-fast-image';
import { ax } from '@pmk-team/common';
import { Course, CoursesState } from './types';

const initialState: CoursesState = {
  courses: [],
};

// ACTIONS
const getCourses = createAsyncThunk('courses/getCourses', async (_, { getState }) => {
  const res = await ax().post<{courses: Course[]}>('courses/api/course/list', {
    profile_id: getState().auth.profile_id,
  });
  const courses = res.data.courses;
  FastImage.preload(
    courses.filter(c => !!c.file_preview_url).map(c => ({ uri: c.file_preview_url })),
  );
  return courses;
});

// REDUCER
const slice = createSlice({
  name: 'courses',
  initialState,
  extraReducers: {
    [getCourses.fulfilled.type]: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
  },
  reducers: {},
});

// EXPORT
export * from './types';
export const coursesReducer = slice.reducer as Reducer<typeof initialState>;
export const coursesActions = { getCourses };
