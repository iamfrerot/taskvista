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

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  profileImage: any;
}

// Define constant user data
const user1 = {
  id: 2,
  name: "John Peter",
  profileImage: require("../../assets/images/loginimg.png"),
};

const user2 = {
  id: 3,
  name: "Jane Smith",
  profileImage: require("../../assets/images/dev2.jpeg"),
};

const user3 = {
  id: 4,
  name: "Alice Johnson",
  profileImage: require("../../assets/images/dev3.jpeg"),
};

const group = {
  id: 1,
  groupName: 'Frontend Team',
  time: 'Yesterday',
  groupImage: require('../../assets/images/proj1.jpeg'),
};

interface ChatRoomScreenProps {
  route?: {
    params?: {
      user?: string;
    };
  };
}

const GroupChatRoomScreen: React.FC<ChatRoomScreenProps> = ({ route }) => {
  const router = useRouter();
  // set const data to hold the user object
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
        // Handle parsing error gracefully, for example, navigate back to the previous screen or show an error message
      }
    }

    // Set default messages from different users
    const defaultMessages = [
      { id: 1, sender: user1.name, text: "Hey, how are you?", time: '10:00 AM', profileImage: user1.profileImage },
      { id: 2, sender: user2.name, text: "I'm good, how about you?", time: '10:01 AM', profileImage: user2.profileImage },
      { id: 3, sender: user3.name, text: "Hi everyone!", time: '10:02 AM', profileImage: user3.profileImage },
      { id: 4, sender: user1.name, text: "Hello! Let's start the meeting.", time: '10:04 AM', profileImage: user1.profileImage },
    ];
    setMessages(defaultMessages);
  }, [route]);

  // If user object is not found or parsing failed, display an error message
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
        profileImage: require("../../assets/images/dev1.png"), // Assume current user's profile image
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
      <Image source={item.profileImage} style={styles.messageProfileImage} />
      <View style={styles.messageContent}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
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
          {group && <Image source={group.groupImage} style={styles.profileImage} />}
          {group && <Text style={styles.userName}>{group.groupName}</Text>}
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
    flexDirection: "row",
    alignItems: "center",
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
  messageProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  messageContent: {
    maxWidth: "80%",
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

export default GroupChatRoomScreen;
