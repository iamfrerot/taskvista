import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
// Mock user data for demonstration
const userData = {
  id: 1,
  name: 'Alice',
  profileImage: require('../../assets/images/dev1.png'),
  email: 'alice@gmail.com'
};

const Account = () => {
 const [user, setUser] = useState<{
  _id: string;
  email: string;
  phone: number;
  fullNames: string;
  role: string;
  profile: string;
 }>();
 const getuser = async () => {
  const userData = (await AsyncStorage.getItem("user")) as string;
  const user = JSON.parse(userData);
  setUser(user);
 };
 useEffect(() => {
  getuser();
 }, []);
 const handleLogout = async () => {
  await AsyncStorage.removeItem("token");
  router.replace("/");
 };

 return (
  <SafeAreaView style={styles.container}>
   <View style={styles.profileSection}>
    <Image source={{ uri: user?.profile }} style={styles.profileImage} />
    <Text style={styles.name}>{user?.fullNames}</Text>
    <Text style={styles.email}>{user?.email}</Text>
   </View>

      <View style={styles.settingsSection}>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Account Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Security</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#000',  // You can change the color to your preference
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  settingsSection: {
    marginTop: 20,
  },
  option: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  optionText: {
    fontSize: 18,
  },
});

export default Account;