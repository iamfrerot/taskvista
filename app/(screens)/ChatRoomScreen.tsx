// /home/happi/TaskVista/app/(screens)/ChatRoomScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChatMessage } from "../../constants/data";

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
}

// Define constant user data
const user1 = {
  id: 2,
  lastMessage: "Hey, how are you?",
  name: "John Doe",
  profileImage: require("../../assets/images/loginimg.png"), // Provide the correct path to the image
  time: "10:30 AM",
};

interface ChatRoomScreenProps {
  route?: {
    params?: {
      user?: string;
    };
  };
}

const ChatRoomScreen: React.FC<ChatRoomScreenProps> = ({ route }) => {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; profileImage: any } | null>(
    null
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (route && route.params && route.params.user) {
      try {
        const parsedUser = JSON.parse(route.params.user);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user object:", error);
      }
    }

    // Set default messages from ChatMessage
    const defaultMessages = [
      { id: ChatMessage[0].id, sender: ChatMessage[0].sender, text: ChatMessage[0].message, time: '10:00 AM' },
      { id: ChatMessage[1].id, sender: ChatMessage[1].sender, text: ChatMessage[1].message, time: '10:01 AM' },
      { id: ChatMessage[2].id, sender: ChatMessage[2].sender, text: ChatMessage[2].message, time: '10:02 AM' },
      { id: ChatMessage[3].id, sender: ChatMessage[3].sender, text: ChatMessage[3].message, time: '10:04 AM' },
    ];
    setMessages(defaultMessages);
  }, [route]);

  if (!user1) {
    return <Text>Error: User not found</Text>;
  }

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "currentUser",
        text: inputText,
        time: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setInputText("");
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageItem,
        item.sender === "currentUser"
          ? styles.currentUserMessage
          : styles.otherUserMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 10 }}>
            <Ionicons name='arrow-back' size={24} color='black' />
          </TouchableOpacity>
          {user1 && <Image source={user1.profileImage} style={styles.profileImage} />}
          {user1 && <Text style={styles.userName}>{user1.name}</Text>}
        </View>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          style={styles.messageList}
        />
        <View style={styles.inputContainer}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder='Type a message'
            style={styles.textInput}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Ionicons name='send' size={24} color='#fff' />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  messageList: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messageItem: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
  },
  currentUserMessage: {
    backgroundColor: "#dcf8c6",
    alignSelf: "flex-end",
  },
  otherUserMessage: {
    backgroundColor: "#f1f1f1",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: "#888",
    textAlign: "right",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  textInput: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#007AFF",
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatRoomScreen;
