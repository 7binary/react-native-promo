import React from 'react';
import { Text, View } from 'react-native';

import { Passport, PassportComment } from 'modules/profile/store';
import { TextHeader, Quote } from '@pmk-team/common';
import styles from './styles';

const Comment: React.FC<{comment: PassportComment}> = ({ comment }) => {
  return (
    <View style={styles.comment}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentNote}>{comment.note}</Text>
        <Text style={styles.commentCreated}>{comment.created_at}</Text>
      </View>
      {comment.comment ? <Quote>{comment.comment}</Quote> : null}
    </View>
  );
};

const PassportComments: React.FC<{passport: Passport}> = ({ passport }) => {
  return (
    <View style={styles.container}>
      <TextHeader>История</TextHeader>
      {passport.comments.map(comment => <Comment comment={comment} key={`c-${comment.id}`}/>)}
    </View>
  );
};

export default PassportComments;
