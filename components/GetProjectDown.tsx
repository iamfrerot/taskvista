import React, { useState, useEffect } from "react";
import { View, Image, Text, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
interface Developer {
 _id: string;
 email: string;
 fullNames: string;
 phone: string;
 profile: string;
 isVerified: boolean;
 role: string;
 passwordResetToken: string;
 createdAt: string;
 updatedAt: string;
 __v: number;
}
const GetProjectDown = ({
 multi,
 handleAssigned,
}: {
 multi: any;
 handleAssigned: CallableFunction;
}) => {
 const renderUserItem = ({
  name,
  imageUri,
 }: {
  name: string;
  imageUri: string;
 }) => (
  <View className='flex-row items-center'>
   <Image source={{ uri: imageUri }} className='w-8 h-8 rounded-full mr-2' />
   <Text className='font-osemibold'>{name}</Text>
  </View>
 );

 const [open, setOpen] = useState(false);
 const [value, setValue] = useState([]);
 const [items, setItems] = useState([]);

 useEffect(() => {
  const fetchDevelopers = async () => {
   try {
    const response = await fetch(
     "https://pmt-server-x700.onrender.com/api/v1/projects/view",
     {
      headers: {
       Authorization:
        "Bearear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ0ZTU2YzFkODk5NzhjMjdmZDJhNTgiLCJlbWFpbCI6InBtdGFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMDc4ODIzMzU2MCIsImZ1bGxOYW1lcyI6IktldmluZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNzM1ODc2Mn0.zNKjtG2SxKWIR9HPkolgy8ltNCC4wrTvHpf7eKNjVLc",
      },
     }
    );
    const data = await response.json();
    const developerOptions = data.data.map((developer: Developer) => ({
     label: renderUserItem({
      name: developer.fullNames,
      imageUri: developer.profile,
     }),
     value: developer._id,
    }));
    setItems(developerOptions);
   } catch (error) {
    console.error("Error fetching developers:", error);
    Alert.alert("Error Getting Developers", error as any);
   }
  };
  handleAssigned(value);
  fetchDevelopers();
 }, [value]);

 return (
  <DropDownPicker
   open={open}
   value={value}
   items={items}
   setOpen={setOpen}
   setValue={setValue}
   style={{ borderWidth: 0 }}
   dropDownContainerStyle={{
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingTop: 13,
    paddingBottom: 13,
   }}
   dropDownDirection='TOP'
   placeholder='Select Developer'
   listMode='SCROLLVIEW'
   multiple={multi}
   mode='BADGE'
  />
 );
};

export default GetProjectDown;
