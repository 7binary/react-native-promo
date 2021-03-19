import React, { useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { TextHeader, StatusBarDark, KeyboardView, Settings } from '@pmk-team/common';
import { FeedbackMessage } from 'modules/feedback/store';
import { useActions, useSelector } from 'store';
import FeedbackForm from './components/FeedbackForm';
import FeedbackMessages from './components/FeedbackMessages';
import styles from './styles.js';

const FeedbackScreen = () => {
  const messages: FeedbackMessage[] = useSelector(state => state.feedback.messages);
  const [showForm, setShowForm] = useState(false);
  const { getFeedbackMessages, getFaqs } = useActions();

  useFocusEffect(React.useCallback(() => {
    setShowForm(false);
    getFeedbackMessages();
    getFaqs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []));

  return (
    <KeyboardView containerStyle={Settings.config.screen}>
      <StatusBarDark/>
      {/* feedback form */}
      {showForm || messages.length === 0 ? (
        <FeedbackForm onSuccess={() => {
          setShowForm(false);
          getFeedbackMessages();
        }}/>
      ) : null}

      {/* messages */}
      {messages.length > 0 ? (
        <View style={styles.myMessages}>
          <View style={styles.myMessagesTitle}>
            <TextHeader>Мои обращения</TextHeader>
          </View>
          {/* feedback add button */}
          {!showForm ? (
            <Button
              style={styles.btnAdd}
              icon={({ color }) => <Ionicons name="ios-add-circle" size={24} color={color}/>}
              onPress={() => setShowForm(true)}
            >Добавить обращение</Button>
          ) : null}
          <FeedbackMessages messages={messages}/>
        </View>
      ) : null}
    </KeyboardView>
  );
};

export default FeedbackScreen;
