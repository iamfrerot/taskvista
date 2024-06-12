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
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
}

interface ChatRoomScreenProps {
  route?: {
    params?: {
      user?: string;
      chatId?: string;
    };
  };
}

const ChatRoomScreen: React.FC<ChatRoomScreenProps> = ({ route }) => {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; profileImage: any } | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  const chatId = route?.params?.chatId;
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ0ZTU2YzFkODk5NzhjMjdmZDJhNTgiLCJlbWFybCI6InBtdGFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMDc4ODIzMzU2MCIsImZ1bGxOYW1lcyIsIktldmluZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNzM1ODc2Mn0.zNKjtG2SxKWIR9HPkolgy8ltNCC4wrTvHpf7eKNjVLc";

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        // Fetch chat data
        const chatResponse = await fetch(
          `https://pmt-server-x700.onrender.com/api/v1/chats/view/${chatId}?populate=privateUser1,privateUser2`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const chatData = await chatResponse.json();
        console.log("Chat Data:", chatData); // Log chat data for debugging

        if (chatData.data) {
          const userData = chatData.data.privateUser1 || chatData.data.privateUser2;
          if (userData) {
            setUser({
              name: userData.fullNames,
              profileImage: { uri: userData.profileImage }, // Update based on your backend response
            });
          }
        }

        // Fetch messages
        const messagesResponse = await fetch(
          `https://pmt-server-x700.onrender.com/api/v1/messages?chat=${chatId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const messagesData = await messagesResponse.json();
        console.log("Messages Data:", messagesData); // Log messages data for debugging

        if (messagesData.data) {
          const formattedMessages = messagesData.data.map((msg: any) => ({
            id: msg._id,
            sender: msg.sender.fullNames,
            text: msg.text,
            time: new Date(msg.createdAt).toLocaleTimeString(),
          }));
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (chatId) {
      fetchChatData();
    }
  }, [chatId]);

  const handleSend = async () => {
    if (inputText.trim()) {
      const newMessage = {
        text: inputText,
        type: "text",
      };

      try {
        const response = await fetch(
          `https://pmt-server-x700.onrender.com/api/v1/chats/send-message/${chatId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newMessage),
          }
        );
        const messageData = await response.json();
        console.log("Sent Message Data:", messageData); // Log sent message data for debugging

        if (messageData.data) {
          const formattedMessage = {
            id: messageData.data._id,
            sender: "currentUser",
            text: messageData.data.text,
            time: new Date(messageData.data.createdAt).toLocaleTimeString(),
          };
          setMessages([...messages, formattedMessage]);
          setInputText("");
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#19459d" />
      </View>
    );
  }

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
          {user && <Image source={user.profileImage} style={styles.profileImage} />}
          {user && <Text style={styles.userName}>{user.name}</Text>}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatRoomScreen;
