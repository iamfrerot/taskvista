import { router } from "expo-router";
import {
 View,
 Text,
 TouchableOpacity,
 Image,
 ActivityIndicator,
 Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { Rootstate } from "../../Redux/slices";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import AvatarGroup from "../../../components/AvatarGroup";
import { icons } from "../../../constants";
import { MONTH_NAMES, StatusPicker } from "../../(create)/projectdetail";
import { useCallback, useEffect, useState } from "react";
import { Task, updateCurrentTaskStatus } from "../../Redux/slices/tasksSlice";
import { useDispatch } from "react-redux";
import CustomButton from "../../../components/CustomButton";
const taskdetails = () => {
 const token = useSelector((state: Rootstate) => state.auth.token);
 const [open, setOpen] = useState(false);
 const task = useSelector((state: Rootstate) => state.task.currentTask);
 const dispatch = useDispatch();
 const [status, setStatus] = useState<Task["status"] | null>(
  task?.status || null
 );
 const [isLoading, setIsLoading] = useState(false);
 const dueDate = task?.deadline ? new Date(task.deadline) : null;
 const handleSubmit = useCallback(async () => {
  if (status === task?.status || !task) return;
  setIsLoading(true);
  try {
   const response = await fetch(
    `https://pmt-server-x700.onrender.com/api/v1/tasks/edit/${task._id}`,
    {
     method: "PATCH",
     body: JSON.stringify({ status }),
     headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
     },
    }
   );
   if (response.ok) {
    dispatch(
     updateCurrentTaskStatus({
      taskId: task._id,
      status: status as Task["status"],
     })
    );
    router.back();
   } else {
    throw new Error("Failed to update task status");
   }
  } catch (error) {
   Alert.alert(
    "Error",
    error instanceof Error ? error.message : "An unkown erro occured"
   );
  } finally {
   setIsLoading(false);
  }
 }, [status, task, dispatch]);
 if (isLoading) {
  return (
   <SafeAreaView className='flex-1 justify-center items-center'>
    <ActivityIndicator size='large' color='#19459d' />
   </SafeAreaView>
  );
 }
 return (
  <SafeAreaView className='flex-1'>
   <Header />
   <View className='px-4 mt-3'>
    <TaskInfo task={task} dueDate={dueDate} token={token as string} />
    <TaskDescription description={task?.description} />
    <StatusPicker
     open={open}
     setOpen={setOpen}
     status={status}
     setStatus={setStatus}
     currentStatus={task?.status}
     bgColor={
      task?.priority === "High"
       ? "#B91C1C"
       : task?.priority === "Medium"
       ? "#FBBF24"
       : task?.priority === "Normal"
       ? "#16A34A"
       : task?.priority === "Low"
       ? "#1E40AF"
       : "white"
     }
     textColor='white'
    />
    <CustomButton
     title='Save'
     containerStyles={`${getStatusBgColor(task?.priority)} h-12 mt-4`}
     textStyles='text-white-100'
     handlePress={handleSubmit}
     disabled={status === task?.status}
    />
   </View>
  </SafeAreaView>
 );
};
const Header: React.FC = () => (
 <View className='px-3 flex-row items-center justify-between w-[65%]'>
  <TouchableOpacity
   className='self-start'
   activeOpacity={0.7}
   onPress={() => router.replace("task")}
  >
   <Image source={icons.arrowleft} resizeMode='contain' className='w-6 h-6' />
  </TouchableOpacity>
  <Text className='font-omedium text-lg text-center'>Task Details</Text>
 </View>
);
const TaskInfo = ({
 task,
 dueDate,
 token,
}: {
 task: Task | null;
 dueDate: Date | null;
 token: string;
}) => {
 const [developersProfiles, setDevelopersProfiles] = useState<string[]>();
 useEffect(() => {
  async function fetchDevsProfiles(userIds: string[]) {
   const userProfiles = [];
   const baseUrl = "https://pmt-server-x700.onrender.com/api/v1/users/view/";
   for (const userId of userIds) {
    try {
     const response = await fetch(`${baseUrl}${userId}`, {
      headers: {
       Authorization: `Bearer ${token}`,
      },
     });
     if (response.ok) {
      const { data } = await response.json();
      userProfiles.push(data.profile);
     } else {
      console.error(`Failed to fetch profile for user ID: ${userId}`);
     }
    } catch (error) {
     console.error(`Error fetching profile for user ID: ${userId}`, error);
    }
   }

   return userProfiles;
  }
  fetchDevsProfiles(task?.developers as string[]).then((data: string[]) => {
   setDevelopersProfiles(data);
  });
 }, []);
 return (
  <View className={`p-4 rounded-lg ${getStatusBgColor(task?.priority)} `}>
   <Text className='text-2xl font-bold mb-4 text-white-100'>{task?.name}</Text>
   <View className={"flex-row justify-between"}>
    <View className={"flex-row items-center"}>
     <FontAwesome5 name='calendar-day' size={26} color='white' />
     <View className={"ml-3"}>
      <Text className={"text-sm text-gray-50 font-oregular"}>Due Date</Text>
      <Text className='font-osemibold text-white-100'>
       {dueDate
        ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}`
        : "N/A"}
      </Text>
     </View>
    </View>
    <View className='flex-row'>
     <Ionicons name='people-outline' size={30} color='white' />
     <View className='ml-3'>
      <Text className='text-sm text-white-100 font-osemibold'>Developers</Text>
      {developersProfiles ? (
       <AvatarGroup
        avatars={developersProfiles as string[]}
        size={22}
        spacing={-6}
       />
      ) : (
       <Text className='text-white-100 text-[11px]'>No Devs...</Text>
      )}
     </View>
    </View>
   </View>
  </View>
 );
};
const TaskDescription = ({ description }: { description?: string }) => (
 <View className='mt-4'>
  <Text className='font-obold text-xl'>Description</Text>
  <Text className='mt-4 font-othin'>{description}</Text>
 </View>
);
export const getStatusBgColor = (priority: string | undefined) => {
 switch (priority) {
  case "High":
   return "bg-red-700";
  case "Medium":
   return "bg-yellow-400";
  case "Normal":
   return "bg-green-600";
  case "Low":
   return "bg-blue-800";
  default:
   return "bg-white-100";
 }
};
export default taskdetails;
