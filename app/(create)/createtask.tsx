import {
 View,
 Text,
 ScrollView,
 TouchableOpacity,
 Image,
 FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import FormField from "../../components/FormField";
import DateTimepicker from "@react-native-community/datetimepicker";
import { icons } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import UserDropdown from "../../components/UserDropDown";
import CustomButton from "../../components/CustomButton";
import alldevs from "../../helper/getallDeveloper";
import DropDownPicker from "react-native-dropdown-picker";
const createtask = () => {
 const [form, setForm] = useState<{
  name: string;
  documents: null | any;
  startdate: Date;
  deadline: Date;
  enddate: Date;
  status: string;
  priority: string;
  taskdescription: string;
  assignedto: string[];
 }>({
  name: "",
  documents: null,
  startdate: new Date(),
  enddate: new Date(),
  deadline: new Date(),
  status: "",
  priority: "Normal",
  taskdescription: "",
  assignedto: [],
 });
 const [open, setOpen] = useState(false);
 const filesPicker = async () => {
  const result = await DocumentPicker.getDocumentAsync();
  if (!result.canceled) {
   setForm({ ...form, documents: result.assets });
  }
 };
 const renderItem = ({ item }: { item: any }) => (
  <View className='bg-primary h-12 mr-3 items-center justify-center rounded-md px-3 max-w-[100px]'>
   <Text className='font-osemibold text-white-100'>{item.name}</Text>
  </View>
 );
 const handleAssigned = (arr: any) => {
  setForm({ ...form, assignedto: arr });
 };
 console.log(form);

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
     <Text className='text-base text-black font-omedium'>Upload File</Text>
     <TouchableOpacity onPress={() => filesPicker()}>
      {form.documents ? (
       <View className='bg-primary h-12 mr-3 items-center justify-center rounded-md px-3 '>
        <Text className='font-osemibold text-white-100'>
         {form.documents[0].name}
        </Text>
       </View>
      ) : (
       <View className='w-full h-10 px-4 rounded-2xl items-center justify-center border-2 border-dashed border-primary '>
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
    <View className='flex-row items-center justify-between '>
     <Text className='font-omedium text-base'>Choose Deadline Date:</Text>
     <DateTimepicker
      value={form.deadline}
      mode='date'
      display='default'
      onChange={(e, selectedDate) =>
       setForm({ ...form, deadline: selectedDate as Date })
      }
     />
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
