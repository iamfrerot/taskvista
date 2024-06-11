import { View, FlatList, Text, ScrollView } from "react-native";
import { Link } from "expo-router";
import ProjectCard from "./ProjectCard";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ProjectProp = {
 __v: number;
 _id: string;
 category: string;
 completion: number;
 createdAt: string;
 deadline: string;
 description: string;
 document: string;
 endDate: string;
 image: string;
 name: string;
 notifications: boolean;
 priority: "Low" | "Normal" | "High";
 startDate: string;
 status: "todo" | "in-progress" | "done";
 updatedAt: string;
};
const ProjectHome = () => {
 useEffect(() => {
  const getProject = async () => {
   const token = await AsyncStorage.getItem("token");
   const res = await fetch(
    "https://pmt-server-x700.onrender.com/api/v1/projects/view",
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );
   const json = await res.json();
   setProjects(json.data.data);
  };
  getProject();
 }, []);

 const [projects, setProjects] = useState<ProjectProp[]>([]);
 return (
  <View className='mb-4'>
   <View className='flex-row items-center justify-between px-2 py-2 '>
    <Text className='font-osemibold text-xl'>Ongoing projects</Text>
    <Link className='text-primary font-osemibold' href={"/project"}>
     See All
    </Link>
   </View>
   <View className='mr-1'>
    <FlatList
     className='pl-4'
     data={projects}
     keyExtractor={(item) => item._id}
     renderItem={({ item }) =>
      item.status !== "done" ? (
       <View className='mr-3'>
        <ProjectCard item={item} />
       </View>
      ) : (
       <></>
      )
     }
     horizontal
     showsHorizontalScrollIndicator={false}
    />
   </View>
  </View>
 );
};

export default ProjectHome;
