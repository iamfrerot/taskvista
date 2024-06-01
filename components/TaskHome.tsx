import { View, Text, FlatList } from "react-native";
import React from "react";
import TaskCard from "./TaskCard";
import { Link } from "expo-router";

const TaskHome = () => {
 return (
  <View className=' mt-3'>
   <View className='flex-row items-center justify-between px-2 mb-5 '>
    <Text className='font-osemibold text-xl'>Your Task</Text>
    <Link className='text-primary font-osemibold' href={"/task"}>
     See All
    </Link>
   </View>
   <FlatList
    className='pl-4'
    data={[
     {
      id: "1",
      title: "Medical LP",
      task: "Make A landing Page and mobile app.",
     },
     {
      id: "2",
      title: "Medical LP",
      task: "Make A landing Page and mobile app.",
     },
     {
      id: "3",
      title: "Medical LP",
      task: "Make A landing Page and mobile app.",
     },
    ]}
    renderItem={({ item }) => <TaskCard item={item} />}
    horizontal
    showsHorizontalScrollIndicator={false}
   />
  </View>
 );
};

export default TaskHome;
