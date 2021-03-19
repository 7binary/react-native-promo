import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HeaderPopupOptions } from '@pmk-team/common';
import InstructionScreen from 'modules/news/screens/InstructionScreen';
import InstructionsScreen from 'modules/news/screens/InstructionsScreen';
import HeaderOptions from 'components/HeaderOptions';

const Stack = createStackNavigator();

const InstructionsNavigator = () => (
  <Stack.Navigator initialRouteName="Instructions" screenOptions={{ headerTitleAlign: 'center' }}>
    <Stack.Screen
      name="Instructions"
      component={InstructionsScreen}
      initialParams={{ instruction: null }}
      options={{ title: 'Инструкции', ...HeaderOptions }}
    />
    <Stack.Screen
      name="Instruction"
      component={InstructionScreen}
      initialParams={{ instruction: null }}
      options={{ title: 'Инструкция', ...HeaderPopupOptions }}
    />
  </Stack.Navigator>
);

export default InstructionsNavigator;
