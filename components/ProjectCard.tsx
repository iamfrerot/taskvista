import { View, Text } from "react-native";
import AvatarGroup from "./AvatarGroup";
import CircularProgress from "react-native-circular-progress-indicator";
import { ProjectProp } from "./ProjectHome";

const ProjectCard = ({ item }: { item: ProjectProp }) => {
 return (
  <View className='bg-white-100 px-3 py-4 rounded-xl min-h-[120px] min-w-[350px] mr-3 flex-row justify-between'>
   <View>
    <View>
     <Text className='font-osemibold text-lg max-w-[190px]'>{item.name}</Text>
     <View className='flex-row items-center justify-between'>
      <Text className='text-gray-100 max-w-[170px] text-sm'>
       {item.description}
      </Text>
     </View>
    </View>
    <View>
     <AvatarGroup avatars={[item.image]} size={30} spacing={-9} />
    </View>
   </View>
   <CircularProgress
    value={item.completion}
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
