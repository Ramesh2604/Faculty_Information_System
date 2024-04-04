import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, TouchableOpacity,Alert } from 'react-native';

export default function Hod({ navigation }) {
  const [hods, setHods] = useState([]);

  useEffect(() => {
    fetchHods(); // Fetch data initially
    const intervalId = setInterval(fetchHods, 2000); // Fetch data every 2 seconds
    return () => clearInterval(intervalId); // Cleanup function to clear interval
  }, []);

  const navigateToAddHod = () => {
    navigation.navigate('AddHod');
  };

  const fetchHods = async () => {
    try {
      const response = await fetch('http://192.168.200.150:5000/api/hod/gethod');
      if (response.ok) {
        const data = await response.json();
        setHods(data);
      } else {
        console.error('Failed to fetch HODs');
      }
    } catch (error) {
      console.error('Error fetching HODs:', error);
    }
  };

  const handleEdit = (id) => {
    navigation.navigate('EditHod', { id });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://192.168.200.150:5000/api/hod/deletehod/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setHods(hods.filter((hod) => hod._id !== id));
      // Show success message
      Alert.alert('Success', 'HOD deleted successfully');
      } else {
        console.error('Failed to delete HOD');
      }
    } catch (error) {
      console.error('Error deleting HOD:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Add HOD" onPress={navigateToAddHod} style={styles.addButton} />
      <Text style={styles.title}>List of HODs</Text>
      <ScrollView style={styles.scrollView}>
        {hods.map((item, index) => (
          <View key={index} style={styles.hodItem}>
            <Text style={styles.hodName}>{item.name}</Text>
            <Text style={styles.hodInfo}>Department: {item.department}</Text>
            <Text style={styles.hodInfo}>Email: {item.email}</Text>
            <Text style={styles.hodInfo}>Mobile Number: {item.mobileNumber}</Text>
            <Text style={styles.hodInfo}>Age: {item.age}</Text>
            <Text style={styles.hodInfo}>Password: {item.password}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item._id)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item._id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  addButton: {
    marginBottom: 20,
    backgroundColor: '#3498db',
    color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    width: '100%',
    paddingHorizontal: 20,
  },
  hodItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  hodName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  hodInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#c0392b',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
