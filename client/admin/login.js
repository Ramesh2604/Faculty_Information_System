import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,

} from 'react-native';

export default function Adminlogin({ navigation }) {
  const [password, setPassword] = useState('123'); // Set default password
  const [email, setEmail] = useState('admin@example.com'); // Set default email
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email === 'defaultEmail@example.com' && password === 'defaultPassword') {
      setError('Please enter a valid email and password');
    } else {
      navigation.navigate('Adminhome');
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
            <Text style={styles.head}>Admin Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError('');
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError('');
              }}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Text style={styles.loginButton} onPress={handleLogin}>
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
    marginHorizontal: 70,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 18,
    marginHorizontal: 30,
    borderWidth: 2,
    borderColor: '#3498db', // Choose a color that complements your design
    backgroundColor: '#ecf0f1',
    color: '#2c3e50', // Adjust font color
    marginBottom: 20,
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
  loginButton: {
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
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
