import React from 'react';
import { View } from 'react-native';
import { Field, Formik } from 'formik';
import { Button } from 'react-native-paper';

import { Settings, FormInput, ErrorMessage, ax } from '@pmk-team/common';
import { useActions, useSelector } from 'store';
import { User, userSelector } from 'modules/profile/store';
import validationSchema from './validationSchema';
import styles from './styles';

interface Props {
  onSuccess?: Function;
}

const ProfileForm: React.FC<Props> = ({ onSuccess }) => {
  const { setUser } = useActions();
  const user = useSelector(userSelector);
  if (!user) {
    return null;
  }
  const { profile_id } = user;

  return (
    <Formik
      initialValues={{
        last_name: user.last_name,
        first_name: user.first_name,
        middle_name: user.middle_name,
        email: user.email,
      }}
      onSubmit={(values, actions) => {
        const payload: Partial<User> = { profile_id, ...values };
        ax({ actions }).post<{profile: User}>('profiles/api/auth/profile-edit', payload)
          .then(response => {
            setUser(response.data.profile);
            if (typeof onSuccess === 'function') {
              onSuccess();
            }
          })
          .catch(() => {});
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isValid, isSubmitting, status }) => (
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

          <ErrorMessage dot>{status}</ErrorMessage>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSubmit}
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
              color={Settings.colors.primary}
            >Сохранить</Button>
          </View>
        </>
      )}
    </Formik>
  );
};

export default ProfileForm;
