import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import wisataData from '../../data';

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Semua Destinasi Wisata</Text>
      <FlatList
        data={wisataData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nama}</Text>
            <Text>{item.lokasi}</Text>
            <Text>{item.deskripsi}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: { backgroundColor: '#f2f2f2', padding: 12, marginBottom: 12, borderRadius: 8 },
  name: { fontSize: 18, fontWeight: 'bold' }
});

export default ExploreScreen;
