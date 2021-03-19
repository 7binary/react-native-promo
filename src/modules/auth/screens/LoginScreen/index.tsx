import React from 'react';
import { View, Text, InteractionManager } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { KeyboardView, setStatusbarLight, StatusBarLight, Settings } from '@pmk-team/common';
import { useActions } from 'store';
import LoginForm from './components/LoginForm';
import styles from './styles';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { getApiSettings } = useActions();

  useFocusEffect(React.useCallback(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setStatusbarLight();
      getApiSettings();
    });
    return () => task.cancel();
  }, [getApiSettings]));

  return (
    <KeyboardView containerStyle={styles.container}>
      <StatusBarLight/>
      <Text style={styles.title}>Вход в программу</Text>
      <LoginForm/>
      <View style={styles.buttonsContainer}>
        <Button
          onPress={() => navigation.navigate('Register')}
          color={Settings.colors.primary}
        >
          Зарегистрироваться
        </Button>
        <View style={styles.row}>
          <Button
            onPress={() => navigation.navigate('FeedbackAuth')}
            color={Settings.colors.accent}
            icon={({ color }) =>
              <Ionicons name="ios-help-circle-outline" size={24} color={color}/>
            }
          >Помощь</Button>
          <Button
            onPress={() => navigation.navigate('RemindPassword')}
            color="grey"
          >Забыли пароль?</Button>
        </View>
      </View>
    </KeyboardView>
  );
};

export default LoginScreen;
