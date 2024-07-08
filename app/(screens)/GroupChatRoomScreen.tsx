import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Message {
  _id: string;
  text: string;
  sender: {
    _id: string;
    fullNames: string;
    profile: string;
  };
  createdAt: string;
}

const CHATBOT = {
  _id: "667c32438d309cd70ecedad2",
  fullNames: "Chatbot",
  profile: "😊",
};

const chatbotMessages = [
  "Hello @Team 👋!\n1. What did you do yesterday?\n2. What are you planning to do today?\n3. Are there any blockers in your way?",
];

interface ChatRoomScreenProps {
  route?: {
    params?: {
      chatId?: string;
      chatTitle?: string;
      chatImage?: string;
    };
  };
}

const GroupChatRoomScreen: React.FC<ChatRoomScreenProps> = ({ route }) => {
  const router = useRouter();
  const { chatId, chatTitle, chatImage } = useLocalSearchParams<{
    chatId: string;
    chatTitle: string;
    chatImage: string;
  }>();
  const [currentUser, setCurrentUser] = useState<{
    _id: string;
    name: string;
    profileImage: string;
  } | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const fetchIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const flatListRef = useRef<FlatList<Message> | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem("userId");
        if (token) {
          setToken(token);
          setUserId(userId);
        } else {
          router.push("/home");
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        setError("Failed to fetch token");
      }
    };

    fetchToken();

    const fetchChatData = async () => {
      try {
        if (!chatId || !token) return;

        const chatResponse = await fetch(
          `http://167.99.192.166:4000/api/v1/chats/view/${chatId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const chatData = await chatResponse.json();

        if (chatData.status === "Success" && chatData.data) {
          if (chatData.data.messages && chatData.data.messages.length > 0) {
            const formattedMessages = chatData.data.messages.map(
              (msg: Message) => ({
                _id: msg._id,
                text: msg.text,
                sender: {
                  _id: msg.sender._id,
                  fullNames: msg.sender.fullNames,
                  profile: msg.sender.profile,
                },
                createdAt: new Date(msg.createdAt),
              })
            );
            formattedMessages.sort(
              (a: any, b: any) => a.createdAt.getTime() - b.createdAt.getTime()
            );
            setMessages(formattedMessages);
          }
        } else {
          setError("Failed to fetch chat data");
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatData();
    fetchIntervalRef.current = setInterval(
      fetchChatData,
      1000
    ) as NodeJS.Timeout;

    return () => {
      if (fetchIntervalRef.current) {
        clearInterval(fetchIntervalRef.current);
      }
    };
  }, [chatId, token, router]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch(
        `http://167.99.192.166:4000/api/v1/chats/send-message/${chatId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: newMessage,
            type: "text",
            sender: userId ?? "",
          }),
        }
      );

      const result = await response.json();
      if (result.status === "Success") {
        const newMsg: Message = {
          _id: result.data._id,
          text: newMessage,
          sender: {
            _id: userId ?? "",
            fullNames: "",
            profile: "",
          },
          createdAt: new Date().toISOString(),
        };

        setMessages((prevMessages) => [...prevMessages, newMsg]);
        setNewMessage("");

        if (flatListRef.current) {
          flatListRef.current.scrollToEnd({ animated: true });
        }
      } else {
        setError("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message");
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageItem,
        item.sender._id === userId
          ? styles.currentUserMessage
          : styles.otherUserMessage,
      ]}
    >
      <View style={styles.messageContent}>
        <View style={styles.messageRow}>
          {item.sender.profile ? (
            <Image
              source={{ uri: item.sender.profile }}
              style={styles.avatar}
            />
          ) : (
            <Text style={styles.avatar}>😊</Text>
          )}
          <Text style={styles.senderName}>{item.sender.fullNames}</Text>
        </View>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>
          {getRelativeTime(item.createdAt)}
        </Text>
      </View>
    </View>
  );

  const getRelativeTime = (createdAt: string) => {
    const messageDate = new Date(createdAt);
    const currentDate = new Date();
    const diffTime = currentDate.getTime() - messageDate.getTime();
    const diffSeconds = Math.floor(diffTime / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) {
      return "Just now";
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return `${diffDays} days ago`;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#19459d" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          {chatImage ? (
            <Image source={{ uri: chatImage }} style={styles.chatImage} />
          ) : (
            <View style={styles.chatImagePlaceholder}>
              <Text style={styles.chatImageText}>😊</Text>
            </View>
          )}
          <Text style={styles.chatTitle}>{chatTitle}</Text>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messageList}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            style={styles.sendButton}
          >
            <Ionicons name="send" size={24} color="#19459d" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    marginRight: 10,
  },
  chatImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  chatImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
  },
  chatImageText: {
    fontSize: 24,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  messageList: {
    padding: 10,
  },
  messageItem: {
    marginBottom: 10,
  },
  currentUserMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    borderRadius: 10,
    padding: 10,
  },
  otherUserMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#def3ff",
    borderRadius: 10,
    padding: 10,
  },
  messageContent: {
    maxWidth: "80%",
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  senderName: {
    fontWeight: "bold",
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
  },
  sendButton: {
    marginLeft: 10,
    borderRadius: 20,
    padding: 10,
  },
});

export default GroupChatRoomScreen;
