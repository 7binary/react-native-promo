import React from 'react';
import { Text, SafeAreaView, View, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';

import styles from './styles';
import { useActions, useSelector } from 'store';
import { Notification } from 'modules/mobile/store';
import { TextHtml, TextHeader, StatusBarDark } from '@pmk-team/common';

const NotificationItem: React.FC<{item: Notification}> = ({ item }) => (
  <View style={styles.item}>
    <View style={styles.itemTitleBox}>
      <Ionicons name="ios-notifications" style={styles.itemTitleIcon}/>
      <Text style={styles.itemTitle}>{item.title}</Text>
    </View>
    <View style={styles.itemBody}>
      <TextHtml>{item.body}</TextHtml>
    </View>
    <View style={styles.itemCreatedBox}>
      <Text style={styles.itemCreatedAt}>{item.created_at}</Text>
    </View>
  </View>
);

const NotificationsScreen = () => {
  const notifications = useSelector(state => state.mobile.notifications);
  const { getNotifications } = useActions();

  useFocusEffect(React.useCallback(() => {
    getNotifications();
  }, [getNotifications]));

  return (
    <SafeAreaView>
      <StatusBarDark/>
      {!notifications.length ? <TextHeader paddingTop={10}>Ничего не найдено</TextHeader> : null}
      <View>
        <FlatList
          data={notifications}
          renderItem={({ item }) => <NotificationItem item={item}/>}
          keyExtractor={(item) => `notification-${item.id}`}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
