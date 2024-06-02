import { View, Text, TextInput } from "react-native";

const FormField = ({
 title,
 value,
 placeholder,
 handleChangeText,
 viewStyles,
 titleStyles,
 textarea = false,
}: {
 title: string;
 value: string;
 placeholder: string;
 handleChangeText: any;
 textarea?: boolean;
 viewStyles?: string;
 titleStyles: string;
}) => {
 return (
  <View className={`space-y-2 ${viewStyles}`}>
   <Text className={`text-base text-black font-omedium ${titleStyles} `}>
    {title}
   </Text>
   <View
    className={`border-2 border-gray-100 w-full px-2 rounded-2xl focus:border-primary items-center flex-row ${
     textarea ? "h-24" : "h-16"
    }`}
   >
    <TextInput
     multiline={textarea}
     className='flex-1 h-full text-black font-0medium text-base'
     value={value}
     placeholder={placeholder}
     placeholderTextColor='#7b7b8b'
     onChangeText={handleChangeText}
    />
   </View>
  </View>
 );
};

export default FormField;
