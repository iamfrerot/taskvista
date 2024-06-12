import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet, ListRenderItem, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import { useRouter } from 'expo-router';

interface Project {
  _id: string;
  category: string;
  name: string;
  phone: string;
  image: string;
  description: string;
  notifications: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const GroupListScreen = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          "https://pmt-server-x700.onrender.com/api/v1/projects/view",
          {
            headers: {
              Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ0ZTU2YzFkODk5NzhjMjdmZDJhNTgiLCJlbWFpbCI6InBtdGFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMDc4ODIzMzU2MCIsImZ1bGxOYW1lcyI6IktldmluZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNzM1ODc2Mn0.zNKjtG2SxKWIR9HPkolgy8ltNCC4wrTvHpf7eKNjVLc",
              'Content-Type': 'application/json',
            },
          }
        );
        const json = await res.json();
        setProjects(json.data.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const renderItem: ListRenderItem<Project> = ({ item }) => (
    <TouchableOpacity onPress={() => router.push({ pathname: '/GroupChatRoomScreen', params: { group: JSON.stringify(item) } })}>
      <View style={styles.groupItem}>
        <Image source={{ uri: item.image }} style={styles.groupImage} />
        <View style={styles.textContainer}>
          <Text style={styles.groupName}>{item.name}</Text>
          <Text style={styles.time}>{new Date(item.createdAt).toLocaleString()}</Text>
        </View>
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
        data={projects}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        style={styles.list}
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
