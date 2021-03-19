import { StyleSheet } from 'react-native';
import { Settings } from '@pmk-team/common';

export default StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 15,
  },
  btnIcon: {
    fontSize: 17,
    padding: 10,
    margin: 10,
  },
  video: {
    paddingBottom: 15,
  },
  videoInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  videoIcon: {
    marginHorizontal: 15,
  },
  videoTitle: {
    flexShrink: 1,
    fontSize: 14,
  },
  youtube: {
    alignSelf: 'stretch',
    height: 300,
  },
  test: {
    paddingHorizontal: 0,
    paddingVertical: 20,
  },
  bonuses: {
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: Settings.colors.accent,
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
  answer: {
    marginBottom: 5,
  },
  nextContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 15,
  },
  try: {
    marginTop: 20,
  },
  tryInfo: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  row: {
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: 17,
  },
  progress: {
    paddingTop: 10,
    alignItems: 'center',
  },
  progressPercent: {
    fontSize: 18,
  },
});
