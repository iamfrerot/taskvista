import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, ListRenderItem, TouchableOpacity } from 'react-native';
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

  const renderItem: ListRenderItem<ChatItem> = ({ item }) => (
    <TouchableOpacity onPress={() => router.push({ pathname: '/', params: { user: JSON.stringify(item) } })}>
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
    <FlatList
      data={chatData}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
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
