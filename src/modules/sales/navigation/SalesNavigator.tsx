import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Settings, HeaderPopupOptions } from '@pmk-team/common';
import HeaderOptions from 'components/HeaderOptions';

import ActionsScreen from 'modules/sales/screens/ActionsScreen';
import SalesScreen from 'modules/sales/screens/SalesScreen';
import CreateSaleScreen from 'modules/sales/screens/CreateSaleScreen';

const Tab = createMaterialTopTabNavigator();

const SalesTabs = () => (
  <Tab.Navigator initialRouteName="Actions" tabBarOptions={Settings.config.tabs}>
    <Tab.Screen
      name="Actions"
      component={ActionsScreen}
      options={{tabBarLabel: 'Акции'}}
    />
    <Tab.Screen
      name="Sales"
      component={SalesScreen}
      options={{tabBarLabel: 'Продажи'}}
    />
  </Tab.Navigator>
);

const Stack = createStackNavigator();

const SalesNavigator = () => (
  <Stack.Navigator
    initialRouteName="SalesTabs"
    screenOptions={{
      headerTitleAlign: 'center',
      cardStyleInterpolator: ({ current }) => ({
        cardStyle: { opacity: current.progress },
      }),
    }}>
    <Stack.Screen
      name="SalesTabs"
      component={SalesTabs}
      options={HeaderOptions}
    />
    <Stack.Screen
      name="CreateSale"
      component={CreateSaleScreen}
      initialParams={{sale: null, action: null}}
      options={{title: 'Продажа', ...HeaderPopupOptions}}
    />
  </Stack.Navigator>
);

export default SalesNavigator;
