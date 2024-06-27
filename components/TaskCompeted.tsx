import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { useSelector } from "react-redux";
import { Rootstate } from "../app/Redux/slices";
import { Task } from "../app/Redux/slices/tasksSlice";
const TaskCompeted = () => {
 const tasks = useSelector((state: Rootstate) => state.tasks.tasks);
 const comptetedPercentange = calculateCompletionPercentage(tasks);
 const date = new Date().getDate();
 const month = new Date().getMonth();
 let monthName: string;
 switch (month) {
  case 0:
   monthName = "Jan";
   break;
  case 1:
   monthName = "Feb";
   break;
  case 2:
   monthName = "Mar";
   break;
  case 3:
   monthName = "Apr";
   break;
  case 4:
   monthName = "May";
   break;
  case 5:
   monthName = "Jun";
   break;
  case 6:
   monthName = "Jul";
   break;
  case 7:
   monthName = "Aug";
   break;
  case 8:
   monthName = "Sep";
   break;
  case 9:
   monthName = "Oct";
   break;
  case 10:
   monthName = "Nov";
   break;
  case 11:
   monthName = "Dec";
   break;
  default:
   monthName = "Unknown";
   break;
 }
 return (
  <View className='items-center flex-row justify-between mt-6 px-5'>
   <View className='flex-row items-center gap-x-2'>
    <CircularProgress
     value={comptetedPercentange}
     progressValueColor='black'
     radius={50}
     initialValue={0}
     maxValue={100}
     duration={800}
     valueSuffix={"%"}
     activeStrokeWidth={10}
     activeStrokeColor='#19459d'
     progressValueStyle={{ fontFamily: "Outfit-SemiBold" }}
     inActiveStrokeColor='#c7d7f5'
     inActiveStrokeWidth={10}
    />
    <Text className='font-omedium text-sm max-w-[80px]'>Task Completed</Text>
   </View>
   <View className='flex-row gap-x-2 items-center bg-primary py-3 px-3 rounded-3xl'>
    <Ionicons name='calendar' color='white' size={22} />
    <Text className='font-semibold text-white-100 items-center'>{`${monthName}   ${date}`}</Text>
   </View>
  </View>
 );
};
function calculateCompletionPercentage(tasks: Task[]) {
 if (!tasks || tasks.length === 0) {
  return 0;
 }
 const completedTasks = tasks.filter((task) => task.status === "done").length;
 const percentageCompleted = (completedTasks / tasks.length) * 100;

 return percentageCompleted;
}

export default TaskCompeted;
