// ChatScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import SignOutButton from "../components/SignOutButton";
import Input from "../components/Input";
import SendButton from "../components/SendButton";
import Chat from "../components/Chat";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatStyle: {
    flex: 1,
    width: "100%",
  },
  googleButton: {
    width: 200,
    height: 50,
  },
});

const handleSignOut = (navigation) => {
  auth()
    .signOut()
    .then(() => {
      console.log("User signed out!");
      navigation.navigate("LoginScreen");
      Alert.alert("Success", "You have been signed out.");
    })
    .catch((error) => {
      console.error("Error signing out: ", error);
      Alert.alert(
        "Error",
        "There was a problem signing out. Please try again."
      );
    });
};

const ChatScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const timestamp = firestore.FieldValue.serverTimestamp();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("chats")
      .orderBy("createdAt", "asc")
      .limitToLast(15)
      .onSnapshot((querySnapshot) => {
        const chatsArr = [];
        querySnapshot.forEach((doc) => {
          const id = doc.id;
          const data = doc.data();
          chatsArr.push({ id, ...data });
        });
        setChats(chatsArr);
        setLoading(false);
      });

    return () => {
      unsubscribe();
      setLoading(false);
    };
  }, []);

  const sendMessage = async (e) => {
    const { uid, photoURL } = auth().currentUser;

    if (text.length > 1 && text.length < 40) {
      try {
        e.preventDefault();
        setLoading(true);

        await firestore()
          .collection("chats")
          .doc()
          .set({
            owner: uid,
            imageUrl: photoURL,
            text: text,
            createdAt: timestamp,
          })
          .then(() => {
            setText("");
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            Alert.alert("Error", err);
          });
      } catch (err) {
        setLoading(false);
        Alert.alert("Error", err);
      }
    } else {
      setLoading(false);
      Alert.alert("Chat not sent", "Must be between 1 and 40 characters");
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  } else {
    const username = auth().currentUser.displayName;

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{username}</Text>
          <SignOutButton handleClick={() => handleSignOut(navigation)} />
        </View>

        <View style={styles.chatStyle}>
          {chats && (
            <FlatList
              data={chats}
              renderItem={({ item }) => <Chat key={item.id} chat={item} />}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <Input text={text} setText={setText} />
          <SendButton handleChat={sendMessage} />
        </View>
      </View>
    );
  }
};

export default ChatScreen;
