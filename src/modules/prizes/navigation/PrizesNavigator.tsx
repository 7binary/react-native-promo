import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import PrizesScreen from 'modules/prizes/screens/PrizesScreen';
import OrdersScreen from 'modules/prizes/screens/OrdersScreen';
import CartScreen from 'modules/prizes/screens/CartScreen';
import CardScreen from 'modules/prizes/screens/CardScreen';
import HeaderOptions from 'components/HeaderOptions';
import ShopProductScreen from 'modules/prizes/screens/ShopProductScreen';
import { Settings, HeaderPopupOptions } from '@pmk-team/common';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const PrizesTabs = () => (
  <Tab.Navigator initialRouteName="Prizes" tabBarOptions={Settings.config.tabs}>
    <Tab.Screen
      name="Cart"
      component={CartScreen}
      options={{ tabBarLabel: 'Корзина' }}
    />
    <Tab.Screen
      name="Prizes"
      component={PrizesScreen}
      options={{ tabBarLabel: 'Витрина' }}
    />
    <Tab.Screen
      name="Orders"
      component={OrdersScreen}
      options={{ tabBarLabel: 'Заказы' }}
    />
  </Tab.Navigator>
);

const PrizesNavigator = () => (
  <Stack.Navigator
    initialRouteName="PrizesTabs"
    screenOptions={{
      headerTitleAlign: 'center',
      cardStyleInterpolator: ({ current }) => ({
        cardStyle: { opacity: current.progress },
      }),
    }}
  >
    <Stack.Screen
      name="PrizesTabs"
      component={PrizesTabs}
      options={HeaderOptions}
    />
    <Stack.Screen
      name="Card"
      component={CardScreen}
      options={{ title: 'Сертификат', ...HeaderPopupOptions }}
      initialParams={{ card: null }}
    />
    <Stack.Screen
      name="ShopProduct"
      component={ShopProductScreen}
      options={{ title: 'Товар', ...HeaderPopupOptions }}
      initialParams={{ product: null }}
    />
  </Stack.Navigator>
);

export default PrizesNavigator;
