import React, { useEffect, useState } from "react";
import {
 View,
 FlatList,
 Image,
 Text,
 StyleSheet,
 TouchableOpacity,
 ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
 _id: string;
 fullNames: string;
 profile: string;
}

interface ChatItem {
 _id: string;
 privateUser1: {
  _id: string;
  fullNames: string;
  profile: string;
 };
 privateUser2: {
  _id: string;
  fullNames: string;
  profile: string;
 };
 title: string;
 time: string;
 image: string;
}

const SelectUserScreen = () => {
 const router = useRouter();
 const [users, setUsers] = useState<User[]>([]);
 const [loading, setLoading] = useState(true);
 const [token, setToken] = useState<string | null>(null);
 const [userId, setUserId] = useState<string | null>(null);

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
   }
  };

  fetchToken();
 }, [router]);

 console.log("userId1:", userId);

 const goback = () => {
  router.back();
 };

 useEffect(() => {
  const fetchUsers = async () => {
   setLoading(true);
   try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
     "https://pmt-server-x700.onrender.com/api/v1/users/view",
     {
      headers: {
       Authorization: `Bearer ${token}`,
       "Content-Type": "application/json",
      },
     }
    );

    setUsers(response.data.data.data);
   } catch (error: any) {
    console.error("Error fetching users:", error);
   } finally {
    setLoading(false);
   }
  };

  fetchUsers();
 }, [token]);

 const createOrNavigateChat = async (user: User) => {
  try {
   // Check if chat exists
   const checkChatResponse = await axios.get(
    `https://pmt-server-x700.onrender.com/api/v1/chats/check/${userId}/${user._id}`,
    {
     headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
     },
    }
   );

   if (checkChatResponse.data.exists) {
    // Navigate to existing chat
    router.push({
     pathname: "/ChatRoomScreen",
     params: {
      chatId: checkChatResponse.data.chatId,
      user: JSON.stringify(user),
      chatTitle: user.fullNames,
      chatImage: user.profile,
     },
    });
   } else {
    // Create new chat
    console.log("Creating new chat...");
    const response = await axios.post(
     "https://pmt-server-x700.onrender.com/api/v1/chats/create-individual",
     {
      title: user.fullNames,
      image: user.profile,
      type: "private",
      privateUser1: userId,
      privateUser2: user._id,
     },
     {
      headers: {
       Authorization: `Bearer ${token}`,
       "Content-Type": "application/json",
      },
     }
    );
    console.log("Creating new chat...", user.fullNames);
    console.log("user._id", user._id);
    if (response.data.data) {
     router.push({
      pathname: "/ChatRoomScreen",
      params: {
       chatId: response.data.data._id,
       user: JSON.stringify(user),
       chatTitle: user.fullNames,
       chatImage: user.profile,
      },
     });
    }
   }
  } catch (error: any) {
   console.error("Error creating or navigating chat:", error);
   if (error.response) {
    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
   }
  }
 };

 const renderItem = ({ item }: { item: User }) => (
  <TouchableOpacity onPress={() => createOrNavigateChat(item)}>
   <View style={styles.userItem}>
    <Image source={{ uri: item.profile }} style={styles.profileImage} />
    <Text style={styles.name}>{item.fullNames}</Text>
   </View>
  </TouchableOpacity>
 );

 if (loading) {
  return (
   <View style={styles.loadingContainer}>
    <ActivityIndicator size='large' color='#19459d' />
   </View>
  );
 }

 return (
  <SafeAreaView style={styles.container}>
   <View style={styles.headerContainer}>
    <TouchableOpacity
     onPress={() => {
      goback();
     }}
     style={styles.backButton}
    >
     <Image
      source={icons.arrowleft}
      resizeMode='contain'
      className='w-7 h-7 '
     />
    </TouchableOpacity>
    <Text style={styles.header}>CONTACTS</Text>
   </View>

   <FlatList
    data={users}
    renderItem={renderItem}
    keyExtractor={(item) => item._id}
    contentContainerStyle={styles.list}
   />
  </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#fff",
 },
 loadingContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
 },
 list: {
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: "#ccc",
  borderRadius: 25,
  borderWidth: 1,
  borderColor: "#ccc",
  padding: 16,
  marginVertical: 8,
  marginLeft: 8,
  marginRight: 8,
  width: "100%",
 },
 backButton: {
  padding: 10,
 },
 header: {
  fontSize: 24,
  fontWeight: "bold",
  textAlign: "center",
  flex: 1,
 },
 headerContainer: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 20,
 },
 userItem: {
  flexDirection: "row",
  alignItems: "center",
  padding: 10,
  borderBottomWidth: 1,
  borderBottomColor: "#ccc",
 },
 profileImage: {
  width: 50,
  height: 50,
  borderRadius: 25,
  marginRight: 10,
 },
 name: {
  fontSize: 16,
 },
});

export default SelectUserScreen;
