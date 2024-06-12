import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHome from "../../components/ProfileHome";
import { icons } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import TaskCompeted from "../../components/TaskCompeted";
import CalendarHome from "../../components/CalendarHome";
import TaskHome from "../../components/TaskHome";
import ProjectHome from "../../components/ProjectHome";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
const home = () => {
 const [user, setUser] = useState<{
  _id: string;
  email: string;
  phone: number;
  fullNames: string;
  role: string;
  profile: string;
 }>();
 const getuser = async () => {
  const userData = (await AsyncStorage.getItem("user")) as string;
  const user = JSON.parse(userData);
  setUser(user);
 };
 useEffect(() => {
  getuser();
 }, []);
 return (
  <SafeAreaView>
   <View className='pb-[140px]'>
    <View className='flex-row justify-between items-center px-4 py-4'>
     <ProfileHome img={`${user?.profile}`} name={`${user?.fullNames}`} />
     <TouchableOpacity className='p-3 border border-gray-300 rounded-full items-center justify-center '>
      {false ? (
       <Ionicons name='mail-unread' size={23} color='green' />
      ) : (
       <Ionicons name='mail' size={23} color='#d1d5db' />
      )}
     </TouchableOpacity>
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>
     <TaskCompeted value={29} />
     {/* <CalendarHome /> */}
     <TaskHome />
     <ProjectHome />
     <TouchableOpacity
      className='bg-primary rounded-full self-center shadow-2xl '
      onPress={() => router.push("(create)/createproject")}
     >
      <Ionicons name='add-outline' size={70} color='white' />
     </TouchableOpacity>
    </ScrollView>
   </View>
  </SafeAreaView>
 );
};

export default home;
