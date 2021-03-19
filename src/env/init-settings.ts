import { DefaultTheme } from 'react-native-paper';

import { Settings } from '@pmk-team/common';
import { baseURL, xToken } from 'env/env.json';

export default function initSettings() {
  Settings.setApi({ baseURL, xToken });

  Settings.setColors({
    primary: '#4F88B1',
    accent: '#13B59D',
    headerTextActive: '#FFF',
    headerTextInactive: '#999',
  });

  Settings.setConfig({
    screen: {
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    tabs: {
      activeTintColor: '#333',
      inactiveTintColor: '#999',
      showLabel: true,
      showIcon: true,
      labelStyle: {
        fontSize: 14,
        fontWeight: 'bold' as 'bold',
      },
      indicatorStyle: {
        backgroundColor: Settings.colors.accent,
      },
    },
    tabbar: {
      activeTintColor: '#FFF',
      activeBackgroundColor: Settings.colors.headerBackground,
      inactiveTintColor: '#CCC',
      inactiveBackgroundColor: Settings.colors.headerBackground,
    },
    headerIcon: {
      fontSize: 26,
      paddingHorizontal: 10,
      color: '#FFF',
    },
    headerBadge: {
      darkTheme: {
        borderColor: '#AAA',
        bgColor: '#DDD',
      },
      lightTheme: {
        borderColor: '#AAA',
        bgColor: '#DDD',
      },
    },
  });

  Settings.setTheme({
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...Settings.colors,
    },
  });
}
