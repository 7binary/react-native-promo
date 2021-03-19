import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import ResetPhone from 'modules/auth/components/ResetPhone';
import GetSmsForm from 'modules/auth/components/GetSmsForm';
import CheckSmsForm from 'modules/auth/components/CheckSmsForm';
import RemindChangeForm from './components/RemindChangeForm';
import { DropdownAlertService, Settings, StatusBarLight } from '@pmk-team/common';

type TypeString = string | null;

const RemindPasswordScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState<TypeString>(null);
  const [token, setToken] = useState<TypeString>(null);

  const getSmsSuccess = (phoneNumber: string) => {
    setPhone(phoneNumber);
  };

  const checkSmsSuccess = (tokenForm: string) => {
    setToken(tokenForm);
  };

  const remindChangeSuccess = () => {
    setPhone(null);
    setToken(null);
    navigation.navigate('Login');
    DropdownAlertService.alert('success', 'Пароль был успешно изменен');
  };

  const resetPhonePressed = () => {
    setPhone(null);
    setToken(null);
  };

  return (
    <SafeAreaView style={{ ...Settings.config.screen, ...styles.container }}>
      <StatusBarLight/>
      {phone && <ResetPhone phone={phone} onReset={resetPhonePressed}/>}
      {!phone && !token && <GetSmsForm onSuccess={getSmsSuccess} type="sms_profile"/>}
      {phone && !token &&
      <CheckSmsForm onSuccess={checkSmsSuccess} phone={phone} type="sms_profile"/>}
      {phone && token &&
      <RemindChangeForm onSuccess={remindChangeSuccess} phone={phone} token={token}/>}
    </SafeAreaView>
  );
};

export default RemindPasswordScreen;
