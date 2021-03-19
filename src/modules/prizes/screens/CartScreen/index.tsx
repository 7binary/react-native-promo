import React from 'react';
import { SafeAreaView, View, ScrollView, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { StatusBarDark } from '@pmk-team/common';
import styles from './styles';
import { useSelector } from 'store';
import CartPositionItem from './components/CartPositionItem';
import CartOrderForm from './components/CartOrderForm';

const CartScreen = () => {
  const { user } = useSelector(state => state.profile);
  const { cart } = useSelector(state => state.prizes);
  const cartHasItems = cart.length > 0;
  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarDark/>
      <ScrollView>
        <View style={styles.positions}>
          {cart.positions.map((item) => {
            const key = item.product ? `p-${item.product.id}` : `${item.card?.type}-${item?.nominal}`;
            return <CartPositionItem cartPosition={item} key={key}/>;
          })}
        </View>

        <View style={styles.totalContainer}>
          <View style={styles.row}>
            <Ionicons name="md-wallet-outline" size={30}/>
            <View style={styles.totalInfo}>
              <Text style={styles.totalLabel}>Мой баланс</Text>
              <Text style={styles.totalValue}>{user?.balance}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Ionicons name="ios-gift-outline" size={30}/>
            <View style={styles.totalInfo}>
              <Text style={styles.totalLabel}>
                {cartHasItems ? 'Общая сумма' : 'Корзина пуста'}
              </Text>
              <Text style={styles.totalValue}>
                {cartHasItems ? cart.summary : 'Выберите из витрины'}
              </Text>
            </View>
          </View>
        </View>
        {cartHasItems ? <CartOrderForm/> : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;
