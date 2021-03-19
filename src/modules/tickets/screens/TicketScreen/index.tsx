import React, { useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Keyboard,
  Platform,
} from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Avatar, TextInput } from 'react-native-paper';

import {
  FileInput,
  UploadFile,
  ZoomViewer,
  DropdownAlertService,
  StatusBarDark,
  FitImage,
  Quote,
  BadgeIcon,
  ax,
  Settings,
} from '@pmk-team/common';
import { Ticket, Message, TicketsResponse } from 'modules/tickets/store';
import { profileIdSelector } from 'modules/auth/store';
import { useActions, useSelector } from 'store';
import styles from './styles';

const MessageItem: React.FC<{message: Message}> = ({ message }) => {
  const [zoomPopup, setZoomPopup] = useState(false);

  return (
    <View style={styles.item}>
      <View style={styles.row}>
        <View style={styles.row}>
          {message.userFromAvatar ? (
            <Avatar.Image
              size={24}
              style={styles.avatar}
              source={{ uri: message.userFromAvatar }}
            />
          ) : null}
          <Text style={styles.name}>{message.userFromName}:</Text>
        </View>
        <Text style={styles.createdAt}>{message.created}</Text>
      </View>

      {message.message && message.message.length > 0 ? (
        <Quote>{message.message}</Quote>
      ) : null}

      {message.file_url ? (
        <>
          <TouchableOpacity style={styles.messagePhoto} onPress={() => setZoomPopup(true)}>
            <FitImage url={message.file_url}/>
          </TouchableOpacity>
          <ZoomViewer zoomPopup={zoomPopup} setZoomPopup={setZoomPopup} url={message.file_url}/>
        </>
      ) : null}
    </View>
  );
};

const TicketScreen = () => {
  const { getTickets } = useActions();
  const route = useRoute();
  const profile_id = useSelector(profileIdSelector);
  const [message, setMessage] = useState('');
  const [document, setDocument] = useState<UploadFile | null>(null);
  const [chatList, setChatList] = useState<FlatList<Message> | null>(null);
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState<Ticket | undefined>();

  const scrollChat = (animated = true) => {
    if (chatList) {
      chatList.scrollToEnd({ animated });
      setTimeout(() => chatList.scrollToEnd({ animated }), 300);
      setTimeout(() => chatList.scrollToEnd({ animated }), 600);
    }
  };

  // @ts-ignore
  const ticketId: number = route.params.ticketId;

  useFocusEffect(React.useCallback(() => {
    scrollChat(false);
    ax().post<TicketsResponse>('tickets/api/no-log/get-my-tickets', { profile_id, ticket_id: ticketId })
      .then(response => {
        if (response.data.tickets.length > 0) {
          setTicket(response.data.tickets.find(t => t.id === ticketId));
        }
      });
    ax().post('tickets/api/messages/readed-by-profile', {
      profile_id,
      ticket_id: ticketId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []));

  useEffect(() => {
    scrollChat(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatList]);

  const send = () => {
    if (loading || !ticket) {return;}
    const payload = {
      profile_id,
      ticket_id: ticket.id,
      message,
      file: document?.base64,
    };
    ax({ setLoading }).post('tickets/api/messages/add', payload)
      .then(response => {
        ticket.messages.push(response.data.message);
        setMessage('');
        setDocument(null);
        Keyboard.dismiss();
        getTickets();
      })
      .catch(error => DropdownAlertService.alert('error', error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarDark/>
      <View style={styles.titleBox}>
        <View style={styles.titleLeft}>
          <BadgeIcon
            iconProps={{ name: 'ios-chatbox', style: styles.titleIcon }}
            badge={ticket ? ticket.messages.length : 0}
            badgeTheme="dark"
          />
          <Text style={styles.title}>{ticket?.title}</Text>
        </View>
        <View style={styles.titleRight}>
          {ticket && ticket.status === 'new' ?
            <Ionicons name="ios-lock-open" style={styles.lockOpenIcon}/>
            : null
          }
          {ticket && ticket.status !== 'new' ?
            <Ionicons name="ios-lock-closed" style={styles.lockClosedIcon}/>
            : null
          }
        </View>
      </View>

      <FlatList
        data={ticket ? ticket.messages : []}
        renderItem={({ item }) => <MessageItem message={item}/>}
        keyExtractor={(message) => `msg-${message.id}`}
        ref={ref => setChatList(ref)}
        onContentSizeChange={() => scrollChat()}
        onLayout={() => scrollChat()}
        initialNumToRender={100}
        maxToRenderPerBatch={10}
      />

      <View style={styles.sendbox}>
        <TextInput
          value={message}
          onChangeText={message => setMessage(message)}
          label="сообщение..."
          multiline={true}
          numberOfLines={3}
          style={styles.sendboxInput}
        />
        <FileInput
          title={'Добафить фото'}
          file={document}
          setFile={file => setDocument(file)}
          iconProps={{ name: 'ios-camera', style: styles.cameraBtnIcon }}
          containerStyle={styles.cameraBtn}
        />
        <TouchableOpacity onPress={send} style={styles.sendBtn}>
          <Ionicons
            name="ios-paper-plane"
            style={styles.sendBtnIcon}
            color={loading ? 'grey' : Settings.colors.primary}
          />
        </TouchableOpacity>
      </View>

      {Platform.OS === 'ios' ? <KeyboardSpacer topSpacing={-80}/> : null}
    </SafeAreaView>
  );
};

export default TicketScreen;
