import { View, Text, Image, TouchableOpacity } from "react-native";
import { icons } from "../constants";
import * as Progress from "react-native-progress";
import AvatarGroup from "./AvatarGroup";

const TaskCard = ({
 item,
}: {
 item: { name: string; description: string; image: string };
}) => {
 return (
  <View className='bg-white-100 px-2 py-4 rounded-xl min-h-[150px] min-w-[190px] '>
   <Text className='font-osemibold text-xl'>{item.name}</Text>
   <View className='flex-row items-center justify-between'>
    <Text className='text-gray-100 max-w-[170px] text-sm'>
     {item.description}
    </Text>
    <TouchableOpacity>
     <Image source={icons.twodots} resizeMode='contain' className='w-4 h-4' />
    </TouchableOpacity>
   </View>
   <View>
    <View>
     {/* <View className='flex-row justify-between items-center'>
      <Text className='font-oregular text-lg'>Progress</Text>
      <Text className='font-omedium text-primary text-lg'>70%</Text>
     </View> */}
     <AvatarGroup avatars={[item.image]} size={30} spacing={-9} />
     {/* <Progress.Bar
      progress={0.7}
      width={200}
      height={8}
      unfilledColor='#cccccc'
      borderWidth={1}
      borderColor='white'
      borderRadius={20}
      color='#19459d'
     /> */}
    </View>
   </View>
  </View>
 );
};

export default TaskCard;
