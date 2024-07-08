import { View, FlatList, Text, Alert } from "react-native";
import { Link } from "expo-router";
import ProjectCard from "./ProjectCard";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../app/Redux/slices";
import { setProjects } from "../app/Redux/slices/projectsSlices";

interface User {
  _id: string;
  email: string;
  phone: number;
  fullNames: string;
  role: string;
  profile: string;
}

const ProjectHome = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User>();
  const projects = useSelector((state: Rootstate) => state.projects.projects);
  const getProjects = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await fetch(
        "http://167.99.192.166:4000/api/v1/projects/view",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await res.json();
      dispatch(setProjects(json.data.data));
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const getDevProjects = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await fetch(
        "http://167.99.192.166:4000/api/v1/projects/view/myprojects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await res.json();
      dispatch(setProjects(json.data.data));
    } catch (error: any) {
      Alert.alert(error.message);
    }
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
      user.role === "stakeholder" || user.role === "admin"
        ? getProjects()
        : user.role === "developer" && getDevProjects();
    }
  }, [user]);

  return (
    <View className="mb-4">
      <View className="flex-row items-center justify-between px-2 py-2 ">
        <Text className="font-osemibold text-xl">Ongoing projects</Text>
        <Link className="text-primary font-osemibold" href={"/projects"}>
          See All
        </Link>
      </View>
      <View className="mr-1">
        <FlatList
          className="pl-4"
          data={projects}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) =>
            item.status !== "done" ? (
              <View className="mr-3">
                <ProjectCard project={item} />
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
