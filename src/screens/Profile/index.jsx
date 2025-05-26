import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import wisataData from '../../data';

const ProfileScreen = () => {
  const [nama, setNama] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  const handleSubmit = () => {
    if (!nama || !lokasi || !deskripsi) {
      Alert.alert('Semua field wajib diisi!');
      return;
    }

    const newItem = {
      id: wisataData.length + 1,
      nama,
      lokasi,
      deskripsi,
    };

    wisataData.push(newItem);
    Alert.alert('Data berhasil ditambahkan!');
    setNama('');
    setLokasi('');
    setDeskripsi('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profil Pengguna</Text>

      <Text style={styles.subTitle}>Tambah Destinasi Baru</Text>

      <TextInput
        style={styles.input}
        placeholder="Nama Wisata"
        value={nama}
        onChangeText={setNama}
      />
      <TextInput
        style={styles.input}
        placeholder="Lokasi"
        value={lokasi}
        onChangeText={setLokasi}
      />
      <TextInput
        style={styles.input}
        placeholder="Deskripsi"
        value={deskripsi}
        onChangeText={setDeskripsi}
        multiline
      />

      <Button title="Tambah Data" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 8,
  },
});

export default ProfileScreen;
