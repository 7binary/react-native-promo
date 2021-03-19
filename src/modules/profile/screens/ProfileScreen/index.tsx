import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { KeyboardView, DropdownAlertService, StatusBarDark, Settings } from '@pmk-team/common';
import ProfileForm from './components/ProfileForm';

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <KeyboardView containerStyle={Settings.config.screen}>
      <StatusBarDark/>
      <ProfileForm onSuccess={() => {
        navigation.navigate('Dashboard');
        DropdownAlertService.alert('info', 'Ваш профиль обновлен!');
      }}/>
    </KeyboardView>
  );
};

export default ProfileScreen;
