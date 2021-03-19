import { StyleSheet, Dimensions, Platform } from 'react-native';

export default StyleSheet.create({
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
  },
  card: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: Platform.OS === 'android'
      ? Dimensions.get('window').width / 2 - 2
      : Dimensions.get('window').width / 2,
  },
  cardImage: {
    aspectRatio: 1.4,
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#DDD',
    borderRadius: 10,
  },
});
