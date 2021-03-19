import { StyleSheet } from 'react-native';
import { Settings } from '@pmk-team/common';

export default StyleSheet.create({
  faq: {
    borderBottomWidth: Settings.config.border.width,
    borderBottomColor: Settings.config.border.color,
  },
  faqQuestion: {
    fontSize: 15,
  },
  faqAnswer: {
    paddingTop: 5,
    paddingHorizontal: 15,
    paddingBottom: 25,
  },
});
