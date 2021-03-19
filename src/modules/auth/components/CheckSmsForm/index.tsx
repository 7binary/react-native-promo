import React from 'react';
import { View } from 'react-native';
import { Field, Formik } from 'formik';
import { Button } from 'react-native-paper';

import { Settings, FormInput, ErrorMessage, ax } from '@pmk-team/common';
import validationSchema from './validationSchema';
import styles from './styles';

interface Props {
  phone: string | null | undefined;
  onSuccess: Function;
  type: string;
  register?: boolean;
}

const CheckSmsForm: React.FC<Props> = ({ phone, onSuccess, type, register }) => {
  return (
    <Formik
      initialValues={{ code: '' }}
      onSubmit={(values, actions) => {
        const payload = { phone, type, code: values.code };
        const url = register ? 'api/token/check-sms?register=1' : 'api/token/check-sms';
        ax({ actions }).post<{token: string}>(url, payload)
          .then(res => {
            actions.resetForm();
            onSuccess(res.data.token);
          }).catch(() => {});
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isValid, isSubmitting, status }) => (
        <View style={styles.container}>
          <Field
            component={FormInput}
            name="code"
            label="Код из СМС"
            iconName="ios-medical"
            keyboardType="numeric"
            returnKeyType="done"
            autoFocus
          />
          <ErrorMessage dot>{status}</ErrorMessage>
          <View>
            <Button
              mode="contained"
              onPress={handleSubmit}
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
              color={Settings.colors.primary}
            >Проверить код</Button>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default CheckSmsForm;
