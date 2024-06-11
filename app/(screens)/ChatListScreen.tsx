import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, ListRenderItem, TouchableOpacity } from 'react-native';
import { chatData } from '../../constants/data';
import { ImageSourcePropType } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

interface ChatItem {
  id: number;
  profileImage: ImageSourcePropType;
  name: string;
  lastMessage: string;
  time: string;
}

const ChatListScreen = () => {
  const router = useRouter();
  
  const renderItem: ListRenderItem<ChatItem> = ({ item, index }) => (
    <TouchableOpacity onPress={() => {
      console.log("Navigating to ChatRoomScreen with user:", item);
      router.push({ pathname: '/ChatRoomScreen', params: { user: JSON.stringify(item) } });
    }}>
      <View style={styles.chatItem}>
        <Image source={item.profileImage} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.lastMessage}>{item.lastMessage}</Text>
        </View>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <FlatList
        data={chatData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />
      {/* Replace Button with Ionicons */}
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
  list: {
    paddingVertical: 10,
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
