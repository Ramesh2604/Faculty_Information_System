import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert ,ImageBackground,Text,StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FacultyLogin({ navigation }) {
  // State variables for login data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle login
  const handleLogin = async () => {
    try {
      // Send login request to the backend with email and password
      const response = await fetch('http://192.168.200.150:5000/api/faculty/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if login was successful
      if (response.ok) {
        const data = await response.json();
        
        AsyncStorage.setItem("token" ,data.token);
        // Check if user exists and has the role 'hod'
        if (data.user && data.user.role === "faculty") {
         
          Alert.alert('Success', 'Login successful', [
            { text: 'OK', onPress: () => navigation.navigate('FacultyHome') },
          ]);
        } else {
          // Display error message for invalid credentials
          Alert.alert('Error', 'Invalid email or password');
        }
      } else {
        // Handle non-OK response status (e.g., 401 Unauthorized)
        Alert.alert('Error', 'Failed to log in. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Display error message for network or other errors
      Alert.alert('Error', 'Failed to log in. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri:
            'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
        style={styles.imageBackground}
      >
        <View style={styles.overlay}>
          <View style={styles.link}>
          <Text style={styles.head}>Faculty Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={styles.button} onPress={handleLogin}>
              Log in
            </Text>
            <StatusBar style="auto" />
      </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7fffd4',
        alignItems: 'center',
        justifyContent: 'center',
      },
      head: {
        fontSize: 40,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 80,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        marginHorizontal:70
      },
      input: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        textAlign: 'center',
        borderRadius: 10,
        fontSize: 18,
        marginHorizontal: 20,
        borderWidth: 2,
        borderColor: '#3498db', // Choose a color that complements your design
        backgroundColor: '#ecf0f1',
        color: '#2c3e50', // Adjust font color
        marginBottom:20
      },
      imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '105%',
        alignItems: 'center',
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjust the last value for opacity
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        paddingVertical: 12,
        paddingHorizontal: 130,
        borderRadius: 10,
        fontSize: 18,
        marginHorizontal: 40,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: '#3498db',
        backgroundColor: '#3498db', // Adjust the color
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5, // Android shadow
      },
      link: {
        marginBottom: 100,
        marginTop: 150,
      },
    
});
