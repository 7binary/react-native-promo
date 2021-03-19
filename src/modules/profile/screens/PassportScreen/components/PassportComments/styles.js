import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 25,
  },
  comment: {
    paddingTop: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DDD',
  },
  commentHeader: {
    marginBottom: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentNote: {
    fontSize: 14,
  },
  commentCreated: {
    fontSize: 12,
    color: '#999',
  },
});
