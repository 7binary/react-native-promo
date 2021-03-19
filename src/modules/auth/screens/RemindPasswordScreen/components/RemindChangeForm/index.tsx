import React from 'react';
import { View } from 'react-native';
import { Field, Formik } from 'formik';
import { Button } from 'react-native-paper';

import { ax, FormInput, ErrorMessage, Settings } from '@pmk-team/common';
import styles from './styles';
import validationSchema from './validationSchema';

export interface Props {
  phone: string;
  token: string;
  onSuccess: () => void;
}

const RemindChangeForm: React.FC<Props> = ({ phone, token, onSuccess }) => {
  return (
    <Formik
      initialValues={{ password: '', passwordConfirm: '' }}
      onSubmit={(values, actions) => {
        const { password, passwordConfirm } = values;
        const payload = { phone, token, password, passwordConfirm };
        ax({ actions }).post('api/remind', payload)
          .then(() => {
            actions.resetForm();
            onSuccess();
          }).catch(() => {});
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isValid, isSubmitting, status }) => (
        <View style={styles.container}>
          <Field
            component={FormInput}
            name="password"
            label="Пароль"
            iconName="ios-lock-closed-outline"
            secureTextEntry
            autoFocus
          />
          <Field
            component={FormInput}
            name="passwordConfirm"
            label="Повтор пароля"
            iconName="ios-lock-closed-outline"
            secureTextEntry
          />
          <ErrorMessage dot>{status}</ErrorMessage>
          <View>
            <Button
              mode="contained"
              onPress={handleSubmit}
              disabled={!isValid || isSubmitting}
              color={Settings.colors.primary}
              loading={isSubmitting}
            >Сохранить</Button>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default RemindChangeForm;
