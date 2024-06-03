// constants/data.ts
import { ImageSourcePropType } from 'react-native';

export interface ChatData {
  id: number;
  profileImage: ImageSourcePropType;
  sender: string;
  message: string;
}

export const ChatMessage: ChatData[] = [
  {
    id: 1,
    profileImage: require('../assets/images/dev1.png'), // Example profile image
    sender: 'currentUser',
    message: 'Hello team, are we ready for the sprint planning meeting?',
  },
  {
    id: 2,
    profileImage: require('../assets/images/dev2.jpeg'), // Example profile image
    sender: 'ProjectManager',
    message: 'Yes, just finishing up the last report. Be there in 5 minutes.',
  },
  {
    id: 3,
    profileImage: require('../assets/images/dev3.jpeg'), // Example profile image
    sender: 'Developer1',
    message: 'I have a quick question about the new feature.',
  },
  {
    id: 4,
    profileImage: require('../assets/images/dev1.png'),
    sender: 'Developer2',
    message: 'Sure, what do you need help with?',
   },
  // Add more chat data objects as needed
];

export const chatData = [
  {
    id: 1,
    profileImage: require('../assets/images/dev1.png'),
    name: 'Alice Johnson',
    lastMessage: 'Can you review the PR I just submitted?',
    time: '10:30 AM',
  },
  {
    id: 2,
    profileImage: require('../assets/images/dev2.jpeg'),
    name: 'Bob Smith',
    lastMessage: 'The server maintenance is scheduled for tonight.',
    time: '09:45 AM',
  },
  {
    id: 3,
    profileImage: require('../assets/images/dev3.jpeg'),
    name: 'Charlie Brown',
    lastMessage: 'I found a bug in the login module.',
    time: '08:15 AM',
  },
  {
    id: 4,
    profileImage: require('../assets/images/dev1.png'),
    name: 'Diana Prince',
    lastMessage: 'Let’s discuss the UI changes in today’s meeting.',
    time: 'Yesterday',
  },
  {
    id: 5,
    profileImage: require('../assets/images/dev3.jpeg'),
    name: 'Evan Davis',
    lastMessage: 'Can we push the release date by a week?',
    time: '2 days ago',
  },
  {
    id: 6,
    profileImage: require('../assets/images/dev2.jpeg'),
    name: 'Fiona Gallagher',
    lastMessage: 'The new API documentation is up.',
    time: '3 days ago',
  },
  {
    id: 7,
    profileImage: require('../assets/images/dev3.jpeg'),
    name: 'George Harris',
    lastMessage: 'Code review session at 4 PM today.',
    time: '4 days ago',
  },
  
];

export const groupData = [
  {
    id: 1,
    groupName: 'Frontend Team',
    time: 'Yesterday',
    groupImage: require('../assets/images/proj1.jpeg'),  
  },
  {
    id: 2,
    groupName: 'Backend Team',
    time: 'Yesterday',
    groupImage: require('../assets/images/proj2.jpeg'),  
  },
  {
    id: 3,
    groupName: 'QA Team',
    time: 'Yesterday',
    groupImage: require('../assets/images/proj3.png'),  
  },
  {
    id: 4,
    groupName: 'Project Management',
    time: '2 days ago',
    groupImage: require('../assets/images/proj2.jpeg'),  
  },
  {
    id: 5,
    groupName: 'DevOps Team',
    time: '3 days ago',
    groupImage: require('../assets/images/proj1.jpeg'),  
  },
];
