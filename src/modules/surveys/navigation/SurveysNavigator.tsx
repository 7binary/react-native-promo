import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HeaderPopupOptions } from '@pmk-team/common';
import SurveyScreen from 'modules/surveys/screens/SurveyScreen';

const Stack = createStackNavigator();

const SurveysNavigator = () => (
  <Stack.Navigator initialRouteName="Survey" screenOptions={{headerTitleAlign: 'center'}}>
    <Stack.Screen
      name="Survey"
      component={SurveyScreen}
      initialParams={{survey: null}}
      options={{title: 'Пройти опрос', ...HeaderPopupOptions}}
    />
  </Stack.Navigator>
);

export default SurveysNavigator;
