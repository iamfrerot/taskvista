import {
 View,
 Text,
 ScrollView,
 TouchableOpacity,
 Image,
 FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import FormField from "../../components/FormField";
import DateTimepicker from "@react-native-community/datetimepicker";
import { icons } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import UserDropdown from "../../components/UserDropDown";
import CustomButton from "../../components/CustomButton";

const createtask = () => {
 const [form, setForm] = useState<{
  name: string;
  images: null | any;
  documents: null | any;
  startdate: Date;
  enddate: Date;
  status: string;
  taskpriority: number;
  taskdescription: string;
  assignedto: string[];
 }>({
  name: "",
  images: null,
  documents: null,
  startdate: new Date(),
  enddate: new Date(),
  status: "",
  taskpriority: 0,
  taskdescription: "",
  assignedto: [],
 });
 const openPickerImg = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
   mediaTypes: ImagePicker.MediaTypeOptions.Images,
   quality: 1,
   aspect: [4, 3],
   selectionLimit: 3,
   allowsMultipleSelection: true,
  });
  if (!result.canceled) {
   setForm({ ...form, images: result.assets });
  }
 };
 return (
  <SafeAreaView>
   <View className='pb-5 px-4 items-center flex-row justify-between '>
    <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
     <Image
      source={icons.arrowleft}
      resizeMode='contain'
      className='w-7 h-7 '
     />
    </TouchableOpacity>
    <Text className=' font-osemibold text-2xl'>Create New Task</Text>
   </View>
   <ScrollView className='h-full px-4 gap-y-4'>
    <FormField
     title='Task Name'
     value={form.name}
     placeholder='Name Your Task'
     titleStyles='text-base'
     handleChangeText={(e: string) => setForm({ ...form, name: e })}
    />
    <FormField
     textarea={true}
     title='Task Description'
     value={form.taskdescription}
     placeholder='About this Task'
     handleChangeText={(e: string) => setForm({ ...form, taskdescription: e })}
     titleStyles='text-base'
    />
    <View className='space-y-2'>
     <Text className='text-base text-black font-omedium'>
      Upload Images (Limit 3)
     </Text>
     <TouchableOpacity onPress={() => openPickerImg()}>
      {form.images ? (
       <Image
        source={{ uri: form.images[1].uri }}
        resizeMode='cover'
        className='w-full h-64 rounded-xl'
       />
      ) : (
       <View className='w-full h-40 px-4 rounded-2xl items-center justify-center border-2 border-dashed border-primary '>
        <Ionicons name='add-outline' size={32} />
       </View>
      )}
     </TouchableOpacity>
    </View>
    <View className='flex-row items-center justify-between '>
     <Text className='font-omedium text-base'>Choose Starting Date</Text>
     <DateTimepicker
      value={form.startdate}
      mode='date'
      display='default'
      onChange={(e, selectedDate) =>
       setForm({ ...form, startdate: selectedDate as Date })
      }
     />
    </View>
    <View className='flex-row items-center justify-between '>
     <Text className='font-omedium text-base'>Choose Ending Date</Text>
     <DateTimepicker
      value={form.enddate}
      mode='date'
      display='default'
      onChange={(e, selectedDate) =>
       setForm({ ...form, enddate: selectedDate as Date })
      }
     />
    </View>
    <View>
     <Text className='font-omedium text-base mb-3'>For:</Text>
     <UserDropdown />
    </View>
    <CustomButton
     title='Create'
     handlePress={() => console.log("")}
     textStyles='font-osemibold text-white-100'
     containerStyles='w-full h-12 mt-5 mb-14 bg-primary'
    />
   </ScrollView>
  </SafeAreaView>
 );
};

export default createtask;
