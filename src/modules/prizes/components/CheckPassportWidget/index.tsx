import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import { useSelector } from 'store';
import { Settings } from '@pmk-team/common';
import { userSelector } from 'modules/profile/store';

const CheckPassportWidget: React.FC<{children: any}> = ({ children }) => {
  const navigation = useNavigation();
  const user = useSelector(userSelector);
  const status = user?.account?.status;

  if (status === 'approved') {
    return children;
  }

  let color: string = Settings.colors.warning;
  let label: string = 'Налоговая анкета на проверке';

  if (!user?.account) {
    label = 'Чтобы потратить баллы необходимо заполнить Анкету НДФЛ и дождаться подтверждения анкеты модератором сайта';
  } else if (status === 'redo') {
    label = 'Налоговая анкета требует доработки';
  } else if (status === 'declined') {
    label = 'Налоговая анкета отклонена администратором';
    color = Settings.colors.danger;
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Passport')}>
      <View style={styles.container}>
        <View style={styles.contentBlock}>
          <Text style={{ ...styles.content, color }}>
            {label}
          </Text>
        </View>
        <View style={styles.iconBlock}>
          <Ionicons name="ios-arrow-forward" style={{ ...styles.icon, color }}/>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CheckPassportWidget;
