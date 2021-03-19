import { useEffect } from 'react';
import firebase from 'react-native-firebase';
import { Notification, NotificationOpen } from 'react-native-firebase/notifications';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { NavigationProp } from '@react-navigation/core';

import { DropdownAlertService } from '@pmk-team/common';
import withNavigator from './with-navigator';
import withDispatcher2 from './with-dispatcher';

export default function useFcmSubscribe(
  navigator: ((navigation: NavigationProp<any>, data: any) => Function) = withNavigator,
  dispatcher: ((dispatch: Dispatch<any>, data: any) => void) = withDispatcher2,
) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handlePush = (notification: Notification, logInfo = '', navigate = false) => {
    const { title, body, data } = notification;
    const payload: any = {};
    __DEV__ && console.log(logInfo, data);

    try {
      // диспатчи с пуша
      if (dispatcher) {
        dispatcher(dispatch, data);
      }

      // навигация с пуша: при внешнем пуше сразу переходим, а при внутреннем по клику на всплывашку
      if (navigator) {
        const goto = navigator(navigation, data);
        navigate ? goto() : payload.onTap = goto;
      }

      // в любом случае покажем всплывашку сверху в приложении
      DropdownAlertService.alert('info', title, body, payload, 30 * 1000);
    } catch (err) {
      __DEV__ && console.log('[FCM] HANDLE ERROR', err);
    }
  };

  useEffect(() => {
    const removeNotificationOpenedListener = // внешний пуш, приложение в фоновом режиме
      firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
        handlePush(notificationOpen.notification, '[FCM] onNotificationOpened', true);
      });
    const removeNotificationListener = // внутренний пуш, приложение открыто
      firebase.notifications().onNotification((notification: Notification) => {
        handlePush(notification, '[FCM] onNotification');
      });
    __DEV__ && console.log('[FCM] SUBSCRIBED');

    return () => {
      removeNotificationOpenedListener();
      removeNotificationListener();
      __DEV__ && console.log('[FCM] REMOVED LISTENERS');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
