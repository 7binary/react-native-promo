import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
    paddingBottom: 30,
  },
  imgBlock: {
    width: '100%',
    position: 'relative',
    borderTopColor: '#CCC',
    borderTopWidth: 0.5,
    borderBottomColor: '#CCC',
    borderBottomWidth: 0.5,
  },
  img: {
    width: '100%',
    aspectRatio: 1,
  },
  noReadBlock: {
    position: 'absolute',
    right: 0,
    top: 0,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: 'green',
  },
  noReadText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'grey',
  },
  contentBlock: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    textAlign: 'justify',
  },
});
