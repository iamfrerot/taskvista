import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { Image } from "react-native";

export default function App() {
 return (
  <View className='h-full w-full'>
   <SafeAreaView className='w-full border border-red-600'>
    <View className='w-full'>
     <Image source={images.firstpage} resizeMode='contain' />
    </View>
   </SafeAreaView>
   <StatusBar style='dark' />
  </View>
 );
}
