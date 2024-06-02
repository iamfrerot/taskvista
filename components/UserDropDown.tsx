import React, { useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const users = [
 {
  id: 1,
  name: "Chris Doe",
  imageUri:
   "https://firebasestorage.googleapis.com/v0/b/my-brand-frontend.appspot.com/o/blogsImg%2Fslaye.jpg?alt=media&token=720bbb43-f824-4786-963a-d383ff72d4e6",
 },
 {
  id: 2,
  name: "Jane Smith",
  imageUri:
   "https://firebasestorage.googleapis.com/v0/b/my-brand-frontend.appspot.com/o/blogsImg%2Fslaye.jpg?alt=media&token=720bbb43-f824-4786-963a-d383ff72d4e6",
 },
 {
  id: 3,
  name: "Bob",
  imageUri:
   "https://firebasestorage.googleapis.com/v0/b/my-brand-frontend.appspot.com/o/blogsImg%2Fslaye.jpg?alt=media&token=720bbb43-f824-4786-963a-d383ff72d4e6",
 },
 {
  id: 4,
  name: "Johnson",
  imageUri:
   "https://firebasestorage.googleapis.com/v0/b/my-brand-frontend.appspot.com/o/blogsImg%2Fslaye.jpg?alt=media&token=720bbb43-f824-4786-963a-d383ff72d4e6",
 },
 {
  id: 5,
  name: "Will Smill",
  imageUri:
   "https://firebasestorage.googleapis.com/v0/b/my-brand-frontend.appspot.com/o/blogsImg%2Fslaye.jpg?alt=media&token=720bbb43-f824-4786-963a-d383ff72d4e6",
 },
 {
  id: 6,
  name: "Good",
  imageUri:
   "https://firebasestorage.googleapis.com/v0/b/my-brand-frontend.appspot.com/o/blogsImg%2Fslaye.jpg?alt=media&token=720bbb43-f824-4786-963a-d383ff72d4e6",
 },
];

const UserDropdown = () => {
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
 const [value, setValue] = useState(null);
 const [items, setItems] = useState(
  users.map((user) => ({ label: renderUserItem(user), value: user.id }))
 );
 return (
  <DropDownPicker
   open={open}
   value={value}
   items={items}
   setOpen={setOpen}
   setValue={setValue}
   setItems={setItems}
   style={{ borderWidth: 0 }}
   dropDownContainerStyle={{
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingTop: 13,
    paddingBottom: 13,
   }}
   placeholder='Select Developer'
   listMode='SCROLLVIEW'
   multiple
   mode='BADGE'
  />
 );
};

export default UserDropdown;
