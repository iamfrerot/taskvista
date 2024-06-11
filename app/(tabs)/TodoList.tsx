import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
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
import tw from "twrnc"; // Import twrnc

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

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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

  const handleDeleteTodo = async (id: number) => {
    try {
      await axios.delete(
        `https://pmt-server-x700.onrender.com/api/v1/todo/delete/${id}`
      );
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const renderItem = ({ item }: { item: TodoItem }) => (
    <View style={tw`flex flex-row justify-between items-center p-4 border-b border-gray-300`}>
      <View style={tw`flex-1`}>
        <Text style={tw`font-bold text-lg ${item.completed ? "line-through text-gray-500" : ""}`}>
          {item.title}
        </Text>
        <Text style={tw`text-base text-gray-700`}>{item.description}</Text>
        <Text style={tw`text-sm text-gray-500`}>
          Deadline: {new Date(item.deadline).toISOString().split("T")[0]}
        </Text>
      </View>
      <Menu>
        <MenuTrigger>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </MenuTrigger>
        <MenuOptions>
          {["View", "Edit", "Complete", "Delete"].map((option) => (
            <MenuOption
              key={option}
              onSelect={() => {
                if (option === "Delete") {
                  handleDeleteTodo(item.id);
                } else {
                  alert(`${option} ${item.title}`);
                }
              }}
              customStyles={{
                optionWrapper: tw`p-2 ${selectedOption === option ? "bg-gray-200" : ""}`,
              }}
            >
              <TouchableOpacity
                onPressIn={() => setSelectedOption(option)}
                onPressOut={() => setSelectedOption(null)}
              >
                <Text style={tw`text-lg`}>{option}</Text>
              </TouchableOpacity>
            </MenuOption>
          ))}
        </MenuOptions>
      </Menu>
    </View>
  );

  return (
    <MenuProvider>
      <SafeAreaView style={tw`flex-1 p-3 bg-white`}>
        <View style={tw`flex-row items-center justify-between mb-5`}>
          <TouchableOpacity
            onPress={() => setIsModalVisible(false)}
            style={tw`p-2`}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={tw`text-2xl font-bold text-center flex-1`}>To-Do List</Text>
          <TouchableOpacity
            style={tw`bg-primary p-2 rounded-full`}
            onPress={() => setIsModalVisible(true)}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
            <View style={tw`bg-white p-5 rounded-lg w-4/5`}>
              <Text style={tw`text-xl font-bold mb-3`}>Add To-Do</Text>
              <TextInput
                style={tw`border border-gray-300 rounded p-2 mb-3`}
                placeholder="Title"
                value={newTodo.title}
                onChangeText={(text) => setNewTodo({ ...newTodo, title: text })}
              />
              <TextInput
                style={tw`border border-gray-300 rounded p-2 mb-3`}
                placeholder="Description"
                value={newTodo.description}
                onChangeText={(text) => setNewTodo({ ...newTodo, description: text })}
              />
              <TextInput
                style={tw`border border-gray-300 rounded p-2 mb-3`}
                placeholder="Deadline (YYYY-MM-DD)"
                value={newTodo.deadline}
                onChangeText={(text) => setNewTodo({ ...newTodo, deadline: text })}
              />
              <View style={tw`flex-row justify-around mt-3`}>
                <TouchableOpacity style={tw`bg-primary rounded p-2`} onPress={handleAddTodo}>
                  <Text style={tw`text-white font-bold text-lg`}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`bg-red-600 rounded p-2`} onPress={() => setIsModalVisible(false)}>
                  <Text style={tw`text-white font-bold text-lg`}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        />
      </SafeAreaView>
    </MenuProvider>
  );
};

export default TodoList;
