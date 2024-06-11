import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

interface User {
  _id: string;
  fullNames: string; // Changed from 'name' to 'fullNames'
  profile: string; // Changed from 'profileImage' to 'profile'
}

const SelectUserScreen = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

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
        console.log('Response:', response.data);
        setUsers(response.data.data);
      } catch (error: any) {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error('Server responded with error:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error('Request setup error:', error.message);
        }
        // Set an appropriate error state or display a message to the user
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, []);

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity onPress={() => router.push({ pathname: '/ChatRoomScreen', params: { user: JSON.stringify(item) } })}>
      <View style={styles.userItem}>
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
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.list}
      />
    </View>
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
