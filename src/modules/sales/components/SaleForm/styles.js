import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 10,
  },
  box: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  form: {
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 15,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  positions: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 15,
  },
  position: {
    marginBottom: 15,
  },
  productHeader: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'lightgreen',
    padding: 5,
    paddingRight: 15,
    marginBottom: 10,
  },
  productIcon: {
    fontSize: 20,
    color: '#666',
  },
  productName: {
    marginLeft: 5,
    fontSize: 14,
    lineHeight: 20,
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
  remove: {
    fontSize: 32,
    color: 'maroon',
  },
  summary: {
    fontSize: 20,
    lineHeight: 20,
    textAlign: 'center',
  },
  summaryLabel: {
    fontSize: 13,
    color: 'grey',
  },
});
