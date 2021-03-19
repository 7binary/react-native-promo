import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HeaderOptions from 'components/HeaderOptions';
import { HeaderPopupOptions } from '@pmk-team/common';
import CoursesScreen from 'modules/courses/screens/CoursesScreen';
import CourseScreen from 'modules/courses/screens/CourseScreen';
import PdfDocumentScreen from 'modules/courses/screens/PdfDocumentScreen';

const Stack = createStackNavigator();

const CoursesNavigator = () => (
  <Stack.Navigator initialRouteName="Courses" screenOptions={{headerTitleAlign: 'center'}}>
    <Stack.Screen
      name="Courses"
      component={CoursesScreen}
      options={{title: 'Обучение', ...HeaderOptions}}
    />
    <Stack.Screen
      name="Course"
      component={CourseScreen}
      initialParams={{course: null}}
      options={{title: 'Обучающий материал', ...HeaderPopupOptions}}
    />
    <Stack.Screen
      name="PdfDocument"
      component={PdfDocumentScreen}
      initialParams={{uri: null}}
      options={{title: 'Документ PDF', ...HeaderPopupOptions}}
    />
  </Stack.Navigator>
);

export default CoursesNavigator;
