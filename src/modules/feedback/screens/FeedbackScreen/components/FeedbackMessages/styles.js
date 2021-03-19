import { StyleSheet } from 'react-native';
import { Settings } from '@pmk-team/common';

export default StyleSheet.create({
  container: {
    borderTopWidth: Settings.config.border.width,
    borderTopColor: Settings.config.border.color,
  },
  msg: {
    borderBottomWidth: Settings.config.border.width,
    borderBottomColor: Settings.config.border.color,
  },
  msgQuestion: {
    fontSize: 15,
    width: '100%',
  },
  msgQuestionInfo: {
    width: '100%',
    display: 'flex',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  msgDate: {
    fontSize: 14,
    color: 'gray',
  },
  statusProcessing: {
    borderRadius: 5,
    overflow: 'hidden',
    paddingVertical: 2,
    paddingHorizontal: 4,
    textAlign: 'center',
    backgroundColor: 'lightgray',
  },
  statusProcessed: {
    color: 'white',
    borderRadius: 5,
    overflow: 'hidden',
    paddingVertical: 2,
    paddingHorizontal: 4,
    textAlign: 'center',
    backgroundColor: 'green',
  },
  msgReplies: {
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 25,
  },
  replyInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  adminName: {
    fontWeight: 'bold',
    color: 'gray',
    fontSize: 16,
    paddingBottom: 15,
  },
  documents: {
    paddingHorizontal: 15,
  },
  document: {
    width: '100%',
    marginVertical: 5,
  },
});
