import React, { useEffect, useState } from "react";
import {
 View,
 FlatList,
 Image,
 Text,
 StyleSheet,
 ListRenderItem,
 TouchableOpacity,
 ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface Project {
 _id: string;
 category: string;
 name: string;
 phone: string;
 image: string;
 description: string;
 notifications: boolean;
 status: string;
 createdAt: string;
 updatedAt: string;
}

const GroupListScreen = () => {
 const router = useRouter();
 const [projects, setProjects] = useState<Project[]>([]);
 const [loading, setLoading] = useState(true);
 const [token, setToken] = useState<string | null>(null);

 useEffect(() => {
  const fetchToken = async () => {
   try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
     setToken(token);
    } else {
     router.push("/home");
    }
   } catch (error) {
    console.error("Error fetching token:", error);
   }
  };

  fetchToken();
 }, [router]);

 useEffect(() => {
  const fetchProjects = async () => {
   try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
     router.replace("/home");
     return;
    }
    const response = await axios.get(
     "https://pmt-server-x700.onrender.com/api/v1/projects/view",
     {
      headers: {
       Authorization: `Bearer ${token}`,
       "Content-Type": "application/json",
      },
     }
    );

    setProjects(response.data.data.data);
   } catch (error) {
    console.error("Error fetching projects:", error);
   } finally {
    setLoading(false);
   }
  };

  fetchProjects();
 }, []);

 const createOrNavigateChat = async (project: Project) => {
  try {
   // Check if group chat exists
   const checkChatResponse = await axios.get(
    `https://pmt-server-x700.onrender.com/api/v1/chats/check-group/${project._id}`,
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
     pathname: "/GroupChatRoomScreen",
     params: {
      chatId: checkChatResponse.data.chatId,
      project: JSON.stringify(project),
      chatTitle: project.name,
      chatImage: project.image,
     },
    });
   } else {
    // Create new chat
    const response = await axios.post(
     "https://pmt-server-x700.onrender.com/api/v1/chats/create-group",
     {
      title: project.name,
      image: project.image,
      type: "group",
      project: project._id,
     },
     {
      headers: {
       Authorization: `Bearer ${token}`,
       "Content-Type": "application/json",
      },
     }
    );
    if (response.data.data) {
     router.push({
      pathname: "/GroupChatRoomScreen",
      params: {
       chatId: response.data.data._id,
       project: JSON.stringify(project),
       chatTitle: project.name,
       chatImage: project.image,
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

 const renderProject: ListRenderItem<Project> = ({ item }) => (
  <TouchableOpacity
   style={styles.projectContainer}
   onPress={() => createOrNavigateChat(item)}
  >
   <Image source={{ uri: item.image }} style={styles.projectImage} />
   <View style={styles.projectDetails}>
    <Text style={styles.projectName}>{item.name}</Text>
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
  <View style={styles.container}>
   <FlatList
    data={projects}
    renderItem={renderProject}
    keyExtractor={(item) => item._id}
    style={styles.list}
   />
  </View>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  padding: 16,
  backgroundColor: "#f8f8f8",
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
 projectContainer: {
  flexDirection: "row",
  padding: 10,
  backgroundColor: "#fff",
  marginBottom: 10,
  borderRadius: 8,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 5,
 },
 projectImage: {
  width: 60,
  height: 60,
  borderRadius: 30,
 },
 projectDetails: {
  marginLeft: 10,
  justifyContent: "center",
 },
 projectName: {
  fontSize: 16,
  fontWeight: "bold",
 },
 projectDescription: {
  fontSize: 14,
  color: "#777",
 },
 loadingContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
 },
});

export default GroupListScreen;
