import { View, ScrollView } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { auth } from "../../../firebase";
import { onAuthStateChanged, reload } from "firebase/auth";
import Historia from "../home/historias";
import Home from "../home";
import Post from "../../components/post";

const Dashboard = () => {
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState("Anónimo");

  const handleDisplayName = useCallback(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await reload(user)
        setDisplayName(user.displayName ? user.displayName:'Anonimo')
      }
    })
    return () => unsubscribe();
  }, [])

  useEffect(() => {
      handleDisplayName()
  }, []);

  useFocusEffect(useCallback(()=>{
    handleDisplayName()
  }, []))

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Home />

      <Historia
        displayName={displayName}
        onPressChangeName={() =>
          navigation.navigate("ChangeName")
        }
      />

      <Post />
    </ScrollView>
  );
};

export default Dashboard;
