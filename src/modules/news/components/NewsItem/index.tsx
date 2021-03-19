import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useActions } from 'store';
import { Publication } from 'modules/news/store';
import { TextHtml, FitImage, Title } from '@pmk-team/common';
import styles from './styles';

interface Props {
  pub: Publication;
  details?: boolean;
}

const NewsItem: React.FC<Props> = ({ pub, details = false }) => {
  const navigation = useNavigation();
  const { readPublication } = useActions();

  const toPublication = () => {
    if (!details) {
      readPublication(pub);
      navigation.navigate('Publication', { publication: pub });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toPublication} activeOpacity={details ? 1 : 0.2}>
        <View style={styles.imgBlock}>
          {pub.image_preview_url ? <FitImage url={pub.image_preview_url}/> : null}
          {!pub.readed ? (
            <View style={styles.noReadBlock}>
              <Text style={styles.noReadText}>new</Text>
            </View>
          ) : null}
        </View>

        <Title
          iconName="ios-newspaper"
          title={pub.title}
          subtitle={pub.anons}
          forward={!details}
          date={pub.created_at}
        />

        {details ? (
          <View style={styles.contentBlock}>
            <TextHtml>{pub.content}</TextHtml>
          </View>
        ) : null}

      </TouchableOpacity>
    </View>
  );
};

export default NewsItem;
