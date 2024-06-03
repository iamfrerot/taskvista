import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";

const AvatarGroup = ({
 avatars,
 size = 40,
 spacing = 10,
}: {
 avatars: string[];
 size: number;
 spacing: number;
}) => {
 return (
  <View className='flex-row px-4 py-2'>
   {avatars.map((avatarUrl, index) => (
    <Avatar
     key={index}
     rounded
     source={{ uri: avatarUrl }}
     size={size}
     containerStyle={{
      marginRight: spacing,
      marginLeft: spacing,
      borderColor: "#19459d",
      borderWidth: 1,
     }}
    />
   ))}
  </View>
 );
};

export default AvatarGroup;
