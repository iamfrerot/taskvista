import { Text, View, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { icons } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import ProjectCard from "../../components/ProjectCard";
import { ProjectProp } from "../../components/ProjectHome";
import { FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
const project = () => {
 const [filter, setFilter] = useState("all");
 const [data, setData] = useState<ProjectProp[]>([]);
 const [isLoading, setIsLoading] = useState(true);
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
   setData(json.data.data);
   setIsLoading(false);
  };
  getProject();
 }, [isLoading]);
 const filteredProjects = data.filter((project) => {
  if (filter === "all") return true;
  return project.status === filter;
 });
 if (isLoading)
  return (
   <SafeAreaView className='items-center justify-center h-full bg-primary'>
    <ActivityIndicator color='white' size='large' />
    <StatusBar style='light' />
   </SafeAreaView>
  );
 return (
  <SafeAreaView>
   <View className='flex-row justify-between items-center px-4 py-2'>
    <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
     <Image
      source={icons.arrowleft}
      resizeMode='contain'
      className='w-7 h-7 '
     />
    </TouchableOpacity>
    <Text className='font-obold  text-2xl'>Projects</Text>
    <TouchableOpacity
     className='bg-primary rounded-full items-center justify-center'
     onPress={() => router.push("(create)/createproject")}
    >
     <Ionicons name='add-outline' color='white' size={32} />
    </TouchableOpacity>
   </View>
   <View className='h-10 flex-row items-center justify-center gap-x-1 my-2'>
    <TouchableOpacity
     className={`${
      filter === "all" ? "bg-primary " : "bg-gray-100"
     } rounded-lg py-2 px-4`}
     onPress={() => setFilter("all")}
    >
     <Text className='font-obold text-white-100 text-sm'>All</Text>
    </TouchableOpacity>
    <TouchableOpacity
     className={`${
      filter == "todo" ? "bg-primary " : "bg-gray-100"
     } rounded-lg py-2 px-4`}
     onPress={() => setFilter("todo")}
    >
     <Text className='font-obold text-white-100 text-sm'>Todo</Text>
    </TouchableOpacity>
    <TouchableOpacity
     className={`${
      filter == "in-progress" ? "bg-primary " : "bg-gray-100"
     } rounded-lg py-2 px-4`}
     onPress={() => setFilter("in-progress")}
    >
     <Text className='font-obold text-white-100 text-sm'>In-progress</Text>
    </TouchableOpacity>
    <TouchableOpacity
     className={`${
      filter == "done" ? "bg-primary " : "bg-gray-100"
     } rounded-lg py-2 px-4`}
     onPress={() => setFilter("done")}
    >
     <Text className='font-obold text-white-100 text-sm'>Done</Text>
    </TouchableOpacity>
   </View>
   <View>
    <FlatList
     className='pt-2'
     data={filteredProjects}
     keyExtractor={(item) => item._id}
     renderItem={({ item }) => (
      <View className='px-4 mb-3'>
       <ProjectCard item={item} />
      </View>
     )}
    />
   </View>
  </SafeAreaView>
 );
};

export default project;
