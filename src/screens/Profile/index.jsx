import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => {
  const handleAddWisata = () => {
    navigation.navigate('AddWisata');
  };

  const handleEditProfile = () => {
    Alert.alert('Info', 'Fitur Edit Profile akan segera hadir!');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Profile */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="settings-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{
              uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
            }}
            style={styles.avatar}
          />
        </View>
        
        <Text style={styles.name}>Arthur Conan Doyle</Text>
        <Text style={styles.memberSince}>Member since 18 Mar 2020</Text>
        
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>29</Text>
            <Text style={styles.statLabel}>Posted</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3K</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3K</Text>
            <Text style={styles.statLabel}>Follower</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddWisata}
          >
            <Icon name="add-circle" size={20} color="#fff" />
            <Text style={styles.addButtonText}>Tambah Wisata</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.activitySection}>
        <View style={styles.activityItem}>
          <View style={styles.activityBadge}>
            <Text style={styles.activityBadgeText}>Lifestyle</Text>
          </View>
          <Image 
            source={{
              uri: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=60&h=60&fit=crop'
            }}
            style={styles.activityImage}
          />
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Can Playing Games Reduce Stress?</Text>
            <View style={styles.activityMeta}>
              <Icon name="time-outline" size={12} color="#999" />
              <Text style={styles.activityDate}>Sep 13, 2023</Text>
              <Icon name="chatbubble-outline" size={12} color="#999" />
              <Text style={styles.activityComments}>0</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Icon name="bookmark-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Floating Action Button Alternative */}
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={handleAddWisata}
      >
        <Icon name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    paddingTop: 50,
  },
  settingsButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  editButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  activitySection: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingVertical: 16,
  },
  activityItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 12,
  },
  activityBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    position: 'absolute',
    top: -8,
    left: 16,
    zIndex: 1,
  },
  activityBadgeText: {
    fontSize: 10,
    color: '#1976d2',
    fontWeight: '500',
  },
  activityImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activityDate: {
    fontSize: 12,
    color: '#999',
    marginRight: 12,
  },
  activityComments: {
    fontSize: 12,
    color: '#999',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default ProfileScreen;