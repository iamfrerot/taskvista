import { View, Text, Image } from "react-native";
interface ProfileProps {
 img: string;
 name: string;
}
const ProfileHome = ({ img, name }: ProfileProps) => {
 return (
  <View className='flex-row gap-x-2 items-center'>
   <Image
    source={{ uri: img }}
    resizeMode='cover'
    className='w-12 h-12 rounded-full'
   />
   <View>
    <Text className='font-omedium text-base'>Welcome {name}!</Text>
    <Text className='font-osemibold text-xl'>Explore</Text>
   </View>
  </View>
 );
};

export default ProfileHome;
