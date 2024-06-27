import React, { useState, useEffect } from "react";
import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity,
 TextInput,
 Modal,
 ActivityIndicator,
 ScrollView,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Calendar } from "react-native-calendars";

interface TodoItem {
 _id: string;
 title: string;
 description: string;
 deadline: string;
 completed: boolean;
}

const TodoList = () => {
 const router = useRouter();
 const [todos, setTodos] = useState<TodoItem[]>([]);
 const [isAddModalVisible, setIsAddModalVisible] = useState(false);
 const [isEditModalVisible, setIsEditModalVisible] = useState(false);
 const [token, setToken] = useState<string | null>(null);

 const [newTodo, setNewTodo] = useState({
  title: "",
  description: "",
  deadline: new Date().toISOString().split("T")[0], // Initialize to today's date in YYYY-MM-DD format
 });
 const [loading, setLoading] = useState(false);
 const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>({
  _id: "",
  title: "",
  description: "",
  deadline: "",
  completed: false,
 });

 const [selectedDate, setSelectedDate] = useState<string>("");

 useEffect(() => {
  const fetchToken = async () => {
   const token = await AsyncStorage.getItem("token");
   if (token) {
    setToken(token);
   } else {
    router.push("/home");
   }
  };

  fetchToken();
 }, []);

 useEffect(() => {
  const fetchTodos = async () => {
   setLoading(true);
   try {
    const response = await axios.get(
     "https://pmt-server-x700.onrender.com/api/v1/todo/my-todos",
     {
      headers: {
       Authorization: `Bearer ${token}`,
       "Content-Type": "application/json",
      },
     }
    );
    const fetchedTodos = response.data.data.data;
    setTodos(fetchedTodos);
   } catch (error) {
    handleAxiosError(error);
   } finally {
    setLoading(false);
   }
  };

  fetchTodos();
 }, [token]);

 const handleAddTodo = async () => {
  setLoading(true);
  try {
   const token = await AsyncStorage.getItem("token");
   const response = await axios.post(
    "https://pmt-server-x700.onrender.com/api/v1/todo/create",
    {
     ...newTodo,
     deadline: selectedDate || newTodo.deadline,
    },
    {
     headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
     },
    }
   );

   setTodos([...todos, response.data.data]);
   setNewTodo({
    title: "",
    description: "",
    deadline: new Date().toISOString().split("T")[0], // Reset to today's date
   });
   setSelectedDate("");
   setIsAddModalVisible(false);
  } catch (error) {
   handleAxiosError(error);
  } finally {
   setLoading(false);
  }
 };

 const handleCompleteTodo = async (_id: string) => {
  setLoading(true);
  if (!_id) {
   console.error("Todo ID is undefined");
   setLoading(false);
   return;
  }
  try {
   const todoToUpdate = todos.find((todo) => todo._id === _id);
   if (!todoToUpdate) {
    console.error("Todo not found");
    setLoading(false);
    return;
   }

   const updatedTodos = todos.map((todo) =>
    todo._id === _id ? { ...todo, completed: !todo.completed } : todo
   );
   setTodos(updatedTodos);

   const token = await AsyncStorage.getItem("token");
   const response = await axios.patch(
    `https://pmt-server-x700.onrender.com/api/v1/todo/complete/${_id}`,
    {},
    {
     headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
     },
    }
   );
   console.log("Server response:", response.data);
  } catch (error) {
   handleAxiosError(error);
  } finally {
   setLoading(false);
  }
 };

 const handleDeleteTodo = async (_id: string) => {
  setLoading(true);
  try {
   await axios.delete(
    `https://pmt-server-x700.onrender.com/api/v1/todo/delete/${_id}`,
    {
     headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
     },
    }
   );
   setTodos(todos.filter((todo) => todo._id !== _id));
  } catch (error) {
   handleAxiosError(error);
  } finally {
   setLoading(false);
  }
 };

 const handleEditTodo = async () => {
  setLoading(true);
  if (!selectedTodo || !selectedTodo._id) {
   console.error("Selected todo or its ID is undefined");
   setLoading(false);
   return;
  }
  try {
   const response = await axios.patch(
    `https://pmt-server-x700.onrender.com/api/v1/todo/edit/${selectedTodo._id}`,
    {
     ...selectedTodo,
     deadline:
      selectedDate ||
      new Date(selectedTodo.deadline).toISOString().split("T")[0],
    },
    {
     headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
     },
    }
   );

   setTodos((prevTodos) =>
    prevTodos.map((todo) =>
     todo._id === selectedTodo._id ? response.data.data : todo
    )
   );
   setSelectedDate("");
   setIsEditModalVisible(false);
  } catch (error) {
   handleAxiosError(error);
  } finally {
   setLoading(false);
  }
 };

 const handleNewTaskPress = () => {
  setNewTodo({
   title: "",
   description: "",
   deadline: new Date().toISOString().split("T")[0],
  });
  setSelectedDate("");
  setIsAddModalVisible(true);
  setIsEditModalVisible(false);
  setSelectedTodo(null);
 };

 const handleEditTaskPress = (todo: TodoItem) => {
  setSelectedTodo(todo);
  setSelectedDate(todo.deadline);
  setIsEditModalVisible(true);
  setIsAddModalVisible(false);
 };

 const handleAxiosError = (error: any) => {
  if (error.response) {
   console.error("Error response:", error.response.data);
   console.error("Status code:", error.response.status);
  } else if (error.request) {
   console.error("No response received:", error.request);
  } else {
   console.error("Error setting up the request:", error.message);
  }
 };

 return (
  <SafeAreaView style={styles.container}>
   <View style={styles.headerContainer}>
    <Text style={styles.header}>To-Do List</Text>
   </View>
   <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    {loading ? (
     <ActivityIndicator size='large' color='#19459d' />
    ) : todos.length === 0 ? (
     <View style={styles.emptyMessageContainer}>
      <Text style={styles.emptyMessage}>No tasks found! 😊</Text>
     </View>
    ) : (
     todos.map((todo) => (
      <View
       key={todo._id}
       style={[
        styles.card,
        todo.completed && { backgroundColor: "lightgreen" },
       ]}
      >
       <Text style={styles.title}>{todo.title}</Text>
       <Text>{todo.description}</Text>
       <Text>Deadline: {new Date(todo.deadline).toLocaleDateString()}</Text>
       <View style={styles.buttonContainer}>
        <TouchableOpacity
         style={styles.button}
         onPress={() => handleCompleteTodo(todo._id)}
        >
         <Ionicons
          name={todo.completed ? "close" : "checkmark-done"}
          size={18}
          color={todo.completed ? "red" : "green"}
         />
        </TouchableOpacity>
        <TouchableOpacity
         style={styles.button}
         onPress={() => handleEditTaskPress(todo)}
        >
         <Ionicons name='create' size={18} color='#19459d' />
        </TouchableOpacity>
        <TouchableOpacity
         style={styles.button}
         onPress={() => handleDeleteTodo(todo._id)}
        >
         <Ionicons name='trash' size={18} color='red' />
        </TouchableOpacity>
       </View>
      </View>
     ))
    )}
   </ScrollView>
   <TouchableOpacity style={styles.addTaskButton} onPress={handleNewTaskPress}>
    <Ionicons name='add-circle' size={48} color='#19459d' />
   </TouchableOpacity>
   {/* Add Task Modal */}
   <Modal visible={isAddModalVisible} animationType='slide'>
    <View style={styles.modalContainer}>
     <Text style={styles.modalHeader}>Add New Task</Text>
     <TextInput
      style={styles.input}
      placeholder='Title'
      value={newTodo.title}
      onChangeText={(text) => setNewTodo({ ...newTodo, title: text })}
     />
     <TextInput
      style={styles.input}
      placeholder='Description'
      value={newTodo.description}
      onChangeText={(text) => setNewTodo({ ...newTodo, description: text })}
     />
     <Calendar
      onDayPress={(day) => setSelectedDate(day.dateString)}
      markedDates={{
       [selectedDate]: {
        selected: true,
        selectedColor: "#19459d",
       },
      }}
     />
     <View style={styles.buttonContainer}>
      <TouchableOpacity
       style={styles.modalButton}
       onPress={() => setIsAddModalVisible(false)}
      >
       <Text style={styles.modalButtonText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.modalButton} onPress={handleAddTodo}>
       <Text style={styles.modalButtonText}>Create</Text>
      </TouchableOpacity>
     </View>
    </View>
   </Modal>
   {/* Edit Modal */}
   <Modal visible={isEditModalVisible} animationType='slide'>
    <View style={styles.modalContainer}>
     <Text style={styles.modalHeader}>Edit Task</Text>
     {selectedTodo && (
      <>
       <TextInput
        style={styles.input}
        placeholder='Title'
        value={selectedTodo.title}
        onChangeText={(text) =>
         setSelectedTodo({
          ...selectedTodo,
          title: text,
         })
        }
       />
       <TextInput
        style={styles.input}
        placeholder='Description'
        value={selectedTodo.description}
        onChangeText={(text) =>
         setSelectedTodo({
          ...selectedTodo,
          description: text,
         })
        }
       />
       <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
         [selectedDate]: { selected: true, marked: true },
        }}
       />
       <View style={styles.buttonContainer}>
        <TouchableOpacity
         style={styles.modalButton}
         onPress={() => setIsEditModalVisible(false)}
        >
         <Text style={styles.modalButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalButton} onPress={handleEditTodo}>
         <Text style={styles.modalButtonText}>Save</Text>
        </TouchableOpacity>
       </View>
      </>
     )}
    </View>
   </Modal>
  </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#f7f7f7",
 },
 headerContainer: {
  flexDirection: "row",
  alignItems: "center",
  padding: 16,
 },
 header: {
  fontSize: 24,
  fontWeight: "bold",
  textAlign: "center",
  flex: 1,
 },
 scrollViewContainer: {
  padding: 16,
 },
 emptyMessageContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
 },
 emptyMessage: {
  fontSize: 18,
  color: "#888",
 },
 card: {
  backgroundColor: "#fff",
  padding: 16,
  borderRadius: 8,
  marginBottom: 16,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
 },
 title: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 8,
 },
 buttonContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 16,
 },
 button: {
  padding: 8,
 },
 newTaskButton: {
  position: "absolute",
  bottom: 32,
  right: 32,
  backgroundColor: "#fff",
  borderRadius: 32,
  padding: 16,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
 },
 modalContainer: {
  flex: 1,
  padding: 16,
  backgroundColor: "#f7f7f7",
  marginTop: 26,
 },
 backButton: {
  alignSelf: "flex-start",
 },
 modalHeader: {
  fontSize: 24,
  fontWeight: "bold",
  color: "#19459d",
  marginBottom: 16,
  alignItems: "center",
 },
 addTaskButton: {
  position: "absolute",
  bottom: 20,
  right: 20,
 },
 input: {
  backgroundColor: "#fff",
  padding: 16,
  borderRadius: 8,
  marginBottom: 16,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
 },
 addButton: {
  backgroundColor: "#19459d",
  padding: 16,
  borderRadius: 8,
  alignItems: "center",
 },
 buttonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
 },
 modalButton: {
  flex: 1,
  padding: 12,
  borderRadius: 4,
  alignItems: "center",
  justifyContent: "center",
  marginHorizontal: 4,
  backgroundColor: "#19459d",
 },
 modalButtonText: {
  color: "#fff",
  fontWeight: "bold",
 },
 calendarContainer: {
  marginBottom: 16,
 },
});

export default TodoList;
