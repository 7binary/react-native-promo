import { StyleSheet } from 'react-native';
import { Settings } from '@pmk-team/common';

export default StyleSheet.create({
  container: {},
  item: {},
  itemBox: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#888',
  },
  itemColumn: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemIcon: {
    marginTop: -2,
    fontSize: 24,
    marginRight: 10,
    color: Settings.colors.accent,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemImage: {
    width: '100%',
    aspectRatio: 1.78,
  },
  content: {
    padding: 10,
  },
  boxForward: {
    fontSize: 20,
    color: '#777',
    marginLeft: 10,
  },
  btnIcon: {
    fontSize: 17,
    padding: 10,
    margin: 10,
  },
});
