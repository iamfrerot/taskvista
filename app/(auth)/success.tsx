import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

const Success = () => {
 return (
  <SafeAreaView>
   <View className='items-center justify-center h-full px-5 gap-y-5'>
    <Image source={images.successauth} resizeMode='contain' />
    <View className='gap-y-4'>
     <Text className='font-obold text-2xl text-center'>Success!</Text>
     <Text className='font-osemibold text-center text-gray-300 text-base max-w-[250px]'>
      Congratulations! You have been successfully authenticated
     </Text>
    </View>
    <CustomButton
     title='Continue'
     textStyles='text-white-100 text-xl font-obold'
     containerStyles='bg-primary w-full rounded-[34px] h-[70px] mt-14'
     handlePress={() => router.replace("/home")}
    />
   </View>
  </SafeAreaView>
 );
};

export default Success;
