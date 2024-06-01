import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHome from "../../components/ProfileHome";
import { icons } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import TaskCompeted from "../../components/TaskCompeted";
import CalendarHome from "../../components/CalendarHome";
import TaskHome from "../../components/TaskHome";
const home = () => {
 return (
  <SafeAreaView>
   <View>
    <View className='flex-row justify-between items-center px-4'>
     <ProfileHome
      img='https://firebasestorage.googleapis.com/v0/b/my-brand-frontend.appspot.com/o/blogsImg%2Fslaye.jpg?alt=media&token=720bbb43-f824-4786-963a-d383ff72d4e6'
      name='Frerot'
     />
     <TouchableOpacity className='p-3 border border-gray-300 rounded-full items-center justify-center '>
      {false ? (
       <Ionicons name='mail-unread' size={23} color='green' />
      ) : (
       <Ionicons name='mail' size={23} color='#d1d5db' />
      )}
     </TouchableOpacity>
    </View>
    <TaskCompeted value={90} />
    <CalendarHome />
    <TaskHome />
   </View>
  </SafeAreaView>
 );
};

export default home;
