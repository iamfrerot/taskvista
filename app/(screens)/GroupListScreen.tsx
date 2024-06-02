import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, ListRenderItem } from 'react-native';
import { groupData } from '../../constants/data';
import { ImageSourcePropType } from 'react-native';

interface GroupItem {
  id: number;
  groupName: string;
  time: string;
  groupImage: ImageSourcePropType;
}

const GroupListScreen = () => {
  const renderItem: ListRenderItem<GroupItem> = ({ item }) => (
    <View style={styles.groupItem}>
      <Image source={item.groupImage} style={styles.groupImage} />
      <View style={styles.textContainer}>
        <Text style={styles.groupName}>{item.groupName}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={groupData}
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
  groupItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
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
