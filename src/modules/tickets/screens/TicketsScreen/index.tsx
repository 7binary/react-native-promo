import React from 'react';
import { Text, SafeAreaView, View, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar, FAB } from 'react-native-paper';

import { TextHeader, Quote, FitImage, BadgeIcon, StatusBarDark } from '@pmk-team/common';
import { useActions, useSelector } from 'store';
import { Ticket } from 'modules/tickets/store';
import styles from './styles';

const TicketItem: React.FC<{ticket: Ticket}> = ({ ticket }) => {
  const navigation = useNavigation();
  const openTicket = () => navigation.navigate('Ticket', { ticketId: ticket.id });

  return (
    <TouchableOpacity style={styles.item} onPress={openTicket}>
      <View style={styles.titleBox}>
        <View style={styles.titleLeft}>
          <BadgeIcon
            iconProps={{ name: 'ios-chatbox', style: styles.titleIcon }}
            badge={ticket.messages.length}
            badgeTheme="dark"
          />
          <Text style={styles.title}>{ticket.title}</Text>
        </View>
        <View style={styles.titleRight}>
          {ticket.counter_profile > 0 ?
            <Text style={styles.unseen}>+{ticket.counter_profile}</Text>
            : null
          }
          {ticket.status === 'new' ?
            <Ionicons name="ios-lock-open" style={styles.lockOpenIcon}/>
            : null
          }
          {ticket.status !== 'new' ?
            <Ionicons name="ios-lock-closed" style={styles.lockClosedIcon}/>
            : null
          }
        </View>
      </View>
      <View style={styles.content}>
        {ticket.lastMessage ?
          <View>
            <View style={styles.row}>
              <View style={styles.row}>
                {ticket.lastMessage.userFromAvatar ?
                  <Avatar.Image
                    size={24}
                    style={styles.avatar}
                    source={{ uri: ticket.lastMessage.userFromAvatar }}
                  />
                  : null
                }
                <Text style={styles.name}>{ticket.lastMessage.userFromName}:</Text>
              </View>
              <Text style={styles.createdAt}>{ticket.lastMessage.created}</Text>
            </View>
            {ticket.lastMessage.message && ticket.lastMessage.message.length > 0 ?
              <Quote>
                {ticket.lastMessage.message}
              </Quote>
              : null
            }
            {ticket.lastMessage.file_url ?
              <View style={styles.messagePhoto}>
                <FitImage url={ticket.lastMessage.file_url}/>
              </View>
              : null
            }
          </View>
          : null
        }
      </View>
    </TouchableOpacity>
  );
};

const TicketsScreen = () => {
  const { getTickets } = useActions();
  const navigation = useNavigation();
  const tickets = useSelector(state => state.tickets.tickets);

  useFocusEffect(React.useCallback(() => {
    getTickets();
    if (tickets.length === 0) {
      navigation.navigate('CreateTicket');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarDark/>
      <TextHeader>Обращения</TextHeader>
      <FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
        data={tickets}
        renderItem={({ item }) => <TicketItem ticket={item}/>}
        keyExtractor={(ticket) => `ticket-${ticket.id}`}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('CreateTicket')}
      />
    </SafeAreaView>
  );
};

export default TicketsScreen;
