import { StyleSheet } from 'react-native';
import { Settings } from '@pmk-team/common';

export default StyleSheet.create({
  container: {
    padding: 0,
  },
  positions: {},
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingBottom: 14,
    marginBottom: 5,
    backgroundColor: '#DDD',
    borderBottomColor: Settings.config.border.color,
    borderBottomWidth: Settings.config.border.width,
  },
  totalInfo: {
    paddingLeft: 5,
  },
  totalLabel: {
    color: 'grey',
    fontSize: 14,
  },
  totalValue: {
    fontSize: 14,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
});
