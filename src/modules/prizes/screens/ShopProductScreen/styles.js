import { StyleSheet } from 'react-native';
import { Settings } from '@pmk-team/common';

export default StyleSheet.create({
  container: {},
  card: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  cardImage: {
    height: 250,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontStyle: 'italic',
    color: Settings.colors.accent,
  },
  description: {
    borderTopWidth: Settings.config.border.width,
    borderTopColor: Settings.config.border.color,
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 15,
  },
  nominalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderTopWidth: Settings.config.border.width,
    borderTopColor: Settings.config.border.color,
    marginTop: 5,
    paddingTop: 15,
  },
  nominal: {
    minWidth: 80,
    marginVertical: 3,
    marginHorizontal: 3,
  },
  qtyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  qtyInput: {
    width: 160,
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    width: 160,
  },
});
