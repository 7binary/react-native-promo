import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Settings, HeaderPopupOptions } from '@pmk-team/common';
import HeaderOptions from 'components/HeaderOptions';
import PublicationScreen from 'modules/news/screens/PublicationScreen';
import NewsScreen from 'modules/news/screens/NewsScreen';
import InstructionScreen from 'modules/news/screens/InstructionScreen';
import InstructionsScreen from 'modules/news/screens/InstructionsScreen';
const Tab = createMaterialTopTabNavigator();

const NewsInstructionsTabs = () => (
  <Tab.Navigator initialRouteName="News" tabBarOptions={Settings.config.tabs}>
    <Tab.Screen
      name="News"
      component={NewsScreen}
      options={{tabBarLabel: 'Новости'}}
    />
    <Tab.Screen
      name="Instructions"
      component={InstructionsScreen}
      options={{tabBarLabel: 'Инструкции'}}
    />
  </Tab.Navigator>
);

const Stack = createStackNavigator();

const NewsInstructionsNavigator = () => (
  <Stack.Navigator
    initialRouteName="NewsInstructionsTabs"
    screenOptions={{
      headerTitleAlign: 'center',
      cardStyleInterpolator: ({ current }) => ({
        cardStyle: { opacity: current.progress },
      }),
    }}>
    <Stack.Screen
      name="NewsInstructionsTabs"
      component={NewsInstructionsTabs}
      options={HeaderOptions}
    />
    <Stack.Screen
      name="Publication"
      component={PublicationScreen}
      initialParams={{publication: null}}
      options={{title: 'Новость', ...HeaderPopupOptions}}
    />
    <Stack.Screen
      name="Instruction"
      component={InstructionScreen}
      initialParams={{instruction: null}}
      options={{title: 'Инструкция', ...HeaderPopupOptions}}
    />
  </Stack.Navigator>
);

export default NewsInstructionsNavigator;
