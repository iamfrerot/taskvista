import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet, ListRenderItem, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface ChatItem {
  _id: string;
  privateUser2: {
    _id: string;
    fullNames: string;
    profile: string;
  };
  title: string;
  time: string;
  image:string;
}

const ChatListScreen = () => {
  const router = useRouter();
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjVjMTQ3NjBlM2EyYjBhOGEwOTQ1YTQiLCJlbWFpbCI6ImdkdXNoaW1pbWFuYTZAZ21haWwuY29tIiwicGhvbmUiOiIwNzg0NjAwNzYyIiwiZnVsbE5hbWVzIjoiRHVzaGltaW1hbmEiLCJyb2xlIjoic3Rha2Vob2xkZXIiLCJpYXQiOjE3MTczMzk4NzR9.4VsTqey9dI3jV2LNljl0sGvEo5x9gDN8sGadxuhaXCY';

        const response = await axios.get('https://pmt-server-x700.onrender.com/api/v1/chats/view', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setChats(response.data.data.data);
        setLoading(false);
      } catch (err: any) {
        setError('Failed to load chats');
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const renderItem: ListRenderItem<ChatItem> = ({ item }) => (
    <TouchableOpacity onPress={() => router.push({ pathname: '/GroupChatRoomScreen', params: { user: JSON.stringify(item.privateUser2) } })}>
      <View style={styles.chatItem}>
        <Image source={{ uri: item.image }} style={styles.profileImage} />
        <View style={styles.textContainer}>
        <Text style={styles.name}>{item.title}</Text>
          {/* <Text style={styles.lastMessage}>{item.privateUser2.fullNames}</Text> */}
          
        </View>
        <Text style={styles.time}>{item.time}</Text>
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

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        style={styles.list}
      />
      <TouchableOpacity style={styles.newChatButton} onPress={() => router.push('/SelectUserScreen')}>
        <Ionicons name="chatbubble" size={24} color="#fff" />
      </TouchableOpacity>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
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
  chatItem: {
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
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  lastMessage: {
    color: '#888',
  },
  time: {
    color: '#888',
    fontSize: 12,
  },
  newChatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#19459d',
    borderRadius: 50,
    padding: 10,
    elevation: 3,
  },
});

export default ChatListScreen;
