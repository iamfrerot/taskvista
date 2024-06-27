import axios from 'axios';

// Set the base URL for your API
const api = axios.create({
  baseURL: 'https://pmt-server-x700.onrender.com/api/v1',
});

// Create a new chat
export const createChat = async (chatData) => {
  try {
    const response = await api.post('/chats/create-individual', chatData);
    return response.data;
  } catch (error) {
    console.error('Failed to create chat:', error);
    throw error;
  }
};

// View all chats
export const viewChats = async () => {
  try {
    const response = await api.get('/chats/view');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch chats:', error);
    throw error;
  }
};

// View a single chat
export const viewChat = async (id) => {
  try {
    const response = await api.get(`/chats/view/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch chat:', error);
    throw error;
  }
};

// Send a message
export const sendMessage = async (chatId, messageData) => {
  try {
    const response = await api.post(`/chats/send-message/${chatId}`, messageData);
    return response.data;
  } catch (error) {
    console.error('Failed to send message:', error);
    throw error;
  }
};
