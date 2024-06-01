import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import CustomButton from '../../components/CustomButton';

const Login = () => {
  return (
    <View className="h-full w-full bg-white">
      <SafeAreaView className="flex-1 justify-center items-center px-4">
        <View className="w-full max-w-md">
          <Text className="font-obold text-4xl mb-6 text-center">Login</Text>
          <TextInput
            className="border border-gray-300 p-2 mb-4 rounded"
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            className="border border-gray-300 p-2 mb-4 rounded"
            placeholder="Password"
            secureTextEntry
          />
          <CustomButton
            title="Login"
            handlePress={() => router.push("/verifyotp")}
            containerStyles="bg-primary w-full rounded"
            textStyles="text-white text-xl"
          />
          <View className="mt-4">
            <CustomButton
              title="Sign Up"
              handlePress={() => router.push("/sign-up")}
              containerStyles="bg-white border border-primary w-full rounded"
              textStyles="text-primary text-xl"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Login;
