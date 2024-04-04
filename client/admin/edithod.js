import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function EditHod({ route, navigation }) {
  const { id } = route.params;
  const [hodData, setHodData] = useState({
    name: '',
    department: '',
    email: '',
    mobileNumber: '',
    age: '',
    password: '',
  });

  useEffect(() => {
    fetchHodData();
  }, []);

  const fetchHodData = async () => {
    try {
      const response = await fetch(`http://192.168.200.150:5000/api/hod/gethod/${id}`);
      if (response.ok) {
        const data = await response.json();
        const updatedData = {
          ...data,
          age: data.age.toString(),
        };
        setHodData(updatedData);
      } else {
        console.error('Failed to fetch HOD data');
      }
    } catch (error) {
      console.error('Error fetching HOD data:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://192.168.200.150:5000/api/hod/updatehod/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hodData),
      });
      if (response.ok) {
        Alert.alert('Success', 'HOD updated successfully', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        console.error('Failed to update HOD');
      }
    } catch (error) {
      console.error('Error updating HOD:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Hod</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={hodData.name}
        onChangeText={(text) => setHodData({ ...hodData, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Department"
        value={hodData.department}
        onChangeText={(text) => setHodData({ ...hodData, department: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={hodData.email}
        onChangeText={(text) => setHodData({ ...hodData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={hodData.mobileNumber}
        onChangeText={(text) => setHodData({ ...hodData, mobileNumber: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={hodData.age}
        onChangeText={(text) => setHodData({ ...hodData, age: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={hodData.password}
        onChangeText={(text) => setHodData({ ...hodData, password: text })}
      />
      <Button title="Update Hod" onPress={handleUpdate} />
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
