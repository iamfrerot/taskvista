import { Stack } from "expo-router";

const CreateLayout = () => {
 return (
  <Stack>
   <Stack.Screen name='createtask' options={{ headerShown: false }} />
  </Stack>
 );
};

export default CreateLayout;
