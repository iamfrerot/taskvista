// HelpScreen.tsx
import React from "react";
import { View, FlatList,Text, StyleSheet,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

const HelpScreen = () => {
    const router = useRouter();
    const goback = () => {
        router.back();
      };
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => {
          goback();
        }}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="#19459d" />
      </TouchableOpacity>
      <Text style={styles.header}>Help</Text>
      </View>
      <View style={styles.list}>
        <Text style={styles.paragraph}>
          Welcome to our Project Management App Help Section. Here you can find
          useful information and tips to make the most out of our application.
        </Text>
        <Text style={styles.subHeading}>Key Features Overview:</Text>
        <Text style={styles.listItem}>
          - Project Submission and Management: Stakeholders can submit projects
          and track their progress.
        </Text>
        <Text style={styles.listItem}>
          - Task Assignment and Tracking: Assign tasks to team members and track
          their completion.
        </Text>
        <Text style={styles.listItem}>
          - Chat Functionality: Communicate individually or in groups related
          to projects.
        </Text>
        <Text style={styles.listItem}>
          - Daily Standup with Chatbot: Conduct daily standup meetings using the
          integrated chatbot feature.
        </Text>
        <Text style={styles.listItem}>
          - To-Do List: Manage tasks with a comprehensive to-do list.
        </Text>
        <Text style={styles.listItem}>
          - Profile Management: Update your profile information and avatar.
        </Text>
     </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      list: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 16,
        paddingRight: 16,
        marginVertical: 8,
        marginLeft: 8,
        marginRight: 16,
        width: '96%',
      },
      backButton: {
        padding: 10,
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
      },
      headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
      userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
      },
      name: {
        fontSize: 16,
      },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 20,
    lineHeight: 24,
    textAlign: "justify",
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default HelpScreen;
