import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

const TaskCompeted = ({ value }: { value: number }) => {
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
    <Text className='font-semibold text-white-100'>Mar 22</Text>
   </View>
  </View>
 );
};

export default TaskCompeted;
