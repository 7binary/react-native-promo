import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  balanceIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  balanceBonuses: {
    fontWeight: 'bold',
    fontSize: 24,
    marginRight: 5,
  },
  transaction: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DDD',
  },
  transactionColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionIn: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'darkgreen',
  },
  transactionOut: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'darkred',
  },
  transactionCreated: {
    fontSize: 12,
    color: 'gray',
  },
  transactionTitle: {
    marginTop: 5,
  },
  empty: {
    paddingVertical: 20,
    textAlign: 'center',
  },
});
