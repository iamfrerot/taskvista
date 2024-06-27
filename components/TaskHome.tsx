import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { Link } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Rootstate } from "../app/Redux/slices";
import { setTasks } from "../app/Redux/slices/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
const TaskHome = () => {
 const dispatch = useDispatch();
 const tasks = useSelector((state: Rootstate) => state.tasks.tasks);
 const getTasks = async () => {
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(
   "https://pmt-server-x700.onrender.com/api/v1/tasks/view",
   {
    headers: {
     Authorization: `Bearer ${token} `,
    },
   }
  );
  const json = await res.json();
  dispatch(setTasks(json.data.data));
 };
 useEffect(() => {
  getTasks();
 }, []);
 return (
  <View className=' mt-3'>
   <View className='flex-row items-center justify-between px-2 mb-5 '>
    <Text className='font-osemibold text-xl'>Your Task</Text>
    <Link className='text-primary font-osemibold' href={"/task"}>
     See All
    </Link>
   </View>
   <FlatList
    data={tasks}
    renderItem={({ item }) => (
     <View className='ml-3'>
      <TaskCard task={item} />
     </View>
    )}
    horizontal
    showsHorizontalScrollIndicator={false}
   />
  </View>
 );
};

export default TaskHome;
