import {
 View,
 Text,
 TouchableOpacity,
 FlatList,
 ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import TaskCard from "../../components/TaskCard";
import { useEffect } from "react";
const tasks = () => {
 const [isLoading, setIsLoading] = useState(true);
 const [tasks, setTasks] = useState();
 useEffect(() => {
  const getTasks = async () => {
   const res = await fetch(
    "https://pmt-server-x700.onrender.com/api/v1/tasks/view",
    {
     headers: {
      Authorization:
       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ0ZTU2YzFkODk5NzhjMjdmZDJhNTgiLCJlbWFpbCI6InBtdGFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMDc4ODIzMzU2MCIsImZ1bGxOYW1lcyI6IktldmluZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNzM1ODc2Mn0.zNKjtG2SxKWIR9HPkolgy8ltNCC4wrTvHpf7eKNjVLc",
     },
    }
   );
   const json = await res.json();
   setTasks(json.data.data);
   setIsLoading(false);
  };
  getTasks();
 }, []);
 if (isLoading)
  return (
   <SafeAreaView className='items-center justify-center h-full bg-gray-100'>
    <ActivityIndicator color='darkblue' size='large' />
   </SafeAreaView>
  );
 return (
  <View>
   <SafeAreaView>
    <View className='flex-row justify-between px-4 py-2'>
     <Text className='font-obold  text-2xl'>Tasks</Text>
     <TouchableOpacity
      className='bg-primary rounded-full items-center justify-center'
      onPress={() => router.push("(create)/createtask")}
     >
      <Ionicons name='add-outline' color='white' size={32} />
     </TouchableOpacity>
    </View>
    <View className='w-full px-4 mb-[120px]'>
     <FlatList
      data={tasks}
      renderItem={({ item }) => (
       <View className='mt-4'>
        <TaskCard item={item} />
       </View>
      )}
      showsVerticalScrollIndicator={false}
     />
    </View>
   </SafeAreaView>
  </View>
 );
};

export default tasks;
