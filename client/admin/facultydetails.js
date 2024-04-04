import React, { useRef, useState, useEffect } from 'react';
import {
  Button,
  DrawerLayoutAndroid,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FacultyDetails = () =>{
    const [facultyHomeData, setFacultyHomeData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchFacultyHomeData();
      }, []);

      const fetchFacultyHomeData = async () => {
        try {
          const response = await fetch('http://192.168.200.150:5000/api/faculty/faculties/homedata/all');
          const data = await response.json();
          setFacultyHomeData(data);
        } catch (error) {
          console.error('Error fetching faculty home data:', error);
        }
      };

      const handleSearch = (query) => {
        setSearchQuery(query);
      };
    
      const filterData = (data) => {
        return data.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.homeData && item.homeData.dateOfJoining && item.homeData.dateOfJoining.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.homeData && item.homeData.experience && item.homeData.experience.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.homeData && item.homeData.bloodGroup && item.homeData.bloodGroup.toLowerCase().includes(searchQuery.toLowerCase()))
        
          
        );
      };

      

    return(
        
      <View style={styles.dataContainer}>
        <ScrollView>
        <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Faculty Home Data</Text>
            {filterData(facultyHomeData).map((faculty, index) => (
  <View key={index} style={styles.userDataContainer}>
    <Text style={styles.dataItem1}>{faculty.name}</Text>
    <Text style={styles.dataItem1}>Email : {faculty.email}</Text>
    {faculty.homeData && faculty.homeData.dateOfJoining && (
      <>
        <Text style={styles.dataItem}>Date of Joining: {faculty.homeData.dateOfJoining}</Text>
        <Text style={styles.dataItem}>Qualification : {faculty.homeData.qualification}</Text>
        <Text style={styles.dataItem}>Experience : {faculty.homeData.experience}</Text>
        <Text style={styles.dataItem}>Aadhar Number : {faculty.homeData.aadharNumber}</Text>
        <Text style={styles.dataItem}>Blood Group : {faculty.homeData.bloodGroup}</Text>
        <Text style={styles.dataItem}>Address : {faculty.homeData.address}</Text>
        <Text style={styles.dataItem}>Subject Expertise : {faculty.homeData.subjectExpertise}</Text>
        <Text style={styles.dataItem}>Certificates : {faculty.homeData.certificates}</Text>
        <Text style={styles.dataItem}>Basic Salary : {faculty.homeData.basicSalary}</Text>
      </>
    )}
  </View>
))}
</View>


        </ScrollView>
        </View>
      
    )

}

const styles = StyleSheet.create({
    container: {
      padding: 15,
      backgroundColor: "#1e90ff",
      flexDirection: 'row',
      alignItems: 'center',
    },
    navigationContainer: {
      flex: 1,
      backgroundColor: '#ecf0f1',
      paddingTop: 30,
    },
    icon: {
      width: 30,
      height: 30,
      tintColor: 'white',
    },
    icon1: {
      width: 30,
      height: 30,
      marginLeft: 'auto',
      tintColor: '#333',
    },
    head: {
      fontSize: 20,
      fontWeight: "900",
      textAlign: "center",
      color: "white",
      marginLeft: 10,
    },
    dataContainer: {
      flex: 1,
      padding: 20,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#1e90ff',
    },
    dataItem: {
      fontSize: 16,
      marginBottom: 5,
    },
    dataItem1: {
      fontSize: 18,
      marginBottom: 5,
      fontWeight: "800",
    },
    list: {
      fontSize: 20,
      marginBottom: 15,
      color: '#1e90ff',
    },
    menuItems: {
      marginLeft: 20,
    },
    userDataContainer: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    },
    searchBar: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      paddingLeft: 10,
      marginHorizontal: 25,
      marginBottom: 20,
      marginTop:20
    },
  });
  

export default FacultyDetails;

