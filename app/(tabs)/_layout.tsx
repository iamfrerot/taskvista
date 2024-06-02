import { View, Text, Image } from "react-native";
import { icons } from "../../constants";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

interface TabiconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, color, name, focused }: TabiconProps) => {
  return (
    <View className='items-center justify-center gap-1'>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className='w-6 h-6'
      />
      <Text
        className={`font-osemibold ${focused ? "text-primary" : "text-gray-100"}`}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#19459d",
          tabBarStyle: {
            backgroundColor: "white",
            height: 89,
            paddingTop: 21,
            borderTopRightRadius: 34,
            borderTopLeftRadius: 34,
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 9,
          },
        }}
      >
        <Tabs.Screen
          name='home'
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={focused ? icons.homefocus : icons.home}
                color={color}
                focused={focused}
                name='Home'
              />
            ),
          }}
        />
        <Tabs.Screen
          name='task'
          options={{
            headerShown: false,
            title: "Tasks",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={focused ? icons.tasksfocus : icons.tasks}
                color={color}
                focused={focused}
                name='Tasks'
              />
            ),
          }}
        />
        <Tabs.Screen
          name='inbox'
          options={{
            headerShown: false,
            title: "Inbox",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={focused ? icons.inboxfocus : icons.inbox}
                color={color}
                focused={focused}
                name='Inbox'
              />
            ),
          }}
        />
        <Tabs.Screen
          name='todolist'
          options={{
            headerShown: false,
            title: "ToDoList",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                //change the icon to the correct icon
                icon={focused ? icons.tasksfocus : icons.tasks}
                color={color}
                focused={focused}
                name='ToDoList'
              />
            ),
          }}
        />
        <Tabs.Screen
          name='account'
          options={{
            headerShown: false,
            title: "Account",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={focused ? icons.accountfocus : icons.account}
                color={color}
                focused={focused}
                name='Account'
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar style='dark' />
    </>
  );
};

export default TabsLayout;
