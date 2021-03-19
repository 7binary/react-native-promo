import { StyleSheet } from 'react-native';
import { Settings } from '@pmk-team/common';

export default StyleSheet.create({
  header: {
    fontSize: 15,
    lineHeight: 17,
  },
  title: {
    fontSize: 17,
    lineHeight: 19,
    marginBottom: 10,
  },
  imageContainer: {
    marginBottom: 10,
  },
  btn: {
    marginLeft: 10,
  },
  bonuses: {
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: Settings.colors.accent,
  },
});
