import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ChatListScreen from "../(screens)/ChatListScreen";
import GroupListScreen from "../(screens)/GroupListScreen";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
const InboxScreen = () => {
 const [activeTab, setActiveTab] = useState("chat");
 const router = useRouter();

 return (
  <SafeAreaView style={{ flex: 1 }}>
   <View
    style={{
     flexDirection: "row",
     alignItems: "center",
     paddingHorizontal: 20,
    }}
   >
    <Text
     style={{ fontSize: 24, fontWeight: "bold", flex: 1, textAlign: "center" }}
    >
     Messages
    </Text>
   </View>

   <View
    style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}
   >
    <TouchableOpacity onPress={() => setActiveTab("chat")} className={`mr-6 `}>
     <Text
      style={{
       fontSize: 20,
       color: activeTab === "chat" ? "#19459d" : "black",
       fontFamily: "Outfit-Semibold",
      }}
     >
      Chat
     </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setActiveTab("group")}>
     <Text
      style={{
       fontSize: 20,
       color: activeTab === "group" ? "#19459d" : "black",
       fontFamily: "Outfit-Semibold",
      }}
     >
      Group
     </Text>
    </TouchableOpacity>
   </View>

   {activeTab === "chat" ? <ChatListScreen /> : <GroupListScreen />}
  </SafeAreaView>
 );
};

export default InboxScreen;
