import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const ViewDailyUpdates = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const url = 'http://192.168.200.150:5000/api/dailyupdate/getdailyupdates';

    axios.get(url)
      .then((response) => {
        setUpdates(response.data);
      })
      .catch((error) => {
        console.error('Error fetching daily updates:', error);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Daily Updates</Text>
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
    fontWeight: '500',
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
    marginLeft:20
  },
});

export default ViewDailyUpdates;
