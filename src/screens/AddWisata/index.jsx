import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AddWisataScreen = ({ navigation, route }) => {
  const [formData, setFormData] = useState({
    nama: '',
    lokasi: '',
    deskripsi: '',
    kategori: 'Populer',
    rating: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // Simulasi API Base URL (ganti dengan API sesungguhnya)
  const API_BASE_URL = 'https://jsonplaceholder.typicode.com/posts'; // Contoh API

  const kategoriOptions = ['Populer', 'Pantai', 'Gunung', 'Kota', 'Sejarah'];

  useEffect(() => {
    // Check if editing existing wisata
    if (route.params?.wisata) {
      const wisata = route.params.wisata;
      setFormData({
        nama: wisata.nama || '',
        lokasi: wisata.lokasi || '',
        deskripsi: wisata.deskripsi || '',
        kategori: wisata.kategori || 'Populer',
        rating: wisata.rating?.toString() || '',
        image: wisata.image || ''
      });
      setIsEdit(true);
      setEditId(wisata.id);
    }
  }, [route.params]);

  // GET - Fetch existing data (contoh)
  const fetchWisataData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}`);
      const data = await response.json();
      console.log('Fetched data:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Gagal mengambil data');
    } finally {
      setLoading(false);
    }
  };

  // POST - Add new wisata
  const addWisata = async () => {
    try {
      setLoading(true);
      
      const newWisata = {
        title: formData.nama, // API ini menggunakan 'title'
        body: formData.deskripsi,
        userId: 1,
        // Data tambahan untuk aplikasi kita
        lokasi: formData.lokasi,
        kategori: formData.kategori,
        rating: parseFloat(formData.rating) || 0,
        image: formData.image
      };

      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWisata),
      });

      const result = await response.json();
      
      if (response.ok) {
        Alert.alert(
          'Berhasil!', 
          'Wisata baru berhasil ditambahkan',
          [
            {
              text: 'OK',
              onPress: () => {
                // Reset form
                setFormData({
                  nama: '',
                  lokasi: '',
                  deskripsi: '',
                  kategori: 'Populer',
                  rating: '',
                  image: ''
                });
                navigation.goBack();
              }
            }
          ]
        );
        console.log('Created wisata:', result);
      } else {
        throw new Error('Failed to create wisata');
      }
    } catch (error) {
      console.error('Error adding wisata:', error);
      Alert.alert('Error', 'Gagal menambahkan wisata');
    } finally {
      setLoading(false);
    }
  };

  // PUT - Update existing wisata
  const updateWisata = async () => {
    try {
      setLoading(true);
      
      const updatedWisata = {
        id: editId,
        title: formData.nama,
        body: formData.deskripsi,
        userId: 1,
        lokasi: formData.lokasi,
        kategori: formData.kategori,
        rating: parseFloat(formData.rating) || 0,
        image: formData.image
      };

      const response = await fetch(`${API_BASE_URL}/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedWisata),
      });

      const result = await response.json();
      
      if (response.ok) {
        Alert.alert(
          'Berhasil!', 
          'Wisata berhasil diperbarui',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack()
            }
          ]
        );
        console.log('Updated wisata:', result);
      } else {
        throw new Error('Failed to update wisata');
      }
    } catch (error) {
      console.error('Error updating wisata:', error);
      Alert.alert('Error', 'Gagal memperbarui wisata');
    } finally {
      setLoading(false);
    }
  };

  // DELETE - Delete wisata
  const deleteWisata = async () => {
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda yakin ingin menghapus wisata ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              
              const response = await fetch(`${API_BASE_URL}/${editId}`, {
                method: 'DELETE',
              });

              if (response.ok) {
                Alert.alert(
                  'Berhasil!', 
                  'Wisata berhasil dihapus',
                  [
                    {
                      text: 'OK',
                      onPress: () => navigation.goBack()
                    }
                  ]
                );
                console.log('Deleted wisata with id:', editId);
              } else {
                throw new Error('Failed to delete wisata');
              }
            } catch (error) {
              console.error('Error deleting wisata:', error);
              Alert.alert('Error', 'Gagal menghapus wisata');
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const handleSubmit = () => {
    // Validasi
    if (!formData.nama.trim()) {
      Alert.alert('Error', 'Nama wisata harus diisi');
      return;
    }
    if (!formData.lokasi.trim()) {
      Alert.alert('Error', 'Lokasi harus diisi');
      return;
    }
    if (!formData.deskripsi.trim()) {
      Alert.alert('Error', 'Deskripsi harus diisi');
      return;
    }

    if (isEdit) {
      updateWisata();
    } else {
      addWisata();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        {/* Nama Wisata */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nama Wisata *</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan nama wisata"
            value={formData.nama}
            onChangeText={(value) => handleInputChange('nama', value)}
          />
        </View>

        {/* Lokasi */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Lokasi *</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan lokasi wisata"
            value={formData.lokasi}
            onChangeText={(value) => handleInputChange('lokasi', value)}
          />
        </View>

        {/* Kategori */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Kategori</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryContainer}>
              {kategoriOptions.map((kategori) => (
                <TouchableOpacity
                  key={kategori}
                  style={[
                    styles.categoryButton,
                    formData.kategori === kategori && styles.categoryButtonActive
                  ]}
                  onPress={() => handleInputChange('kategori', kategori)}
                >
                  <Text style={[
                    styles.categoryText,
                    formData.kategori === kategori && styles.categoryTextActive
                  ]}>
                    {kategori}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Rating */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Rating (1-5)</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan rating (contoh: 4.5)"
            value={formData.rating}
            onChangeText={(value) => handleInputChange('rating', value)}
            keyboardType="numeric"
          />
        </View>

        {/* URL Gambar */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>URL Gambar</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan URL gambar"
            value={formData.image}
            onChangeText={(value) => handleInputChange('image', value)}
          />
          {formData.image ? (
            <Image source={{ uri: formData.image }} style={styles.imagePreview} />
          ) : null}
        </View>

        {/* Deskripsi */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Deskripsi *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Masukkan deskripsi wisata"
            value={formData.deskripsi}
            onChangeText={(value) => handleInputChange('deskripsi', value)}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {isEdit && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={deleteWisata}
              disabled={loading}
            >
              <Icon name="trash-outline" size={16} color="#fff" />
              <Text style={styles.deleteButtonText}>Hapus</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Batal</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Icon name="save-outline" size={16} color="#fff" />
                <Text style={styles.submitButtonText}>
                  {isEdit ? 'Update' : 'Simpan'}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* API Demo Buttons */}
        <View style={styles.apiDemoContainer}>
          <Text style={styles.apiDemoTitle}>Demo REST API:</Text>
          <TouchableOpacity
            style={styles.apiButton}
            onPress={fetchWisataData}
            disabled={loading}
          >
            <Text style={styles.apiButtonText}>GET - Fetch Data</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryText: {
    color: '#666',
    fontSize: 14,
  },
  categoryTextActive: {
    color: '#fff',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    flexWrap: 'wrap',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  apiDemoContainer: {
    marginTop: 30,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  apiDemoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  apiButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
  apiButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default AddWisataScreen;