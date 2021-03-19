import React from 'react';
import { Text, SafeAreaView } from 'react-native';

import styles from './styles';
import { Settings, StatusBarDark } from '@pmk-team/common';

const SettingsScreen = () => {
  return (
    <SafeAreaView style={{...Settings.config.screen, ...styles.container}}>
      <StatusBarDark/>
      <Text>SettingsScreen</Text>
    </SafeAreaView>
  );
};

export default SettingsScreen;
