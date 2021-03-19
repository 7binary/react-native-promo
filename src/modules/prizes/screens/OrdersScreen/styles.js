import { StyleSheet } from 'react-native';
import { Settings } from '@pmk-team/common';

export default StyleSheet.create({
  block: {
    marginTop: 10,
    marginBottom: 5,
  },
  orderContainer: {
    borderBottomWidth: Settings.config.border.width,
    borderBottomColor: Settings.config.border.color,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#DDD',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  orderCards: {
    marginBottom: 15,
  },
  cardContainer: {
    paddingHorizontal: 15,
    marginTop: 15,
  },
  cardRow: {
    flexDirection: 'row',
  },
  cardImage: {
    width: 120,
    height: 70,
    borderRadius: 5,
  },
  cardInfo: {
    width: '70%',
  },
  cardHeader: {
    flexDirection: 'row',
  },
  cardTitle: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardNominal: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#666',
    fontSize: 18,
  },
  cardQty: {
    marginLeft: 10,
    lineHeight: 18,
    textAlign: 'right',
    color: '#666',
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardDownloadBox: {
    marginLeft: 10,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 30,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
  },
  cardDownloadIcon: {
    fontSize: 24,
    color: '#555',
  },
  cardDownloadText: {
    color: '#555',
  },
});
