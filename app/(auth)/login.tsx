import React from "react";
import { View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { Image } from "react-native";
import { images } from "../../constants";
const Login = () => {
 return (
  <View className='h-full w-full bg-white'>
   <SafeAreaView className='flex-1 justify-center items-center px-4'>
    <Image source={images.loginimg} resizeMode='contain' className='h-[40%]' />
    <View className=" mt-10 h-[50%]' ">
     <Text className='font-obold text-2xl '>OTP Verification</Text>
     <Text className='font-olight text-lg   text-gray-400'>
      Enter email and phone to send one time Password.
     </Text>
    </View>
    <View className='w-full max-w-md '>
     <TextInput
      className='border border-gray-300 p-4 mb-4 m rounded'
      placeholder='Email'
      keyboardType='email-address'
     />
     <TextInput
      className='border border-gray-300 p-4 mb-4 rounded'
      placeholder='Password'
      secureTextEntry
     />

     <CustomButton
      title='Confirm'
      containerStyles='bg-primary mb- w-full rounded-[32px] h-[70px]'
      handlePress={() => router.replace("/verifyotp")}
      textStyles='text-white'
     />
    </View>
   </SafeAreaView>
  </View>
 );
};

export default Login;
