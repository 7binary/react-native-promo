import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Settings } from '@pmk-team/common';
import TicketsNavigator from 'modules/tickets/navigation/TicketsNavigator';
import DashboardNavigator from 'modules/profile/navigation/DashboardNavigator';
import PrizesNavigator from 'modules/prizes/navigation/PrizesNavigator';
import NewsInstructionsNavigator from 'modules/news/navigation/NewsInstructionsNavigator';
import CoursesNavigator from 'modules/courses/navigation/CoursesNavigator';
import useFcmSubscribe from 'modules/mobile/hooks/use-fcm-subscribe';
// import SalesNavigator from 'modules/sales/navigation/SalesNavigator';
// import FeedbackNavigator from 'modules/feedback/navigation/FeedbackNavigator';

const Tab = createBottomTabNavigator();

const ProfileNavigator: React.FC = () => {
  useFcmSubscribe();
  return (
    <Tab.Navigator
      initialRouteName="DashboardNav"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          switch (route.name) {
            case 'DashboardNav':
              return <Ionicons name="ios-home" size={Settings.config.tabbarIconSize} color={color}
              />;
            case 'PrizesNav':
              return <Ionicons name="ios-gift" size={Settings.config.tabbarIconSize} color={color}
              />;
            case 'NewsInstructionsNav':
              return <Ionicons name="ios-newspaper" size={Settings.config.tabbarIconSize}
                color={color}
              />;
            case 'CoursesNav':
              return <Ionicons name="ios-school" size={Settings.config.tabbarIconSize}
                color={color}
              />;
            case 'SalesNav':
              return <Ionicons name="md-receipt" size={Settings.config.tabbarIconSize}
                color={color}
              />;
            case 'TicketsNav':
              return <Ionicons name="ios-chatbox-ellipses" size={Settings.config.tabbarIconSize}
                color={color}
              />;
            case 'FeedbackNav':
              return <Ionicons name="ios-chatbox-ellipses" size={Settings.config.tabbarIconSize}
                color={color}
              />;
            default:
              return null;
          }
        },
      })}
      tabBarOptions={Settings.config.tabbar}
    >
      {/*<Tab.Screen*/}
      {/*  name="SalesNav"*/}
      {/*  component={SalesNavigator}*/}
      {/*  options={{ tabBarLabel: 'Продажи' }}*/}
      {/*/>*/}
      {/*<Tab.Screen*/}
      {/*  name="FeedbackNav"*/}
      {/*  component={FeedbackNavigator}*/}
      {/*  options={{tabBarLabel: 'Помощь'}}*/}
      {/*/>*/}

      <Tab.Screen
        name="TicketsNav"
        component={TicketsNavigator}
        options={{ tabBarLabel: 'Поддержка' }}
      />
      <Tab.Screen
        name="NewsInstructionsNav"
        component={NewsInstructionsNavigator}
        options={{ tabBarLabel: 'Новости' }}
      />
      <Tab.Screen
        name="PrizesNav"
        component={PrizesNavigator}
        options={{ tabBarLabel: 'Призы' }}
      />
      <Tab.Screen
        name="CoursesNav"
        component={CoursesNavigator}
        options={{ tabBarLabel: 'Обучение' }}
      />
      <Tab.Screen
        name="DashboardNav"
        component={DashboardNavigator}
        options={{ tabBarLabel: 'Главная' }}
      />
    </Tab.Navigator>
  );
};

export default ProfileNavigator;

