import React, { useEffect } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import { Image } from "react-native";
import { images } from "../../constants";
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

 const handleLogin = async (
  values: LoginFormValues,
  { setSubmitting }: FormikHelpers<LoginFormValues>
) => {
  try {
    console.log('Submitting values:', values);
    const response = await axios.post('https://pmt-server-x700.onrender.com/api/v1/auth/login', values);
    console.log('API response:', response.data);


    if (response.status === 200) {
      if (response.data.data.accessToken) { // Check if accessToken is available
        // Save the token in AsyncStorage
        await AsyncStorage.setItem('token', response.data.data.accessToken);
        Alert.alert('Success', 'Login successful');
        router.replace('/home');
      } else {
        Alert.alert('Login Failed', 'Token not received');
      }
    } else {
      Alert.alert('Login Failed', response.data.message || 'Unknown error');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    if (axios.isAxiosError(error)) {
      Alert.alert('Login Failed', error.response?.data?.message || 'An error occurred');
    } else {
      Alert.alert('Login Failed', 'An unexpected error occurred');
    }
  } finally {
    setSubmitting(false);
  }
};


  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        router.replace('/home');
      }
    };

    checkToken();
  }, []);

  return (
    <View className="h-full w-full bg-white">
      <SafeAreaView className="flex-1 justify-center items-center px-4">
        <Image source={images.loginimg} resizeMode="contain" className='h-[40%]' />
        <View className="mt-10 w-full max-w-md">
          <Text className="font-obold justify-center items-center text-2xl">Login</Text>
        </View>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <View className="w-full max-w-md">
              <TextInput
                className="border border-gray-300 p-4 mb-2 rounded"
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text className="text-red-500 mb-2">{errors.email}</Text>
              )}
              <TextInput
                className="border border-gray-300 p-4 mb-4 rounded"
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text className="text-red-500 mb-2">{errors.password}</Text>
              )}
              <CustomButton
                title="Confirm"
                containerStyles="bg-primary w-full rounded-[32px] h-[70px]"
                handlePress={handleSubmit as any} // TypeScript workaround for handleSubmit type
                textStyles="text-white"
                disabled={isSubmitting}
              />
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </View>
  );
};

export default Login;