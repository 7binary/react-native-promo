import { StyleSheet } from 'react-native';
import { Settings } from '@pmk-team/common';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: Settings.config.border.width,
    borderTopColor: Settings.config.border.color,
    borderBottomWidth: Settings.config.border.width,
    borderBottomColor: Settings.config.border.color,
    backgroundColor: '#DDD',
    paddingVertical: 10,
  },
  contentBlock: {
    width: '90%',
    paddingLeft: 15,
  },
  content: {
    fontSize: 16,
  },
  iconBlock: {
    width: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    color: 'grey',
  },
});
