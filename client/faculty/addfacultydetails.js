import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AddFacultyDetails({ navigation }) {
  const [data, setData] = useState();
  const [homeData, setHomeData] = useState({
    panNumber: '',
    qualification: '',
    experience: '',
    dateOfJoining: '',
    aadharNumber: '',
    bloodGroup: '',
    address: '',
    subjectExpertise: '',
    certificates: '',
    basicSalary: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken !== null) {
        const res = await axios.post('http://192.168.200.150:5000/api/faculty/fetchVoluntier', { storedToken });
        setData(res.data.user);
      } else {
        console.log('Token not found in AsyncStorage');
      }
    };

    fetchData();

    return () => {};
  }, []);

  const handleInputChange = (key, value) => {
    setHomeData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSaveHomeData = async () => {
    try {
      const facultyEmail = data.email;
      await axios.post(`http://192.168.200.150:5000/api/faculty/savehomedata`, {
        email: facultyEmail,
        homeData: homeData
      });
      Alert.alert('Success', 'Faculty Details added successfully!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('FacultyHome');
          },
        },
      ]);
    } catch (error) {
      console.error('Error saving home data:', error);
      Alert.alert('Error', 'Failed to save faculty details. Please try again later.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.heading}>Faculty Information</Text>
        <View style={styles.inputContainer}>
          <Icon name="id-card" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter PAN Number"
            value={homeData.panNumber}
            onChangeText={(text) => handleInputChange('panNumber', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="graduation-cap" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Qualification"
            value={homeData.qualification}
            onChangeText={(text) => handleInputChange('qualification', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="briefcase" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Experience"
            value={homeData.experience}
            onChangeText={(text) => handleInputChange('experience', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="calendar" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Date of Joining"
            value={homeData.dateOfJoining}
            onChangeText={(text) => handleInputChange('dateOfJoining', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="address-card" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Aadhar Number"
            value={homeData.aadharNumber}
            onChangeText={(text) => handleInputChange('aadharNumber', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="tint" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Blood Group"
            value={homeData.bloodGroup}
            onChangeText={(text) => handleInputChange('bloodGroup', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="home" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={homeData.address}
            onChangeText={(text) => handleInputChange('address', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="star" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Subject Expertise"
            value={homeData.subjectExpertise}
            onChangeText={(text) => handleInputChange('subjectExpertise', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="certificate" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Certificates"
            value={homeData.certificates}
            onChangeText={(text) => handleInputChange('certificates', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="money" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Basic Salary"
            value={homeData.basicSalary}
            onChangeText={(text) => handleInputChange('basicSalary', text)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSaveHomeData}>
          <Text style={styles.buttonText}>Save Home Data</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
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
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
