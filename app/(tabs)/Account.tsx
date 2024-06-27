import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult, ImagePickerSuccessResult } from 'expo-image-picker';

const Account = () => {
  const [user, setUser] = useState<{
    _id: string;
    email: string;
    phone: string;
    fullNames: string;
    role: string;
    profile: string;
  }>();
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [form, setForm] = useState({
    fullNames: "",
    phone: "",
    email: "",
    profile: ""
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
      const response = await fetch(`https://pmt-server-x700.onrender.com/api/v1/users/view/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const userData = await response.json();
      // console.log('userData', userData);
      // console.log('userId:', userId);
      setUser(userData.data);
      setForm({
        fullNames: userData.fullNames,
        phone: userData.phone,
        email: userData.email,
        profile: userData.profile
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleImagePick = async () => {
    const result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if ((result as ImagePickerSuccessResult).canceled === false) {
      const pickedImage = result as ImagePickerSuccessResult;
      setImage(pickedImage.assets[0].uri);
      setForm({ ...form, profile: pickedImage.assets[0].uri });
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    router.replace("/");
  };

  const handleUpdateProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');
    const formData = new FormData();
  
    formData.append("fullNames", form.fullNames);
    formData.append("phone", form.phone);
    formData.append("email", form.email);
  
    if (image) {
      const uriParts = image.split('.');
      const fileType = uriParts[uriParts.length - 1];
      formData.append("profile", {
        uri: image,
        name: `profile.${fileType}`,
        type: `image/${fileType}`,
      } as any);
    }

  
    try {
      const response = await fetch(`https://pmt-server-x700.onrender.com/api/v1/users/edit/${userId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Failed to update profile: ${response.status} - ${response.statusText}`, errorData);
        throw new Error(`Failed to update profile: ${errorData.message}`);
      }
  
      const updatedUser = await response.json();
      setUser(updatedUser.data);
      setForm({
        fullNames: updatedUser.data.fullNames,
        phone: updatedUser.data.phone,
        email: updatedUser.data.email,
        profile: updatedUser.data.profile,
      });
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser.data));
  
      // Notify user of success
      alert("Profile updated successfully");
  
      setModalVisible(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating profile. Please try again.");
    }
  };
  

  const handleChangePassword = async () => {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New password and confirmation password do not match");
      return;
    }

    try {
      const response = await fetch(`https://pmt-server-x700.onrender.com/api/v1/users/change-password/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
          confirmPassword: passwordForm.confirmPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to change password');
      }

      alert('Password changed successfully');
      setPasswordModalVisible(false);
    } catch (error) {
      console.error("Error changing password:", error);
      alert("An error occurred while changing password. Please try again.");
    }
  };
// console.log('user:', user)
console.log('form:', form)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={{ uri: user?.profile }} style={styles.profileImage} />
        <Text style={styles.name}>{user?.fullNames}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.settingsSection}>
        <TouchableOpacity style={styles.option} onPress={() => setModalVisible(true)}>
          <Text style={styles.optionText}>Update Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => setPasswordModalVisible(true)}>
          <Text style={styles.optionText}>Security</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}  onPress={() => router.push('HelpScreen')}>
          <Text style={styles.optionText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}  onPress={() => router.push('FAQScreen')}>
          <Text style={styles.optionText}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Profile</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Names"
              value={form.fullNames}
              onChangeText={(text) => setForm({ ...form, fullNames: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={form.phone}
              onChangeText={(text) => setForm({ ...form, phone: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
            />
            <TouchableOpacity onPress={handleImagePick}>
              <Text style={styles.uploadButton}>Pick Profile Image</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.previewImage} />}
            <View style={styles.modalButtons}>
              <Pressable style={styles.button} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={handleUpdateProfile}>
                <Text style={styles.buttonText}>Update</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={passwordModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setPasswordModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              secureTextEntry={true}
              value={passwordForm.currentPassword}
              onChangeText={(text) => setPasswordForm({ ...passwordForm, currentPassword: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry={true}
              value={passwordForm.newPassword}
              onChangeText={(text) => setPasswordForm({ ...passwordForm, newPassword: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              secureTextEntry={true}
              value={passwordForm.confirmPassword}
              onChangeText={(text) => setPasswordForm({ ...passwordForm, confirmPassword: text })}
            />
            <View style={styles.modalButtons}>
              <Pressable style={styles.button} onPress={() => setPasswordModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Change</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "gray",
  },
  settingsSection: {
    marginTop: 20,
  },
  option: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  optionText: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  uploadButton: {
    fontSize: 18,
    color: "blue",
    marginBottom: 10,
    textAlign: "center",
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#19459d",
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Account;
