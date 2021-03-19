import React from 'react';
import { View } from 'react-native';

import { Survey } from 'modules/surveys/store';
import { ListLink } from '@pmk-team/common';

const SurveysList: React.FC<{surveys: Survey[]}> = ({ surveys }) => {
  if (!surveys) {
    return null;
  }

  return (
    <View>
      {surveys.map(survey => (
        <ListLink
          key={`survey-${survey.id}`}
          navigate="Survey"
          navigateParams={{ survey }}
          iconName="md-wallet-outline"
          title="Пройти опрос"
          context={survey.bonuses ? survey.bonuses : null}
          subtitle={survey.bonuses ? 'баллов' : ''}
        />
      ))}
    </View>
  );
};

export default SurveysList;
