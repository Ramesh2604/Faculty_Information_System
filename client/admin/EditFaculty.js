import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function EditFaculty({ route, navigation }) {
  const { id } = route.params;
  const [facultyData, setFacultyData] = useState({
    name: '',
    department: '',
    email: '',
    mobileNumber: '',
    age: '',
    password: '',
  });

  useEffect(() => {
    fetchFacultyData();
  }, []);

  const fetchFacultyData = async () => {
    try {
      const response = await fetch(`http://192.168.200.150:5000/api/faculty/getfaculty/${id}`);
      if (response.ok) {
        const data = await response.json();
        const updatedData = { ...data, age: data.age.toString() };
        setFacultyData(updatedData);
      } else {
        console.error('Failed to fetch faculty data');
      }
    } catch (error) {
      console.error('Error fetching faculty data:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://192.168.200.150:5000/api/faculty/updatefaculty/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(facultyData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Faculty updated successfully', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        console.error('Failed to update faculty');
      }
    } catch (error) {
      console.error('Error updating faculty:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Faculty</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={facultyData.name}
        onChangeText={(text) => setFacultyData({ ...facultyData, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Department"
        value={facultyData.department}
        onChangeText={(text) => setFacultyData({ ...facultyData, department: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={facultyData.email}
        onChangeText={(text) => setFacultyData({ ...facultyData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={facultyData.mobileNumber}
        onChangeText={(text) => setFacultyData({ ...facultyData, mobileNumber: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={facultyData.age}
        onChangeText={(text) => setFacultyData({ ...facultyData, age: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={facultyData.password}
        onChangeText={(text) => setFacultyData({ ...facultyData, password: text })}
      />
      <Button title="Update Faculty" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
