import React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { useFocusEffect } from '@react-navigation/native';

import { TextHtml, FitImage } from '@pmk-team/common';
import { useActions, useSelector } from 'store';
import styles from './styles';

const SurveyPopup = () => {
  const { declineSurvey, getSurveys } = useActions();
  const navigation = useNavigation();
  const surveys = useSelector(state => state.surveys.surveys);
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  useFocusEffect(React.useCallback(() => {
    getSurveys();
    showDialog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []));

  if (surveys.length === 0) {
    return null;
  }
  const survey = surveys[0];

  const notInterested = () => {
    hideDialog();
    declineSurvey(survey.id);
  };
  const openSurvey = () => {
    hideDialog();
    navigation.navigate('Survey', { survey });
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        {survey.bonuses ? (
          <Chip icon="information" style={styles.bonuses}>
            +{survey.bonuses} баллов за прохождение
          </Chip>
        ) : null}

        <Dialog.Content>
          <Paragraph style={styles.title}>{survey.title}</Paragraph>
          {survey.image_url ? (
            <View style={styles.imageContainer}>
              <FitImage url={survey.image_url}/>
            </View>
          ) : null}
          <TextHtml>{survey.content}</TextHtml>
        </Dialog.Content>

        <Dialog.Actions>
          <Button onPress={notInterested} mode="outlined" style={styles.btn}>
            Не интересует
          </Button>
          <Button onPress={openSurvey} mode="contained" style={styles.btn}>
            Пройти
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default SurveyPopup;
