import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import CustomButton from '../components/CustomButton';

const Signup = () => {
  return (
    <View className="h-full w-full bg-white">
      <SafeAreaView>
        <View className="items-center h-full justify-around">
          <View className="w-full items-center gap-y-4">
            <Text className="font-obold text-4xl mb-6">Sign Up</Text>
            <TextInput
              className="border border-gray-300 p-2 w-3/4 mb-4"
              placeholder="Email"
              keyboardType="email-address"
            />
            <TextInput
              className="border border-gray-300 p-2 w-3/4 mb-4"
              placeholder="Password"
              secureTextEntry
            />
            <TextInput
              className="border border-gray-300 p-2 w-3/4 mb-4"
              placeholder="Confirm Password"
              secureTextEntry
            />
            <CustomButton
              title="Sign Up"
              handlePress={() => router.push("/home")}
              containerStyles="bg-primary w-[90%]"
              textStyles="text-white text-xl"
            />
            <CustomButton
              title="Login"
              handlePress={() => router.push("/login")}
              containerStyles="bg-white border border-primary w-[90%] mt-7"
              textStyles="text-primary text-xl"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Signup;
