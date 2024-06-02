import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');

  const handleVerifyOtp = async () => {
    try {
      const token = await AsyncStorage.getItem('passwordResetToken');
      if (!token) {
        Alert.alert('Error', 'No token found');
        return;
      }

      const response = await axios.post('https://pmt-server-x700.onrender.com/api/v1/reset-password', {
        passwordResetToken: token,
        otp,
      });

      // Handle successful verification
      Alert.alert('Success', 'OTP verified successfully');
      router.replace('/home'); // Navigate to the home screen or desired screen
    } catch (error) {
      Alert.alert('Verification Failed', 'Invalid OTP');
    }
  };

  return (
    <View className="h-full w-full bg-white">
      <SafeAreaView className="flex-1 justify-center items-center px-4">
        <Text className="font-obold text-2xl">OTP Verification</Text>
        <Text className="font-olight text-lg text-gray-400">
          Enter the OTP sent to your email.
        </Text>
        <View className="w-full max-w-md mt-10">
          <TextInput
            className="border border-gray-300 p-4 mb-4 rounded"
            placeholder="Enter OTP"
            keyboardType="numeric"
            onChangeText={setOtp}
            value={otp}
          />
          <CustomButton
            title="Verify"
            containerStyles="bg-primary w-full rounded-[32px] h-[70px]"
            handlePress={handleVerifyOtp}
            textStyles="text-white"
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default VerifyOtp;
