import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TicketsScreen from 'modules/tickets/screens/TicketsScreen';
import TicketScreen from 'modules/tickets/screens/TicketScreen';
import CreateTicketScreen from 'modules/tickets/screens/CreateTicketScreen';
import HeaderOptions from 'components/HeaderOptions';
import { HeaderPopupOptions } from '@pmk-team/common';

const Stack = createStackNavigator();

const TicketsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Tickets'}
      screenOptions={{ headerTitleAlign: 'center' }}
    >
      <Stack.Screen
        name="CreateTicket"
        component={CreateTicketScreen}
        options={{ title: 'Добавить обращение', ...HeaderPopupOptions }}
      />
      <Stack.Screen
        name="Tickets"
        component={TicketsScreen}
        options={HeaderOptions}
      />
      <Stack.Screen
        name="Ticket"
        component={TicketScreen}
        options={{ title: 'Обращение', ...HeaderPopupOptions }}
        initialParams={{ ticket: null }}
      />
    </Stack.Navigator>
  );
};

export default TicketsNavigator;
