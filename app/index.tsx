import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { Image } from "react-native";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
 useEffect(() => {
  const checkToken = async () => {
   const token = await AsyncStorage.getItem("token");
   if (token) {
    router.replace("/home");
   }
  };

  checkToken();
 }, []);
 return (
  <View className='h-full w-full'>
   <SafeAreaView>
    <View className='items-center h-full gap-y-10'>
     <View className='w-full items-center gap-y-4'>
      <Image source={images.firstpage} resizeMode='contain' />
      <Text className='font-obold text-4xl'>Enjoy Your Time</Text>
      <Text className='font-olight text-gray-400 text-center'>
       At Acomobility, Find Clarity When Managing Your Tasks Seems Confusing.
      </Text>
     </View>
     <View className='w-full items-center'>
      <CustomButton
       title={"Login"}
       handlePress={() => router.push("(auth)/login")}
       containerStyles='bg-primary w-[90%]'
       textStyles='text-white-100 text-xl'
      />
      <CustomButton
       title={"first time user? Register here"}
       handlePress={() => router.push("(auth)/firsttimelogin")}
       containerStyles='bg-secondary w-[90%] mt-4'
       textStyles='text-primary text-xl'
      />
     </View>
    </View>
   </SafeAreaView>
   <StatusBar style='dark' />
  </View>
 );
}
