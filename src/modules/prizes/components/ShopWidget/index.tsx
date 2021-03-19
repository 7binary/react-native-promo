import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import { ShopProduct } from 'modules/prizes/store';
import { useActions, useSelector } from 'store';
import { TextHeader } from '@pmk-team/common';
import styles from './styles';

const ShopProductItem: React.FC<{item: ShopProduct}> = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.product}
      onPress={() => navigation.navigate('ShopProduct', { product: item })}>
      <FastImage
        source={{ uri: item.picture_url }}
        style={styles.productImage}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
};

const ShopWidget = () => {
  const { getShopProducts } = useActions();
  const shopProducts = useSelector(state => state.prizes.shopProducts);

  useFocusEffect(React.useCallback(() => {
    getShopProducts();
  }, [getShopProducts]));

  if (!shopProducts || shopProducts.length === 0) {return null;}

  return (
    <View style={styles.container}>
      <TextHeader>Товары</TextHeader>
      <View style={styles.products}>
        {shopProducts.map((product) => <ShopProductItem item={product} key={`p-${product.id}`}/>)}
      </View>
    </View>
  );
};

export default ShopWidget;
