import { View, Text, FlatList } from "react-native";
import CalendarDay from "./CalendarDay";

const CalendarHome = () => {
 return (
  <View className='mt-6'>
   <FlatList
    data={[
     {
      id: "1",
      date: 14,
      day: "Thu",
     },
     {
      id: "2",
      date: 15,
      day: "Thu",
     },
     {
      id: "3",
      date: 16,
      day: "Thu",
     },
     {
      id: "4",
      date: 17,
      day: "Thu",
     },
     {
      id: "5",
      date: 1,
      day: "Thu",
     },
     {
      id: "6",
      date: 19,
      day: "Thu",
     },
    ]}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
     <View className='justify-center'>
      <CalendarDay item={item} />
     </View>
    )}
    showsHorizontalScrollIndicator={false}
    horizontal={true}
   />
  </View>
 );
};

export default CalendarHome;
