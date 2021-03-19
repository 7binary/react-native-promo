import React from 'react';
import { View } from 'react-native';
import { Field, Formik } from 'formik';
import { Button } from 'react-native-paper';

import { FormInput, ErrorMessage, Settings, ax } from '@pmk-team/common';
import { useActions } from 'store';

const LoginForm = () => {
  const { login } = useActions();

  return (
    <Formik
      initialValues={{ login: '', password: '' }}
      onSubmit={(values, actions) => {
        login({
          client: ax({ actions }),
          values,
          onSuccess: () => actions.resetForm(),
        });
      }}
    >
      {({ handleSubmit, isValid, isSubmitting, status }) => (
        <>
          <Field
            component={FormInput}
            name="login"
            label="Номер телефона"
            iconName="ios-call-outline"
            keyboardType="numeric"
            returnKeyType="done"
            phone
          />
          <Field
            component={FormInput}
            name="password"
            label="Пароль"
            iconName="ios-lock-closed-outline"
            secureTextEntry
          />
          <ErrorMessage dot>{status}</ErrorMessage>
          <View>
            <Button
              mode="contained"
              onPress={handleSubmit}
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
              color={Settings.colors.primary}
            >Войти</Button>
          </View>
        </>
      )}
    </Formik>
  );
};

export default LoginForm;
