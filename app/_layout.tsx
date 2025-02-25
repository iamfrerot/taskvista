import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { SplashScreen } from "expo-router";
import { Provider } from "react-redux";
SplashScreen.preventAutoHideAsync();
import store from "./Redux/store";
const RootLayout = () => {
 const [fontsLoaded, error] = useFonts({
  "Outfit-Black": require("../assets/fonts/Outfit-Black.ttf"),
  "Outfit-Bold": require("../assets/fonts/Outfit-Bold.ttf"),
  "Outfit-ExtraBold": require("../assets/fonts/Outfit-ExtraBold.ttf"),
  "Outfit-ExtraLight": require("../assets/fonts/Outfit-ExtraLight.ttf"),
  "Outfit-Light": require("../assets/fonts/Outfit-Light.ttf"),
  "Outfit-Medium": require("../assets/fonts/Outfit-Medium.ttf"),
  "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
  "Outfit-SemiBold": require("../assets/fonts/Outfit-SemiBold.ttf"),
  "Outfit-Thin": require("../assets/fonts/Outfit-Thin.ttf"),
 });

 useEffect(() => {
  if (error) throw error;
  if (fontsLoaded) SplashScreen.hideAsync();
 }, [fontsLoaded, error]);

 if (!fontsLoaded && !error) return null;

 return (
  <Provider store={store}>
   <Stack>
    <Stack.Screen name='index' options={{ headerShown: false }} />
    <Stack.Screen name='(auth)' options={{ headerShown: false }} />
    <Stack.Screen name='(screens)' options={{ headerShown: false }} />
    <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    <Stack.Screen name='(create)' options={{ headerShown: false }} />
   </Stack>
   <StatusBar style='dark' />
  </Provider>
 );
};

export default RootLayout;
