import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
 } from "react-native";
 import { SafeAreaView } from "react-native-safe-area-context";
 import React, { useState } from "react";
 import * as DocumentPicker from "expo-document-picker";
 import { router } from "expo-router";
 import FormField from "../../components/FormField";
 import DateTimepicker from "@react-native-community/datetimepicker";
 import { icons } from "../../constants";
 import { Ionicons } from "@expo/vector-icons";
 import UserDropdown from "../../components/UserDropDown";
 import CustomButton from "../../components/CustomButton";
 import DropDownPicker from "react-native-dropdown-picker";
 import * as ImagePicker from "expo-image-picker";
 const createproject = () => {
  interface formTypes {
   name: string;
   document: null | any;
   image: null | any;
   startDate: Date;
   endDate: Date;
   status: string;
   description: string;
   teamLead: string;
   category: string;
   deadline: Date;
   priority: string;
  }
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<formTypes>({
   name: "",
   document: null,
   image: null,
   startDate: new Date(),
   endDate: new Date(),
   status: "todo",
   description: "",
   teamLead: "",
   category: "",
   deadline: new Date(),
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
  const handleDeveloper = (value: any): void => {
   setForm({ ...form, teamLead: value });
  };
  const handleSubmit = async () => {
   const data = {
    name: form.name,
    description: form.description,
    priority: form.priority,
    startDate: form.startDate,
    endDate: form.endDate,
    deadline: form.deadline,
    category: form.category,
    teamLead: form.teamLead,
    status: form.status,
   };
 
   setIsLoading(true);
   try {
    const res = await fetch(
     "https://pmt-server-x700.onrender.com/api/v1/projects/create",
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
    if (res.status) {
     setForm({
      name: "",
      document: null,
      image: null,
      startDate: new Date(),
      endDate: new Date(),
      status: "todo",
      description: "",
      teamLead: "",
      category: "",
      deadline: new Date(),
      priority: "Normal",
     });
     router.back();
    }
   } catch (error) {
    console.log(error);
   }
  };
  if (isLoading)
   return (
    <SafeAreaView className='items-center justify-center h-full bg-gray-100'>
     <ActivityIndicator color='darkblue' size='large' />
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
      placeholder='Name Your Task'
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
 
     <View className='flex-row items-center justify-between '>
      <Text className='font-omedium text-base'>Choose Starting Date:</Text>
      <DateTimepicker
       value={form.startDate}
       mode='date'
       display='default'
       onChange={(e, selectedDate) =>
        setForm({ ...form, startDate: selectedDate as Date })
       }
      />
     </View>
     <View className='flex-row items-center justify-between '>
      <Text className='font-omedium text-base'>Choose Ending Date:</Text>
      <DateTimepicker
       value={form.endDate}
       mode='date'
       display='default'
       onChange={(e, selectedDate) =>
        setForm({ ...form, endDate: selectedDate as Date })
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
      <Text className='font-omedium text-base mb-3'>Team Lead:</Text>
      <UserDropdown multi={false} handleAssigned={handleDeveloper} />
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
      <Text className='text-base font-omedium mb-3'>Status:</Text>
      <DropDownPicker
       open={open2}
       value={form.status}
       setValue={(value) => setForm({ ...form, status: value("") })}
       items={[
        {
         label: "Todo",
         value: "todo",
        },
        {
         label: "In-progress",
         value: "in-progress",
        },
        {
         label: "Done",
         value: "done",
        },
       ]}
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
 