import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import { CatalogCard } from 'modules/prizes/store';
import { useActions, useSelector } from 'store';
import styles from './styles';

const CardItem: React.FC<{item: CatalogCard}> = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Card', { card: item })}
    >
      <FastImage
        source={{ uri: item.image }}
        style={styles.cardImage}
        resizeMode={FastImage.resizeMode.stretch}
      />
    </TouchableOpacity>
  );
};

const CardsWidget = () => {
  const { getCatalogCards } = useActions();
  const cards = useSelector(state => state.prizes.catalogCards);

  useFocusEffect(React.useCallback(() => {
    getCatalogCards();
  }, [getCatalogCards]));

  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <View>
      <View style={styles.cards}>
        {cards.map((card: CatalogCard) => <CardItem item={card} key={card.id}/>)}
      </View>
    </View>
  );
};

export default CardsWidget;
