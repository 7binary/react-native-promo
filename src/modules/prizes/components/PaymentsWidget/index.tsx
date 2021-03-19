import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button } from 'react-native-paper';
import { Field, Formik, useFormikContext } from 'formik';
import { useFocusEffect } from '@react-navigation/native';

import {
  Settings,
  FormInput,
  ErrorMessage,
  FormCheckbox,
  DropdownAlertService,
  TextHeader,
  ax,
} from '@pmk-team/common';
import { PaymentCommissionResponse, PaymentSettings, PaymentType } from 'modules/prizes/store';
import { useActions, useSelector } from 'store';
import CheckPassportWidget from 'modules/prizes/components/CheckPassportWidget';
import styles from './styles';
import { profileIdSelector } from 'modules/auth/store';

interface IPaymentSetting {
  setting: PaymentSettings | undefined;
  type: PaymentType | undefined;
  setType: any;
  logoSource: any;
  isActive: boolean;
}

const PaymentSetting: React.FC<IPaymentSetting> = ({ setting, setType, type, logoSource, isActive }) => {
  if (!setting || !setting.enabled) {
    return null;
  }

  const borderColor = isActive ? Settings.colors.primary : '#CCC';
  const color = isActive ? Settings.colors.primary : '#666';

  return (
    <TouchableOpacity
      style={{ ...styles.selectPayment, borderColor }}
      onPress={() => setType(setting.type === type ? undefined : setting.type)}
    >
      <View style={styles.selectLogoBox}>
        <FastImage
          source={logoSource}
          style={styles.selectLogo}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <Text style={{ ...styles.selectTitle, color }}>{setting.title}</Text>
    </TouchableOpacity>
  );
};

const PaymentCommission: React.FC<{type: PaymentType}> = ({ type }) => {
  const { values }: any = useFormikContext();
  const [taxMessage, setTaxMessage] = useState<string | null>(null);

  useEffect(() => {
    const amount = parseInt(values.amount, 10);
    if (type && amount) {
      ax().post<PaymentCommissionResponse>('payments/api-v3/payments/calculate', { type, amount })
        .then(response => {
          const { totalAmount, message } = response.data;
          if (amount === totalAmount) {
            setTaxMessage(null);
          } else {
            setTaxMessage(`Стоимость: ${totalAmount} (${message})`);
          }
        }).catch(() => setTaxMessage(null));
    }
  }, [values, type]);

  if (!taxMessage) {
    return null;
  }

  return <Text style={styles.tax}>{taxMessage}</Text>;
};

const PaymentsWidget = () => {
  const { getPayments, getPaymentSettings, getProfile } = useActions();
  const profile_id = useSelector(profileIdSelector);
  const [type, setType] = useState<PaymentType | undefined>();
  const settings = useSelector(state => state.prizes.paymentSettings);
  const setting = settings.find(s => s.type === type);
  const showAgreement = setting && setting.additional_agreement
    && setting.additional_agreement_label && setting.additional_agreement_label.length > 0;

  useFocusEffect(React.useCallback(() => {
    getPaymentSettings();
  }, [getPaymentSettings]));

  if (!settings || settings.length === 0) {
    return null;
  }

  const initialValues = {
    amount: '',
    phone: '',
    card: '',
    number: '',
    rbs: '',
    additional_agreement: false,
  };

  return (
    <View>
      <TextHeader>Пополнить</TextHeader>
      <View style={styles.selectContainer}>
        <PaymentSetting
          isActive={type === 'phone'}
          setting={settings.find(s => s.type === 'phone')}
          logoSource={require('assets/images/payment-phone.png')}
          setType={setType} type={type}
        />
        <PaymentSetting
          isActive={type === 'yandex'}
          setting={settings.find(s => s.type === 'yandex')}
          logoSource={require('assets/images/payment-yandex.png')}
          setType={setType} type={type}
        />
        <PaymentSetting
          isActive={type === 'qiwi'}
          setting={settings.find(s => s.type === 'qiwi')}
          logoSource={require('assets/images/payment-qiwi.png')}
          setType={setType} type={type}
        />
        <PaymentSetting
          isActive={type === 'webmoney'}
          setting={settings.find(s => s.type === 'webmoney')}
          logoSource={require('assets/images/payment-webmoney.png')}
          setType={setType} type={type}
        />
        <PaymentSetting
          isActive={type === 'card'}
          setting={settings.find(s => s.type === 'card')}
          logoSource={require('assets/images/payment-card.png')}
          setType={setType} type={type}
        />
        <PaymentSetting
          isActive={type === 'rbs'}
          setting={settings.find(s => s.type === 'rbs')}
          logoSource={require('assets/images/payment-rbs.png')}
          setType={setType} type={type}
        />

        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            if (!type) {return;}
            let number: string = values.number;
            if (type === 'card') {
              number = values.card;
            } else if (['phone', 'qiwi'].indexOf(type) !== -1) {
              number = values.phone;
            }
            const payload: any = {
              profile_id,
              type,
              additional_agreement: values.additional_agreement,
              amount: parseInt(values.amount, 10),
              parameters: {
                phone_mobile_local: number,
                phone_mobile: number.replace(/[^0-9\\+]/g, ''),
              },
            };
            ax({ actions }).post('payments/api-v3/payments/create', payload)
              .then(() => {
                DropdownAlertService.alert('success', 'Перевод принят в обработку');
                getProfile();
                getPayments();
                actions.resetForm();
                setType(undefined);
              })
              .catch(() => DropdownAlertService.alert('error', 'Ошибка при пополнении'));
          }}
        >
          {({ handleSubmit, isValid, isSubmitting, status, setFieldValue, values }) => (
            <>
              {type && <View style={styles.form}>
                <View style={styles.formRow}>
                  <View style={styles.formColumnFirst}>
                    <Field
                      component={FormInput}
                      name="amount"
                      label="Сумма"
                      keyboardType="numeric"
                      returnKeyType="done"
                    />
                  </View>
                  <View style={styles.formColumnLast}>

                    {['phone', 'qiwi'].indexOf(type) !== -1 &&
                    <Field
                      component={FormInput}
                      name="phone"
                      label="Номер телефона"
                      placeholder="+7 ("
                      keyboardType="numeric"
                      returnKeyType="done"
                      phone
                    />}

                    {['yandex', 'webmoney'].indexOf(type) !== -1 &&
                    <Field
                      component={FormInput}
                      name="number"
                      label="Номер счета"
                    />}

                    {type === 'rbs' &&
                    <Field
                      component={FormInput}
                      name="rbs"
                      keyboardType="numeric"
                      returnKeyType="done"
                      label="Номер расчетного счета"
                      mask="99999999999999999999"
                    />}

                    {type === 'card' &&
                    <Field
                      component={FormInput}
                      name="card"
                      label="Номер карты"
                      keyboardType="numeric"
                      returnKeyType="done"
                      mask="9999 9999 9999 999999"
                    />}
                  </View>
                </View>

                <CheckPassportWidget>
                  <View style={styles.buttonBox}>
                    {showAgreement ? (
                      <Field
                        component={FormCheckbox}
                        name="additional_agreement"
                        label={setting?.additional_agreement_label}
                        handlePress={() => {
                          setFieldValue('additional_agreement', !values.additional_agreement);
                        }}
                      />
                    ) : null}
                    <ErrorMessage dot>{status}</ErrorMessage>
                    <Button
                      mode="contained"
                      onPress={handleSubmit}
                      disabled={!isValid || isSubmitting}
                      loading={isSubmitting}
                      color={Settings.colors.primary}
                    >Пополнить</Button>
                  </View>
                </CheckPassportWidget>

                <PaymentCommission type={type}/>
              </View>
              }
            </>
          )}
        </Formik>

      </View>
    </View>
  );
};

export default PaymentsWidget;
