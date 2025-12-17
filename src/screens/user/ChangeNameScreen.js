import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebase";
import ChangeDisplayNameForm from "../../components/user/ChangeDisplayNameForm";

function ChangeNameScreen() {
  const navigation = useNavigation();
  const user = auth.currentUser;

  const onReload = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar nombre</Text>
      <Text style={styles.subtitle}>
        Nombre actual: {user?.displayName ?? "Anónimo"}
      </Text>

      <ChangeDisplayNameForm onReload={onReload} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    marginBottom: 20,
    color: "#555",
  },
});


export default ChangeNameScreen;