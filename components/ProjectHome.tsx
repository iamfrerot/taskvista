import { View, FlatList, Text, ScrollView } from "react-native";
import { Link } from "expo-router";
import ProjectCard from "./ProjectCard";

const ProjectHome = () => {
 return (
  <View>
   <View className='flex-row items-center justify-between px-2 py-2 '>
    <Text className='font-osemibold text-xl'>Ongoing projects</Text>
    <Link className='text-primary font-osemibold' href={"/project"}>
     See All
    </Link>
   </View>
   <View className='mr-1'>
    <FlatList
     className='pl-4'
     data={[
      {
       id: "1",
       title: "Mobile App Wireframe",
       task: "Team Members",
      },
      {
       id: "2",
       title: "Mobile App Wireframe",
       task: "Team Members",
      },
      {
       id: "3",
       title: "Mobile App Wireframe",
       task: "Team Members",
      },
     ]}
     renderItem={({ item }) => <ProjectCard item={item} />}
     horizontal
     showsHorizontalScrollIndicator={false}
    />
   </View>
  </View>
 );
};

export default ProjectHome;
