import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Button, List, TextInput } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import { useActions } from 'store';
import { CartPositon, ShopProduct } from 'modules/prizes/store';
import { Settings, StatusBarDark, TextHtml, DropdownAlertService } from '@pmk-team/common';
import styles from './styles';

const ShopProductScreen = () => {
  const route = useRoute();
  const { addToCart } = useActions();
  const navigation = useNavigation();
  const [qty, setQty] = useState<string>('1');
  // @ts-ignore
  const { product }: ShopProduct = route.params;
  if (!product) {
    return null;
  }

  const addToCartPressed = () => {
    const quantity = parseInt(qty);
    if (!quantity || quantity < 0) {
      DropdownAlertService.alert('warn', 'Укажите количество');
    } else {
      const payload: CartPositon = {
        product,
        nominal: product.price,
        qty: quantity,
      };
      addToCart(payload);
      setQty('');
      navigation.navigate('Cart');
      DropdownAlertService.alert('success', 'Добавлено в корзину');
    }
  };

  return (
    <SafeAreaView style={{ ...Settings.config.screen, ...styles.container }}>
      <StatusBarDark/>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.card}>
          <FastImage
            source={{ uri: product.picture_url }}
            style={styles.cardImage}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>

        <List.Accordion title={product.name} titleNumberOfLines={2} titleStyle={styles.title}>
          <View style={styles.description}>
            <TextHtml>{product.description}</TextHtml>
          </View>
        </List.Accordion>

        <View style={styles.qtyContainer}>
          <TextInput
            keyboardType="numeric"
            returnKeyType="done"
            style={styles.qtyInput}
            mode="flat"
            label="Количество"
            value={qty}
            onChangeText={(value: string) => setQty(value)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={addToCartPressed}
            style={styles.button}
            color={Settings.colors.primary}
          >В КОРЗИНУ</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShopProductScreen;
