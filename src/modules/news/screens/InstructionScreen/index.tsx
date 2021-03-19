import React from 'react';
import { View, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';

import { Settings, Title, FitImage } from '@pmk-team/common';
import { Instruction } from 'modules/news/store';
import styles from './styles';

const InstructionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const instruction: Instruction = route.params.instruction;

  const pdfUrl = instruction.pdf_file_url;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.item}>
          {instruction.image_preview_url ? <FitImage url={instruction.image_preview_url}/> : null}
          <Title title={instruction.title} iconName="ios-school"/>
          <View style={styles.content}>
            {pdfUrl?.includes('pdf') ?
              <Button
                mode="contained"
                onPress={() => navigation.navigate('Pdf', { url: pdfUrl })}
                color={Settings.colors.primary}
              >Документ PDF <Ionicons name="ios-bookmarks" style={styles.btnIcon}/>
              </Button>
              : null
            }
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default InstructionScreen;
