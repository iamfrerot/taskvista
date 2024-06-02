import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const AddTodoScreen = () => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [newTodoDescription, setNewTodoDescription] = useState<string>('');
  const [newTodoDeadline, setNewTodoDeadline] = useState<string>('');

  const handleAddTodo = async () => {
    try {
      const response = await axios.post('https://pmt-server-x700.onrender.com/api/v1/todo/create', {
        title: newTodoTitle,
        description: newTodoDescription,
        deadline: newTodoDeadline
      });
      console.log('New todo added:', response.data.todo);
      // You can navigate back to the previous screen or perform any other action here
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New To-Do</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={newTodoTitle}
        onChangeText={text => setNewTodoTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={newTodoDescription}
        onChangeText={text => setNewTodoDescription(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Deadline"
        value={newTodoDeadline}
        onChangeText={text => setNewTodoDeadline(text)}
      />
      <Button title="Add Todo" onPress={handleAddTodo} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddTodoScreen;
