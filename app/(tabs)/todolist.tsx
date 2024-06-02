import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { todoListData } from '../../constants/data-todolist'; // Adjust the import path as necessary

interface TodoItem {
  id: number;
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
}

const todolist = () => {
  const [todos, setTodos] = useState<TodoItem[]>(todoListData); // Initialize with mock data
  const router = useRouter();

  const handleComplete = (id: number) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const renderItem = ({ item }: { item: TodoItem }) => (
    <View style={styles.todoItem}>
      <Text style={item.completed ? styles.completedText : styles.incompleteText}>{item.title}</Text>
      <Text style={styles.todoDescription}>{item.description}</Text>
      <Text style={styles.todoDeadline}>Deadline: {item.deadline}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => router.push({ pathname: 'TodoDetailScreen', params: { id: item.id } })}>
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({ pathname: 'TodoEditScreen', params: { id: item.id } })}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleComplete(item.id)}>
          <Text style={styles.actionText}>{item.completed ? 'Undo' : 'Complete'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/AddTodoScreen')}>
        <Text style={styles.addButtonText}>Add To-Do</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  todoItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  incompleteText: {
    color: '#000',
  },
  todoDescription: {
    fontSize: 14,
    color: '#666',
  },
  todoDeadline: {
    fontSize: 12,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionText: {
    color: '#007AFF',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default todolist;
