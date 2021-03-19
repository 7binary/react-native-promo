import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { List, Title, Checkbox, Button, TextInput, Chip } from 'react-native-paper';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Settings, FitImage, TextHtml, DropdownAlertService, ax } from '@pmk-team/common';
import { Survey, SurveyQuestion, SurveyUserPayload } from 'modules/surveys/store';
import { useActions, useSelector } from 'store';
import styles from './styles';
import { profileIdSelector } from 'modules/auth/store';

const SurveyScreen = () => {
  const route = useRoute();
  const { getSurveys } = useActions();
  const navigation = useNavigation();
  // @ts-ignore
  const { survey }: {survey: Survey} = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [expandedQuestion, setExpandedQuestion] = useState<number>(0);
  const [payload, setPayload] = useState<SurveyUserPayload>();
  const profile_id = useSelector(profileIdSelector);

  useFocusEffect(React.useCallback(() => {
    if (survey) {
      const newPayload: SurveyUserPayload = {
        profile_id,
        survey_id: survey.id,
        type: 'answer',
        questions: {},
      };
      survey.questions.forEach(question => {
        newPayload.questions[question.id] = {
          id: question.id,
          user_comment: '',
          checked: question.multiple ? [] : 0,
        };
      });
      setPayload(newPayload);
      if (survey.questions.length > 0) {
        setExpandedQuestion(survey.questions[0].id);
      }
    }
  }, [survey, profile_id]));

  if (!survey) {
    return null;
  }

  const setAnswer = (question: SurveyQuestion, answerId: number) => {
    const newPayload: SurveyUserPayload | any = { ...payload };
    let checked: any = newPayload.questions[question.id].checked;

    if (question.multiple) {
      if (checked.includes(answerId)) {
        checked = checked.filter((id: number) => id !== answerId);
      } else {
        checked.push(answerId);
      }
    } else {
      checked = checked === answerId ? 0 : answerId;
    }

    newPayload.questions[question.id].checked = checked;
    setPayload(newPayload);
  };

  const setUserComment = (question: SurveyQuestion, message: string) => {
    const newPayload: SurveyUserPayload | any = { ...payload };
    newPayload.questions[question.id].user_comment = message;
    setPayload(newPayload);
  };

  const nextQuestion = (currentIndex: number) => {
    const nextIndex = currentIndex + 1;
    if (survey.questions[nextIndex]) {
      setExpandedQuestion(survey.questions[nextIndex].id);
    }
  };

  const handleSubmit = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const sendPayload: SurveyUserPayload | any = { ...payload };
    sendPayload.questions = Object.values(sendPayload.questions);

    ax().post('survey/api/surveys/survey-answer', sendPayload)
      .then(response => {
        DropdownAlertService.alert('info', response.data.message);
        const goHome = () => navigation.navigate('DashboardNav', {
          screen: 'Dashboard',
        });
        getSurveys(goHome);
      })
      .catch(error => DropdownAlertService.alert('error', error))
      .finally(() => setLoading(false));
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <View style={styles.surveyInfo}>
        {survey.bonuses ? (
          <Chip icon="information" style={styles.bonuses}>
            +{survey.bonuses} баллов за прохождение
          </Chip>
        ) : null}
        <Title style={styles.title}>{survey.title}</Title>
        {survey.image_url ? (
          <View style={styles.imageContainer}>
            <FitImage url={survey.image_url}/>
          </View>
        ) : null}
        <TextHtml containerStyle={styles.content}>{survey.content}</TextHtml>
      </View>

      <List.Section style={styles.questions}>
        {survey.questions.map((question, index) => {
          const comment = payload?.questions[question.id].user_comment;
          const checked: any = payload?.questions[question.id].checked;
          const hasAnswer = (Array.isArray(checked) && checked.length > 0)
            || checked > 0
            || (question.custom && comment && comment.length > 0);
          const nextExpanded = expandedQuestion === question.id ? 0 : question.id;
          let description;

          if (question.multiple) {
            description = '* укажите один или несколько ответов';
          } else if (question.custom) {
            description = '* произвольный ответ';
          }

          return (
            <List.Accordion
              key={`q-${question.id}`}
              style={styles.question}
              expanded={expandedQuestion === question.id}
              onPress={() => setExpandedQuestion(nextExpanded)}
              title={question.title}
              titleNumberOfLines={5}
              description={description}
              left={() => (
                <Text
                  style={{
                    ...styles.questionNumber,
                    backgroundColor: hasAnswer ? 'green' : '#888',
                  }}
                >
                  {index + 1}
                </Text>
              )}
            >
              {/* custom question-answer */}
              {question.custom ? (
                <View style={styles.answers}>
                  <TextInput
                    value={comment ? comment : ''}
                    onChangeText={message => setUserComment(question, message)}
                    label="Ваш ответ"
                    multiline={true}
                    numberOfLines={3}
                    style={styles.userComment}
                  />
                </View>
              ) : null}
              {/* answers */}
              {!question.custom ? (
                <View style={styles.answers}>
                  {question.answers.map(answer => {
                    const isChecked = checked === answer.id
                      || (Array.isArray(checked) && checked.includes(answer.id));
                    return (
                      <View key={`a-${answer.id}`} style={styles.answer}>
                        <Checkbox.Item
                          label={answer.title}
                          color="green"
                          status={isChecked ? 'checked' : 'unchecked'}
                          onPress={() => setAnswer(question, answer.id)}
                        />
                      </View>
                    );
                  })}
                </View>
              ) : null}
              {/* next button */}
              {(index + 1) < survey.questions.length ? (
                <View style={styles.nextContainer}>
                  <Button
                    mode="contained"
                    onPress={() => nextQuestion(index)}
                    color={Settings.colors.primary}
                  >Далее</Button>
                </View>
              ) : null}
            </List.Accordion>
          );
        })}
      </List.Section>

      <View style={styles.submitContainer}>
        <Button
          loading={loading}
          mode="contained"
          onPress={handleSubmit}
          color={Settings.colors.primary}
          icon={({ color }) => <Ionicons name="ios-paper-plane" size={24} color={color}/>}
        >Отправить</Button>
      </View>
    </ScrollView>
  );
};

export default SurveyScreen;
