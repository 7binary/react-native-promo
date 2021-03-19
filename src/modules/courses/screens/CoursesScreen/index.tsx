import React from 'react';
import { SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { StatusBarDark, Title, FitImage } from '@pmk-team/common';
import { useActions, useSelector } from 'store';
import { Course } from 'modules/courses/store';
import styles from './styles';

const CourseItem: React.FC<{course: Course}> = ({ course }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Course', { course })}>
      {course.file_preview_url ? <FitImage url={course.file_preview_url}/> : null}
      <Title title={course.title} iconName="ios-school" forward/>
    </TouchableOpacity>
  );
};

const CoursesScreen = () => {
  const courses: Course[] = useSelector(state => state.courses.courses);
  const { getCourses } = useActions();

  useFocusEffect(React.useCallback(() => {
    getCourses();
  }, [getCourses]));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarDark/>
      <FlatList
        data={courses}
        renderItem={({ item }) => <CourseItem course={item}/>}
        keyExtractor={(item) => `course-${item.id}`}
      />
    </SafeAreaView>
  );
};

export default CoursesScreen;
