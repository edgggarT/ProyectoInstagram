import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../util/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Historia from "../home/historias";
import Home from "../home";
import Post from "../../components/post";

const Dashboard = () => {
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState("Anónimo");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName ?? "Anónimo");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Home />

      <Historia
        displayName={displayName}
        onPressChangeName={() =>
          navigation.navigate("ChangeNameScreen")
        }
      />

      <Post />
    </ScrollView>
  );
};

export default Dashboard;
