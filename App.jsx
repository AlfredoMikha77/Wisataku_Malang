import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";

// Data carousel dengan gambar dan deskripsi
const carouselData = [
  {
    id: "1",
    image: "https://surl.li/wxgere",
    title: "Keindahan Pantai Balekambang",
    date: "Mar 27, 2025",
  },
  {
    id: "2",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/4d/09/27/alun-alun-malang.jpg?w=900&h=500&s=1",
    title: "Alun-Alun Kota Malang",
    date: "Mar 26, 2025",
  },
  {
    id: "3",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR82X9ddHMaKEmEI9kQWbbEIiA5-jid9yzoA&s",
    title: "Keindahan Gunung Bromo",
    date: "Mar 25, 2025",
  },
  {
    id: "4",
    image: "https://travelspromo.com/wp-content/uploads/2015/10/Hawai-Waterpark-Malang-Hawai-Water-House-768x512.jpg",
    title: "Keseruan di Hawai Waterpark",
    date: "Mar 24, 2025",
  },
];

// Komponen Header
const Header = () => (
  <View style={styles.searchBar}>
    <TextInput placeholder="Cari wisata..." style={styles.input} />
    <Text style={styles.title}>Wisataku Malang</Text>
  </View>
);

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("Populer");

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header />

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.listCategory}>
        {["Pantai", "Gunung", "Populer", "Terbaik"].map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryItem,
              selectedCategory === category && styles.categorySelected,
              index === 0 ? { marginLeft: 24 } : {},
              index === 3 ? { marginRight: 24 } : {},
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextSelected]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Carousel */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
        {carouselData.map((item) => (
          <View key={item.id} style={styles.carouselItem}>
            <Image source={{ uri: item.image }} style={styles.carouselImage} />
            <View style={styles.textOverlay}>
              <Text style={styles.imageTitle}>{item.title}</Text>
              <Text style={styles.imageDate}>{item.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Rekomendasi */}
      <Text style={styles.recommendationTitle}>Rekomendasi</Text>

      {/* Daftar Wisata dengan Gambar */}
      <FlatList
        data={carouselData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recommendationItem}>
            <Image source={{ uri: item.image }} style={styles.recommendationImage} />
            <Text style={styles.recommendationText}>{item.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  title: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  /*** Kategori ***/
  listCategory: {
    flexDirection: "row",
    marginBottom: -5,
    paddingHorizontal: 8,
  },
  categoryItem: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: "#f5f5f5",
    marginRight: 6,
    alignItems: "center",
    justifyContent: "center",
    height: 30,
  },
  categorySelected: {
    backgroundColor: "#5078F2",
  },
  categoryText: {
    fontSize: 12,
    color: "#7D7D7D",
    fontWeight: "500",
  },
  categoryTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },

  /*** Carousel ***/
  carousel: {
    flexDirection: "row",
    marginBottom: 10,
  },
  carouselItem: {
    position: "relative",
    marginRight: 10,
  },
  carouselImage: {
    width: 300,
    height: 150,
    borderRadius: 10,
  },
  textOverlay: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  imageTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  imageDate: {
    color: "#ccc",
    fontSize: 12,
  },

  /*** Rekomendasi ***/
  recommendationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recommendationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
  },
  recommendationImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  recommendationText: {
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1,
  },
});

export default HomeScreen;
