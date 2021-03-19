import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  selectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 5,
  },
  selectPayment: {
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 8,
    borderWidth: 2,
    borderColor: '#CCC',
    borderRadius: 55,
    overflow: 'hidden',
    width: 110,
    height: 110,
    justifyContent: 'center',
  },
  selectLogoBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectLogo: {
    width: 50,
    height: 50,
    marginTop: -5,
  },
  selectTitle: {
    paddingTop: 5,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 12,
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  formColumnFirst: {
    width: '30%',
  },
  formColumnLast: {
    width: '66%',
  },
  buttonBox: {
    paddingHorizontal: 15,
  },
  tax: {
    marginTop: 15,
    marginHorizontal: 15,
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: 'center',
    fontSize: 15,
    fontStyle: 'italic',
    color: 'steelblue',
    backgroundColor: '#DDD',
  },
});
