import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
 return (
  <Stack>
   <Stack.Screen name='login' />
   <Stack.Screen name='verifyotp' options={{ headerShown: false }} />
   <Stack.Screen name='success' options={{ headerShown: false }} />
  </Stack>
 );
};

export default AuthLayout;
