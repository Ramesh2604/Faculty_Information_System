import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AddDetails({ navigation }) {
  const [data, setData] = useState();
  const [hodData, setHodData] = useState({
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
      const storedToken = await AsyncStorage.getItem('Hodtoken');
      if (storedToken !== null) {
        const res = await axios.post('http://192.168.200.150:5000/api/hod/fetchVoluntier', { storedToken });
        setData(res.data.user);
      } else {
        console.log('Token not found in AsyncStorage');
      }
    };

    fetchData();

    return () => {};
  }, []);

  const handleInputChange = (key, value) => {
    setHodData({
      ...hodData,
      [key]: value,
    });
  };

  const handleSaveHodData = () => {
    const hodEmail = data.email;
    axios.post(`http://192.168.200.150:5000/api/hod/savehoddata`, {
      email: hodEmail,
      hodData: hodData,
    })
      .then((response) => {
        Alert.alert('Success', 'HOD Details added successfully!', [
          {
            text: 'OK',
            onPress: async () => {
              try {
                navigation.navigate('HodHome');
              } catch (error) {
                console.error('Error storing HOD data:', error);
              }
            },
          },
        ]);
      })
      .catch((error) => {
        console.error('Error saving hod data:', error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.heading}>Hod Information</Text>
        <View style={styles.inputContainer}>
          <Icon name="id-card" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter PAN Number"
            value={hodData.panNumber}
            onChangeText={(text) => handleInputChange('panNumber', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="graduation-cap" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Qualification"
            value={hodData.qualification}
            onChangeText={(text) => handleInputChange('qualification', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="briefcase" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Experience"
            value={hodData.experience}
            onChangeText={(text) => handleInputChange('experience', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="calendar" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Date of Joining"
            value={hodData.dateOfJoining}
            onChangeText={(text) => handleInputChange('dateOfJoining', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="address-card" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Aadhar Number"
            value={hodData.aadharNumber}
            onChangeText={(text) => handleInputChange('aadharNumber', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="tint" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Blood Group"
            value={hodData.bloodGroup}
            onChangeText={(text) => handleInputChange('bloodGroup', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="home" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={hodData.address}
            onChangeText={(text) => handleInputChange('address', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="star" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Subject Expertise"
            value={hodData.subjectExpertise}
            onChangeText={(text) => handleInputChange('subjectExpertise', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="certificate" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Certificates"
            value={hodData.certificates}
            onChangeText={(text) => handleInputChange('certificates', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="money" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Basic Salary"
            value={hodData.basicSalary}
            onChangeText={(text) => handleInputChange('basicSalary', text)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSaveHodData}>
          <Text style={styles.buttonText}>Save Hod Data</Text>
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
