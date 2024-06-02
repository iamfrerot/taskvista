import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, ListRenderItem, TouchableOpacity, Button } from 'react-native';
import { chatData } from '../../constants/data';
import { ImageSourcePropType } from 'react-native';
import { useRouter } from 'expo-router';

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
      <Button title="New Chat" onPress={() => router.push('/SelectUserScreen')} />
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
});

export default ChatListScreen;
