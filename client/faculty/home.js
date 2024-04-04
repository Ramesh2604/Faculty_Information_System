import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function FacultyHomeScreen() {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState(null);

  const handledetails = () => {
    navigation.navigate("AddFacultyDetails");
  };

  useEffect(() => {
    const fetchTokenAndUserData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken !== null) {
          const response = await axios.post('http://192.168.200.150:5000/api/faculty/verifyToken', { token: storedToken });
          setUserDetails(response.data);
        } else {
          console.log('Token not found in AsyncStorage');
        }
      } catch (error) {
        console.log('Error fetching token or user data: ', error);
      }
    };

    fetchTokenAndUserData();

    const intervalId = setInterval(fetchTokenAndUserData, 2000); // Fetch data every minute (adjust as needed)

    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.heading}>Faculty Details</Text>
        <TouchableOpacity style={styles.button} onPress={handledetails}>
          <Text style={styles.buttonText}>Add My Details</Text>
        </TouchableOpacity>
        {userDetails && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsHeading}>MY DETAILS</Text>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Pan Number:</Text>
              <Text style={styles.detailText}>{userDetails.homeData ? userDetails.homeData.panNumber : 'N/A'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Qualification:</Text>
              <Text style={styles.detailText}>{userDetails.homeData ? userDetails.homeData.qualification : 'N/A'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Experience:</Text>
              <Text style={styles.detailText}>{userDetails.homeData ? userDetails.homeData.experience : 'N/A'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>DateOfJoining:</Text>
              <Text style={styles.detailText}>{userDetails.homeData ? userDetails.homeData.dateOfJoining : 'N/A'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>AadharNumber:</Text>
              <Text style={styles.detailText}>{userDetails.homeData ? userDetails.homeData.aadharNumber : 'N/A'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Address: </Text>
              <Text style={styles.detailText}>{userDetails.homeData ? userDetails.homeData.address: 'N/A'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>SubjectExpertise:</Text>
              <Text style={styles.detailText}>{userDetails.homeData ? userDetails.homeData.subjectExpertise: 'N/A'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Certificates:</Text>
              <Text style={styles.detailText}>{userDetails.homeData ? userDetails.homeData.certificates : 'N/A'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>BasicSalary: </Text>
              <Text style={styles.detailText}>{userDetails.homeData ? userDetails.homeData.basicSalary : 'N/A'}</Text>
            </View>
            {/* Add more details as needed */}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
  },
  detailsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 10,
    marginRight:30
  },
  detailLabel: {
    flex: 3,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginRight:10
  },
  detailText: {
    flex: 2,
    fontSize: 16,
    color: '#333',
    marginLeft:10
  },
});
