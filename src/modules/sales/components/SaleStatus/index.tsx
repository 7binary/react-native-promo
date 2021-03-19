import React from 'react';
import { Text, View } from 'react-native';

import { Sale } from 'modules/sales/store';
import styles from './styles';

const SaleStatus: React.FC<{sale: Sale}> = ({ sale }) => {
  let backgroundColor = '#DDD';
  let color = '#333';
  let statusText = sale.status_label;

  switch (sale.status) {
    case 'draft':
    case 'adminReview':
      break;
    case 'declined':
      backgroundColor = 'orange';
      color = 'white';
      break;
    case 'approved':
      backgroundColor = 'skyblue';
      break;
    case 'paid':
      backgroundColor = 'green';
      color = 'white';
      break;
  }

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.status, backgroundColor, color }}>
        Статус: {statusText}
      </Text>
    </View>
  );
};

export default SaleStatus;
