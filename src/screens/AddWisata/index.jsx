// screens/AddWisata/index.jsx (Baru)
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const AddWisataScreen = () => {
  const [form, setForm] = useState({
    nama: '',
    lokasi: '',
    deskripsi: ''
  });

  const handleSubmit = () => {
    // POST data ke API (Bab 7)
  };

  return (
    <View>
      <TextInput 
        placeholder="Nama Wisata"
        value={form.nama}
        onChangeText={text => setForm({...form, nama: text})}
      />
      {/* Field lainnya */}
      <Button title="Tambah" onPress={handleSubmit} />
    </View>
  );
};