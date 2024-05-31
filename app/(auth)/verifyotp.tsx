import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { OtpInput } from "react-native-otp-entry";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";

const verifyotp = () => {
 const [otp, setOtp] = useState("");
 const handleOtpchange = (otp: string) => {
  setOtp(otp);
  console.log(otp);
 };
 return (
  <SafeAreaView>
   <StatusBar hidden />
   <View className='items-center px-4'>
    <View className='pt-1 w-full'>
     <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
      <Image
       source={icons.arrowleft}
       resizeMode='contain'
       className='w-7 h-7'
      />
     </TouchableOpacity>
    </View>
    <View className='gap-y-3 mt-8'>
     <Text className='font-obold text-2xl'>Verification Code</Text>
     <Text className='font-olight text-lg  text-gray-400'>
      We have sent the Verification code to your email address
     </Text>
    </View>
    <View className='mt-8'>
     <OtpInput
      onTextChange={handleOtpchange}
      numberOfDigits={4}
      focusColor={"#19459d"}
      theme={{
       focusStickStyle: {
        display: "none",
       },
       pinCodeContainerStyle: {
        width: 62,
        height: 58,
        borderRadius: 12,
       },
      }}
     />
    </View>
    <CustomButton
     title='Confirm'
     containerStyles='bg-primary mt-8 w-full rounded-[32px] h-[70px]'
     handlePress={() => router.replace("/success")}
     textStyles='text-white'
    />
   </View>
  </SafeAreaView>
 );
};

export default verifyotp;
