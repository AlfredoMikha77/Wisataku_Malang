import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { userProfile } from "../../theme/data";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil Pengguna</Text>
      <Text style={styles.label}>Nama: <Text style={styles.value}>{userProfile.name}</Text></Text>
      <Text style={styles.label}>Email: <Text style={styles.value}>{userProfile.email}</Text></Text>
      <Text style={styles.label}>Lokasi: <Text style={styles.value}>{userProfile.location}</Text></Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  value: {
    fontWeight: "600",
  },
});
