import { View, Text } from "react-native";
import AvatarGroup from "./AvatarGroup";
import CircularProgress from "react-native-circular-progress-indicator";
const ProjectCard = ({ item }: { item: { title: string; task: string } }) => {
 return (
  <View className='bg-white-100 px-3 py-4 rounded-xl min-h-[120px] min-w-[350px] mr-3 flex-row justify-between'>
   <View>
    <View>
     <Text className='font-osemibold text-lg max-w-[190px]'>{item.title}</Text>
     <View className='flex-row items-center justify-between'>
      <Text className='text-gray-100 max-w-[170px] text-sm'>{item.task}</Text>
     </View>
    </View>
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
    </View>
   </View>
   <CircularProgress
    value={75}
    progressValueColor='black'
    radius={40}
    initialValue={0}
    maxValue={100}
    duration={800}
    valueSuffix={"%"}
    activeStrokeWidth={4}
    inActiveStrokeOpacity={0}
    activeStrokeColor='#19459d'
    progressValueStyle={{ fontFamily: "Outfit-SemiBold" }}
   />
  </View>
 );
};

export default ProjectCard;
