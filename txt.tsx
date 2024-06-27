// import React, { useState, useEffect } from "react";
// import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TextInput, Pressable } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as ImagePicker from 'expo-image-picker';
// import { useRouter } from "expo-router";

// const Account = () => {
//   const [user, setUser] = useState<{
//     _id: string;
//     email: string;
//     phone: string;
//     fullNames: string;
//     role: string;
//     profile: string;
//   }>();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [passwordModalVisible, setPasswordModalVisible] = useState(false);
//   const [form, setForm] = useState({
//     fullNames: "",
//     phone: "",
//     email: "",
//     profile: ""
//   });
//   const [passwordForm, setPasswordForm] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [image, setImage] = useState<string | null>(null);
//   const router = useRouter();

//   const getUser = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const userId = await AsyncStorage.getItem('userId');
//       const response = await fetch(`https://pmt-server-x700.onrender.com/api/v1/users/view/${userId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const userData = await response.json();
//       setUser(userData);
//       setForm({
//         fullNames: userData.fullNames,
//         phone: userData.phone,
//         email: userData.email,
//         profile: userData.profile
//       });
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, []);

//   const handleImagePick = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       const pickedImage = result;
//       setImage(pickedImage.uri);
//       setForm({ ...form, profile: pickedImage.uri });
//     }
//   };

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem("token");
//     router.replace("/");
//   };

//   const handleUpdateProfile = async () => {
//     const token = await AsyncStorage.getItem('token');
//     const userId = await AsyncStorage.getItem('userId');
//     const formData = new FormData();

//     formData.append("fullNames", form.fullNames);
//     formData.append("phone", form.phone);
//     formData.append("email", form.email);

//     if (image) {
//       const uriParts = image.split('.');
//       const fileType = uriParts[uriParts.length - 1];
//       formData.append("profile", {
//         uri: image,
//         name: `profile.${fileType}`,
//         type: `image/${fileType}`,
//       } as any);
//     }

//     try {
//       const response = await fetch(`https://pmt-server-x700.onrender.com/api/v1/users/edit/${userId}`, {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to update profile: ${response.status} - ${response.statusText}`);
//       }

//       const updatedUser = await response.json();
//       setUser(updatedUser);
//       setForm({
//         fullNames: updatedUser.fullNames,
//         phone: updatedUser.phone,
//         email: updatedUser.email,
//         profile: updatedUser.profile,
//       });
//       await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
//       setModalVisible(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("An error occurred while updating profile. Please try again.");
//     }
//   };

//   const handleChangePassword = async () => {
//     const token = await AsyncStorage.getItem('token');
//     const userId = await AsyncStorage.getItem('userId');

//     if (passwordForm.newPassword !== passwordForm.confirmPassword) {
//       alert("New password and confirmation password do not match");
//       return;
//     }

//     try {
//       const response = await fetch(`https://pmt-server-x700.onrender.com/api/v1/users/changePassword/${userId}`, {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           currentPassword: passwordForm.currentPassword,
//           newPassword: passwordForm.newPassword,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to change password: ${response.status} - ${response.statusText}`);
//       }

//       const result = await response.json();
//       alert(result.message);
//       setPasswordModalVisible(false);
//     } catch (error) {
//       console.error("Error changing password:", error);
//       alert("An error occurred while changing password. Please try again.");
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20 }}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Text style={{ fontSize: 16, color: "#007BFF" }}>Back</Text>
//         </TouchableOpacity>
//         <Text style={{ fontSize: 24, fontWeight: "bold", flex: 1, textAlign: "center" }}>Account</Text>
//         <TouchableOpacity onPress={handleLogout}>
//           <Text style={{ fontSize: 16, color: "#FF0000" }}>Logout</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={{ alignItems: "center", marginVertical: 20 }}>
//         <Image source={{ uri: user?.profile }} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }} />
//         <TouchableOpacity onPress={handleImagePick}>
//           <Text style={{ color: "#007BFF" }}>Change Photo</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={{ paddingHorizontal: 20 }}>
//         <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>Full Names:</Text>
//         <Text style={{ fontSize: 16, marginBottom: 10 }}>{user?.fullNames}</Text>

//         <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>Phone:</Text>
//         <Text style={{ fontSize: 16, marginBottom: 10 }}>{user?.phone}</Text>

//         <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>Email:</Text>
//         <Text style={{ fontSize: 16, marginBottom: 10 }}>{user?.email}</Text>

//         <TouchableOpacity
//           style={{ backgroundColor: "#007BFF", padding: 10, borderRadius: 5, alignItems: "center", marginTop: 10 }}
//           onPress={() => setModalVisible(true)}
//         >
//           <Text style={{ color: "#fff", fontSize: 16 }}>Edit Profile</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={{ backgroundColor: "#28A745", padding: 10, borderRadius: 5, alignItems: "center", marginTop: 10 }}
//           onPress={() => setPasswordModalVisible(true)}
//         >
//           <Text style={{ color: "#fff", fontSize: 16 }}>Change Password</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={{ backgroundColor: "#17A2B8", padding: 10, borderRadius: 5, alignItems: "center", marginTop: 10 }}
//           onPress={() => router.push('HelpScreen')}
//         >
//           <Text style={{ color: "#fff", fontSize: 16 }}>Help</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={{ backgroundColor: "#FFC107", padding: 10, borderRadius: 5, alignItems: "center", marginTop: 10 }}
//           onPress={() => router.push('FAQScreen')}
//         >
//           <Text style={{ color: "#fff", fontSize: 16 }}>FAQ</Text>
//         </TouchableOpacity>
//       </View>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalTitle}>Edit Profile</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Full Names"
//               value={form.fullNames}
//               onChangeText={(text) => setForm({ ...form, fullNames: text })}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Phone"
//               value={form.phone}
//               onChangeText={(text) => setForm({ ...form, phone: text })}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               value={form.email}
//               onChangeText={(text) => setForm({ ...form, email: text })}
//             />
//             <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={handleUpdateProfile}
//             >
//               <Text style={styles.textStyle}>Save</Text>
//             </Pressable>
//             <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setModalVisible(false)}
//             >
//               <Text style={styles.textStyle}>Cancel</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={passwordModalVisible}
//         onRequestClose={() => setPasswordModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalTitle}>Change Password</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Current Password"
//               secureTextEntry
//               value={passwordForm.currentPassword}
//               onChangeText={(text) => setPasswordForm({ ...passwordForm, currentPassword: text })}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="New Password"
//               secureTextEntry
//               value={passwordForm.newPassword}
//               onChangeText={(text) => setPasswordForm({ ...passwordForm, newPassword: text })}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Confirm Password"
//               secureTextEntry
//               value={passwordForm.confirmPassword}
//               onChangeText={(text) => setPasswordForm({ ...passwordForm, confirmPassword: text })}
//             />
//             <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={handleChangePassword}
//             >
//               <Text style={styles.textStyle}>Save</Text>
//             </Pressable>
//             <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setPasswordModalVisible(false)}
//             >
//               <Text style={styles.textStyle}>Cancel</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalView: {
//     width: 300,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 20,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     width: "100%",
//     height: 40,
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//     marginTop: 10,
//   },
//   buttonClose: {
//     backgroundColor: "#007BFF",
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
// });

// export default Account;
