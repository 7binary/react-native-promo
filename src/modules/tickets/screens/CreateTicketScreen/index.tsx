import React from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { KeyboardView, DropdownAlertService, StatusBarDark, Settings } from '@pmk-team/common';
import CreateTicketForm from './components/CreateTicketForm';
import { useActions, useSelector } from 'store';

const CreateTicketScreen = () => {
  const { getTickets } = useActions();
  const navigation = useNavigation();
  const successMessage = useSelector(state => state.tickets.success_message);

  useFocusEffect(React.useCallback(() => {
    getTickets();
  }, [getTickets]));

  return (
    <KeyboardView containerStyle={Settings.config.screen}>
      <StatusBarDark/>
      <CreateTicketForm onSuccess={() => {
        DropdownAlertService.alert('success', successMessage);
        navigation.navigate('TicketsNav', { screen: 'Tickets' });
      }}/>
    </KeyboardView>
  );
};

export default CreateTicketScreen;
