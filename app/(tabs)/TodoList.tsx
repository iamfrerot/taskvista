import React, { useState, useEffect } from "react";
import {
 View,
 FlatList,
 Text,
 StyleSheet,
 TouchableOpacity,
 TextInput,
 Button,
 Modal,
} from "react-native";
import axios from "axios";
import {
 Menu,
 MenuOptions,
 MenuOption,
 MenuTrigger,
 MenuProvider,
} from "react-native-popup-menu";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
interface TodoItem {
 id: number;
 title: string;
 description: string;
 deadline: string;
 completed: boolean;
}

const TodoList = () => {
 const [todos, setTodos] = useState<TodoItem[]>([]);
 const [isModalVisible, setIsModalVisible] = useState(false);
 const [newTodo, setNewTodo] = useState({
  title: "",
  description: "",
  deadline: "",
 });

 useEffect(() => {
  const fetchTodos = async () => {
   try {
    const response = await axios.get(
     "https://pmt-server-x700.onrender.com/api/v1/todo/view"
    );
    console.log("Fetched todos:", response.data);

    const fetchedTodos = response.data.data.data;
    setTodos(fetchedTodos);
   } catch (error) {
    console.error("Error fetching todos:", error);
   }
  };

  fetchTodos();
 }, []);

 const handleComplete = async (id: number) => {
  try {
   await axios.put(
    `https://pmt-server-x700.onrender.com/api/v1/todo/update/${id}`,
    {
     completed: !todos.find((todo) => todo.id === id)?.completed,
    }
   );
   setTodos((prevTodos) =>
    prevTodos.map((todo) =>
     todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
   );
  } catch (error) {
   console.error("Error completing todo:", error);
  }
 };

 const handleDelete = async (id: number) => {
  try {
   await axios.delete(
    `https://pmt-server-x700.onrender.com/api/v1/todo/delete/${id}`
   );
   setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  } catch (error) {
   console.error("Error deleting todo:", error);
  }
 };

 const handleAddTodo = async () => {
  try {
   const response = await axios.post(
    "https://pmt-server-x700.onrender.com/api/v1/todo/create",
    newTodo
   );
   setTodos([...todos, response.data.data]);
   setNewTodo({ title: "", description: "", deadline: "" });
   setIsModalVisible(false);
  } catch (error) {
   console.error("Error adding todo:", error);
  }
 };

 const renderItem = ({ item }: { item: TodoItem }) => (
  <View style={styles.todoItem}>
   <View style={styles.todoTextContainer}>
    <Text style={[styles.todoTitle, item.completed && styles.completedText]}>
     {item.title}
    </Text>
    <Text style={styles.todoDescription}>{item.description}</Text>
    <Text style={styles.todoDeadline}>
     Deadline: {new Date(item.deadline).toISOString().split("T")[0]}
    </Text>
   </View>
   <Menu>
    <MenuTrigger>
     <Ionicons name='ellipsis-vertical' size={24} color='black' />
    </MenuTrigger>
    <MenuOptions>
     <MenuOption onSelect={() => alert(`Viewing ${item.title}`)}>
      <Text style={styles.menuOptionText}>View</Text>
     </MenuOption>
     <MenuOption onSelect={() => alert(`Editing ${item.title}`)}>
      <Text style={styles.menuOptionText}>Edit</Text>
     </MenuOption>
     <MenuOption onSelect={() => handleComplete(item.id)}>
      <Text style={styles.menuOptionText}>
       {item.completed ? "Undo" : "Complete"}
      </Text>
     </MenuOption>
     <MenuOption onSelect={() => alert(`Delete ${item.title}`)}>
      <Text style={styles.menuOptionText}>Delete</Text>
     </MenuOption>
    </MenuOptions>
   </Menu>
  </View>
 );

 return (
  <MenuProvider>
   <SafeAreaView style={styles.container}>
    <View style={styles.headerContainer}>
     <TouchableOpacity
      onPress={() => setIsModalVisible(false)}
      style={styles.backButton}
     >
      <Ionicons name='arrow-back' size={24} color='black' />
     </TouchableOpacity>
     <Text style={styles.header}>To-Do List</Text>
     <TouchableOpacity
      style={[
       styles.addButton,
       { alignSelf: "flex-end", backgroundColor: "#19459d" },
      ]}
      onPress={() => setIsModalVisible(true)}
     >
      <Ionicons name='add' size={24} color='white' />
     </TouchableOpacity>
    </View>
    <Modal
     visible={isModalVisible}
     transparent={true}
     animationType='slide'
     onRequestClose={() => setIsModalVisible(false)}
    >
     <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
       <Text style={styles.modalHeader}>Add To-Do</Text>
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
       <TextInput
        style={styles.input}
        placeholder='Deadline (YYYY-MM-DD)'
        value={newTodo.deadline}
        onChangeText={(text) => setNewTodo({ ...newTodo, deadline: text })}
       />
       <View style={styles.modalButtons}>
        <TouchableOpacity style={styles.leftButton} onPress={handleAddTodo}>
         <Text style={[styles.buttonText, { backgroundColor: "#19459d" }]}>
          Add
         </Text>
        </TouchableOpacity>
        <TouchableOpacity
         style={[styles.rightButton, { backgroundColor: "#ff6d6d" }]}
         onPress={() => setIsModalVisible(false)}
        >
         <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
       </View>
      </View>
     </View>
    </Modal>
    <FlatList
     data={todos}
     renderItem={renderItem}
     keyExtractor={(item) =>
      item.id ? item.id.toString() : Math.random().toString()
     }
    />
   </SafeAreaView>
  </MenuProvider>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  paddingHorizontal: 9,
  backgroundColor: "#fff",
 },
 headerContainer: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 20,
 },
 header: {
  fontSize: 24,
  fontWeight: "bold",
  textAlign: "center",
  flex: 1,
 },
 todoItem: {
  padding: 15,
  borderBottomWidth: 1,
  borderBottomColor: "#ccc",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
 },
 todoTextContainer: {
  flex: 1,
 },
 todoTitle: {
  fontWeight: "bold",
  fontSize: 16,
 },
 completedText: {
  textDecorationLine: "line-through",
  color: "#888",
 },
 todoDescription: {
  fontSize: 14,
  color: "#666",
 },
 todoDeadline: {
  fontSize: 12,
  color: "#888",
 },
 menuOptionText: {
  padding: 10,
  fontSize: 16,
  color: "#000",
 },
 addButton: {
  backgroundColor: "#007AFF",
  padding: 10,
  borderRadius: 50,
  alignItems: "center",
  justifyContent: "center",
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
 modalHeader: {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 10,
 },
 input: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
 },
 modalButtons: {
  flexDirection: "row",
  justifyContent: "space-around",
  marginTop: 10,
 },
 backButton: {
  padding: 10,
 },
 button: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 12,
  marginHorizontal: 5,
  borderRadius: 5,
 },
 buttonText: {
  color: "white",
  fontSize: 16,
  fontWeight: "bold",
 },
 leftButton: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#19459d",
  borderRadius: 5,
  marginHorizontal: 5,
  paddingVertical: 12,
 },
 rightButton: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "red",
  borderRadius: 5,
  marginHorizontal: 5,
  paddingVertical: 12,
 },
});

export default TodoList;
