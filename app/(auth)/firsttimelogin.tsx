import React from "react";
import { View, Text, TextInput, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { Image } from "react-native";
import { images } from "../../constants";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";

interface ResetPasswordFormValues {
  passwordResetToken: string;
  password: string;
}

const firsttimelogin = () => {
  const resetPasswordSchema = Yup.object().shape({
    passwordResetToken: Yup.string().required(
      "Password reset token is required"
    ),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleResetPassword = async (
    values: ResetPasswordFormValues,
    { setSubmitting }: FormikHelpers<ResetPasswordFormValues>
  ) => {
    try {
      console.log("Submitting values:", values);
      const response = await axios.post(
        "http://167.99.192.166:4000/api/v1/auth/reset-password",
        values
      );
      console.log("API response:", response.data); // Add logging

      if (response.status === 200) {
        Alert.alert("Success", "Password reset successful");
        router.replace("/login");
      } else {
        Alert.alert("Reset Failed", response.data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error resetting password:", error); // Add logging
      if (axios.isAxiosError(error)) {
        Alert.alert(
          "Reset Failed",
          error.response?.data?.message || "An error occurred"
        );
      } else {
        Alert.alert("Reset Failed", "An unexpected error occurred");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View className="h-full w-full bg-white">
      <SafeAreaView className="flex-1 ">
        <ScrollView className="w-full px-5">
          <Image
            source={images.loginimg}
            resizeMode="contain"
            className="h-[180px] mb-4"
          />
          <View className="mt-10 w-full max-w-md">
            <Text className="font-obold text-2xl mb-4">
              Reset Your Password
            </Text>
          </View>
          <Formik
            initialValues={{ passwordResetToken: "", password: "" }}
            validationSchema={resetPasswordSchema}
            onSubmit={handleResetPassword}
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
              <View className="w-full gap-y-3 max-w-md">
                <TextInput
                  className="border border-gray-300 p-4 mb-2 rounded"
                  placeholder="Password reset token"
                  secureTextEntry
                  onChangeText={handleChange("passwordResetToken")}
                  onBlur={handleBlur("passwordResetToken")}
                  value={values.passwordResetToken}
                />
                {errors.passwordResetToken && touched.passwordResetToken && (
                  <Text className="text-red-500 mb-2">
                    {errors.passwordResetToken}
                  </Text>
                )}
                <TextInput
                  className="border border-gray-300 p-4 mb-4 rounded"
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <Text className="text-red-500 mb-2">{errors.password}</Text>
                )}
                <CustomButton
                  title="Confirm"
                  containerStyles="bg-primary w-full rounded-[32px] h-[70px]"
                  handlePress={handleSubmit as any} // TypeScript workaround for handleSubmit type
                  textStyles="text-white-100"
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

export default firsttimelogin;
