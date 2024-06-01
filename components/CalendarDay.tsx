import { View, Text } from "react-native";
import * as Animatable from "react-native-animatable";

const CalendarDay = ({
 item,
}: {
 item: { id: string; day: string; date: number };
}) => {
 const date = new Date().getDate();

 return (
  <View
   className={`bg-gray-100 py-10 px-5 ml-3 rounded-[36px] items-center justify-center h-[140px] ${
    date === item.date ? "bg-primary h-[160px]" : ""
   }`}
  >
   <Text className='font-obold text-2xl text-white-100'>{item.date}</Text>
   <Text className='font-omedium text-lg text-white-100'>{item.day}</Text>
  </View>
 );
};

export default CalendarDay;
