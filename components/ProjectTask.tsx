import { View, Text, TouchableOpacity } from "react-native";
import { Task } from "../app/Redux/slices/tasksSlice";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setCurrentTask } from "../app/Redux/slices/taskSlice";
import { router } from "expo-router";
const ProjectTask = ({ task }: { task: Task }) => {
 const dispatch = useDispatch();

 return (
  <TouchableOpacity
   onPress={() => {
    dispatch(setCurrentTask(task));
    router.navigate("task/taskdetails");
   }}
   className='bg-blue-100 p-4 flex-row justify-between items-center rounded-md '
  >
   <Text className='font-osemibold text-lg'>{task.name}</Text>
   <View className='bg-primary rounded-md p-2'>
    {task.status === "done" ? (
     <MaterialIcons name='check-circle-outline' size={24} color='white' />
    ) : (
     <Entypo name='circle-with-cross' size={24} color='white' />
    )}
   </View>
  </TouchableOpacity>
 );
};

export default ProjectTask;
