import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';

export default function Faculty({ navigation }) {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    fetchFaculties(); // Fetch data initially
    const intervalId = setInterval(fetchFaculties, 2000); // Fetch data every 2 seconds
    return () => clearInterval(intervalId); // Cleanup function to clear interval
  }, []);

  const navigateToAddFaculty = () => {
    navigation.navigate('AddFaculty');
  };

  const fetchFaculties = async () => {
    try {
      const response = await fetch('http://192.168.200.150:5000/api/faculty/getfaculty');
      if (response.ok) {
        const data = await response.json();
        setFaculties(data);
      } else {
        console.error('Failed to fetch faculties');
      }
    } catch (error) {
      console.error('Error fetching faculties:', error);
    }
  };

  const handleEdit = (id) => {
    navigation.navigate('EditFaculty', { id });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://192.168.200.150:5000/api/faculty/deletefaculty/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setFaculties(faculties.filter((faculty) => faculty._id !== id));
        // Show success message
        Alert.alert('Success', 'Faculty deleted successfully');
      } else {
        console.error('Failed to delete faculty');
      }
    } catch (error) {
      console.error('Error deleting faculty:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Add Faculty" onPress={navigateToAddFaculty} style={styles.addButton} />
      <Text style={styles.title}>List of Faculties</Text>
      <ScrollView style={styles.scrollView}>
        {faculties.map((item, index) => (
          <View key={index} style={styles.facultyItem}>
            <Text style={styles.hodName}>{item.name}</Text>
            <Text style={styles.hodInfo}>Department: {item.department}</Text>
            <Text style={styles.hodInfo}>Email: {item.email}</Text>
            <Text style={styles.hodInfo}>Mobile Number: {item.mobileNumber}</Text>
            <Text style={styles.hodInfo}>Age: {item.age}</Text>
            <Text style={styles.hodInfo}>Password: {item.password}</Text>
            {/* Add more fields as needed */}
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
  facultyItem: {
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
  facultyName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  facultyInfo: {
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
