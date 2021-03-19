import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DashboardScreen from 'modules/profile/screens/DashboardScreen';
import PassportScreen from 'modules/profile/screens/PassportScreen';
import BalanceScreen from 'modules/profile/screens/BalanceScreen';
import ProfileScreen from 'modules/profile/screens/ProfileScreen';
import RulesScreen from 'modules/profile/screens/RulesScreen';

import { Settings, HeaderPopupOptions } from '@pmk-team/common';
import HeaderOptions from 'components/HeaderOptions';
const Tab = createMaterialTopTabNavigator();

const DashboardTabs = () => (
  <Tab.Navigator initialRouteName="Dashboard" tabBarOptions={Settings.config.tabs}>
    <Tab.Screen
      name="Passport"
      component={PassportScreen}
      options={{tabBarLabel: 'НДФЛ'}}
    />
    <Tab.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{tabBarLabel: 'Профиль'}}
    />
    <Tab.Screen
      name="Balance"
      component={BalanceScreen}
      options={{tabBarLabel: 'Баланс'}}
    />
  </Tab.Navigator>
);

const Stack = createStackNavigator();

const DashboardTabsNavigator = () => (
  <Stack.Navigator
    initialRouteName="DashboardTabs"
    screenOptions={{
      headerTitleAlign: 'center',
      cardStyleInterpolator: ({ current }) => ({
        cardStyle: { opacity: current.progress },
      }),
    }}>
    <Stack.Screen
      name="DashboardTabs"
      component={DashboardTabs}
      options={HeaderOptions}
    />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{title: 'Профиль', ...HeaderPopupOptions}}
    />
    <Stack.Screen
      name="Rules"
      component={RulesScreen}
      options={{title: 'Правила акции', ...HeaderPopupOptions}}
    />
  </Stack.Navigator>
);

export default DashboardTabsNavigator;
