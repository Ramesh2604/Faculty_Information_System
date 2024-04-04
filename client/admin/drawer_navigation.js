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
import { MaterialIcons } from '@expo/vector-icons'; // Import Material Icons

const Drawer = () => {
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState('left');
  const navigation = useNavigation();

  const navigationView = () => (
    <View style={styles.navigationContainer}>
      <TouchableOpacity onPress={() => drawer.current.closeDrawer()}>
        <Image
          source={require("./images/ximg.png")}
          style={styles.icon1}
          resizeMode="contain"
        />
      </TouchableOpacity>
      
      <ScrollView style={styles.menuItems}>
        <Image
          source={require("./images/adminicon.png")}
          style={styles.adminicon}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Hod')}>
          <MaterialIcons name="account-circle" size={24} color="#1e90ff" style={styles.menuIcon} />
          <Text style={styles.list}>Hod</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Faculty')}>
          <MaterialIcons name="school" size={24} color="#1e90ff" style={styles.menuIcon} />
          <Text style={styles.list}>Faculty</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('HodDetails')}>
          <MaterialIcons name="person" size={24} color="#1e90ff" style={styles.menuIcon} />
          <Text style={styles.list}>Hod Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('FacultyDetails')}>
          <MaterialIcons name="people" size={24} color="#1e90ff" style={styles.menuIcon} />
          <Text style={styles.list}>Faculty Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('FirstScreen')}>
          <MaterialIcons name="logout" size={24} color="#1e90ff" style={styles.menuIcon} />
          <Text style={styles.list}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
          <Image
            source={require("./images/menuicon.png")}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.head}>Admin Dashboard</Text>
      </View>    
      <View style={styles.dataContainer}>
        <ScrollView>
          <Image
            source={require("./images/faculty.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddDailyUpdate')}
          >
            <Text style={styles.buttonText}>Add Daily Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ViewDailyUpdates')}
          >
            <Text style={styles.buttonText}>View Daily Updates</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </DrawerLayoutAndroid>
  );
};

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
    width: 40,
    height: 35,
    tintColor: 'white',
  },
  icon1: {
    width: 30,
    height: 30,
    marginLeft: 'auto',
    tintColor: '#333',
  },
  head: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginLeft: 50,
  },
  dataContainer: {
    flex: 1,
    padding: 20,
  },
  menuItems: {
    marginLeft: 30,
    marginTop:2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  adminicon:{
    width:"100%",
    height:130,
    marginLeft:-20,
    marginTop:-20,
    marginBottom:10
  },
  menuIcon: {
    marginRight: 10,
    
  },
  
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
    width:"80%",
    marginTop:20,
    marginLeft:35,
    textAlign:"center"
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  image:{
    width:"100%",
    marginBottom: 20,
  }
});

export default Drawer;
