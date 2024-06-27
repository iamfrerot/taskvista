// FAQScreen.tsx
import React from "react";
import { View, FlatList,Text, StyleSheet,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";


const FAQScreen = () => {
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
      <Text style={styles.header}>FAQ</Text>
        </View>
        <View style={styles.list}>
        <Text style={styles.question}>1. How do I submit a new project?</Text>
        <Text style={styles.answer}>
          To submit a new project, navigate to the Projects section, and click
          on the 'Submit New Project' button. Fill in the required details and
          submit.
        </Text>
        <Text style={styles.question}>2. How can I assign tasks to team members?</Text>
        <Text style={styles.answer}>
          To assign tasks, go to the Tasks section of the project. Select a task
          and click on 'Assign Task'. Choose the team member from the list and
          save the assignment.
        </Text>
        <Text style={styles.question}>3. Is there a daily standup feature?</Text>
        <Text style={styles.answer}>
          Yes, our app includes a daily standup feature. You can initiate a
          standup meeting through the Chatbot in the Standup section.
        </Text>
        <Text style={styles.question}>4. How do I update my profile information?</Text>
        <Text style={styles.answer}>
          To update your profile, go to the Profile section and click on 'Edit
          Profile'. Update your information and save the changes.
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
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  answer: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
    textAlign: "justify",
  },
});

export default FAQScreen;
