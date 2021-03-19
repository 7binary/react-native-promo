import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {},
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 7,
  },
  item: {
    paddingTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#888',
  },
  position: {
    marginBottom: 5,
  },
  productHeader: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 15,
    marginBottom: 2,
  },
  productIcon: {
    fontSize: 20,
    color: '#666',
  },
  productName: {
    marginLeft: 5,
    fontSize: 16,
  },
  summary: {
    fontSize: 14,
    marginLeft: 5,
  },
  summaryLabel: {
    fontSize: 14,
    color: 'grey',
  },
  info: {
    padding: 15,
    paddingBottom: 0,
  },
  rowBonuses: {
    borderTopWidth: 0.5,
    borderTopColor: '#DDD',
    marginTop: 8,
    paddingTop: 8,
  },
  historyTitle: {
    textAlign: 'center',
    paddingLeft: 25,
  },
  history: {
    paddingHorizontal: 15,
  },
});
