import { View, Text, TouchableOpacity } from "react-native";
interface CustomButtonProps {
 title: string;
 handlePress: any;
 containerStyles: string;
 textStyles: string;
}
const CustomButton = ({
 title,
 handlePress,
 containerStyles,
 textStyles,
}: CustomButtonProps) => {
 return (
  <TouchableOpacity
   onPress={handlePress}
   activeOpacity={0.7}
   className={`rounded-xl min-h-[62px] justify-center items-center ${containerStyles} `}
  >
   <Text className={`font-osemibold text-lg ${textStyles}`}>{title}</Text>
  </TouchableOpacity>
 );
};

export default CustomButton;
