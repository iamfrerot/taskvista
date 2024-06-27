import React, { useEffect, useState } from "react";
import {
 View,
 Text,
 TextInput,
 Alert,
 ScrollView,
 ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { Image } from "react-native";
import { images } from "../../constants";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

interface LoginFormValues {
 email: string;
 password: string;
}

const Login = () => {
 const [isLoading, setIsLoading] = useState(false);
 const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
 });

 const handleLogin = async (
  values: LoginFormValues,
  { setSubmitting }: FormikHelpers<LoginFormValues>
 ) => {
  try {
   setIsLoading(true);
   console.log("Submitting values:", values);
   const response = await axios.post(
    "https://pmt-server-x700.onrender.com/api/v1/auth/login",
    values
   );
   console.log("API response:", response.data);
   if (response.status !== 200) setIsLoading(false);
   if (response.status === 200) {
    if (response.data.data.accessToken) {
     await AsyncStorage.setItem("token", response.data.data.accessToken);
     await AsyncStorage.setItem("userId", response.data.data.user._id);
     await AsyncStorage.setItem(
      "user",
      JSON.stringify(response.data.data.user)
     );
     router.replace("/home");
    } else {
     setIsLoading(false);
     Alert.alert("Login Failed", "Token not received");
    }
   } else {
    setIsLoading(false);
    Alert.alert("Login Failed", response.data.message || "Unknown error");
   }
  } catch (error) {
   setIsLoading(false);
   console.error("Error logging in:", error);
   if (axios.isAxiosError(error)) {
    setIsLoading(false);
    Alert.alert(
     "Login Failed",
     error.response?.data?.message || "An error occurred"
    );
   } else {
    setIsLoading(false);
    Alert.alert("Login Failed", "An unexpected error occurred");
   }
  } finally {
   setSubmitting(false);
   setIsLoading(false);
  }
 };

 useEffect(() => {
  const checkToken = async () => {
   setIsLoading(true);
   const token = await AsyncStorage.getItem("token");
   const userId = await AsyncStorage.getItem("userId");
   if (token) {
    setIsLoading(false);
    router.replace("/home");
   } else {
    setIsLoading(false);
   }
  };

  checkToken();
 }, []);

 if (isLoading)
  return (
   <SafeAreaView className='items-center justify-center h-full bg-primary'>
    <ActivityIndicator color='white' size='large' />
    <StatusBar style='light' />
   </SafeAreaView>
  );
 return (
  <View className='h-full w-full bg-white'>
   <SafeAreaView className='flex-1 justify-center items-center px-4'>
    <ScrollView className='w-full'>
     <Image
      source={images.loginimg}
      resizeMode='contain'
      className='h-[190px] mb-4'
     />

     <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={handleLogin}
     >
      {({
       handleChange,
       handleBlur,
       handleSubmit,
       values,
       errors,
       touched,
       isSubmitting,
      }) => (
       <View className='w-full  gap-y-3 max-w-md'>
        <View className=' w-full '>
         <Text className='font-obold  text-2xl text-center text-black'>
          Login
         </Text>
        </View>
        <TextInput
         className='border border-gray-300 p-4 mb-2 rounded'
         placeholder='Email'
         keyboardType='email-address'
         onChangeText={handleChange("email")}
         onBlur={handleBlur("email")}
         value={values.email}
        />
        {errors.email && touched.email && (
         <Text className='text-red-500 mb-2'>{errors.email}</Text>
        )}
        <TextInput
         className='border border-gray-300 p-4 mb-4 rounded'
         placeholder='Password'
         secureTextEntry
         onChangeText={handleChange("password")}
         onBlur={handleBlur("password")}
         value={values.password}
        />
        {errors.password && touched.password && (
         <Text className='text-red-500 mb-2'>{errors.password}</Text>
        )}
        <CustomButton
         title='Confirm'
         containerStyles='bg-primary w-full rounded-[32px] h-[70px]'
         handlePress={handleSubmit as any} 
         textStyles='text-white-100'
         disabled={isSubmitting}
        />
       </View>
      )}
     </Formik>
    </ScrollView>
   </SafeAreaView>
  </View>
 );
};

export default Login;