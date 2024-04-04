import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AddHod({ navigation }) {
  // State variables for HOD data
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Function to handle adding HOD
  const handleAddHod = async () => {
    try {
      // Send POST request to server to add HOD
      const response = await fetch('http://192.168.200.150:5000/api/hod/addhod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          department,
          email,
          mobileNumber,
          age,
          password,
          role:"hod",
        }),
      });

      // Check if request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Show success alert
      Alert.alert('Success', 'HOD added successfully!', [
        {
          text: 'OK',
          onPress: async () => {
            // Store HOD data locally using AsyncStorage
            try {
              navigation.navigate('Hod'); // Navigate to 'hod' screen
            } catch (error) {
              console.error('Error storing HOD data:', error);
            }
          },
        },
      ]);
    } catch (error) {
      // Handle errors
      console.error('Error adding HOD:', error);
      Alert.alert('Error', 'Failed to add HOD. Please try again.', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Head of Department</Text>

      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#aaa" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="building" size={20} color="#aaa" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Department"
          value={department}
          onChangeText={(text) => setDepartment(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#aaa" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="phone" size={20} color="#aaa" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          value={mobileNumber}
          onChangeText={(text) => setMobileNumber(text)}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#aaa" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={(text) => setAge(text)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#aaa" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#aaa" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />
      </View>

      <Button style={styles.button} onPress={handleAddHod}>
        Add HOD
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#3498db',
  },
});
