import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const favoriteData = [
  { id: "1", title: "Pantai Balekambang" },
  { id: "2", title: "Gunung Bromo" },
  { id: "3", title: "Jatim Park 2" },
];

const FavoritScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Destinasi Favorit</Text>
      <FlatList
        data={favoriteData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default FavoritScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    padding: 15,
    backgroundColor: "#f2f2f2",
    marginVertical: 5,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
  },
});
