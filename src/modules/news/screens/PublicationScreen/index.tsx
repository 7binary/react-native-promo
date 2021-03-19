import React from 'react';
import { ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Publication } from 'modules/news/store';
import NewsItem from 'modules/news/components/NewsItem';

const PublicationScreen = () => {
  const route = useRoute();
  // @ts-ignore
  const { publication }: {publication: Publication} = route.params;

  if (!publication) {
    return null;
  }

  return (
    <ScrollView>
      <NewsItem pub={publication} details/>
    </ScrollView>
  );
};

export default PublicationScreen;
