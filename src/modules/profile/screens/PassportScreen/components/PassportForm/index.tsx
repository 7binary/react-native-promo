import React, { useState } from 'react';
import { InteractionManager, View, Text } from 'react-native';
import { Field, Formik } from 'formik';
import { Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

import {
  Settings,
  UploadFile,
  FileInput,
  FormInput,
  ErrorMessage,
  DropdownAlertService,
  ax,
} from '@pmk-team/common';
import { useActions, useSelector } from 'store';
import validationSchema from './validationSchema';
import { Passport, passportSelector, userSelector } from 'modules/profile/store';
import PassportStatus from '../PassportStatus';
import PassportComments from '../PassportComments';
import { tokenSelector } from 'modules/auth/store';
import styles from './styles';

interface Props {
  onSuccess?: Function;
}

const PassportForm: React.FC<Props> = ({ onSuccess }) => {
  const { getPassport } = useActions();
  const user = useSelector(userSelector);
  const passport = useSelector(passportSelector);
  const authToken = useSelector(tokenSelector);
  const [document1, setDocument1] = useState<UploadFile | null>(null);
  const [document2, setDocument2] = useState<UploadFile | null>(null);
  const allowEdit = !passport || passport.status === 'redo';
  const innRequired = false;

  useFocusEffect(React.useCallback(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      getPassport();
    });
    return () => task.cancel();
  }, [getPassport]));

  if (!user) {return null;}
  const profile_id = user.profile_id;

  const initialValues: Partial<Passport> = {
    last_name: passport ? passport.last_name : user.last_name,
    first_name: passport ? passport.first_name : user.first_name,
    middle_name: passport ? passport.middle_name : user.middle_name,
    birthday_on_local: passport ? passport.birthday_on_local : user.birthday_on,
    document_series_and_number: passport?.document_series_and_number,
    address: passport?.address,
  };

  if (innRequired) {initialValues.inn = passport?.inn;}

  return (
    <View style={styles.container}>
      <PassportStatus passport={passport}/>
      {!allowEdit ? <Text style={styles.noEdit}>???????????????????????????? ???????????? ????????????????????</Text> : null}
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          const payload: Partial<Passport> = { profile_id, ...values };
          payload.document1_api = document1 ? { url: document1.base64 } : { file: passport?.document1_api?.webpath };
          payload.document2_api = document2 ? { url: document2.base64 } : { file: passport?.document2_api?.webpath };

          ax({ actions }).post('taxes/api/ndfl/save-passport', payload)
            .then(() => {
              DropdownAlertService.alert('success', '???????????? ????????????????????');
              getPassport();
              if (typeof onSuccess === 'function') {
                onSuccess();
              }
            }).catch(() => DropdownAlertService.alert('error', '???????????? ???????????????? ????????????'));
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isValid, isSubmitting, status }) => (
          <>
            <Field
              component={FormInput}
              name="last_name"
              label="??????????????"
              iconName="ios-person-circle-outline"
              disabled={!allowEdit}
            />
            <Field
              component={FormInput}
              name="first_name"
              label="??????"
              iconName="ios-person-circle-outline"
              disabled={!allowEdit}
            />
            <Field
              component={FormInput}
              name="middle_name"
              label="????????????????"
              iconName="ios-person-circle-outline"
              disabled={!allowEdit}
            />
            <Field
              component={FormInput}
              name="birthday_on_local"
              label="???????? ???????????????? (????.????.????????)"
              iconName="ios-calendar-outline"
              mask="99.99.9999"
              keyboardType="numeric"
              returnKeyType="done"
              disabled={!allowEdit}
            />
            <Field
              component={FormInput}
              name="document_series_and_number"
              label="?????????? ?? ?????????? ????????????????"
              iconName="md-card-outline"
              mask="9999 999999"
              keyboardType="numeric"
              returnKeyType="done"
              disabled={!allowEdit}
            />
            <Field
              component={FormInput}
              name="address"
              label="?????????? ?????????? ???????????????????? ?? ????"
              iconName="ios-location-outline"
              disabled={!allowEdit}
            />
            {innRequired ?
              <Field
                component={FormInput}
                name="inn"
                label="??????"
                iconName="md-card-outline"
                mask="999999999999"
                keyboardType="numeric"
                returnKeyType="done"
                disabled={!allowEdit}
              />
              : null
            }
            <FileInput
              title="???????????????? ????????????????"
              webpath={passport?.document1_api?.webpath}
              authToken={authToken}
              file={document1}
              setFile={file => setDocument1(file)}
              disabled={!allowEdit}
            />
            <FileInput
              title="???????????????? ??????????????????????"
              webpath={passport?.document2_api?.webpath}
              authToken={authToken}
              file={document2}
              setFile={file => setDocument2(file)}
              disabled={!allowEdit}
            />
            <ErrorMessage dot>{status}</ErrorMessage>
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={handleSubmit}
                disabled={!isValid || isSubmitting || !allowEdit}
                loading={isSubmitting}
                color={Settings.colors.primary}
              >?????????????????? ???? ????????????????</Button>
            </View>
          </>
        )}
      </Formik>
      {passport && <PassportComments passport={passport}/>}
    </View>
  );
};

export default PassportForm;
