import React from 'react';
import { useRoute } from '@react-navigation/native';

import { PdfView } from '@pmk-team/common';

const PdfScreen: React.FC = () => {
  const route = useRoute();
  // @ts-ignore
  const { url }: {url: string} = route.params;
  if (!url) {
    return null;
  }

  return (
    <PdfView uri={url}/>
  );
};

export default PdfScreen;
