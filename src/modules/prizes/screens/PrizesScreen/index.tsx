import React from 'react';
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

import { StatusBarDark, LazyView } from '@pmk-team/common';
import { useActions, useSelector } from 'store';
import PrizesWidget from 'modules/prizes/components/PrizesWidget';
import { userSelector } from 'modules/profile/store';
import styles from './styles';

const PrizesScreen = () => {
  const { getCatalogOrders, getPayments, getProfile } = useActions();
  const navigation = useNavigation();
  const user = useSelector(userSelector);

  useFocusEffect(React.useCallback(() => {
    getProfile();
    getPayments();
    getCatalogOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []));

  return (
    <LazyView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={112}
        style={styles.container}
      >
        <StatusBarDark/>
        <ScrollView keyboardShouldPersistTaps="always" style={{ paddingBottom: 200 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('DashboardNav', { screen: 'Balance' })}
            style={styles.balanceContainer}
          >
            <Ionicons name="md-wallet" style={styles.balanceIcon}/>
            <Text style={styles.balanceBonuses}>{user && user.balance}</Text>
            <Text>баллов</Text>
          </TouchableOpacity>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <PrizesWidget/>
          </TouchableWithoutFeedback>

        </ScrollView>
      </KeyboardAvoidingView>
    </LazyView>
  );
};

export default PrizesScreen;
