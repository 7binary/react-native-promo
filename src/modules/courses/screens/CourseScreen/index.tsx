import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, List } from 'react-native-paper';
import YouTube from 'react-native-youtube';
import ProgressCircle from 'react-native-progress-circle';
import IconFA from 'react-native-vector-icons/FontAwesome';

import {
  Settings,
  TextHeader,
  FitImage,
  Title,
  CheckboxRadio,
  DropdownAlertService,
  ax,
} from '@pmk-team/common';
import { useSelector } from 'store';
import { Course, CourseAnswer, CourseQuestion, CourseTry } from 'modules/courses/store';
import styles from './styles';
import { profileIdSelector } from 'modules/auth/store';

interface IYoutubeVideoProps {
  url: string | null;
  title: string | null;
}

const YoutubeVideo: React.FC<IYoutubeVideoProps> = ({ url, title }) => {
  const [play, setPlay] = useState(false);
  if (!url) {
    return null;
  }
  return (
    <View style={styles.video}>
      <TouchableOpacity style={styles.videoInfo} onPress={() => setPlay(!play)}>
        <View>
          <Ionicons style={styles.videoIcon} name="ios-logo-youtube" size={30} color="maroon"/>
        </View>
        <Text style={styles.videoTitle}>
          {title && title.length > 0 ? title : 'YouTube'}
        </Text>
      </TouchableOpacity>

      {/* @ts-ignore */}
      <YouTube apiKey={'AIzaSyD-Oo48Z1peMSd6_7-OO8tUhJepxI6G54M'}
        videoId={findYoutubeId(url)}
        play={play}
        style={styles.youtube}
      />
    </View>
  );
};

const CourseScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [loading, setLoading] = useState<boolean>(false);
  const [showTest, setShowTest] = useState<boolean>(false);
  const [courseTry, setCourseTry] = useState<CourseTry | null>(null);
  const [courseTries, setCourseTries] = useState<CourseTry[]>([]);
  const [step, setStep] = useState<number>(0);
  const [checkedAnswers, setCheckedAnswers] = useState<number[]>([]);
  const profile_id = useSelector(profileIdSelector);
  // @ts-ignore
  const { course }: {course: Course} = route.params;
  const test_id = course?.tests[0]?.id;

  const loadTries = (test_id: number) => {
    const payload = { test_id, profile_id };
    ax().post<{tries: CourseTry[]}>('courses/api/test-try/list', payload)
      .then(response => {
        setCourseTries(response.data.tries);
      });
  };

  const loadCurrentTry = (test_id: number) => {
    ax().post<{'try': CourseTry | null}>('courses/api/test-try/index', { profile_id, test_id })
      .then(response => {
        if (response.data.try) {
          setCourseTry(response.data.try);
          setStep(response.data.try.step);
        }
      })
      .catch(() => {
        setCourseTry(null);
        setStep(0);
      });
  };

  useFocusEffect(React.useCallback(() => {
    setShowTest(false);
    if (test_id) {
      loadCurrentTry(test_id);
      loadTries(test_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test_id]));

  const test = course.tests[0];
  const testBonuses = test ? Math.max(...test.courseBonuses.map(b => b.bonuses)) : 0;

  const checkAnswer = (question: CourseQuestion, answer: CourseAnswer) => {
    if (question.isSingleAnswer) {
      setCheckedAnswers([answer.id]);
    } else {
      if (checkedAnswers.includes(answer.id)) {
        setCheckedAnswers(checkedAnswers.filter((id: number) => id !== answer.id));
      } else {
        setCheckedAnswers([...checkedAnswers, answer.id]);
      }
    }
  };

  const sendAnswer = (question_id: number, answer_ids: number[]) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const try_id = courseTry?.id;
    const payload = { profile_id, try_id, question_id, answer_ids };

    ax().post<{'try': CourseTry}>('courses/api/test-try/answer', payload)
      .then(response => {
        setCourseTry(response.data.try);
        setStep(response.data.try.step);
      })
      .catch(error => {
        if (error.response.status === 301) {
          setStep(0);
          loadTries(test_id);
          loadCurrentTry(test_id);
          DropdownAlertService.alert('info', 'Спасибо за прохождение теста!');
          setShowTest(false);
        } else {
          DropdownAlertService.alert('error', error);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* show course image only if there is no youtube frames */}
        {course.file_preview_url
        && !course.video_1_frame
        && !course.video_2_frame
        && !course.video_3_frame ? (
          <FitImage url={course.file_preview_url}/>
        ) : null}

        <Title title={course.title} iconName="ios-school"/>

        {/* youtube frames */}
        <YoutubeVideo url={course.video_1_frame} title={course.video_1_title}/>
        <YoutubeVideo url={course.video_2_frame} title={course.video_2_title}/>
        <YoutubeVideo url={course.video_3_frame} title={course.video_3_title}/>

        {/* course pdf */}
        {course.file_url && course.file_url.includes('pdf') ? (
          <View style={styles.content}>
            <Button mode="contained"
              onPress={() => navigation.navigate('PdfDocument', { uri: course.file_url })}
              color={Settings.colors.primary}
              icon={({ color }) => (
                <IconFA name="file-pdf-o" size={24} color={color}/>
              )}
            >Документ PDF</Button>
          </View>
        ) : null}

        {/* current test try */}
        {courseTry && step && test && test.questions.length > 0 ? (
          <View style={styles.test}>
            {!showTest ? (
              <View style={styles.content}>
                <Button mode="contained"
                  onPress={() => setShowTest(true)}
                  color={Settings.colors.accent}
                  icon={({ color }) => (
                    <IconFA name="flag-o" size={24} color={color}/>
                  )}
                >Пройти тест</Button>
              </View>
            ) : null}

            {showTest ? (
              <>
                {/* header of test */}
                <TouchableOpacity onPress={() => setShowTest(false)}>
                  <TextHeader>
                    {testBonuses > 0 ? `+${testBonuses} баллов за прохождение теста` : 'Пройдите тест'}
                  </TextHeader>
                </TouchableOpacity>
                {/* questions of test */}
                <View style={styles.questions}>
                  {test?.questions.map((question, questionIndex) => (
                    <List.Accordion
                      key={`q-${question.id}`}
                      style={styles.question}
                      expanded={step === (questionIndex + 1)}
                      title={question.title}
                      titleNumberOfLines={5}
                      description={question.isSingleAnswer ? undefined : '* можно указать несколько ответов'}
                      left={() => (
                        <Text
                          style={{
                            ...styles.questionNumber,
                            backgroundColor: step > (questionIndex + 1) ? 'green' : '#888',
                          }}
                        >
                          {questionIndex + 1}
                        </Text>
                      )}
                    >
                      {/* answers */}
                      <View style={styles.answers}>
                        {question.answers.map(answer => {
                          const isChecked = checkedAnswers.includes(answer.id);
                          return (
                            <View key={`a-${answer.id}`} style={styles.answer}>
                              <CheckboxRadio
                                label={answer.title}
                                isChecked={isChecked}
                                onPress={() => checkAnswer(question, answer)}
                              />
                            </View>
                          );
                        })}
                      </View>

                      {/* send answer button */}
                      <View style={styles.nextContainer}>
                        <Button
                          mode="contained"
                          onPress={() => sendAnswer(question.id, checkedAnswers)}
                          color={Settings.colors.primary}
                          icon={({ color }) => (
                            <Ionicons name="ios-paper-plane" size={24} color={color}/>
                          )}
                        >Ответить</Button>
                      </View>
                    </List.Accordion>
                  ))
                  }
                </View>
              </>
            ) : null}
          </View>
        ) : null}

        {/* finished test tries */}
        {courseTries.filter(t => t.finished).map(finishedTry => {
          const total = finishedTry.correct_answers + finishedTry.wrong_answers;
          const percent = Math.floor(finishedTry.correct_answers * 100 / total);
          return (
            <View style={styles.try} key={`t-${finishedTry.id}`}>
              <TextHeader>Результат тестирования №{finishedTry.position}</TextHeader>
              <View style={styles.tryInfo}>
                <View style={styles.row}>
                  <Text style={styles.label}>Дата:</Text>
                  <Text style={styles.value}>{finishedTry.finished_at}</Text>
                </View>
                {finishedTry.bonuses && finishedTry.bonuses > 0 ? (
                  <View style={styles.row}>
                    <Text style={styles.label}>Получено бонусов:</Text>
                    <Text style={styles.value}>{finishedTry.bonuses}</Text>
                  </View>
                ) : null}
                {finishedTry.extra_bonuses && finishedTry.extra_bonuses > 0 ? (
                  <View style={styles.row}>
                    <Text style={styles.label}>Доначислено бонусов:</Text>
                    <Text style={styles.value}>{finishedTry.extra_bonuses}</Text>
                  </View>
                ) : null}
                <View style={styles.row}>
                  <Text style={styles.label}>Правильных ответов:</Text>
                  <Text style={styles.value}>
                    {finishedTry.correct_answers} из {total}
                  </Text>
                </View>

                <View style={styles.progress}>
                  <ProgressCircle
                    percent={percent}
                    radius={45}
                    borderWidth={8}
                    color={Settings.colors.accent}
                    shadowColor="#999"
                    bgColor="#fff"
                  >
                    <Text style={styles.progressPercent}>{percent}%</Text>
                  </ProgressCircle>
                </View>
              </View>
            </View>
          );
        })}

      </View>
    </ScrollView>
  );
};

function findYoutubeId(sourceUrl: string): string | undefined {
  let id: any;
  const url = sourceUrl
    .replace(/(>|<)/gi, '')
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

  if (url[2] !== undefined) {
    id = url[2].split(/[^0-9a-z_-]/i);
    id = id[0];
  } else {
    id = url;
  }
  return id ? id : undefined;
}

export default CourseScreen;
