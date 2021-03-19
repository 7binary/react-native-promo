import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { CartPositon } from 'modules/prizes/store';
import { useActions } from 'store';
import styles from './styles';

const CartPositionItem: React.FC<{cartPosition: CartPositon}> = ({ cartPosition }) => {
  const { changeCartQty } = useActions();
  const navigation = useNavigation();
  const { card, product } = cartPosition;
  const imageUrl = card ? card.image : product?.picture_url;
  const title = card ? card.title : product?.name;
  const navigateToPosition = () => card
    ? navigation.navigate('Card', { card: cartPosition.card })
    : navigation.navigate('ShopProduct', { product: cartPosition.product });
  const positionSummary: number = cartPosition.cardNominal ?
    cartPosition.cardNominal.price * cartPosition.qty
    : cartPosition.nominal * cartPosition.qty;
  let cardNom = cartPosition.cardNominal;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.row}>
        <TouchableOpacity onPress={navigateToPosition} style={styles.imageBox}>
          <FastImage
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>

        <View style={styles.info}>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text style={styles.nominal}>{cartPosition.nominal}</Text>
            </View>
            <TouchableOpacity
              onPress={() => changeCartQty({ position: cartPosition, qty: -cartPosition.qty })}>
              <Ionicons name="ios-close" style={styles.remove}/>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Количество</Text>
              <View style={styles.controls}>
                <TouchableOpacity
                  onPress={() => changeCartQty({ position: cartPosition, qty: -1 })}>
                  <Ionicons name="ios-remove" style={styles.minusPlus}/>
                </TouchableOpacity>
                <Text style={styles.qty}>{cartPosition.qty}</Text>
                <TouchableOpacity
                  onPress={() => changeCartQty({ position: cartPosition, qty: 1 })}>
                  <Ionicons name="ios-add" style={styles.minusPlus}/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.columnRight}>
              <Text style={styles.label}>Итого</Text>
              <Text style={styles.summary}>{positionSummary}</Text>
            </View>
          </View>
        </View>
      </View>

      {cardNom && cardNom.price !== cardNom.nominal ? (
        <Text style={styles.taxText}>
          ({cardNom.nominal * cartPosition.qty} + {cardNom.taxText})
        </Text>
      ) : null}
    </View>
  );
};

export default CartPositionItem;
