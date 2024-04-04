import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FacultyNotification = () => {
  const [updates, setUpdates] = useState([]);
  const [facultyDepartment, setFacultyDepartment] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken !== null) {
          const response = await axios.post('http://192.168.200.150:5000/api/faculty/verifytokens', { token: storedToken });
          setFacultyDepartment(response.data.department);
        } else {
          console.log('Token not found in AsyncStorage');
        }
      } catch (error) {
        console.log('Error fetching token or user data: ', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 20000); // Fetch data every 20 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const url = 'http://192.168.200.150:5000/api/dailyupdate/getdailyupdates';
        const response = await axios.get(url);
        // Filter updates based on facultyDepartment
        const filteredUpdates = response.data.filter(update => update.department === facultyDepartment);
        setUpdates(filteredUpdates);
      } catch (error) {
        console.error('Error fetching daily updates:', error);
      }
    };

    fetchUpdates();

    const intervalId = setInterval(fetchUpdates, 60000); // Fetch data every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [facultyDepartment]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Daily Updates for {facultyDepartment}</Text>
      {updates.map((update) => (
        <View key={update._id} style={styles.updateContainer}>
          <Text style={styles.label}>Department:</Text>
          <Text style={styles.text}>{update.department}</Text>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.text}>{update.date}</Text>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.text}>{update.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  updateContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
});

export default FacultyNotification;
