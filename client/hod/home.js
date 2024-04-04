import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet ,TouchableOpacity,ScrollView} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
export default function HomeScreen() {
  const [facultyList, setFacultyList] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [userDepartment,setUserDepartment] = useState(null)
  const navigation = useNavigation();
  // Function to fetch home data for all faculty members
  // Function to fetch home data for faculty members in the same department as the HOD
  useEffect(() => {
const fetchFacultyHomeData = async () => {
try {
  const response = await axios.get('http://192.168.200.150:5000/api/faculty/homedata/all');
  setFacultyList(response.data);
} catch (error) {
  console.error('Error fetching faculty home data:', error);
}
}
fetchFacultyHomeData();

    const intervalId2 = setInterval(fetchFacultyHomeData, 2000); // Fetch data every minute (adjust as needed)

    return () => {
      clearInterval(intervalId2); // Cleanup interval on component unmount
    };
  }, []);


  const handledetails = () => {
    navigation.navigate("AddDetails");
  };


  useEffect(() => {
    const fetchTokenAndUserData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('Hodtoken');
        if (storedToken !== null) {
          const response = await axios.post('http://192.168.200.150:5000/api/hod/verifyToken', { token: storedToken });
          setUserDetails(response.data);
          setUserDepartment(response.data.department);
          
          
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
      <Text style={styles.heading}>hod Home</Text>
      <TouchableOpacity style={styles.button} onPress={handledetails}>
        <Text style={styles.buttonText}>Add my Details</Text>
      </TouchableOpacity>
      <Text style={styles.heading1}>My Details</Text>
      {userDetails && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsHeading}>MY DETAILS</Text>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Pan Number:</Text>
              <Text style={styles.detailText}>{userDetails.hodData ? userDetails.hodData.panNumber : 'N/A'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Qualification:</Text>
              <Text style={styles.detailText}>{userDetails.hodData ? userDetails.hodData.qualification : 'N/A'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Experience:</Text>
              <Text style={styles.detailText}>{userDetails.hodData ? userDetails.hodData.experience : 'N/A'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>DateOfJoining:</Text>
              <Text style={styles.detailText}>{userDetails.hodData ? userDetails.hodData.dateOfJoining : 'N/A'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>AadharNumber:</Text>
              <Text style={styles.detailText}>{userDetails.hodData ? userDetails.hodData.aadharNumber : 'N/A'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Address: </Text>
              <Text style={styles.detailText}>{userDetails.hodData ? userDetails.hodData.address: 'N/A'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>SubjectExpertise:</Text>
              <Text style={styles.detailText}>{userDetails.hodData ? userDetails.hodData.subjectExpertise: 'N/A'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Certificates:</Text>
              <Text style={styles.detailText}>{userDetails.hodData ? userDetails.hodData.certificates : 'N/A'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>BasicSalary: </Text>
              <Text style={styles.detailText}>{userDetails.hodData ? userDetails.hodData.basicSalary : 'N/A'}</Text>
            </View>
            {/* Add more details as needed */}
          </View>
        )}
      <Text style={styles.heading1}>Faculty Details</Text>
      {facultyList.map(faculty => {
          if (userDepartment === faculty.department) {
            return (
              <View key={faculty._id} style={styles.facultyContainer}>
                {/* Render faculty details */}
                <Text style={styles.facultyName}>{faculty.name}</Text>
                <Text style={styles.facultyName}>Email: {faculty.email}</Text>
                <View style={styles.homeDataContainer}>
                {faculty.homeData && (  // Check if homeData exists
      <>
        <Text style={styles.label}>PAN Number : {faculty.homeData.panNumber}</Text>
        <Text style={styles.label}>Qualification : {faculty.homeData.qualification}</Text>
        <Text style={styles.label}>Experience : {faculty.homeData.experience}</Text>
        <Text style={styles.label}>Date of Joining : {faculty.homeData.dateOfJoining}</Text>
        <Text style={styles.label}>Aadhar Number : {faculty.homeData.aadharNumber}</Text>
        <Text style={styles.label}>Blood Group : {faculty.homeData.bloodGroup}</Text>
        <Text style={styles.label}>Address : {faculty.homeData.address}</Text>
        <Text style={styles.label}>Subject Expertise : {faculty.homeData.subjectExpertise}</Text>
        <Text style={styles.label}>Certificates : {faculty.homeData.certificates}</Text>
        <Text style={styles.label}>Basic Salary : {faculty.homeData.basicSalary}</Text>
      </>
    )}
                </View>
              </View>
            );
          }
          return null;
        })}
</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
      backgroundColor: '#f0f0f0', // Background color for the ScrollView
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20, // Add padding for better spacing
    },
    heading: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    heading1: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333',
      marginTop:20
    },
    facultyContainer: {
      marginBottom: 30,
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
      padding: 20,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      width:"100%",
      textAlign:"center",
      
    },
    facultyName: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#007bff',
    },
    homeDataContainer: {
      marginBottom: 10,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      color: '#555',
    },
    button: {
      backgroundColor: '#007bff',
      padding: 12,
      borderRadius: 8,
      marginTop: 20,
      width: '80%',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
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
    // Additional Styles
    divider: {
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      marginVertical: 10,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
      color: '#007bff',
    },
    sectionSubtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#555',
    },
    sectionText: {
      fontSize: 16,
      marginBottom: 10,
      color: '#333',
    },
    errorText: {
      fontSize: 16,
      color: 'red',
      marginTop: 10,
    },
    successText: {
      fontSize: 16,
      color: 'green',
      marginTop: 10,
    },
  });
    