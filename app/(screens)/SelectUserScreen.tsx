import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { userData } from '../../constants/userData';
import { useRouter } from 'expo-router';

interface UserItem {
  id: number;
  name: string;
  profileImage: string;
}

const SelectUserScreen = () => {
  const router = useRouter();

  const renderItem = ({ item }: { item: UserItem }) => (
    <TouchableOpacity onPress={() => router.push({ pathname: '/ChatRoomScreen', params: { user: JSON.stringify(item) } })}>
      <View style={styles.userItem}>
        <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={userData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
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
