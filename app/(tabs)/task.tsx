import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import TaskCard from "../../components/TaskCard";
const tasks = () => {
 return (
  <View>
   <SafeAreaView>
    <View className='flex-row justify-between px-4 py-2'>
     <Text className='font-obold text-center text-2xl'>Tasks</Text>
     <TouchableOpacity
      className='bg-primary rounded-full items-center justify-center'
      onPress={() => router.push("(create)/createtask")}
     >
      <Ionicons name='add-outline' color='white' size={32} />
     </TouchableOpacity>
    </View>
    <View className='w-full pl-4'>
     <FlatList
      data={[
       {
        id: "1",
        title: "Medical LP",
        task: "Make A landing Page and mobile app.",
       },
       {
        id: "2",
        title: "Medical LP",
        task: "Make A landing Page and mobile app.",
       },
       {
        id: "3",
        title: "Medical LP",
        task: "Make A landing Page and mobile app.",
       },
      ]}
      renderItem={({ item }) => <TaskCard item={item} />}
     />
    </View>
   </SafeAreaView>
  </View>
 );
};

export default tasks;
