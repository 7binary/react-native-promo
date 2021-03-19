import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useSelector } from 'store';
import { Settings } from '@pmk-team/common';
import { userSelector } from 'modules/profile/store';
import styles from './styles';

const CheckBlockedWidget: React.FC<{children: any}> = ({ children }) => {
  const navigation = useNavigation();
  const user = useSelector(userSelector);

  if (!user?.blocked_at) {
    return children;
  }

  const color = Settings.colors.primary;
  const gotoHelp = () => navigation.navigate('TicketsNav');

  return (
    <TouchableOpacity onPress={gotoHelp}>
      <View style={styles.container}>
        <View style={styles.contentBlock}>
          <Text style={{ ...styles.content, color }}>
            Учетная запись заблокирована.
          </Text>
          <Text>
            {user?.blocked_reason}
          </Text>
        </View>
        <View style={styles.iconBlock}>
          <Ionicons name="ios-arrow-forward" style={{ ...styles.icon, color }}/>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CheckBlockedWidget;
