import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HeaderPopupLightOptions } from '@pmk-team/common';
import LoginScreen from 'modules/auth/screens/LoginScreen';
import RegisterScreen from 'modules/auth/screens/RegisterScreen';
import RemindPasswordScreen from 'modules/auth/screens/RemindPasswordScreen';
import LoginHeader from 'modules/auth/screens/LoginScreen/components/LoginHeader';
import FeedbackAuthNavigator from 'modules/feedback/navigation/FeedbackAuthNavigator';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: () => <LoginHeader/>,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Регистрация', ...HeaderPopupLightOptions }}
      />
      <Stack.Screen
        name="RemindPassword"
        component={RemindPasswordScreen}
        options={{ title: 'Восстановление пароля', ...HeaderPopupLightOptions }}
      />
      <Stack.Screen
        name="FeedbackAuth"
        component={FeedbackAuthNavigator}
        options={{ title: 'Помощь', ...HeaderPopupLightOptions }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
