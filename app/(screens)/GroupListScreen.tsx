import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, ListRenderItem, TouchableOpacity, Button } from 'react-native';
import { groupData } from '../../constants/data';
import { ImageSourcePropType } from 'react-native';
import { useRouter } from 'expo-router';

interface GroupItem {
  id: number;
  groupName: string;
  time: string;
  groupImage: ImageSourcePropType;
}

const GroupListScreen = () => {
  const router = useRouter();

  const renderItem: ListRenderItem<GroupItem> = ({ item }) => (
    <TouchableOpacity onPress={() => router.push({ pathname: '/GroupChatRoomScreen', params: { group: JSON.stringify(item) } })}>
      <View style={styles.groupItem}>
        <Image source={item.groupImage} style={styles.groupImage} />
        <View style={styles.textContainer}>
          <Text style={styles.groupName}>{item.groupName}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={groupData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />
      <Button title="Create Group" onPress={() => router.push('/SelectUserScreen')} />
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
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  groupName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  time: {
    color: '#888',
    fontSize: 12,
  },
});

export default GroupListScreen;
