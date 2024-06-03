import React, { useState, useEffect } from "react";
import { View, Image, Text, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
interface Project {
 _id: string;
 category: string;
 name: string;
 phone: string;
 image: string;
 descritiption: string;
 notifications: boolean;
 status: string;
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
  const fetchProjects = async () => {
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
    const projectsOptions = data.data.data.map((project: Project) => ({
     label: renderUserItem({
      name: project.name,
      imageUri: project.image,
     }),
     value: project._id,
    }));
    setItems(projectsOptions);
   } catch (error) {
    console.error("Error fetching Projects:", error);
    Alert.alert("Error Getting Projects", error as any);
   }
  };
  handleAssigned(value);
  fetchProjects();
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
   placeholder='Select Project'
   listMode='SCROLLVIEW'
   multiple={multi}
   mode='BADGE'
  />
 );
};

export default GetProjectDown;
