import React, { useState } from 'react';
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import { Button, List, TextInput } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import { useActions } from 'store';
import { CardNominal, CartPositon, CatalogCard } from 'modules/prizes/store';
import {
  Settings,
  TextHtml,
  DropdownAlertService,
  StatusBarDark,
  KeyboardView,
} from '@pmk-team/common';
import styles from './styles';

interface NominalInterface {
  nominal: CardNominal;
  selectedNominal: CardNominal | null;
  onChange: (nominal: CardNominal) => void;
}

const Nominal: React.FC<NominalInterface> = ({ nominal, selectedNominal, onChange }) => {
  return (
    <Button
      mode={nominal.nominal === selectedNominal?.nominal ? 'contained' : 'outlined'}
      onPress={() => onChange(nominal)}
      style={styles.nominal}
    >{nominal.nominal}</Button>
  );
};

const CardScreen = () => {
  const route = useRoute();
  const { addToCart } = useActions();
  const navigation = useNavigation();
  const [selectedNominal, setSelectedNominal] = useState<CardNominal | null>(null);
  const [qty, setQty] = useState<string>('1');
  // @ts-ignore
  const { card }: CatalogCard = route.params;
  if (!card) {
    return null;
  }

  const addToCartPressed = () => {
    const quantity = parseInt(qty, 10);
    if (!selectedNominal) {
      DropdownAlertService.alert('warn', 'Выберите номинал карты');
    } else if (!quantity || quantity < 0) {
      DropdownAlertService.alert('warn', 'Укажите количество карт');
    } else {
      const payload: CartPositon = {
        card: card,
        cardNominal: selectedNominal,
        nominal: selectedNominal.nominal,
        qty: quantity,
      };
      addToCart(payload);
      setSelectedNominal(null);
      setQty('');
      navigation.navigate('Cart');
      DropdownAlertService.alert('success', 'Добавлено в корзину');
    }
  };

  return (
    <KeyboardView containerStyle={{ ...Settings.config.screen, ...styles.container }}>
      <StatusBarDark/>
      <ScrollView keyboardShouldPersistTaps="always">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.card}>
              <FastImage
                source={{ uri: card.image }}
                style={styles.cardImage}
                resizeMode={FastImage.resizeMode.stretch}
              />
            </View>

            <List.Accordion title={card.name} titleNumberOfLines={3} titleStyle={styles.title}>
              <View style={styles.description}>
                <TextHtml>{card.description}</TextHtml>
              </View>
            </List.Accordion>

            <View style={styles.nominalsContainer}>
              {card.nominals_text.map((nominal: CardNominal) =>
                <Nominal
                  key={nominal.nominal}
                  nominal={nominal}
                  selectedNominal={selectedNominal}
                  onChange={setSelectedNominal}
                />,
              )}
            </View>

            <View style={styles.qtyContainer}>
              <TextInput
                keyboardType="numeric"
                returnKeyType="done"
                style={styles.qtyInput}
                mode="flat"
                label="Количество карт"
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

            {selectedNominal && selectedNominal.nominal !== selectedNominal.price && qty ? (
              <Text style={styles.tax}>
                Стоимость: {selectedNominal.price * parseInt(qty, 10)} ({selectedNominal.taxText})
              </Text>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardView>
  );
};

export default CardScreen;
