import React, { useState } from 'react';
import { Keyboard, View } from 'react-native';
import { Field, Formik } from 'formik';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Settings,
  FormInput,
  FileInput,
  FormSelect,
  ErrorMessage,
  UploadFile,
  DropdownAlertService,
  ax,
} from '@pmk-team/common';
import { useActions, useSelector } from 'store';
import { Ticket } from 'modules/tickets/store';
import validationSchema from './validationSchema';
import { userSelector } from 'modules/profile/store';
import styles from './styles';

const CreateTicketForm: React.FC<{onSuccess?: Function}> = ({ onSuccess }) => {
  const { addTicket } = useActions();
  const user = useSelector(userSelector);
  const topicOptions = useSelector(state => state.tickets.topic_options);
  const contactOptions = useSelector(state => state.tickets.contact_options);
  const [document, setDocument] = useState<UploadFile | null>(null);

  const initialValues = {
    title: '',
    comment: '',
    contact: null,
    topic_id: null,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        const payload: any = {
          ...values,
          profile_id: user?.profile_id,
        };
        if (document) {
          payload.file = document.base64;
        }
        ax({ actions }).post<{ticket: Ticket}>('tickets/api/tickets/send-ticket', payload)
          .then(response => {
            Keyboard.dismiss();
            setDocument(null);
            // actions.resetForm();
            addTicket(response.data.ticket);
            if (typeof onSuccess === 'function') {
              onSuccess();
            }
          })
          .catch(error => DropdownAlertService.alert('error', error));
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isValid, isSubmitting, status, values }) => (
        <>
          <Field
            component={FormInput}
            name="title"
            label="Заголовок обращения"
            iconName="ios-chatbox-outline"
          />
          <Field
            component={FormSelect}
            name="topic_id"
            value={values.topic_id}
            options={topicOptions}
            label="Тема обращения"
          />
          <Field
            component={FormSelect}
            name="contact"
            value={values.contact}
            options={contactOptions}
            label="Предпочтительный вид связи"
          />
          <Field
            component={FormInput}
            name="comment"
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
        </>
      )}
    </Formik>
  );
};

export default CreateTicketForm;
