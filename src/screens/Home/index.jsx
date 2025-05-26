import React, { useState, useEffect, useRef } from "react";
import { Animated } from "react-native";
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
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get('window');

// Colors and typography constants
const colors = {
  primary: '#3B6CD4',
  secondary: '#FF7B25',
  black: '#000',
  white: '#fff',
  grey: '#8E8E93',
  lightGrey: '#F5F5F5',
  darkGrey: '#333',
};

const fontFamily = {
  bold: 'System',
  semiBold: 'System',
  regular: 'System',
};

// Data wisata
const carouselData = [
  {
    id: "1",
    image: "https://surl.li/wxgere",
    title: "Keindahan Pantai Balekambang",
    description: "Pantai Balekambang adalah salah satu pantai terindah di Malang dengan pasir putih dan ombak yang tenang.",
    category: "Pantai",
    rating: 4.8,
  },
  {
    id: "2",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/4d/09/27/alun-alun-malang.jpg?w=900&h=500&s=1",
    title: "Alun-Alun Kota Malang",
    description: "Alun-Alun Malang adalah tempat bersantai dengan taman hijau yang luas dan dikelilingi oleh bangunan bersejarah.",
    category: "Kota",
    rating: 4.5,
  },
  {
    id: "3",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR82X9ddHMaKEmEI9kQWbbEIiA5-jid9yzoA&s",
    title: "Keindahan Gunung Bromo",
    description: "Gunung Bromo adalah gunung berapi aktif dengan pemandangan matahari terbit yang sangat memukau.",
    category: "Gunung",
    rating: 4.9,
  },
  {
    id: "4",
    image: "https://travelspromo.com/wp-content/uploads/2015/10/Hawai-Waterpark-Malang-Hawai-Water-House-768x512.jpg",
    title: "Keseruan di Hawai Waterpark",
    description: "Hawai Waterpark menawarkan berbagai wahana air yang seru dan cocok untuk semua usia.",
    category: "Wahana",
    rating: 4.3,
  },
];

const categories = [
  { id: '1', name: 'Semua' },
  { id: '2', name: 'Populer' },
  { id: '3', name: 'Pantai' },
  { id: '4', name: 'Gunung' },
  { id: '5', name: 'Kota' },
  { id: '6', name: 'Wahana' },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Animasi fade-in untuk carousel
  const fadeAnim = useRef(new Animated.Value(0)).current;
  // Animasi slide-in untuk header
  const slideAnim = useRef(new Animated.Value(-100)).current;
  // Animasi scale untuk kategori buttons
  const scaleAnims = useRef(categories.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    // Animasi carousel fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Animasi header slide-in dari atas
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Fungsi untuk animasi scale kategori
  const handleCategoryPress = (categoryName, index) => {
    // Animasi scale down lalu scale up
    Animated.sequence([
      Animated.timing(scaleAnims[index], {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    setSelectedCategory(categoryName);
  };

  const filteredData = carouselData.filter(item => {
    const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header dengan Slide-In Animation */}
      <Animated.View style={[styles.header, { transform: [{ translateY: slideAnim }] }]}>
        <View>
          <Text style={styles.greeting}>Selamat Datang di</Text>
          <Text style={styles.title}>Wisataku Malang</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Icon name="person-circle-outline" size={32} color={colors.primary} />
        </TouchableOpacity>
      </Animated.View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={colors.grey} style={styles.searchIcon} />
        <TextInput
          placeholder="Cari wisata..."
          placeholderTextColor={colors.grey}
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Kategori */}
      <View style={styles.categorySection}>
        <Text style={styles.sectionTitle}>Kategori Wisata</Text>
        {/* Kategori dengan Scale Animation */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => handleCategoryPress(category.name, index)}
              activeOpacity={0.8}
            >
              <Animated.View
                style={[
                  styles.categoryItem,
                  selectedCategory === category.name && styles.categoryItemSelected,
                  { transform: [{ scale: scaleAnims[index] }] }
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category.name && styles.categoryTextSelected,
                  ]}
                >
                  {category.name}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Carousel dengan Animasi */}
      <View style={styles.carouselSection}>
        <Text style={styles.sectionTitle}>Destinasi Populer</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.carousel}
          contentContainerStyle={styles.carouselContent}
        >
          {carouselData.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.navigate("Detail", item)}
              activeOpacity={0.8}
            >
              <Animated.View style={[styles.carouselItem, { opacity: fadeAnim }]}>
                <Image source={{ uri: item.image }} style={styles.carouselImage} />
                <View style={styles.carouselTextContainer}>
                  <Text style={styles.carouselTitle}>{item.title}</Text>
                  <View style={styles.ratingContainer}>
                    <Icon name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                </View>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Rekomendasi Wisata */}
      <View style={styles.recommendationSection}>
        <Text style={styles.sectionTitle}>Rekomendasi Untuk Anda</Text>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Detail", item)}
              activeOpacity={0.8}
            >
              <View style={styles.recommendationItem}>
                <Image source={{ uri: item.image }} style={styles.recommendationImage} />
                <View style={styles.recommendationTextContainer}>
                  <Text style={styles.recommendationTitle}>{item.title}</Text>
                  <Text style={styles.recommendationCategory}>{item.category}</Text>
                  <View style={styles.ratingContainer}>
                    <Icon name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                    <Text style={styles.recommendationDescription} numberOfLines={2}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Tidak ada hasil ditemukan</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
    color: colors.grey,
    fontFamily: fontFamily.regular,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: fontFamily.bold,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGrey,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: colors.black,
    fontFamily: fontFamily.regular,
  },
  categorySection: {
    marginBottom: 24,
  },
  carouselSection: {
    marginBottom: 24,
  },
  recommendationSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginBottom: 16,
    fontFamily: fontFamily.bold,
  },
  categoryContainer: {
    paddingRight: 16,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.lightGrey,
    marginRight: 8,
  },
  categoryItemSelected: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: colors.grey,
    fontFamily: fontFamily.semiBold,
  },
  categoryTextSelected: {
    color: colors.white,
  },
  carousel: {
    marginHorizontal: -16,
  },
  carouselContent: {
    paddingHorizontal: 16,
  },
  carouselItem: {
    width: width * 0.7,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.lightGrey,
    elevation: 2,
  },
  carouselImage: {
    width: '100%',
    height: 160,
  },
  carouselTextContainer: {
    padding: 12,
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginBottom: 4,
    fontFamily: fontFamily.bold,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: colors.darkGrey,
    marginLeft: 4,
    fontFamily: fontFamily.semiBold,
  },
  recommendationItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  recommendationImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  recommendationTextContainer: {
    flex: 1,
    padding: 12,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginBottom: 4,
    fontFamily: fontFamily.bold,
  },
  recommendationCategory: {
    fontSize: 12,
    color: colors.primary,
    backgroundColor: colors.lightGrey,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 4,
    fontFamily: fontFamily.semiBold,
  },
  recommendationDescription: {
    fontSize: 12,
    color: colors.grey,
    marginTop: 4,
    fontFamily: fontFamily.regular,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: colors.grey,
    fontFamily: fontFamily.regular,
  },
});

export default HomeScreen;