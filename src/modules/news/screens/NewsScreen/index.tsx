import React from 'react';
import { View, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { TextEmpty } from '@pmk-team/common';
import { useActions, useSelector } from 'store';
import { Publication } from 'modules/news/store';
import NewsItem from 'modules/news/components/NewsItem';
import styles from './styles';

const NewsScreen = () => {
  const { getNews } = useActions();
  const news: Publication[] = useSelector(state => state.news.news);

  useFocusEffect(React.useCallback(() => {
    getNews();
  }, [getNews]));

  return (
    <View style={styles.container}>
      <TextEmpty length={news.length}/>
      <FlatList
        data={news}
        renderItem={({ item }) => <NewsItem pub={item}/>}
        keyExtractor={(item) => `news-${item.id}`}
      />
    </View>
  );
};

export default NewsScreen;
