import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';

export default function FirstScreen({ navigation }) {
  const handleadmin = () => {
    navigation.navigate('Adminlogin');
  };
  const handlehod = () => {
    navigation.navigate('HodLogin');
  };
  const handlefaculty = () => {
    navigation.navigate('FacultyLogin');
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri:
            'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
        style={styles.imageBackground}>
        <View style={styles.overlay}>
          
          <TouchableOpacity style={styles.buttonAdmin}>
            <Text style={styles.buttonText} onPress={handleadmin} >Admin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonHod}>
            <Text style={styles.buttonText} onPress={handlehod} >Hod</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonFaculty}>
            <Text style={styles.buttonText} onPress={handlefaculty} >Faculty</Text>
          </TouchableOpacity>
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
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '105%',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonText: {
    fontSize: 17,
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  buttonAdmin: {
    ...buttonStyles('#3498db', '#2980b9'),
  },
  buttonHod: {
    ...buttonStyles('#e74c3c', '#c0392b'),
  },
  buttonFaculty: {
    ...buttonStyles('#2ecc71', '#27ae60'),
  },
});

function buttonStyles(backgroundColor, borderColor) {
  return {
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    fontSize: 17,
    marginHorizontal: 50,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: borderColor,
    backgroundColor: backgroundColor,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  };
}
