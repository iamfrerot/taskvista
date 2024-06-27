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

interface ChatRoomScreenProps {
 route?: {
  params?: {
   chatId?: string;
   chatTitle?: string;
   chatImage?: string;
  };
 };
}

const ChatRoomScreen: React.FC<ChatRoomScreenProps> = ({ route }) => {
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
 }, [router]);

 useEffect(() => {
  const fetchChatData = async () => {
   try {
    if (!chatId || !token) return;

    const chatResponse = await fetch(
     `https://pmt-server-x700.onrender.com/api/v1/chats/view/${chatId}`,
     {
      headers: {
       Authorization: `Bearer ${token}`,
      },
     }
    );
    const chatData = await chatResponse.json();

    if (chatData.status === "Success" && chatData.data) {
     const { privateUser1, privateUser2 } = chatData.data.chat;
     const loggedInUserId = userId;
     const loggedInUser =
      privateUser1._id === loggedInUserId ? privateUser1 : privateUser2;

     setCurrentUser({
      _id: loggedInUser._id,
      name: loggedInUser.fullNames,
      profileImage: loggedInUser.profile,
     });

     if (chatData.data.messages && chatData.data.messages.length > 0) {
      const formattedMessages = chatData.data.messages.map((msg: Message) => ({
       _id: msg._id,
       text: msg.text,
       sender: {
        _id: msg.sender._id,
        fullNames: msg.sender.fullNames,
        profile: msg.sender.profile,
       },
       createdAt: new Date(msg.createdAt),
      }));
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
    setError("Failed to load chat data");
   } finally {
    setLoading(false);
   }
  };

  fetchChatData();
  fetchIntervalRef.current = setInterval(fetchChatData, 1000) as NodeJS.Timeout;

  return () => {
   if (fetchIntervalRef.current) {
    clearInterval(fetchIntervalRef.current);
   }
  };
 }, [chatId, token]);

 const handleSendMessage = async () => {
  if (!newMessage.trim()) return;

  try {
   const response = await fetch(
    `https://pmt-server-x700.onrender.com/api/v1/chats/send-message/${chatId}`,
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
    <Text style={styles.messageText}>{item.text}</Text>
    <Text style={styles.messageTime}>{getRelativeTime(item.createdAt)}</Text>
   </View>
  </View>
 );

 const getRelativeTime = (createdAt: string) => {
  const messageDate = new Date(createdAt);
  const currentDate = new Date();
  const diffTime = currentDate.getTime() - messageDate.getTime();
  const diffSeconds = Math.floor(diffTime / 1000);
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffSeconds < 60) {
   return "Just now";
  } else if (diffMinutes === 1) {
   return "1 minute ago";
  } else if (diffMinutes < 60) {
   return `${diffMinutes} minutes ago`;
  } else if (diffHours === 1) {
   return "1 hour ago";
  } else if (diffHours < 24) {
   return `${diffHours} hours ago`;
  } else if (diffDays === 1) {
   return "Yesterday";
  } else if (diffDays < 7) {
   return `${diffDays} days ago`;
  } else if (diffDays < 14) {
   return "1 week ago";
  } else if (diffDays < 21) {
   return "2 weeks ago";
  } else if (diffDays < 28) {
   return "3 weeks ago";
  } else if (diffDays < 31) {
   return "1 month ago";
  } else {
   return messageDate.toLocaleDateString();
  }
 };

 if (loading) {
  return (
   <View style={styles.loadingContainer}>
    <ActivityIndicator size='large' color='#19459d' />
   </View>
  );
 }

 if (error) {
  return (
   <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{error}</Text>
   </View>
  );
 }

 return (
  <SafeAreaView style={{ flex: 1 }}>
   <View style={styles.header}>
    <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 10 }}>
     <Ionicons name='arrow-back' size={24} color='black' />
    </TouchableOpacity>
    {chatImage && (
     <Image source={{ uri: chatImage }} style={styles.profileImage} />
    )}
    {chatTitle && <Text style={styles.userName}>{chatTitle}</Text>}
   </View>
   <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : undefined}
   >
    <FlatList
     ref={flatListRef}
     data={messages}
     renderItem={renderMessage}
     keyExtractor={(item) => item._id}
     onContentSizeChange={() =>
      flatListRef.current?.scrollToEnd({ animated: true })
     }
    />
    <View style={styles.inputContainer}>
     <TextInput
      style={styles.textInput}
      value={newMessage}
      onChangeText={setNewMessage}
      placeholder='Type a message...'
      placeholderTextColor='#999'
     />
     <TouchableOpacity onPress={handleSendMessage}>
      <Ionicons name='send' size={24} color='#19459d' />
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
  color: "#333",
 },
 messageList: {
  flex: 1,
  backgroundColor: "#f0f0f0",
 },
 messageItem: {
  flexDirection: "row",
  alignItems: "flex-start",
  marginVertical: 5,
  marginHorizontal: 10,
  padding: 10,
  borderRadius: 10,
  maxWidth: "80%",
 },
 currentUserMessage: {
  backgroundColor: "#dcf8c6",
  alignSelf: "flex-end",
  borderTopRightRadius: 0,
 },
 otherUserMessage: {
  backgroundColor: "#def3ff",
  alignSelf: "flex-start",
  borderTopLeftRadius: 0,
 },
 messageContent: {
  marginLeft: 10,
  flexShrink: 1,
 },
 avatar: {
  width: 30,
  height: 30,
  borderRadius: 15,
 },
 senderName: {
  fontSize: 14,
  fontWeight: "bold",
  color: "#333",
 },
 messageText: {
  fontSize: 16,
  color: "#000",
 },
 messageTime: {
  fontSize: 12,
  color: "#888",
  textAlign: "right",
 },
 loadingContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
 },
 errorContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
 },
 errorText: {
  color: "red",
 },
 inputContainer: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 10,
  paddingBottom: 10,
  borderTopWidth: 1,
  borderTopColor: "#ccc",
  backgroundColor: "#fff",
 },
 textInput: {
  flex: 1,
  minHeight: 40,
  maxHeight: 100,
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 20,
  paddingHorizontal: 15,
  paddingVertical: 10,
  marginRight: 10,
  fontSize: 16,
 },
 sendButton: {
  backgroundColor: "#19459d",
  padding: 10,
  borderRadius: 20,
 },
});

export default ChatRoomScreen;
