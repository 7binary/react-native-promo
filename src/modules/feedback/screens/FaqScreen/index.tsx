import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { List } from 'react-native-paper';

import { useActions, useSelector } from 'store';
import { Faq } from 'modules/feedback/store';
import { TextHtml, StatusBarLight, StatusBarDark, Settings, TextEmpty } from '@pmk-team/common';
import { userSelector } from 'modules/profile/store';
import styles from './styles';

const FaqScreen = () => {
  const faqs = useSelector(state => state.feedback.faqs) || [];
  const user = useSelector(userSelector);
  const { getFaqs } = useActions();

  useFocusEffect(React.useCallback(() => {
    getFaqs();
  }, [getFaqs]));

  return (
    <SafeAreaView style={Settings.config.screen}>
      {user ? <StatusBarDark/> : <StatusBarLight/>}
      <TextEmpty length={faqs.length}/>

      <ScrollView>
        <List.AccordionGroup>
          {faqs.map((faq: Faq) => (
            <View style={styles.faq} key={`faq-${faq.id}`}>
              <List.Accordion titleNumberOfLines={10} title={faq.question} id={faq.id}
                titleStyle={styles.faqQuestion}
              >
                <View style={styles.faqAnswer}>
                  <TextHtml>{faq.answer}</TextHtml>
                </View>
              </List.Accordion>
            </View>
          ))}
        </List.AccordionGroup>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FaqScreen;
