import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AddFaculty({ navigation }) {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');

  const handleAddFaculty = async () => {
    try {
      const response = await fetch('http://192.168.200.150:5000/api/faculty/addfaculty', {
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
          role:"faculty"
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      Alert.alert('Success', 'Faculty added successfully!', [
        {
          text: 'OK',
          onPress: async () => {
            try {
              navigation.navigate('Faculty'); // Navigate to 'Faculty' screen
            } catch (error) {
              console.error('Error navigating:', error);
            }
          },
        },
      ]);
    } catch (error) {
      console.error('Error adding faculty:', error);
      Alert.alert('Error', 'Failed to add faculty. Please try again.', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Faculty</Text>
      
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
        <Icon name="calendar" size={20} color="#aaa" style={styles.inputIcon} />
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
      
      <Button title="Add Faculty" onPress={handleAddFaculty} />
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
});
