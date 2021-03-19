import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NewsScreen from 'modules/news/screens/NewsScreen';
import PublicationScreen from 'modules/news/screens/PublicationScreen';
import HeaderOptions from 'components/HeaderOptions';
import { HeaderPopupOptions } from '@pmk-team/common';

const Stack = createStackNavigator();

const NewsNavigator = () => (
  <Stack.Navigator initialRouteName="News" screenOptions={{headerTitleAlign: 'center'}}>
    <Stack.Screen
      name="News"
      component={NewsScreen}
      options={{title: 'Новости', ...HeaderOptions}}
    />
    <Stack.Screen
      name="Publication"
      component={PublicationScreen}
      initialParams={{publication: null}}
      options={{title: 'Новость', ...HeaderPopupOptions}}
    />
  </Stack.Navigator>
);

export default NewsNavigator;
