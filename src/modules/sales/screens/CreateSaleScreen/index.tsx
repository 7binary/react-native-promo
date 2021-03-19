import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import { KeyboardView } from '@pmk-team/common';
import SaleForm from 'modules/sales/components/SaleForm';
import { Action, Sale } from 'modules/sales/store';
import styles from './styles';

const CreateSaleScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // @ts-ignore
  const { sale, action }: {sale: Sale, action: Action} = route.params;
  const onSuccess = () => navigation.navigate('SalesNav', {
    screen: 'SalesTabs',
    params: { screen: 'Sales' },
  });

  return (
    <KeyboardView containerStyle={styles.container}>
      <SaleForm sale={sale} action={action} onSuccess={onSuccess}/>
    </KeyboardView>
  );
};

export default CreateSaleScreen;
