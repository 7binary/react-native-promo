import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
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
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  iconTime: {
    marginTop: -5,
    fontSize: 24,
    paddingLeft: 5,
    color: '#333',
  },
  iconNote: {
    marginTop: -5,
    fontSize: 24,
    paddingRight: 5,
    color: '#333',
  },
});
