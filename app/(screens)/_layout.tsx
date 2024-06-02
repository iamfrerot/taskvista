import { Stack } from 'expo-router';

const ScreensLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="AddTodoScreen" options={{ headerShown: true, title: "Add Todo" }} />
      <Stack.Screen name="ChatListScreen" options={{ headerShown: true, title: "Chats" }} />
      <Stack.Screen name="ChatRoomScreen" options={{ headerShown: true, title: "Chat Room" }} />
      <Stack.Screen name="GroupListScreen" options={{ headerShown: true, title: "Groups" }} />
      <Stack.Screen name="InboxScreen" options={{ headerShown: true, title: "Inbox" }} />
      <Stack.Screen name="SelectUserScreen" options={{ headerShown: true, title: "Select User" }} />
    </Stack>
  );
};

export default ScreensLayout;
