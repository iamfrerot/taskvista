import { View, Text, Image, TouchableOpacity } from "react-native";
import { icons } from "../constants";
import * as Progress from "react-native-progress";
import AvatarGroup from "./AvatarGroup";

const TaskCard = ({ item }: { item: { title: string; task: string } }) => {
 return (
  <View className='bg-white-100 px-2 py-4 rounded-xl min-h-[120px] mr-3'>
   <Text className='font-osemibold text-xl'>{item.title}</Text>
   <View className='flex-row items-center justify-between'>
    <Text className='text-gray-100 max-w-[170px] text-sm'>{item.task}</Text>
    <TouchableOpacity>
     <Image source={icons.twodots} resizeMode='contain' className='w-4 h-4' />
    </TouchableOpacity>
   </View>
   <View>
    <View>
     <AvatarGroup
      avatars={[
       "https://firebasestorage.googleapis.com/v0/b/my-brand-frontend.appspot.com/o/blogsImg%2FGemini_Generated_Image_pjmuutpjmuutpjmu.jpeg?alt=media&token=6df0d64d-a753-417a-a8d1-d0527f6e781c",
       "https://firebasestorage.googleapis.com/v0/b/my-brand-frontend.appspot.com/o/blogsImg%2FGemini_Generated_Image_pjmuutpjmuutpjmu.jpeg?alt=media&token=6df0d64d-a753-417a-a8d1-d0527f6e781c",
       "https://firebasestorage.googleapis.com/v0/b/my-brand-frontend.appspot.com/o/blogsImg%2FGemini_Generated_Image_pjmuutpjmuutpjmu.jpeg?alt=media&token=6df0d64d-a753-417a-a8d1-d0527f6e781c",
       "https://firebasestorage.googleapis.com/v0/b/my-brand-frontend.appspot.com/o/blogsImg%2FGemini_Generated_Image_pjmuutpjmuutpjmu.jpeg?alt=media&token=6df0d64d-a753-417a-a8d1-d0527f6e781c",
      ]}
      size={30}
      spacing={-9}
     />
     <View className='flex-row justify-between items-center'>
      <Text className='font-oregular text-lg'>Progress</Text>
      <Text className='font-omedium text-primary text-lg'>70%</Text>
     </View>
     <Progress.Bar
      progress={0.7}
      width={200}
      height={8}
      unfilledColor='#cccccc'
      borderWidth={1}
      borderColor='white'
      borderRadius={20}
      color='#19459d'
     />
    </View>
   </View>
  </View>
 );
};

export default TaskCard;
