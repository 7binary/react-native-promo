import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HeaderPopupOptions } from '@pmk-team/common';
import AuthNavigator from 'modules/auth/navigation/AuthNavigator';
import ProfileNavigator from 'modules/profile/navigation/ProfileNavigator';
import ProfileDrawerNavigator from 'modules/profile/navigation/ProfileDrawerNavigator';
import NotificationsScreen from 'modules/mobile/screens/NotificationsScreen';
import WebviewScreen from 'modules/mobile/screens/WebviewScreen';
import PdfScreen from 'modules/mobile/screens/PdfScreen';
// import TicketsPopupNavigator from 'modules/tickets/navigation/TicketsPopupNavigator';
import { useSelector } from 'store';
import { profileIdSelector, settingsSelector } from 'modules/auth/store';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const profile_id = useSelector(profileIdSelector);
  const settings = useSelector(settingsSelector);

  return (
    <>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        {profile_id ? (
          <>
            <Stack.Screen
              name="ProfileNav"
              component={settings?.sidemenu ? ProfileDrawerNavigator : ProfileNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
              options={{ title: 'Уведомления', ...HeaderPopupOptions }}
            />
            <Stack.Screen
              name="Pdf"
              component={PdfScreen}
              initialParams={{ url: null }}
              options={{ title: 'PDF документ', ...HeaderPopupOptions }}
            />
            <Stack.Screen
              name="Webview"
              component={WebviewScreen}
              initialParams={{ url: null }}
              options={{ title: 'Внешняя ссылка', ...HeaderPopupOptions }}
            />
            {/* автивируем тут если Поддержка должна быть попапом, когда не включена в навигаторы ProfileNavigator или ProfileDrawerNavigator */}
            {/*<Stack.Screen*/}
            {/*  name="TicketsNav"*/}
            {/*  component={TicketsPopupNavigator}*/}
            {/*  options={{ ...HeaderPopupOptions, headerShown: false }}*/}
            {/*/>*/}
          </>
        ) : (
          <Stack.Screen
            name="AuthNav"
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </>
  );
};

export default AppNavigator;
