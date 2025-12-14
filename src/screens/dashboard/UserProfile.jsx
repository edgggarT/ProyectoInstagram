import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";


const posts = [
  { id: "1", image: require('./../../../assets/brazo.png')},
  { id: "2", image: require('./../../../assets/brazo1.png')},
  { id: "3", image: require('./../../../assets/brazo.png') },
];

export default function UserProfile() {
  return (
    <View style={styles.container}>
      
      {/* ---------- parte de arriba ---------- */}
      <View style={styles.topBar}>
        {/* Ícono + */}
        <View style={styles.leftTop}>
          <Feather name="plus" size={25} color="black" />
        </View>

        {/* Nombre / lock / flecha */}
        <View style={styles.centerTop}>
          <Ionicons name="lock-closed-outline" size={18} color="black" />
          <Text style={styles.username}>Wally</Text>
          <Feather name="chevron-down" size={20} color="black" />
        </View>

        {/*  la arroba y el menú */}
        <View style={styles.rightTop}>
          <Text style={styles.arroba}>@</Text>
          <Feather name="menu" size={28} color="black" />
        </View>
      </View>

      {/* ---------- Perfil ---------- */}
      <View style={styles.profileSection}>
        <Image
          source={ require('./../../../assets/androide.png') }
          style={styles.profileImage}
        />

        <View style={styles.stats}>
          {/* Primera columna: contiene nombre arriba (pos absolute), número y label */}
          <View style={[styles.statBox, styles.statBoxFirst]}>
            <Text style={[styles.fullName, styles.fullNameAbsolute]}>Wally_IA</Text>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>publicaciones</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>50.6 mil</Text>
            <Text style={styles.statLabel}>seguidores</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>289</Text>
            <Text style={styles.statLabel}>seguidos</Text>
          </View>
        </View>
      </View>

      {/* ---------- Botones ---------- */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Editar perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Compartir perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.roundButton}>
          <Feather name="user-plus" size={18} color="black" />
        </TouchableOpacity>
      </View>

      {/* ---------- circulo de agregar ---------- */}
      <View style={styles.highlightsContainer}>
        <View style={styles.highlight}>
          <View style={styles.highlightCircle}>
            <Feather name="plus" size={27} color="black" />
          </View>
          <Text style={styles.highlightLabel}>Nuevo</Text>
        </View>
      </View>

      {/* ---------- Tabla o iconos ---------- */}
      <View style={styles.tabsRow}>
        <Feather name="grid" size={24} color="black" />
        <Feather name="play-circle" size={24} color="gray" />
        <MaterialCommunityIcons name="repeat" size={24} color="gray" />
        <Feather name="user" size={24} color="gray" />
      </View>

      {/* ---------- Posteos ---------- */}
      
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image
            source={
              typeof item.image === "string"
                ? { uri: item.image }
                : item.image
            }
            style={styles.postImage}
          />
        )}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  /* parte de arriba */
  topBar: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },

  leftTop: { width: 40 },

  centerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  rightTop: {
    flexDirection: "row",
    alignItems: "center",
    width: 80,
    justifyContent: "flex-end",
  },

  username: { fontSize: 21, fontWeight: "700", marginHorizontal: 6 },

  arroba: { fontSize: 19, marginRight: 38, color: "#111", fontWeight: "600" },

  /* Perfil */
  profileSection: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 30,
    alignItems: "center",
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 8,
  },

  /* nombre, publicaciones, seguidores y seguidos */
  stats: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },

  statBox: {
    alignItems: "center",
    minWidth: 70,
    paddingTop: 6,
    paddingBottom: 6,
  },

  statBoxFirst: {
    position: "relative",
  },

  fullName: { fontSize: 14, fontWeight: "700" },

  fullNameAbsolute: {
    position: "absolute",
    top: -18,
    left: 0,
    right: 0,
    textAlign: "center",
  },

  statNumber: { fontSize: 15, fontWeight: "700", marginBottom: 2 },

  statLabel: { fontSize: 13, color: "#000000ff" },

  /* Botones */
  buttonsRow: {
    flexDirection: "row",
    marginTop: 15,
    paddingHorizontal: 13,
    justifyContent: "space-between",
  },

  button: {
    flex: 1,
    backgroundColor: "#ececec",
    paddingVertical: 9,
    borderRadius: 8,
    marginRight: 8,
    alignItems: "center",
  },

  buttonText: { fontWeight: "600" },

  roundButton: {
    width: 40,
    height: 40,
    backgroundColor: "#ececec",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  /* circulos nuevo */
  highlightsContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginTop: 20,
  },

  highlight: { alignItems: "center", marginRight: 20 },

  highlightCircle: {
    width: 75,
    height: 75,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#303030",
    alignItems: "center",
    justifyContent: "center",
  },

  highlightLabel: { marginTop: 5, fontSize: 12 },

  /* iconos */
  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 18,
    paddingVertical: 8,
  },

  /* Posteos */
  postImage: {
    width: "33.33%",
    aspectRatio: 1,
    margin: 1.2,
    backgroundColor: "#fff",
    resizeMode: "cover",
  },
});



