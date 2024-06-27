import {
 View,
 Text,
 ScrollView,
 TouchableOpacity,
 Image,
 ActivityIndicator,
 Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import FormField from "../../components/FormField";
import { icons } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import UserDropdown from "../../components/UserDropDown";
import CustomButton from "../../components/CustomButton";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import { Calendar } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { addProjectToFront } from "../Redux/slices/projectsSlices";
import { STATUS_OPTIONS } from "./projectdetail";
import { PRIORITY_OPTIONS } from "./createtask";

interface formTypes {
 name: string;
 document: null | any;
 image: null | any;
 startDate: string;
 endDate: string;
 status: string;
 description: string;
 teamLead: string;
 category: string;
 deadline: string;
 priority: string;
}
const createproject = () => {
 const [isLoading, setIsLoading] = useState(false);
 const dispatch = useDispatch();
 const [form, setForm] = useState<formTypes>({
  name: "",
  document: null,
  image: null,
  startDate: "",
  endDate: "",
  status: "todo",
  description: "",
  teamLead: "",
  category: "",
  deadline: "",
  priority: "Normal",
 });
 const filePicker = async () => {
  const result = await DocumentPicker.getDocumentAsync();
  if (!result.canceled) {
   setForm({ ...form, document: result.assets });
  }
 };
 const imagePicker = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
   mediaTypes: ImagePicker.MediaTypeOptions.Images,
   aspect: [4, 3],
   quality: 1,
  });

  if (!result.canceled) {
   setForm({ ...form, image: result.assets[0] });
  }
 };
 const [open, setOpen] = useState(false);
 const [open2, setOpen2] = useState(false);
 const [showCalendar, setShowCalendar] = useState(false);
 const [showCalendar2, setShowCalendar2] = useState(false);
 const [showCalendar3, setShowCalendar3] = useState(false);
 const handleDeveloper = (value: any): void => {
  setForm({ ...form, teamLead: value });
 };
 const handleSubmit = async () => {
  const data = {
   name: form.name,
   description: form.description,
   priority: form.priority,
   startDate: new Date(form.startDate),
   endDate: new Date(form.endDate),
   deadline: new Date(form.deadline),
   category: form.category,
   teamLead: form.teamLead,
   status: form.status,
  };
  setIsLoading(true);
  const token = await AsyncStorage.getItem("token");
  try {
   const res = await fetch(
    "https://pmt-server-x700.onrender.com/api/v1/projects/create",
    {
     method: "POST",
     headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
     },
     body: JSON.stringify(data),
    }
   );
   if (res.ok) {
    const json = await res.json();
    dispatch(addProjectToFront(json.data));
    setIsLoading(false);
    router.push("/home");
   }
  } catch (error) {
   setIsLoading(false);
   Alert.alert("Erroring Creating Task", error as string);
  }
 };

 if (isLoading)
  return (
   <SafeAreaView className='items-center justify-center h-full bg-primary'>
    <ActivityIndicator color='white' size='large' />
   </SafeAreaView>
  );
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
    <Text className=' font-osemibold text-2xl'>Create Project</Text>
   </View>
   <ScrollView className='h-full px-4 gap-y-4'>
    <View className='space-y-2'>
     <Text className='text-base text-black font-omedium'>Upload Image</Text>
     <TouchableOpacity onPress={() => imagePicker()}>
      {form.image ? (
       <View className='w-28 h-28 rounded-full border-2 border-dashed border-primary'>
        <Image
         source={{ uri: form.image.uri }}
         resizeMode='cover'
         className='w-full h-full rounded-full'
        />
       </View>
      ) : (
       <View className='w-28 h-28 px-4 rounded-full items-center justify-center border-2 border-dashed border-primary '>
        <Ionicons name='add-outline' size={35} />
       </View>
      )}
     </TouchableOpacity>
    </View>
    <FormField
     title='Project Name'
     value={form.name}
     placeholder='Name Your Project'
     titleStyles='text-base'
     handleChangeText={(e: string) => setForm({ ...form, name: e })}
    />
    <FormField
     textarea={true}
     title='Project Description'
     value={form.description}
     placeholder='About the Project'
     handleChangeText={(e: string) => setForm({ ...form, description: e })}
     titleStyles='text-base'
    />
    <FormField
     title='Category'
     titleStyles='text-base'
     handleChangeText={(e: string) =>
      setForm({
       ...form,
       category: e,
      })
     }
     placeholder='Project Category'
     value={form.category}
    />
    <View className='space-y-2'>
     <Text className='text-base text-black font-omedium'>Upload File</Text>
     <TouchableOpacity onPress={() => filePicker()}>
      {form.document ? (
       <View className='bg-primary h-12 mr-3 items-center justify-center rounded-md px-3 '>
        <Text className='font-osemibold text-white-100'>
         {form.document[0].name}
        </Text>
       </View>
      ) : (
       <View className='w-full h-10 px-4 rounded-2xl items-center justify-center border-2 border-dashed border-primary '>
        <Ionicons name='add-outline' size={32} />
       </View>
      )}
     </TouchableOpacity>
    </View>
    <View>
     <TouchableOpacity
      onPress={() => setShowCalendar(true)}
      className='bg-primary px-1 py-3 rounded-lg'
     >
      <Text className='font-omedium text-base text-center text-white-100 '>
       {`${form.startDate || "Start Date"}`}
      </Text>
     </TouchableOpacity>
     {showCalendar && (
      <Calendar
       onDayPress={({ dateString }) => {
        setForm({
         ...form,
         startDate: dateString,
        });
        setShowCalendar(false);
       }}
       markedDates={{
        [form.startDate]: {
         selected: true,
         marked: true,
         selectedColor: "#19459d",
         selectedTextColor: "white",
        },
       }}
       enableSwipeMonths
       className='rounded-2xl relative -top-20'
       markingType='dot'
      />
     )}
    </View>
    <View>
     <TouchableOpacity
      onPress={() => setShowCalendar2(true)}
      className='bg-primary px-1 py-3 rounded-lg'
     >
      <Text className='font-omedium text-base text-center text-white-100 '>
       {`${form.endDate || "End Date"}`}
      </Text>
     </TouchableOpacity>
     {showCalendar2 && (
      <Calendar
       onDayPress={({ dateString }) => {
        setForm({
         ...form,
         endDate: dateString,
        });
        setShowCalendar2(false);
       }}
       markedDates={{
        [form.endDate]: {
         selected: true,
         marked: true,
         selectedColor: "#19459d",
         selectedTextColor: "white",
        },
       }}
       enableSwipeMonths
       className='rounded-2xl relative -top-20'
       markingType='dot'
      />
     )}
    </View>
    <View>
     <TouchableOpacity
      onPress={() => setShowCalendar3(true)}
      className='bg-primary px-1 py-3 rounded-lg'
     >
      <Text className='font-omedium text-base text-center text-white-100 '>
       {`${form.deadline || "Dead Line"}`}
      </Text>
     </TouchableOpacity>
     {showCalendar3 && (
      <Calendar
       onDayPress={({ dateString }) => {
        setForm({
         ...form,
         deadline: dateString,
        });
        setShowCalendar3(false);
       }}
       markedDates={{
        [form.deadline]: {
         selected: true,
         marked: true,
         selectedColor: "#19459d",
         selectedTextColor: "white",
        },
       }}
       enableSwipeMonths
       className='rounded-2xl relative -top-20'
       markingType='dot'
      />
     )}
    </View>
    <View>
     <Text className='font-omedium text-base mb-3'>Team Lead:</Text>
     <UserDropdown multi={false} handleAssigned={handleDeveloper} />
    </View>
    <View>
     <Text className='text-base font-omedium mb-3'>Priority:</Text>
     <DropDownPicker
      open={open}
      value={form.priority}
      setValue={(value) => setForm({ ...form, priority: value("") })}
      items={PRIORITY_OPTIONS}
      setOpen={setOpen}
      style={{ borderWidth: 0 }}
      dropDownContainerStyle={{
       borderWidth: 1,
       borderColor: "#ccc",
       borderRadius: 8,
       paddingTop: 13,
       paddingBottom: 13,
      }}
      placeholder='Choose Priority'
      listMode='SCROLLVIEW'
      dropDownDirection='TOP'
     />
    </View>
    <View>
     <Text className='text-base font-omedium mb-3'>Status:</Text>
     <DropDownPicker
      open={open2}
      value={form.status}
      setValue={(value) => setForm({ ...form, status: value("") })}
      items={STATUS_OPTIONS}
      setOpen={setOpen2}
      style={{ borderWidth: 0 }}
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
     />
    </View>
    <CustomButton
     title='Create'
     handlePress={handleSubmit}
     textStyles='font-osemibold text-white-100'
     containerStyles='w-full h-12 mt-5 mb-14 bg-primary'
    />
   </ScrollView>
  </SafeAreaView>
 );
};

export default createproject;
