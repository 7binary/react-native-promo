import { StyleSheet } from 'react-native';
import { Settings } from '@pmk-team/common';

export default StyleSheet.create({
  item: {
    padding: 10,
    paddingBottom: 10,
    borderBottomWidth: Settings.config.border.width,
    borderBottomColor: Settings.config.border.color,
  },
  itemTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemTitleIcon: {
    marginTop: -2,
    fontSize: 24,
    marginRight: 10,
    color: Settings.colors.accent,
  },
  itemTitle: {
    fontSize: 15,
    lineHeight: 18,
    flexShrink: 1,
  },
  itemCreatedBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  itemCreatedAt: {
    fontSize: 12,
    color: 'gray',
  },
  itemBody: {
    marginTop: 5,
    marginBottom: 10,
  },
});
