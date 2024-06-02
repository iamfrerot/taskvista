
import { Stack } from "expo-router";

const ChatLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="ChatListScreen" options={{ headerShown: false }} />
      <Stack.Screen name="GroupListScreen" options={{ headerShown: false }}  />
      <Stack.Screen name="ChatRoomScreen" options={{ headerShown: false }} />
      <Stack.Screen name="InboxScreen" options={{ headerShown: false }} />
      </Stack>
  );
};

export default ChatLayout;
