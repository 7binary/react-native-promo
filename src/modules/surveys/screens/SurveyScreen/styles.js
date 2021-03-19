import { StyleSheet } from 'react-native';
import { Settings } from '@pmk-team/common';

export default StyleSheet.create({
  container: {
    paddingTop: 5,
  },
  surveyInfo: {
    paddingHorizontal: 15,
  },
  title: {
    marginBottom: 10,
  },
  imageContainer: {
    marginBottom: 10,
  },
  content: {
    marginBottom: 10,
  },
  questions: {
    borderBottomWidth: Settings.config.border.width,
    borderBottomColor: Settings.config.border.color,
  },
  question: {
    borderTopWidth: Settings.config.border.width,
    borderTopColor: Settings.config.border.color,
  },
  questionNumber: {
    width: 30,
    height: 30,
    lineHeight: 30,
    fontSize: 14,
    fontWeight: 'bold',
    borderRadius: 15,
    textAlign: 'center',
    backgroundColor: '#888',
    color: 'white',
    overflow: 'hidden',
  },
  answers: {
    paddingLeft: 30,
    paddingBottom: 5,
  },
  answer: {},
  nextContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 15,
  },
  submitContainer: {
    paddingTop: 5,
    paddingBottom: 50,
    paddingHorizontal: 15,
  },
  userComment: {
    marginRight: 15,
    marginBottom: 10,
  },
  bonuses: {
    marginVertical: 10,
    backgroundColor: Settings.colors.accent,
  },
});
