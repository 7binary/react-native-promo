import React from 'react';
import { useRoute } from '@react-navigation/native';

import { PdfView } from '@pmk-team/common';

const PdfDocumentScreen = () => {
  const route = useRoute();
  // @ts-ignore
  const { uri }: string = route.params;
  if (!uri) {
    return null;
  }

  return <PdfView uri={uri}/>;
};

export default PdfDocumentScreen;
