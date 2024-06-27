import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface CustomButtonProps {
 title: string;
 handlePress: () => void;
 containerStyles: string;
 textStyles: string;
 disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
 title,
 handlePress,
 containerStyles,
 textStyles,
 disabled = false,
}) => {
 return (
  <TouchableOpacity
   onPress={handlePress}
   activeOpacity={0.7}
   className={`rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${containerStyles} ${
    disabled ? "opacity-70 cursor-not-allowed" : ""
   }`}
   disabled={disabled}
  >
   <Text
    className={`font-osemibold text-lg ${textStyles} ${
     disabled ? "text-gray-50" : ""
    }`}
   >
    {title}
   </Text>
  </TouchableOpacity>
 );
};

export default CustomButton;
