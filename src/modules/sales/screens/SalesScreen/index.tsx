import React from 'react';
import { SafeAreaView, View, FlatList, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, List } from 'react-native-paper';

import { Settings, StatusBarDark, TextHeader, cents } from '@pmk-team/common';
import { useActions, useSelector } from 'store';
import { Sale } from 'modules/sales/store';
import SaleStatus from 'modules/sales/components/SaleStatus';
import SaleComments from 'modules/sales/components/SaleComments';
import styles from './styles';

const SaleItem: React.FC<{sale: Sale}> = ({ sale }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.item}>
      <TextHeader>{sale?.action.title}</TextHeader>
      {sale ? <SaleStatus sale={sale}/> : null}
      {sale.positions.map(position => (
        <View style={styles.position} key={`pos-${position.product_id}`}>
          <View style={styles.productHeader}>
            <Ionicons name="ios-bandage" style={styles.productIcon}/>
            <Text style={styles.productName}>
              {position?.product?.shortName
                ? position?.product?.shortName
                : position?.product?.name
              }
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text style={styles.summaryLabel}>
                Количество:
              </Text>
              <Text style={styles.summary}>
                {position.quantity}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.summaryLabel}>
                Стоимость, руб:
              </Text>
              <Text style={styles.summary}>
                {cents(position.quantity * position?.product?.price)}
              </Text>
            </View>
          </View>
        </View>
      ))}

      <View style={{ ...styles.row, ...styles.rowBonuses }}>
        <View style={styles.row}>
          <Text style={styles.summaryLabel}>
            Итого:
          </Text>
          <Text style={styles.summary}>
            {sale.positions.reduce((prev, curr) => prev + curr.quantity, 0)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.summaryLabel}>
            Начислено бонусов:
          </Text>
          <Text style={styles.summary}>
            {sale.bonuses}
          </Text>
        </View>
      </View>

      <View style={styles.info}>
        {sale?.action.is_actual ?
          <Button
            mode="contained"
            color={Settings.colors.primary}
            icon={({ color }) => <Ionicons name="ios-pencil" size={24} color={color}/>}
            onPress={() => {
              navigation.navigate('CreateSale', { sale, action: sale.action });
            }}
          >
            Редактировать
          </Button>
          : null
        }
        <List.Accordion title={`История (${sale.history.length})`} titleStyle={styles.historyTitle}>
          <SaleComments sale={sale} withTitle={false}/>
        </List.Accordion>
      </View>
    </View>
  );
};

const SalesScreen = () => {
  const sales = useSelector(state => state.sales.sales);
  const { getSales } = useActions();

  useFocusEffect(React.useCallback(() => {
    getSales();
  }, [getSales]));

  return (
    <SafeAreaView style={{ ...Settings.config.screen, ...styles.container }}>
      <StatusBarDark/>
      <FlatList
        data={sales}
        renderItem={({ item }) => <SaleItem sale={item}/>}
        keyExtractor={(item) => `sale-${item.id}`}
      />
    </SafeAreaView>
  );
};

export default SalesScreen;
