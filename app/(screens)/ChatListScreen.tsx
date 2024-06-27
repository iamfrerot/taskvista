import React, { useCallback, useState, useEffect } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const ChatListScreen = () => {
  const router = useRouter();
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        if (token) {
          setToken(token);
          setUserId(userId);
        } else {
          router.push('/home');
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        setError("Failed to fetch token");
      }
    };

    fetchToken();
  }, [router]);

  const fetchChats = useCallback(async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        router.replace('/home');
        return;
      }
      const response = await axios.get('https://pmt-server-x700.onrender.com/api/v1/chats/my-chats', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const chatData = response.data.data.data;
      setChats(chatData);
    } catch (err) {
      setError('Failed to load chats');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useFocusEffect(
    useCallback(() => {
      fetchChats();
    }, [fetchChats])
  );

  const handleChatPress = (chat: ChatItem) => {
    router.push({
      pathname: '/ChatRoomScreen',
      params: { chatId: chat._id, chatTitle: chat.title, chatImage: chat.image },
    });
  };

  const renderItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity onPress={() => handleChatPress(item)}>
      <View style={styles.chatItem}>
        <Image source={{ uri: item.image }} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.title}</Text>
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
      {chats.length === 0 ? (
        <View style={styles.noChatsContainer}>
          <Text style={styles.noChatsText}>No chats available 😞</Text>
        </View>
      ) : (
        <FlatList
          data={chats}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          style={styles.list}
        />
      )}
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
    borderColor: '#ccc',
    padding: 16,
    marginVertical: 8,
    marginLeft: 8,
    marginRight: 8,
    width: '100%',
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
  noChatsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noChatsText: {
    fontSize: 18,
    color: '#888',
  },
});

export default ChatListScreen;
