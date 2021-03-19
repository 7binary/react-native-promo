import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import HeaderOptions from 'components/HeaderOptions';
import FeedbackScreen from 'modules/feedback/screens/FeedbackScreen';
import FaqScreen from 'modules/feedback/screens/FaqScreen';
import { Settings } from '@pmk-team/common';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const FeedbackTabs = () => (
  <Tab.Navigator initialRouteName="Feedback" tabBarOptions={Settings.config.tabs}>
    <Tab.Screen
      name="Feedback"
      component={FeedbackScreen}
      options={{ tabBarLabel: 'Обращение' }}
    />
    <Tab.Screen
      name="Faq"
      component={FaqScreen}
      options={{ tabBarLabel: 'Ответы на вопросы' }}
    />
  </Tab.Navigator>
);

const FeedbackNavigator = () => (
  <Stack.Navigator initialRouteName="FeedbackTabs" screenOptions={{ headerTitleAlign: 'center' }}>
    <Stack.Screen
      name="FeedbackTabs"
      component={FeedbackTabs}
      options={HeaderOptions}
    />
  </Stack.Navigator>
);

export default FeedbackNavigator;
