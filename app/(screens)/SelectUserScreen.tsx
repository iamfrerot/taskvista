import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";

interface User {
  _id: string;
  fullNames: string; 
  profile: string; 
}

const SelectUserScreen = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  //route back
  const goback = () => {
    router.back();
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjVjMTQ3NjBlM2EyYjBhOGEwOTQ1YTQiLCJlbWFpbCI6ImdkdXNoaW1pbWFuYTZAZ21haWwuY29tIiwicGhvbmUiOiIwNzg0NjAwNzYyIiwiZnVsbE5hbWVzIjoiRHVzaGltaW1hbmEiLCJyb2xlIjoic3Rha2Vob2xkZXIiLCJpYXQiOjE3MTczMzk4NzR9.4VsTqey9dI3jV2LNljl0sGvEo5x9gDN8sGadxuhaXCY'; // Replace with the provided token
        const response = await axios.get('https://pmt-server-x700.onrender.com/api/v1/users/view', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        setUsers(response.data.data.data);
      } catch (error: any) {
        if (error.response) {
          
          console.error('Server responded with error:', error.response.data);
        } else if (error.request) {
         
          console.error('No response received:', error.request);
        } else {
        
          console.error('Request setup error:', error.message);
        }
        
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, []);

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity onPress={() => router.push({ pathname: '/ChatRoomScreen', params: { user: JSON.stringify(item) } })}>
      <View style={styles.userItem}>
        <Image source={{ uri: item.profile }} style={styles.profileImage} />
        <Text style={styles.name}>{item.fullNames}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#19459d" />
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
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>CONTACTS</Text>
      </View>

      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
