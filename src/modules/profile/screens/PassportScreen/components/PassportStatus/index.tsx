import React from 'react';
import { Text, View } from 'react-native';

import { Passport } from 'modules/profile/store';
import styles from './styles';

const PassportStatus: React.FC<{passport?: Passport | null}> = ({ passport }) => {
  if (!passport) {
    return null;
  }

  let backgroundColor = '#DDD';
  let color = '#333';
  let statusText = passport?.status_label;

  switch (passport?.status) {
    case 'new':
      statusText = 'Ожидает проверки';
      break;
    case 'declined':
      backgroundColor = 'maroon';
      color = 'white';
      break;
    case 'redo':
      backgroundColor = 'orange';
      color = 'white';
      break;
    case 'approved':
      backgroundColor = 'green';
      color = 'white';
      break;
  }

  return (
    <View style={styles.container}>
      <View style={styles.introBox}>
        <Text style={styles.introText}>
          Для заказа подарка или перевода необходимо заполнить все поля и дождаться подтверждения
          анкеты модератором.
          Это нужно, чтобы мы заплатили за Вас налог на доходы физических лиц в соответствии с
          законодательством
          Российской Федерации.
        </Text>
      </View>

      {statusText ? (
        <Text style={{ ...styles.status, backgroundColor, color }}>
          Налоговая анкета: {statusText}
        </Text>
      ) : null}
    </View>
  );
};

export default PassportStatus;
