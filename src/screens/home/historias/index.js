import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Historia = ({ displayName, onPressChangeName }) => {
  const historias = [
    require("./../../../../assets/androide.png"),
  ];

  return (
    <View style={{ flexDirection: "row", marginTop: 8 }}>
      {/* HISTORIA */}
      <View style={{ marginLeft: 10 }}>
        <LinearGradient
          colors={["#962fbf", "#d62977", "#fa7d1e", "#fed975"]}
          style={{ padding: 3, borderRadius: 50 }}
        >
          <Image
            source={historias[0]}
            style={{ height: 70, width: 70, borderRadius: 35 }}
          />
        </LinearGradient>
      </View>

      {/* saludo: HOLA */}
      <TouchableOpacity
        onPress={onPressChangeName}
        style={{
          marginLeft: 12,
          backgroundColor: "#fff",
          padding: 16,
          borderRadius: 10,
          borderWidth: 1,
          width: 280,
          justifyContent: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16, textAlign: "center" }}>
          Hola {displayName}!
        </Text>

        <Text
          style={{
            fontSize: 10,
            textAlign: "center",
            marginTop: 4,
            textDecorationLine: "underline",
          }}
        >
          Cambiar nombre
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default Historia;
