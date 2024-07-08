import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import TaskCard from "../../../components/TaskCard";
import { useSelector } from "react-redux";
import { Rootstate } from "../../Redux/slices";
import FilterButton from "../../../components/FilterButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  _id: string;
  email: string;
  phone: number;
  fullNames: string;
  role: string;
  profile: string;
}

const Tasks = () => {
  const tasks = useSelector((state: Rootstate) => state.tasks.tasks);
  const [filter, setFilter] = useState("all");
  const [user, setUser] = useState<User>();
  const { width } = useWindowDimensions();
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  useEffect(() => {
    (async () => {
      const userData = (await AsyncStorage.getItem("user")) as string;
      const user = JSON.parse(userData);
      setUser(user);
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row justify-between items-center px-4 py-3">
        <Text className="font-bold text-xl sm:text-2xl md:text-3xl">Tasks</Text>
        {user && user.role === "admin" && (
          <TouchableOpacity
            className="bg-primary rounded-full w-10 h-10 sm:w-12 sm:h-12 items-center justify-center"
            onPress={() => router.push("(create)/createtask")}
          >
            <Ionicons
              name="add-outline"
              color="white"
              size={width > 640 ? 28 : 24}
            />
          </TouchableOpacity>
        )}
      </View>
      <View className="flex-row flex-wrap justify-center items-center py-2 md:py-4">
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
        className="px-4"
        data={filteredTasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View className={`mt-4 ${width > 768 ? "w-1/2 px-2" : "w-full"}`}>
            <TaskCard task={item} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        numColumns={width > 768 ? 2 : 1}
        columnWrapperStyle={
          width > 768 ? { justifyContent: "space-between" } : undefined
        }
      />
    </SafeAreaView>
  );
};

export default Tasks;
