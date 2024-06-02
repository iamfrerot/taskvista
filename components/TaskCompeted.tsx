import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

const TaskCompeted = ({ value }: { value: number }) => {
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
     value={value}
     progressValueColor='black'
     radius={50}
     initialValue={0}
     maxValue={100}
     duration={800}
     valueSuffix={"%"}
     activeStrokeWidth={10}
     inActiveStrokeOpacity={0}
     activeStrokeColor='#19459d'
     progressValueStyle={{ fontFamily: "Outfit-SemiBold" }}
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

export default TaskCompeted;
