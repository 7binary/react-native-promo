import { StyleSheet } from 'react-native';
import { Settings } from '@pmk-team/common';

export default StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: Settings.config.border.width,
    borderBottomColor: Settings.config.border.color,
  },
  imageBox: {
    width: '28%',
  },
  image: {
    width: '100%',
    minHeight: 75,
  },
  info: {
    width: '72%',
    paddingLeft: 12,
  },
  header: {
    flexDirection: 'row',
  },
  title: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  nominal: {
    marginTop: -5,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
  },
  remove: {
    marginTop: -10,
    fontSize: 32,
    color: 'maroon',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnRight: {
    alignItems: 'flex-end',
  },
  label: {
    color: '#666',
  },
  controls: {
    flexDirection: 'row',
  },
  qty: {
    padding: 8,
    paddingBottom: 0,
    fontSize: 18,
  },
  minusPlus: {
    paddingHorizontal: 8,
    paddingTop: 4,
    fontSize: 32,
    color: '#666',
  },
  summary: {
    marginTop: 6,
    fontSize: 18,
  },
  taxText: {
    textAlign: 'right',
    color: 'gray',
  },
});
