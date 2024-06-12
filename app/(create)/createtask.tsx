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
import GetProjectDown from "../../components/GetProjectDown";
import { Calendar } from "react-native-calendars";
import { StatusBar } from "expo-status-bar";
const createtask = () => {
 const [form, setForm] = useState<{
  name: string;
  document: null | any;
  startdate: string;
  deadline: string;
  enddate: string;
  status: string;
  priority: string;
  description: string;
  developers: string[];
  project: string;
 }>({
  name: "",
  document: null,
  startdate: "",
  enddate: "",
  deadline: "",
  status: "",
  priority: "Normal",
  description: "",
  developers: [],
  project: "",
 });
 const [open, setOpen] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const [showCalendar, setShowCalendar] = useState(false);
 const [showCalendar2, setShowCalendar2] = useState(false);
 const [showCalendar3, setShowCalendar3] = useState(false);
 const filesPicker = async () => {
  const result = await DocumentPicker.getDocumentAsync();
  if (!result.canceled) {
   setForm({ ...form, document: result.assets });
  }
 };
 const renderItem = ({ item }: { item: any }) => (
  <View className='bg-primary h-12 mr-3 items-center justify-center rounded-md px-3 max-w-[100px]'>
   <Text className='font-osemibold text-white-100'>{item.name}</Text>
  </View>
 );
 const handleAssigned = (arr: any) => {
  setForm({ ...form, developers: arr });
 };
 const handleSubmit = async () => {
  setIsLoading(true);
  const data = {
   name: form.name,
   project: form.project,
   description: form.description,
   developers: form.developers,
   deadline: new Date(form.deadline),
   priority: form.priority,
   endDate: new Date(form.enddate),
   startDate: new Date(form.startdate),
  };
  try {
   const result = await fetch(
    "https://pmt-server-x700.onrender.com/api/v1/tasks/create",
    {
     method: "POST",
     headers: {
      Authorization:
       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ0ZTU2YzFkODk5NzhjMjdmZDJhNTgiLCJlbWFpbCI6InBtdGFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMDc4ODIzMzU2MCIsImZ1bGxOYW1lcyI6IktldmluZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNzM1ODc2Mn0.zNKjtG2SxKWIR9HPkolgy8ltNCC4wrTvHpf7eKNjVLc",
      "Content-Type": "application/json",
     },
     body: JSON.stringify(data),
    }
   );
   if (result.status === 201) {
    router.back();
    setIsLoading(false);
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
    <StatusBar style='light' />
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
     value={form.description}
     placeholder='About this Task'
     handleChangeText={(e: string) => setForm({ ...form, description: e })}
     titleStyles='text-base'
    />
    <View className='space-y-2'>
     <Text className='text-base text-black font-omedium'>Upload File</Text>
     <TouchableOpacity onPress={() => filesPicker()}>
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
       {`${form.startdate || "Start Date"}`}
      </Text>
     </TouchableOpacity>
     {showCalendar && (
      <Calendar
       onDayPress={({ dateString }) => {
        setForm({
         ...form,
         startdate: dateString,
        });
        setShowCalendar(false);
       }}
       markedDates={{
        [form.startdate]: {
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
       {`${form.enddate || "End Date"}`}
      </Text>
     </TouchableOpacity>
     {showCalendar2 && (
      <Calendar
       onDayPress={({ dateString }) => {
        setForm({
         ...form,
         enddate: dateString,
        });
        setShowCalendar2(false);
       }}
       markedDates={{
        [form.enddate]: {
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
       {`${form.deadline || "Deadline"}`}
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
     <Text className='text-base font-omedium mb-3'>Priority:</Text>
     <DropDownPicker
      open={open}
      value={form.priority}
      setValue={(value) => setForm({ ...form, priority: value("") })}
      items={[
       {
        label: "Low",
        value: "Low",
       },
       {
        label: "Normal",
        value: "Normal",
       },
       {
        label: "Medium",
        value: "Medium",
       },
       {
        label: "High",
        value: "High",
       },
      ]}
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
     <Text className='font-omedium text-base mb-3'>For:</Text>
     <UserDropdown handleAssigned={handleAssigned} multi={true} />
    </View>
    <View>
     <Text className='font-omedium text-base mb-3'>in:</Text>
     <GetProjectDown
      handleAssigned={(e: string) => {
       setForm({ ...form, project: e });
      }}
      multi={false}
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

export default createtask;
