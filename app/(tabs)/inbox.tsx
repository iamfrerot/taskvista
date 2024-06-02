import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ChatListScreen from '../(screens)/ChatListScreen';
import GroupListScreen from '../(screens)/GroupListScreen';
import { useRouter } from 'expo-router';

const InboxScreen = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 40, paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 10 }}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: 'bold', flex: 1, textAlign: 'center' }}>Messages</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        <TouchableOpacity onPress={() => setActiveTab('chat')} style={{ marginRight: 20 }}>
          <Text style={{ fontSize: 20, color: activeTab === 'chat' ? 'blue' : 'black' }}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('group')}>
          <Text style={{ fontSize: 20, color: activeTab === 'group' ? 'blue' : 'black' }}>Group</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'chat' ? <ChatListScreen /> : <GroupListScreen />}
    </View>
  );
};

export default InboxScreen;
