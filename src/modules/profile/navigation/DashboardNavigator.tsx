import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardScreen from 'modules/profile/screens/DashboardScreen';
import PassportScreen from 'modules/profile/screens/PassportScreen';
import BalanceScreen from 'modules/profile/screens/BalanceScreen';
import ProfileScreen from 'modules/profile/screens/ProfileScreen';
import RulesScreen from 'modules/profile/screens/RulesScreen';
import SurveyScreen from 'modules/surveys/screens/SurveyScreen';
import TicketsNavigator from 'modules/tickets/navigation/TicketsNavigator';
import FeedbackNavigator from 'modules/feedback/navigation/FeedbackNavigator';
import HeaderOptions from 'components/HeaderOptions';
import { HeaderPopupOptions } from '@pmk-team/common';

const Stack = createStackNavigator();

const DashboardNavigator = () => (
  <Stack.Navigator
    initialRouteName="Dashboard"
    screenOptions={{
      headerTitleAlign: 'center',
      cardStyleInterpolator: ({ current }) => ({
        cardStyle: { opacity: current.progress },
      }),
    }}>
    <Stack.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={HeaderOptions}
    />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{title: 'Профиль', ...HeaderPopupOptions}}
    />
    <Stack.Screen
      name="Passport"
      component={PassportScreen}
      options={{title: 'Налоговая анкета', ...HeaderPopupOptions}}
    />
    <Stack.Screen
      name="Balance"
      component={BalanceScreen}
      options={{title: 'Баланс', ...HeaderPopupOptions}}
    />
    <Stack.Screen
      name="Rules"
      component={RulesScreen}
      options={{title: 'Правила акции', ...HeaderPopupOptions}}
    />
    <Stack.Screen
      name="Survey"
      component={SurveyScreen}
      options={{title: 'Пройти опрос', ...HeaderPopupOptions}}
    />
    <Stack.Screen
      name="TicketsNav"
      component={TicketsNavigator}
      options={{title: 'Поддержка', ...HeaderPopupOptions}}
    />
    <Stack.Screen
      name="FeedbackNav"
      component={FeedbackNavigator}
      options={{title: 'Помощь', ...HeaderPopupOptions}}
    />
  </Stack.Navigator>
);

export default DashboardNavigator;
