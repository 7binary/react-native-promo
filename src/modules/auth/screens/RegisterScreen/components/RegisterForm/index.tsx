import React from 'react';
import { View } from 'react-native';
import { Field, Formik } from 'formik';
import { Button } from 'react-native-paper';

import {
  FormInput,
  ErrorMessage,
  ax,
  DropdownAlertService,
  Settings,
  PageCheckbox,
  Page,
} from '@pmk-team/common';
import { useActions } from 'store';
import { User } from 'modules/profile/store';
import validationSchema from './validationSchema';
import styles from './styles';
import { LoginResponse } from '../../../../store';

interface Props {
  phone: string | null | undefined;
  token: string | null;
  onSuccess: Function;
  pagePers?: Page;
  pageRules?: Page;
  profileInfo: User;
}

const RegisterForm: React.FC<Props> = ({
  phone, token, onSuccess, pageRules, pagePers, profileInfo,
}) => {
  const { userLogin } = useActions();

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          last_name: profileInfo ? profileInfo.last_name : '',
          first_name: profileInfo ? profileInfo.first_name : '',
          middle_name: profileInfo ? profileInfo.middle_name : '',
          email: profileInfo ? profileInfo.email : '',
          birthday_on_local: '',
          password: '',
          passwordConfirm: '',
          checkedRules: false,
          checkedPers: false,
        }}
        onSubmit={(values, actions) => {
          const payload = { ...values, token, phone };
          ax({ actions }).post<LoginResponse>('profiles/api/register', payload)
            .then(res => {
              userLogin(res.data);
              actions.resetForm();
              onSuccess();
            }).catch(() => DropdownAlertService.alert('error', 'Ошибка регистрации'));
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isValid, isSubmitting, status, setFieldValue }) => (
          <>
            <Field
              component={FormInput}
              name="last_name"
              label="Фамилия"
              iconName="ios-person-circle-outline"
            />
            <Field
              component={FormInput}
              name="first_name"
              label="Имя"
              iconName="ios-person-circle-outline"
            />
            <Field
              component={FormInput}
              name="middle_name"
              label="Отчество"
              iconName="ios-person-circle-outline"
            />
            <Field
              component={FormInput}
              name="email"
              label="E-mail адрес"
              iconName="ios-mail-outline"
            />
            <Field
              component={FormInput}
              name="birthday_on_local"
              label="Дата рождения"
              placeholder="дд.мм.гггг"
              iconName="ios-calendar-outline"
              mask="99.99.9999"
              datepicker
            />
            <Field
              component={FormInput}
              name="password"
              label="Пароль"
              iconName="ios-lock-closed-outline"
              secureTextEntry
            />
            <Field
              component={FormInput}
              name="passwordConfirm"
              label="Повтор пароля"
              iconName="ios-lock-closed-outline"
              secureTextEntry
            />
            <PageCheckbox
              accepted={() => setFieldValue('checkedRules', true)}
              declined={() => setFieldValue('checkedRules', false)}
              page={pageRules}
              textIntro="Согласен с"
              textLink="правилами акции"
            />
            <PageCheckbox
              accepted={() => setFieldValue('checkedPers', true)}
              declined={() => setFieldValue('checkedPers', false)}
              page={pagePers}
              textIntro="Согласие на"
              textLink="обработку персональных данных"
            />

            <ErrorMessage dot>{status}</ErrorMessage>
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={handleSubmit}
                disabled={!isValid || isSubmitting}
                color={Settings.colors.primary}
                loading={isSubmitting}
              >Отправить</Button>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default RegisterForm;
