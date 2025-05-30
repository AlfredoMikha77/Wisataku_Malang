import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Animated, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// Data wisata yang sama dengan HomeScreen
const favoritePlaces = [
  {
    id: "1",
    title: "Keindahan Pantai Balekambang",
    description: "Pantai Balekambang adalah salah satu pantai terindah di Malang dengan pasir putih dan ombak yang tenang.",
    image: { uri: "https://surl.li/wxgere" },
    rating: 4.8,
    category: "Pantai",
  },
  {
    id: "2",
    title: "Alun-Alun Kota Malang",
    description: "Alun-Alun Malang adalah tempat bersantai dengan taman hijau yang luas dan dikelilingi oleh bangunan bersejarah.",
    image: { uri: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/4d/09/27/alun-alun-malang.jpg?w=900&h=500&s=1" },
    rating: 4.5,
    category: "Kota",
  },
  {
    id: "3",
    title: "Keindahan Gunung Bromo",
    description: "Gunung Bromo adalah gunung berapi aktif dengan pemandangan matahari terbit yang sangat memukau.",
    image: { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR82X9ddHMaKEmEI9kQWbbEIiA5-jid9yzoA&s" },
    rating: 4.9,
    category: "Gunung",
  },
  {
    id: "4",
    title: "Keseruan di Hawai Waterpark",
    description: "Hawai Waterpark menawarkan berbagai wahana air yang seru dan cocok untuk semua usia.",
    image: { uri: "https://travelspromo.com/wp-content/uploads/2015/10/Hawai-Waterpark-Malang-Hawai-Water-House-768x512.jpg" },
    rating: 4.3,
    category: "Wahana",
  },
];

const FavoriteScreen = () => {
  const navigation = useNavigation();
  const animatedValues = useRef(favoritePlaces.map(() => new Animated.Value(0))).current;
  const [favoriteStates, setFavoriteStates] = useState({}); // State untuk love button di favorite screen

  useEffect(() => {
    // Set semua item sebagai favorite secara default
    const initialFavorites = {};
    favoritePlaces.forEach(item => {
      initialFavorites[item.id] = true;
    });
    setFavoriteStates(initialFavorites);

    Animated.stagger(150,
      animatedValues.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  // Fungsi untuk toggle love (hanya visual, tidak menghapus dari list)
  const toggleLove = (itemId) => {
    setFavoriteStates(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorit Anda</Text>
        <Text style={styles.subtitle}>Tempat wisata yang Anda sukai</Text>
      </View>
      
      <Animated.FlatList
        data={favoritePlaces}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Animated.View
            style={{
              opacity: animatedValues[index],
              transform: [
                {
                  translateY: animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            }}
          >
            <TouchableOpacity 
              style={styles.card}
              onPress={() => navigation.navigate("Detail", item)}
              activeOpacity={0.8}
            >
              <Image source={item.image} style={styles.image} />
              
              {/* Love icon indicator - bisa diklik tapi hanya gimmick */}
              <TouchableOpacity 
                style={styles.loveIndicator}
                onPress={() => toggleLove(item.id)}
                activeOpacity={0.7}
              >
                <Icon 
                  name={favoriteStates[item.id] ? "heart" : "heart-outline"} 
                  size={20} 
                  color={favoriteStates[item.id] ? "#FF3B30" : "#8E8E93"} 
                />
              </TouchableOpacity>

              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.title}</Text>
                
                {/* Category badge */}
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{item.category}</Text>
                </View>
                
                <Text style={styles.description} numberOfLines={2}>
                  {item.description}
                </Text>
                
                {/* Rating */}
                <View style={styles.ratingContainer}>
                  <Icon name="star" size={16} color="#FFD700" />
                  <Text style={styles.rating}>{item.rating}</Text>
                  <Text style={styles.ratingLabel}>rating</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="heart-outline" size={80} color="#E0E0E0" />
            <Text style={styles.emptyTitle}>Belum ada favorit</Text>
            <Text style={styles.emptyText}>Mulai tambahkan tempat wisata favorit Anda dari halaman beranda</Text>
          </View>
        }
      />
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  card: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  image: {
    width: 120,
    height: 120,
  },
  loveIndicator: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    padding: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  textContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
  categoryBadge: {
    backgroundColor: '#3B6CD4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  ratingLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
  },
});