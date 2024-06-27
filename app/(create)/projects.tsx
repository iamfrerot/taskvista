import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { icons } from "../../constants";
import ProjectCard from "../../components/ProjectCard";
import { Rootstate } from "../Redux/slices";
import FilterButton from "../../components/FilterButton";
const Project = () => {
 const projects = useSelector((state: Rootstate) => state.projects.projects);
 const [filter, setFilter] = useState("all");
 const filteredProjects = projects.filter((project) => {
  if (filter === "all") return true;
  return project.status === filter;
 });

 return (
  <SafeAreaView className='flex-1 bg-white'>
   <View className='flex-row justify-between items-center px-4 py-3'>
    <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
     <Image source={icons.arrowleft} resizeMode='contain' className='w-6 h-6' />
    </TouchableOpacity>
    <Text className='font-bold text-xl'>Projects</Text>
    <TouchableOpacity
     className='bg-primary rounded-full w-10 h-10 items-center justify-center'
     onPress={() => router.push("(create)/createproject")}
    >
     <Ionicons name='add-outline' color='white' size={24} />
    </TouchableOpacity>
   </View>
   <View className='flex-row flex-wrap justify-center items-center py-2'>
    {["All", "Todo", "In-progress", "Done"].map((label) => (
     <FilterButton
      key={label}
      label={label}
      value={label.toLowerCase()}
      filter={filter}
      setValue={setFilter}
     />
    ))}
   </View>
   <FlatList
    className='px-4'
    data={filteredProjects}
    keyExtractor={(item) => item._id}
    renderItem={({ item }) => (
     <View className='mb-3'>
      <ProjectCard project={item} />
     </View>
    )}
   />
  </SafeAreaView>
 );
};

export default Project;
