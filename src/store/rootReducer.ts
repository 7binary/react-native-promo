import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { combineReducers } from '@reduxjs/toolkit';

import { authReducer, authActions } from 'modules/auth/store';
import { profileReducer, profileActions } from 'modules/profile/store';
import { mobileReducer, mobileActions } from 'modules/mobile/store';
import { prizesReducer, prizesActions } from 'modules/prizes/store';
import { ticketsReducer, ticketsActions } from 'modules/tickets/store';
import { newsReducer, newsActions } from 'modules/news/store';
import { coursesReducer, coursesActions } from 'modules/courses/store';
import { feedbackReducer, feedbackActions } from 'modules/feedback/store';
import { salesReducer, salesActions } from 'modules/sales/store';
import { surveysReducer, surveysActions } from 'modules/surveys/store';

export const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  mobile: mobileReducer,
  prizes: prizesReducer,
  tickets: ticketsReducer,
  news: newsReducer,
  courses: coursesReducer,
  feedback: feedbackReducer,
  sales: salesReducer,
  surveys: surveysReducer,
});

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators({
    ...authActions,
    ...profileActions,
    ...mobileActions,
    ...prizesActions,
    ...ticketsActions,
    ...newsActions,
    ...coursesActions,
    ...feedbackActions,
    ...salesActions,
    ...surveysActions,
  }, dispatch), [dispatch]);
};

export type RootState = ReturnType<typeof rootReducer>;
