import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  balanceColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  balanceLabel: {
    fontSize: 20,
  },
  balanceBonuses: {
    fontWeight: 'bold',
    fontSize: 24,
    marginRight: 5,
  },
  balanceForward: {
    fontSize: 20,
    color: '#AAA',
    marginLeft: 10,
  },
});
