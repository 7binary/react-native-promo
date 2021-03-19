import { StyleSheet } from 'react-native';
import { Settings } from '@pmk-team/common';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 15,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#D6D6D6',
  },
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 5,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D6D6',
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
  sendbox: {
    borderTopWidth: 0.5,
    borderTopColor: '#D6D6D6',
    position: 'relative',
  },
  sendboxInput: {
    paddingRight: 100,
  },
  sendBtn: {
    position: 'absolute',
    right: 5,
    bottom: 10,
  },
  sendBtnIcon: {
    fontSize: 32,
    padding: 5,
  },
  cameraBtn: {
    position: 'absolute',
    right: 50,
    width: 60,
    height: 60,
    bottom: 0,
  },
  cameraBtnIcon: {
    fontSize: 32,
    padding: 8,
    paddingRight: 0,
    color: Settings.colors.accent,
    alignSelf: 'center',
  },
  messagePhoto: {
    marginTop: 5,
  },
});
