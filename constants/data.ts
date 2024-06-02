// constants/data.ts
import { ImageSourcePropType } from 'react-native';

export interface ChatData {
    id: number;
    profileImage: ImageSourcePropType; // Change type to ImageSourcePropType
    sender: string;
    message: string;
  }
  export const ChatMessage = [
    {
      id: 1,
      profileImage: require('../assets/images/loginimg.png'), // Example profile image
      sender: 'currentUser',
      message: 'Hello there!',
    },
    // Add more chat data objects as needed
  ];

export const chatData = [
    {
      id: 1,
      profileImage: require('../assets/images/loginimg.png'),
      name: 'John Doe',
      lastMessage: 'Hey, how are you?',
      time: '10:30 AM',
    },
    {
        id: 1,
        profileImage: require('../assets/images/loginimg.png'),
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        time: '10:30 AM',
      },
      {
        id: 1,
        profileImage: require('../assets/images/loginimg.png'),
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        time: '10:30 AM',
      },
      {
        id: 1,
        profileImage: require('../assets/images/loginimg.png'),
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        time: '10:30 AM',
      },
      {
        id: 1,
        profileImage: require('../assets/images/loginimg.png'),
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        time: '10:30 AM',
      },
      {
        id: 1,
        profileImage: require('../assets/images/loginimg.png'),
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        time: '10:30 AM',
      },
      {
        id: 1,
        profileImage: require('../assets/images/loginimg.png'),
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        time: '10:30 AM',
      },
      {
        id: 1,
        profileImage: require('../assets/images/loginimg.png'),
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        time: '10:30 AM',
      },
      {
        id: 1,
        profileImage: require('../assets/images/loginimg.png'),
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        time: '10:30 AM',
      },
      {
        id: 1,
        profileImage: require('../assets/images/loginimg.png'),
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        time: '10:30 AM',
      },
    // Add more chat data as needed
  ];
  
  export const groupData = [
    {
      id: 1,
      groupName: 'Group 1',
      time: 'Yesterday',
      groupImage: require('../assets/images/loginimg.png'),  
    },
    {
        id: 1,
        groupName: 'Group 2',
        time: 'Yesterday',
        groupImage: require('../assets/images/loginimg.png'),  
      },
      {
        id: 1,
        groupName: 'Group 3',
        time: 'Yesterday',
        groupImage: require('../assets/images/loginimg.png'),  
      },
    // Add more group data as needed
  ];
  