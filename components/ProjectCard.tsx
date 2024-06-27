import { View, Text, TouchableOpacity } from "react-native";
import AvatarGroup from "./AvatarGroup";
import CircularProgress from "react-native-circular-progress-indicator";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { setCurrentProject } from "../app/Redux/slices/projectSlice";
import { Project } from "../app/Redux/slices/projectsSlices";
const ProjectCard = ({ project }: { project: Project }) => {
 const dispatch = useDispatch();
 return (
  <TouchableOpacity
   activeOpacity={0.5}
   className='bg-white-100 px-3 py-4 rounded-xl min-h-[120px] max-h-[120px] min-w-[350px] flex-row justify-between  border border-gray-400'
   onPress={() => {
    dispatch(setCurrentProject(project));
    router.push("/projectdetail");
   }}
  >
   <View>
    <View>
     <Text className='font-osemibold text-lg max-w-[190px]'>
      {project.name}
     </Text>
     <View className='flex-row items-center justify-between'>
      <Text className='text-gray-100  text-sm'>
       {project.description.length > 10
        ? project.description.substring(0, 30) + " ..."
        : project.description}
      </Text>
     </View>
    </View>
    <View>
     <AvatarGroup avatars={[project.image]} size={30} spacing={-9} />
    </View>
   </View>
   <CircularProgress
    value={project.completion}
    progressValueColor='black'
    radius={40}
    initialValue={0}
    maxValue={100}
    duration={800}
    valueSuffix={"%"}
    activeStrokeWidth={4}
    inActiveStrokeOpacity={1}
    activeStrokeColor='#19459d'
    progressValueStyle={{ fontFamily: "Outfit-SemiBold" }}
    inActiveStrokeColor='#c7d7f5'
    inActiveStrokeWidth={4}
   />
  </TouchableOpacity>
 );
};

export default ProjectCard;
