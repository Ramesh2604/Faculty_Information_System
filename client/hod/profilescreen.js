import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet ,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function ProfileScreen() {
  const [hodDetails, setHodDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    async function fetchHodDetails() {
      try {
        // Fetch token from AsyncStorage
        const token = await AsyncStorage.getItem('Hodtoken');
        
        // Make authenticated request to backend to fetch HOD details
        const response = await axios.post('http://192.168.200.150:5000/api/hod/verifyToken',{ token: token });
       
        setUserDetails(response.data);

        
      } catch (error) {
        console.error('Error fetching HOD details:', error);
      }
    }

    fetchHodDetails();
    return ()=>{

    };
  }, []);

  return (
    <View style={styles.container}>
      {userDetails ? (
        <View style={styles.detailsContainer}>
        <Image source={{ uri:"https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" }} style={styles.userLogo} />
          <Text style={styles.heading}>Name: {userDetails.name}</Text>
          <Text style={styles.detail}>Email: {userDetails.email}</Text>
          <Text style={styles.detail}>Department: {userDetails.department}</Text>
          <Text style={styles.detail}>Mobile Number: {userDetails.mobileNumber}</Text>
          <Text style={styles.detail}>Age: {userDetails.age}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userLogo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  detailsContainer: {
    alignItems: 'center',
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
});
