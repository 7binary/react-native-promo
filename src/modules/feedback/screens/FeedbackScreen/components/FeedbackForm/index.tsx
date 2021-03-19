import React, { useState } from 'react';
import { Alert, Keyboard, View } from 'react-native';
import { Field, Formik } from 'formik';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Settings,
  FormInput,
  ErrorMessage,
  FileInput,
  UploadFile,
  DropdownAlertService,
  TextHeader,
  ax,
} from '@pmk-team/common';
import { useSelector } from 'store';
import validationSchema from './validationSchema';
import { userSelector } from 'modules/profile/store';
import styles from './styles';

const FeedbackForm: React.FC<{onSuccess?: Function}> = ({ onSuccess }) => {
  const user = useSelector(userSelector);
  const [document, setDocument] = useState<UploadFile | null>(null);

  const initialValues = {
    name: user ? user.full_name : '',
    phone_mobile_local: user ? user.phone_mobile : '',
    email: user ? user.email : '',
    content: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        const payload: any = {
          ...values,
          profile_id: user?.profile_id,
          category_id: null,
        };
        payload.email = payload.email.trim();
        if (document) {
          payload.documents = [{ url: document.base64 }];
        }
        ax({ actions }).post('feedback/api/feedback/feedback', payload)
          .then(() => {
            Keyboard.dismiss();
            setDocument(null);
            actions.resetForm();
            user ?
              DropdownAlertService.alert('success', 'Ваш вопрос отправлен') :
              Alert.alert('Уведомление', 'Ваш вопрос отправлен', [{ text: 'OK' }]);
            if (onSuccess) {onSuccess();}
          })
          .catch(error => DropdownAlertService.alert('error', error));
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isValid, isSubmitting, status }) => (
        <View>
          {user ? <TextHeader>Обратная связь</TextHeader> : null}
          <Field
            component={FormInput}
            name="name"
            label="Имя"
            iconName="ios-person-circle-outline"
          />
          <Field
            component={FormInput}
            name="phone_mobile_local"
            label="Номер телефона"
            placeholder="+7 ("
            keyboardType="numeric"
            returnKeyType="done"
            iconName="ios-call-outline"
            phone
          />
          <Field
            component={FormInput}
            name="email"
            label="E-mail адрес"
            iconName="ios-mail-outline"
            autoCapitalize="none"
          />
          <Field
            component={FormInput}
            name="content"
            label="Сообщение"
            multiline={true}
            numberOfLines={3}
          />
          <FileInput
            title="Прикрепить фото"
            file={document}
            setFile={file => setDocument(file)}
          />
          <ErrorMessage dot>{status}</ErrorMessage>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSubmit}
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
              color={Settings.colors.primary}
              icon={({ color }) => <Ionicons name="ios-paper-plane" size={24} color={color}/>}
            >Отправить</Button>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default FeedbackForm;
