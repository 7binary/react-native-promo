import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { List } from 'react-native-paper';

import { FeedbackMessage, FeedbackReply } from 'modules/feedback/store';
import { TextHtml, FitImage } from '@pmk-team/common';
import styles from './styles';

const FeedbackMessages: React.FC<{messages: FeedbackMessage[]}> = ({ messages }) => {
  if (messages.length === 0) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <List.AccordionGroup>
        {messages.map((message: FeedbackMessage) => (
          <View style={styles.msg} key={`msg-${message.id}`}>
            <List.Accordion
              title={
                <View>
                  <Text>{message.content}</Text>
                  <View style={styles.msgQuestionInfo}>
                    {message.is_processed ?
                      <Text style={styles.statusProcessed}>обработан</Text>
                      : <Text style={styles.statusProcessing}>обрабатывается</Text>
                    }
                    {message.replies.length > 0 ?
                      <Text>ответов: {message.replies.length}</Text>
                      : null
                    }
                    <Text style={styles.msgDate}>{message.created_at}</Text>
                  </View>
                </View>
              }
              id={message.id}
              titleStyle={styles.msgQuestion}
            >
              {/* images attached */}
              {message.documents.length > 0 ?
                <View style={styles.documents}>
                  <Text>Прикрепленные файлы:</Text>
                  {message.documents.map((document) => (
                    <FitImage key={`doc-${document.id}`} url={document.url}/>
                  ))}
                </View>
                : null
              }

              {/* replies */}
              {message.replies.length > 0 ?
                <View style={styles.msgReplies}>
                  {message.replies.map((reply: FeedbackReply) => (
                    <View key={`reply-${reply.id}`}>
                      <View style={styles.replyInfo}>
                        <Text style={styles.adminName}>{reply.adminUser.name}:</Text>
                        <Text style={styles.msgDate}>{reply.created_at}</Text>
                      </View>
                      <TextHtml>{reply.reply}</TextHtml>
                    </View>
                  ))}
                </View>
                : null
              }
            </List.Accordion>
          </View>
        ))}
      </List.AccordionGroup>
    </ScrollView>
  );
};

export default FeedbackMessages;
