import React from 'react';
import { useRoute } from '@react-navigation/native';
import WebView from 'react-native-webview';

const WebviewScreen: React.FC = () => {
  const route = useRoute();
  // @ts-ignore
  const { url }: {url: string} = route.params;

  if (!url) {
    return null;
  }

  return (
    <WebView source={{ uri: url }}/>
  );
};

export default WebviewScreen;
