import React from 'react';
import { SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { StatusBarDark, Title, FitImage, TextEmpty } from '@pmk-team/common';
import { useActions, useSelector } from 'store';
import { Instruction } from 'modules/news/store';
import styles from './styles';

const InstructionItem: React.FC<{instruction: Instruction}> = ({ instruction }) => {
  const navigation = useNavigation();
  const { readInstruction } = useActions();
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        readInstruction(instruction);
        navigation.navigate('Pdf', { url: instruction.pdf_file_url });
      }}
    >
      {instruction.image_preview_url ? <FitImage url={instruction.image_preview_url}/> : null}
      <Title title={instruction.title} iconName="ios-school" forward/>
    </TouchableOpacity>
  );
};

const InstructionsScreen = () => {
  const instructions = useSelector(state => state.news.instructions);
  const { getInstructions } = useActions();

  useFocusEffect(React.useCallback(() => {
    getInstructions();
  }, [getInstructions]));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarDark/>
      <TextEmpty length={instructions.length}/>
      <FlatList
        data={instructions}
        renderItem={({ item }) => <InstructionItem instruction={item}/>}
        keyExtractor={(item) => `instruction-${item.id}`}
      />
    </SafeAreaView>
  );
};

export default InstructionsScreen;
