import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const Home = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
        <TouchableOpacity onPress={() => router.push("/home")}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/tasks")}>
          <Text>Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/inbox")}>
          <Text>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/search")}>
          <Text>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/account")}>
          <Text>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
