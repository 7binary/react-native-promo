import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {},
  products: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
  },
  product: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: Dimensions.get('window').width / 2,
  },
  productImage: {
    height: 120,
    borderWidth: 0.5,
    borderColor: '#DDD',
    borderRadius: 10,
  },
});
