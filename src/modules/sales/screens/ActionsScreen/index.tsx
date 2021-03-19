import React from 'react';
import { SafeAreaView, View, FlatList, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button, Card } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Settings,
  TextHtml,
  TextHeader,
  StatusBarDark,
  DropdownAlertService,
  ax,
} from '@pmk-team/common';
import { useActions, useSelector } from 'store';
import { Action } from 'modules/sales/store';
import { userSelector } from 'modules/profile/store';
import styles from './styles';

const ActionItem: React.FC<{action: Action}> = ({ action }) => {
  const navigation = useNavigation();
  const user = useSelector(userSelector);
  const sales = useSelector(state => state.sales.sales);

  return (
    <Card style={styles.item}>
      <TextHeader>{action.title}</TextHeader>
      <Card.Content style={styles.content}>
        <Text>{action.short_description}</Text>

        {action.description && action.description.length > 0 ?
          <View style={styles.description}>
            <TextHtml>{action.description}</TextHtml>
          </View>
          : null
        }

        {!action.is_confirmed ?
          <Button
            mode="contained"
            color={Settings.colors.primary}
            icon={({ color }) => <Ionicons name="ios-checkmark-circle" size={24} color={color}/>}
            onPress={() => {
              const payload = { profile_id: user?.profile_id, action_id: action.id };
              ax().post('actions/api/action/take-part', payload)
                .then(() => DropdownAlertService.alert('success', 'Участие принято'))
                .catch(error => DropdownAlertService.alert('error', error));
            }}
          >Принять участие</Button>
          : null
        }

        {action.is_confirmed && action.sale_ids.length === 0 ?
          <Button
            mode="contained"
            color={Settings.colors.primary}
            icon={({ color }) => <Ionicons name="ios-add-circle" size={24} color={color}/>}
            onPress={() => navigation.navigate('CreateSale', { action })}
          >
            {user?.role === 'rtt' ? 'Внести продажу' : 'Внести закупку'}
          </Button>
          : null
        }

        {action.is_confirmed && action.sale_ids.length > 0 ?
          <Button
            mode="contained"
            color={Settings.colors.primary}
            icon={({ color }) => <Ionicons name="ios-pencil" size={24} color={color}/>}
            onPress={() => {
              const sale = sales.find(sale => +sale.id === +action.sale_ids[0]);
              navigation.navigate('CreateSale', { sale, action });
            }}
          >
            {user?.role === 'rtt' ? 'Редактировать продажу' : 'Редактировать закупку'}
          </Button>
          : null
        }
      </Card.Content>
    </Card>
  );
};

const ActionsScreen = () => {
  const actions: Action[] = useSelector(state => state.sales.actions);
  const { getActions, getSales } = useActions();

  useFocusEffect(React.useCallback(() => {
    getActions();
    getSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []));

  return (
    <SafeAreaView style={{ ...Settings.config.screen, ...styles.container }}>
      <StatusBarDark/>
      <FlatList
        data={actions}
        renderItem={({ item }) => <ActionItem action={item}/>}
        keyExtractor={(item) => `action-${item.id}`}
      />
    </SafeAreaView>
  );
};

export default ActionsScreen;
