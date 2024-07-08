import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { Link } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Rootstate } from "../app/Redux/slices";
import { setTasks } from "../app/Redux/slices/tasksSlice";
import { useDispatch, useSelector } from "react-redux";

interface User {
  _id: string;
  email: string;
  phone: number;
  fullNames: string;
  role: string;
  profile: string;
}

const TaskHome = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User>();
  const tasks = useSelector((state: Rootstate) => state.tasks.tasks);
  const getTasks = async (loggedInUser: User) => {
    const token = await AsyncStorage.getItem("token");
    const res = await fetch(
      `http://167.99.192.166:4000/api/v1/tasks/view${
        loggedInUser.role === "developer"
          ? `?developers=${loggedInUser._id}`
          : ""
      }`,
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
    (async () => {
      const userData = (await AsyncStorage.getItem("user")) as string;
      const user = JSON.parse(userData);
      setUser(user);
    })();
  }, []);

  useEffect(() => {
    if (user) {
      getTasks(user);
    }
  }, [user]);
  return (
    <View className=" mt-3">
      <View className="flex-row items-center justify-between px-2 mb-5 ">
        <Text className="font-osemibold text-xl">Your Task</Text>
        <Link className="text-primary font-osemibold" href={"/task"}>
          See All
        </Link>
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View className="ml-3">
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
