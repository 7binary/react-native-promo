import React from 'react';

import { KeyboardView, Settings, StatusBarDark } from '@pmk-team/common';
import PassportForm from './components/PassportForm';

const PassportScreen = () => {
  return (
    <KeyboardView containerStyle={Settings.config.screen} extraOffset>
      <StatusBarDark/>
      <PassportForm/>
    </KeyboardView>
  );
};

export default PassportScreen;
