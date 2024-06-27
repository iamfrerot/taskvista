import React, { useState, useCallback } from "react";
import {
 View,
 Text,
 TouchableOpacity,
 Image,
 FlatList,
 ActivityIndicator,
 Alert,
 ListRenderItem,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CircularProgress from "react-native-circular-progress-indicator";
import { useSelector, useDispatch } from "react-redux";
import { router } from "expo-router";
import { icons } from "../../constants";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import AvatarGroup from "../../components/AvatarGroup";
import ProjectTask from "../../components/ProjectTask";
import CustomButton from "../../components/CustomButton";
import DropDownPicker from "react-native-dropdown-picker";
import { updateCurrentProjectStatus } from "../Redux/slices/projectsSlices";
import { Rootstate } from "../Redux/slices";
import { Project } from "../Redux/slices/projectsSlices";
import { Task } from "../Redux/slices/tasksSlice";

export const MONTH_NAMES = [
 "Jan",
 "Feb",
 "Mar",
 "Apr",
 "May",
 "Jun",
 "Jul",
 "Aug",
 "Sep",
 "Oct",
 "Nov",
 "Dec",
];
export const STATUS_OPTIONS = [
 { label: "Todo", value: "todo" },
 { label: "In-progress", value: "in-progress" },
 { label: "Done", value: "done" },
];

const ProjectDetail: React.FC = () => {
 const dispatch = useDispatch();
 const project = useSelector(
  (state: Rootstate) => state.project.currentProject
 );
 const tasks = useSelector((state: Rootstate) => state.tasks.tasks);
 const token = useSelector((state: Rootstate) => state.auth.token);
 const [isLoading, setIsLoading] = useState<boolean>(false);
 const [open, setOpen] = useState<boolean>(false);
 const [status, setStatus] = useState<Project["status"] | null>(
  project?.status || null
 );

 const filteredTasks = tasks.filter((task) => task.project === project?._id);
 const dueDate = project?.deadline ? new Date(project.deadline) : null;

 const handleSubmit = useCallback(async () => {
  if (status === project?.status || !project) return;
  setIsLoading(true);
  try {
   const response = await fetch(
    `https://pmt-server-x700.onrender.com/api/v1/projects/edit/${project._id}`,
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
     updateCurrentProjectStatus({
      projectId: project._id,
      status: status as Project["status"],
     })
    );
    router.back();
   } else {
    throw new Error("Failed to update project status");
   }
  } catch (error) {
   Alert.alert(
    "Error",
    error instanceof Error ? error.message : "An unknown error occurred"
   );
  } finally {
   setIsLoading(false);
  }
 }, [status, project, dispatch]);

 if (isLoading) {
  return (
   <SafeAreaView className='flex-1 justify-center items-center'>
    <ActivityIndicator size='large' color='#19459d' />
   </SafeAreaView>
  );
 }
 return (
  <SafeAreaView className='flex-1 bg-white-100'>
   <Header />
   <View className='px-4 mt-3'>
    <ProjectInfo project={project} dueDate={dueDate} />
    <ProjectDescription description={project?.description} />
    <ProjectProgress completion={project?.completion} />
    <TaskList tasks={filteredTasks} />
    <StatusPicker
     open={open}
     setOpen={setOpen}
     status={status}
     setStatus={setStatus}
     currentStatus={project?.status}
     bgColor='#dbeafe'
    />
    <CustomButton
     title='Save'
     containerStyles='bg-primary h-12 mt-4'
     textStyles='text-white-100'
     handlePress={handleSubmit}
     disabled={status === project?.status}
    />
   </View>
  </SafeAreaView>
 );
};

const Header: React.FC = () => (
 <View className='px-3 flex-row items-center justify-between w-[70%]'>
  <TouchableOpacity
   className='self-start'
   activeOpacity={0.7}
   onPress={() => router.back()}
  >
   <Image source={icons.arrowleft} resizeMode='contain' className='w-6 h-6' />
  </TouchableOpacity>
  <Text className='font-omedium text-lg text-center'>Project Details</Text>
 </View>
);

interface ProjectInfoProps {
 project: Project | null;
 dueDate: Date | null;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ project, dueDate }) => (
 <>
  <Text className='font-obold text-2xl'>{project?.name}</Text>
  <View className='flex-row justify-between mt-4'>
   <InfoItem
    icon={<FontAwesome5 name='calendar-day' size={26} color='white' />}
    label='Due Date'
    value={
     dueDate ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : "N/A"
    }
   />
   <InfoItem
    icon={<Ionicons name='person-outline' size={26} color='white' />}
    label='Team Lead'
    value={
     <AvatarGroup avatars={[project?.image || ""]} size={30} spacing={-9} />
    }
   />
  </View>
 </>
);

interface InfoItemProps {
 icon: React.ReactNode;
 label: string;
 value: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
 <View className='flex-row gap-x-3'>
  <View className='bg-primary rounded-xl justify-center items-center px-4'>
   {icon}
  </View>
  <View>
   <Text className='font-oregular text-base text-gray-400'>{label}</Text>
   {typeof value === "string" ? (
    <Text className='font-oregular text-base text-gray-400'>{value}</Text>
   ) : (
    value
   )}
  </View>
 </View>
);

const ProjectDescription: React.FC<{ description?: string }> = ({
 description,
}) => (
 <View className='mt-4'>
  <Text className='font-obold text-xl'>Description</Text>
  <Text className='mt-4 font-othin'>{description}</Text>
 </View>
);

const ProjectProgress: React.FC<{ completion?: number }> = ({ completion }) => (
 <View className='mt-4 flex-row items-center justify-between'>
  <Text className='font-osemibold text-xl'>Progress</Text>
  <CircularProgress
   value={completion || 0}
   progressValueColor='black'
   radius={40}
   maxValue={100}
   duration={800}
   valueSuffix='%'
   activeStrokeWidth={4}
   inActiveStrokeOpacity={1}
   activeStrokeColor='#19459d'
   progressValueStyle={{ fontFamily: "Outfit-SemiBold" }}
   inActiveStrokeColor='#c7d7f5'
   inActiveStrokeWidth={4}
  />
 </View>
);

const TaskList: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
 const renderItem: ListRenderItem<Task> = ({ item }) => (
  <View className='mt-3'>
   <ProjectTask task={item} />
  </View>
 );

 return (
  <FlatList
   data={tasks}
   keyExtractor={(item) => item._id}
   ListHeaderComponent={
    tasks.length !== 0 ? <Text className='font-osemibold'>Tasks</Text> : null
   }
   ListEmptyComponent={
    <View className='bg-blue-100 rounded-md mt-1 h-[109px] items-center justify-center'>
     <Text className='font-osemibold text-center'>
      No Tasks For This Project
     </Text>
    </View>
   }
   className='my-4 h-[130px]'
   renderItem={renderItem}
  />
 );
};

interface StatusPickerProps {
 open: boolean;
 setOpen: React.Dispatch<React.SetStateAction<boolean>>;
 status: Project["status"] | null;
 setStatus: React.Dispatch<React.SetStateAction<Project["status"] | null>>;
 currentStatus?: Project["status"];
 bgColor: string;
 textColor?: string;
}

export const StatusPicker: React.FC<StatusPickerProps> = ({
 open,
 setOpen,
 status,
 setStatus,
 bgColor,
 textColor = "black",
}) => (
 <View>
  <Text className='font-osemibold text-lg my-3'>Change Status</Text>
  <DropDownPicker
   open={open}
   value={status}
   items={STATUS_OPTIONS}
   setOpen={setOpen}
   setValue={setStatus}
   style={{ borderWidth: 0, backgroundColor: bgColor }}
   dropDownContainerStyle={{
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingTop: 13,
    paddingBottom: 13,
   }}
   placeholder='Select Status'
   listMode='SCROLLVIEW'
   dropDownDirection='TOP'
   selectedItemContainerStyle={{ backgroundColor: "#19459d" }}
   selectedItemLabelStyle={{ color: "white" }}
   textStyle={{ fontWeight: "bold" }}
   showTickIcon={false}
   labelStyle={{ color: textColor }}
  />
 </View>
);

export default ProjectDetail;
