import { Stack } from "expo-router";

const ScreensLayout = () => {
 return (
  <Stack>
   <Stack.Screen
    name='ChatListScreen'
    options={{ headerShown: true, title: "Chats" }}
   />
   <Stack.Screen
    name='ChatRoomScreen'
    options={{ headerShown: false, title: "Chat Room" }}
   />
   <Stack.Screen
    name='GroupListScreen'
    options={{ headerShown: false, title: "Groups" }}
   />
   <Stack.Screen
    name='SelectUserScreen'
    options={{ headerShown: true, title: "Select User" }}
   />
   <Stack.Screen name='GroupChatRoomScreen' options={{ headerShown: false }} />
  </Stack>
 );
};

export default ScreensLayout;
