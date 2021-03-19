import React from 'react';
import { View } from 'react-native';
import { Field, Formik } from 'formik';
import { Button } from 'react-native-paper';

import { Settings, FormInput, ErrorMessage, ax } from '@pmk-team/common';
import validationSchema from './validationSchema';
import styles from './styles';

interface Props {
  onSuccess: (phone: string) => void;
  type: string;
  register?: boolean;
}

const GetSmsForm: React.FC<Props> = ({ onSuccess, type, register }) => {
  return (
    <Formik
      initialValues={{ phone: '' }}
      onSubmit={(values, actions) => {
        const payload = { phone: values.phone, type };
        const url = register ? 'api/token/get-sms?register=1' : 'api/token/get-sms';
        ax({ actions }).post(url, payload)
          .then(() => {
            actions.resetForm();
            onSuccess(values.phone);
          }).catch(() => {});
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isValid, isSubmitting, status }) => (
        <View style={styles.container}>
          <Field
            component={FormInput}
            name="phone"
            label="Номер телефона"
            placeholder="+7 ("
            keyboardType="numeric"
            returnKeyType="done"
            iconName="ios-call-outline"
            autoFocus
            phone
          />
          <ErrorMessage dot>{status}</ErrorMessage>
          <View>
            <Button
              mode="contained"
              onPress={handleSubmit}
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
              color={Settings.colors.primary}
            >Отправить код</Button>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default GetSmsForm;
