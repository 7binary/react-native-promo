import React from 'react';
import { Text, SafeAreaView, ScrollView, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';

import { TextHeader, StatusBarDark, TextEmpty } from '@pmk-team/common';
import { useActions, useSelector } from 'store';
import { Transaction, userSelector } from 'modules/profile/store';
import styles from './styles';

const TransactionItem: React.FC<{item: Transaction}> = ({ item }) => {
  const isIncome = item.type === 'in' || item.type === 'out' && item.amount < 0;
  return (
    <View style={styles.transaction}>
      <View style={styles.transactionColumn}>
        <Text style={isIncome ? styles.transactionIn : styles.transactionOut}>
          {isIncome ? '+' : '-'} {Math.abs(item.amount)}
        </Text>
        <Text style={styles.transactionCreated}>{item.created_at.substring(0, 16)}</Text>
      </View>
      <Text style={styles.transactionTitle}>{item.title}</Text>
    </View>
  );
};

const BalanceScreen = () => {
  const { getTransactions } = useActions();
  const user = useSelector(userSelector);
  const transactions = useSelector(state => state.profile.transactions);

  useFocusEffect(React.useCallback(() => {
    getTransactions();
  }, [getTransactions]));

  return (
    <SafeAreaView>
      <StatusBarDark/>
      <ScrollView>
        <View style={styles.balanceContainer}>
          <Ionicons name="md-wallet" style={styles.balanceIcon}/>
          <Text style={styles.balanceBonuses}>{user?.balance}</Text>
          <Text>баллов</Text>
        </View>
        <View>
          <TextHeader>Движение баллов</TextHeader>
          {transactions.map((item) => <TransactionItem item={item} key={`t-${item.id}`}/>)}
        </View>
        <TextEmpty length={transactions.length}/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BalanceScreen;
