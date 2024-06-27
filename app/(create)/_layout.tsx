import { Stack } from "expo-router";

const CreateLayout = () => {
 return (
  <Stack>
   <Stack.Screen name='createtask' options={{ headerShown: false }} />
   <Stack.Screen name='createproject' options={{ headerShown: false }} />
   <Stack.Screen name='projects' options={{ headerShown: false }} />
   <Stack.Screen
    name='projectdetail'
    options={{ presentation: "fullScreenModal", headerShown: false }}
   />
  </Stack>
 );
};

export default CreateLayout;
