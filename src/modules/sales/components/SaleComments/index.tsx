import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { TextHeader, Quote } from '@pmk-team/common';
import { Sale, SaleHistory } from 'modules/sales/store';
import styles from './styles';

const Comment: React.FC<{comment: SaleHistory}> = ({ comment }) => {
  return (
    <View style={styles.comment}>
      <View style={styles.commentHeader}>
        <View style={styles.row}>
          <Ionicons name="ios-sync" style={styles.iconNote}/>
          <Text style={styles.commentNote}>{comment.note}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.commentCreated}>{comment.created_at}</Text>
          <Ionicons name="ios-time-outline" style={styles.iconTime}/>
        </View>
      </View>
      {comment.comment ? <Quote>{comment.comment}</Quote> : null}
    </View>
  );
};

const SaleComments: React.FC<{sale: Sale, withTitle?: boolean}> = ({ sale, withTitle = true }) => {
  return (
    <View style={styles.container}>
      {withTitle ? <TextHeader>История</TextHeader> : null}
      {sale.history.map(comment => <Comment comment={comment} key={`c-${comment.id}`}/>)}
    </View>
  );
};

export default SaleComments;
