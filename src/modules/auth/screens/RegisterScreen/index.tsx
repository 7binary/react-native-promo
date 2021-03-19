import React, { useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import ResetPhone from 'modules/auth/components/ResetPhone';
import GetSmsForm from 'modules/auth/components/GetSmsForm';
import CheckSmsForm from 'modules/auth/components/CheckSmsForm';
import RegisterForm from './components/RegisterForm';
import {
  ax,
  DropdownAlertService,
  KeyboardView,
  StatusBarLight,
  Background,
  Page, Settings,
} from '@pmk-team/common';

type TypeString = string | null;

export interface SpecialtyOption {
  label: string;
  value: string;
}

export interface SpecialtyOptions {
  [key: string]: SpecialtyOption[];
}

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState<TypeString>(null);
  const [token, setToken] = useState<TypeString>(null);
  const [pagePers, setPagePers] = useState<Page>();
  const [pageRules, setPageRules] = useState<Page>();
  const [profileInfo, setProfileInfo] = useState<any>(null);

  useFocusEffect(React.useCallback(() => {
    loadRegisterInfo();
    // setPhone('+7 (929) 900-4002'); setToken('aaa');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []));

  const getSmsSuccess = (phoneNumber: string) => {
    setPhone(phoneNumber);
  };

  const loadRegisterInfo = () =>
    ax().post('profiles/api/register/info', { phone })
      .then(response => {
        const { pagePers, pageRules, profile } = response.data;
        setPagePers(pagePers);
        setPageRules(pageRules);
        if (profile) {
          setProfileInfo(profile);
        }
      });

  const checkSmsSuccess = (tokenForm: string) => {
    setToken(tokenForm);
    loadRegisterInfo();
  };

  const registerSuccess = () => {
    setPhone(null);
    setToken(null);
    navigation.navigate('Login');
    DropdownAlertService.alert('success', 'Вы успешно зарегистрированы в программе');
  };

  const resetPhonePressed = () => {
    setPhone(null);
    setToken(null);
  };

  return (
    <KeyboardView containerStyle={Settings.config.screen}>
      <StatusBarLight/>
      <Background center>
        {phone && !token ? (
          <ResetPhone phone={phone} onReset={resetPhonePressed}/>
        ) : null}
        {!phone && !token ? (
          <GetSmsForm onSuccess={getSmsSuccess} type="sms_noprofile_or_unregistered"/>
        ) : null}
        {phone && !token ? (
          <CheckSmsForm
            onSuccess={checkSmsSuccess}
            phone={phone}
            type="sms_noprofile_or_unregistered"
          />
        ) : null}
        {phone && token ? (
          <RegisterForm
            onSuccess={registerSuccess}
            phone={phone}
            token={token}
            pagePers={pagePers}
            pageRules={pageRules}
            profileInfo={profileInfo}
          />
        ) : null}
      </Background>
    </KeyboardView>
  );
};

export default RegisterScreen;
