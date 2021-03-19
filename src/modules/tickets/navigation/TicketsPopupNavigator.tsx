import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HeaderPopupOptions } from '@pmk-team/common';
import TicketsScreen from 'modules/tickets/screens/TicketsScreen';
import TicketScreen from 'modules/tickets/screens/TicketScreen';
import CreateTicketScreen from 'modules/tickets/screens/CreateTicketScreen';

const Stack = createStackNavigator();

const TicketsPopupNavigator = () => {
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
        options={{ title: 'Поддержка', ...HeaderPopupOptions }}
      />
      <Stack.Screen
        name="Ticket"
        component={TicketScreen}
        options={{ title: 'Обращение', ...HeaderPopupOptions }}
        initialParams={{ ticketId: null }}
      />
    </Stack.Navigator>
  );
};

export default TicketsPopupNavigator;
