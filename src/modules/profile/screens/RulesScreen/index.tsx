import React from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { TextEmpty, TextHtml } from '@pmk-team/common';
import { useActions, useSelector } from 'store';
import styles from './styles';

export default () => {
  const { getRules } = useActions();
  const rulesPage = useSelector(state => state.profile.rulesPage);

  useFocusEffect(React.useCallback(() => {
    getRules();
  }, [getRules]));

  if (!rulesPage) {
    return <TextEmpty length={0}/>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <TextHtml>{rulesPage.content}</TextHtml>
      </View>
    </ScrollView>
  );
};
