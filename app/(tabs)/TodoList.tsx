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

interface TodoItem {
  _id: string;
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>({
    _id: "",
    title: "",
    description: "",
    deadline: "",
    completed: false,
  });

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://pmt-server-x700.onrender.com/api/v1/todo/view"
        );
        const fetchedTodos = response.data.data.data;
        setTodos(fetchedTodos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://pmt-server-x700.onrender.com/api/v1/todo/create",
        newTodo
      );
      setTodos([...todos, response.data.data]);
      setNewTodo({ title: "", description: "", deadline: "" });
      setIsAddModalVisible(false);
    } catch (error) {
      console.error("Error adding todo:", error);
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

      const response = await axios.patch(
        `https://pmt-server-x700.onrender.com/api/v1/todo/complete/${_id}`
      );
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error updating todo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (_id: string) => {
    setLoading(true);
    try {
      await axios.delete(
        `https://pmt-server-x700.onrender.com/api/v1/todo/delete/${_id}`
      );
      setTodos(todos.filter((todo) => todo._id !== _id));
    } catch (error) {
      console.error("Error deleting todo:", error);
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
        selectedTodo
      );
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === selectedTodo._id ? selectedTodo : todo
        )
      );
      setIsEditModalVisible(false);
    } catch (error) {
      console.error("Error updating todo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewTaskPress = () => {
    setNewTodo({
      title: "",
      description: "",
      deadline: "",
    });
    setIsAddModalVisible(true);
    setIsEditModalVisible(false);
    setSelectedTodo(null);
  };

  const handleEditTaskPress = (todo: TodoItem) => {
    setSelectedTodo(todo);
    setIsEditModalVisible(true);
    setIsAddModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            setIsAddModalVisible(false);
            setIsEditModalVisible(false);
          }}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>To-Do List</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#19459d" />
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
                  <                  Ionicons
                    name={todo.completed ? "close" : "checkmark-done"}
                    size={18}
                    color={todo.completed ? "red" : "green"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleEditTaskPress(todo)}
                >
                  <Ionicons name="create" size={18} color="#19459d" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleDeleteTodo(todo._id)}
                >
                  <Ionicons name="trash-bin" size={18} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Add Task Modal */}
      <Modal
        visible={isAddModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Add New Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={newTodo.title}
              onChangeText={(text) => setNewTodo({ ...newTodo, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newTodo.description}
              onChangeText={(text) =>
                setNewTodo({ ...newTodo, description: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Deadline (YYYY-MM-DD)"
              value={newTodo.deadline}
              onChangeText={(text) => setNewTodo({ ...newTodo, deadline: text })}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddTodo}
            >
              <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsAddModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        visible={isEditModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Edit Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={selectedTodo?.title || ""}
              onChangeText={(text) =>
                setSelectedTodo({
                  ...selectedTodo!,
                  title: text,
                })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={selectedTodo?.description || ""}
              onChangeText={(text) =>
                setSelectedTodo({
                  ...selectedTodo!,
                  description: text,
                })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Deadline (YYYY-MM-DD)"
              value={selectedTodo?.deadline || ""}
              onChangeText={(text) =>
                setSelectedTodo({
                  ...selectedTodo!,
                  deadline: text,
                })
              }
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleEditTodo}
            >
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsEditModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Task Button */}
      <TouchableOpacity
        style={styles.addTaskButton}
        onPress={handleNewTaskPress}
      >
        <Ionicons name="add-circle" size={48} color="#19459d" />
      </TouchableOpacity>
    </SafeAreaView>
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
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    width: "90%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: -20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 30,
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
  cancelButton: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 8,
  },
  addTaskButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  backButton: {
    padding: 10,
  },
  button: {
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
});

export default TodoList;
