import { View, Text, TouchableOpacity } from "react-native";
import AvatarGroup from "./AvatarGroup";
import { Task } from "../app/Redux/slices/tasksSlice";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { setCurrentTask } from "../app/Redux/slices/taskSlice";
import { getStatusBgColor } from "../app/(tabs)/task/taskdetails";
const TaskCard = ({ task }: { task: Task }) => {
 const dispatch = useDispatch();
 return (
  <TouchableOpacity
   activeOpacity={0.5}
   onPress={() => {
    dispatch(setCurrentTask(task));
    router.navigate("task/taskdetails");
   }}
   className='bg-white-100 px-2 py-4 rounded-xl min-h-[150px] max-h-[150px] min-w-[190px] border border-gray-400'
  >
   <Text className='font-osemibold text-xl'>{task.name}</Text>
   <View className='flex-row items-center justify-between px-[2px]'>
    <Text className='text-gray-100 max-w-[160px] text-sm'>
     {task.description.substring(0, 15) + " ..."}
    </Text>
    <View className={`rounded-md p-2 ${getStatusBgColor(task.priority)}`}>
     <Text className='font-osemibold text-white-100 text-[11px]'>
      {task.priority}
     </Text>
    </View>
   </View>
   <View>
    <View>
     <AvatarGroup avatars={[task.image]} size={30} spacing={-9} />
    </View>
   </View>
  </TouchableOpacity>
 );
};

export default TaskCard;
