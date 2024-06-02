import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for a todo item
export interface TodoItem {
  id: number;
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
}

// Define the type for the TodoContext
interface TodoContextType {
  todos: TodoItem[];
  addTodo: (todo: TodoItem) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, updatedTodo: TodoItem) => void;
}

// Create the TodoContext
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Custom hook to access the TodoContext
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

// TodoProvider component to wrap the application and provide the context
export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = (todo: TodoItem) => {
    setTodos(prevTodos => [...prevTodos, todo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, updatedTodo: TodoItem) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, editTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
