import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import { Settings } from '@pmk-team/common';

interface Props {
  phone: string | null | undefined,
  onReset: Function,
}

const ResetPhone: React.FC<Props> = ({ phone, onReset }) => {
  if (!phone) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text>{phone}</Text>
      <Ionicons
        style={styles.icon}
        name="ios-backspace"
        size={26}
        color={Settings.colors.formIcon}
        onPress={() => onReset()}
      />
    </View>
  );
};

export default ResetPhone;
