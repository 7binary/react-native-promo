import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { enableScreens } from 'react-native-screens';
import codePush from 'react-native-code-push';

import { Settings, Navigation, DropdownAlertCustom, StatusBarLight } from '@pmk-team/common';
import { store, persistor } from 'store';
import AppNavigator from './AppNavigator';
import initSettings from './env/init-settings';

initSettings();
enableScreens();
Ionicons.loadFont();

const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <PaperProvider theme={Settings.theme}>
        <StatusBarLight/>
        <Navigation profile_id={store.getState().auth.profile_id}>
          <AppNavigator/>
        </Navigation>
        <DropdownAlertCustom isDark={!!store.getState().auth.profile_id}/>
      </PaperProvider>
    </PersistGate>
  </Provider>
);

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);
