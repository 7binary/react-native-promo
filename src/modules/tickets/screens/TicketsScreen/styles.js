import { StyleSheet } from 'react-native';
import { Settings } from '@pmk-team/common';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    padding: 15,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#D6D6D6',
  },
  titleBox: {
    flexDirection: 'row',
  },
  titleLeft: {
    flexDirection: 'row',
    width: '80%',
  },
  titleRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    width: '20%',
  },
  lockOpenIcon: {
    marginTop: -5,
    fontSize: 22,
    color: 'green',
  },
  lockClosedIcon: {
    marginTop: -5,
    fontSize: 22,
    color: 'orange',
  },
  unseen: {
    height: 18,
    lineHeight: 18,
    paddingHorizontal: 3,
    marginHorizontal: 5,
    borderRadius: 5,
    overflow: 'hidden',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'steelblue',
    color: 'white',
  },
  titleIcon: {
    marginTop: -2,
    fontSize: 24,
    marginRight: 10,
    color: Settings.colors.accent,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    marginTop: 5,
    marginBottom: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 5,
  },
  name: {
    color: 'gray',
  },
  createdAt: {
    fontSize: 12,
    color: 'gray',
  },
  messagePhoto: {
    marginTop: 5,
    width: 100,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
