import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { Field, Formik } from 'formik';

import { Settings, FormInput, ErrorMessage, DropdownAlertService, ax } from '@pmk-team/common';
import { useActions, useSelector } from 'store';
import { userSelector } from 'modules/profile/store';
import { cartSelector } from 'modules/prizes/store';
import validationSchema from './validationSchema';

const CartOrderForm = () => {
  const { resetCart, getCatalogOrders, getShopOrders, getProfile } = useActions();
  const user = useSelector(userSelector);
  const cart = useSelector(cartSelector);
  if (!user) {
    return null;
  }
  const profile_id = user.profile_id;
  const countProducts = cart.positions.filter(pos => pos.product).length;

  return (
    <Formik
      initialValues={{
        delivery_email: user.email,
        delivery_address: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        const cardPositions = cart.positions.filter(pos => pos.card);
        const productPositions = cart.positions.filter(pos => pos.product);
        const { delivery_email, delivery_address } = values;

        // отправка заказа сертификатов ЭПС
        if (cardPositions.length > 0) {
          const items = cardPositions.map(pos => ({
            card: pos.card?.type,
            nominal: pos.nominal,
            qty: pos.qty,
          }));
          const payload = {
            delivery_email,
            profile_id,
            items,
            is_allow_cancel: false,
          };
          ax({ actions }).post('catalog/api-v3/orders/create', payload)
            .then(() => {
              getProfile();
              getCatalogOrders();
              resetCart('card');
              DropdownAlertService.alert('success',
                'В течение 5 дней сертификаты придут на указанную почту');
            }).catch(() => {});
        }

        // отправка заказа товаров
        if (productPositions.length > 0) {
          const items = productPositions.map(pos => ({
            id: pos.product?.id,
            qty: pos.qty,
            size: '',
          }));
          const payload = {
            email: delivery_email,
            delivery_address,
            profile_id,
            items,
            phone_mobile: user.phone_mobile,
          };
          ax({ actions }).post('shop/api-v3/order/create', payload)
            .then(() => {
              getProfile();
              getShopOrders();
              resetCart('product');
              DropdownAlertService.alert('info', 'Заказ принят в обработку');
            }).catch(() => {});
        }
      }}
    >
      {({ handleSubmit, isValid, isSubmitting, status }) => (
        <View style={{ paddingHorizontal: 20 }}>
          <Field
            component={FormInput}
            name="delivery_email"
            label="E-mail адрес для доставки сертификата"
            iconName="ios-mail-outline"
          />
          {countProducts > 0 && <Field
            component={FormInput}
            name="delivery_address"
            label="Адрес для доставки товара"
            iconName="ios-locate"
          />}
          <ErrorMessage dot>{status}</ErrorMessage>
          <View>
            <Button
              mode="contained"
              onPress={handleSubmit}
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
              color={Settings.colors.primary}
            >Заказать</Button>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default CartOrderForm;
