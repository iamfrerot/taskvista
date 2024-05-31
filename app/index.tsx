import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { Image } from "react-native";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";
export default function App() {
 return (
  <View className='h-full w-full'>
   <SafeAreaView>
    <View className='items-center h-full justify-around'>
     <View className='w-full items-center gap-y-4  '>
      <Image source={images.firstpage} resizeMode='contain' />
      <Text className='font-obold text-4xl'>Enjoy Your Time</Text>
      <Text className='font-olight text-gray-100 text-center'>
       At Acomobility, Find Clarity When Managing Your Tasks Seems Confusing.
      </Text>
     </View>
     <View className='w-full items-center'>
      <CustomButton
       title={"login"}
       handlePress={() => router.push("/verifyotp")}
       containerStyles='bg-primary w-[90%]'
       textStyles='text-white text-xl'
      />
      <CustomButton
       title={"Sign Up"}
       handlePress={() => router.push("/sign-up")}
       containerStyles='bg-white border border-primary w-[90%] mt-7'
       textStyles='text-primary text-xl'
      />
     </View>
    </View>
   </SafeAreaView>
   <StatusBar style='dark' />
  </View>
 );
}
