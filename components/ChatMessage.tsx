import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Define the type for a single chat message
type ChatMessage = {
  id: number;
  profileImage: any; // Assuming profileImage is of type any, replace with the correct type if possible
  text: string;
};

type Props = {
  message: ChatMessage;
  isCurrentUser: boolean;
};

const ChatMessage = ({ message, isCurrentUser }: Props) => {
  return (
    <View style={[styles.container, isCurrentUser ? styles.currentUser : styles.otherUser]}>
      {!isCurrentUser && <Image source={message.profileImage} style={styles.profileImage} />}
      <View style={styles.messageBubble}>
        <Text style={styles.messageText}>{message.text}</Text>
      </View>
      {isCurrentUser && <Image source={message.profileImage} style={styles.profileImage} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  currentUser: {
    justifyContent: 'flex-end',
  },
  otherUser: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: '#DCF8C6',
  },
  messageText: {
    fontSize: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default ChatMessage;
