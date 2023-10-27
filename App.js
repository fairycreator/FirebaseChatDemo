import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, View, StyleSheet } from "react-native";
import ChatScreen from "./screens/ChatScreen.js";
import auth from "@react-native-firebase/auth";
import LoginScreen from "./screens/LoginScreen.js";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Auth listener
    const unsubscribe = auth().onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.viewStyle}>
        {user ? <ChatScreen /> : <LoginScreen />}
      </View>
    </SafeAreaView>
  );
};
