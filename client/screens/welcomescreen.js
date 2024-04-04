import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
export default function WelcomeScreen({ navigation }) {

  const handle = () => {
    navigation.navigate('FirstScreen');
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
          <Text style={styles.head}>Faculty Information</Text>
          <Text style={styles.head1}>System</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={handle} >Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
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
  head: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  head1: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  buttonText: {
    fontSize: 17,
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  button: {
    ...buttonStyles('#3498db', '#2980b9'),
    marginTop: 20
  },
})
function buttonStyles(backgroundColor, borderColor) {
  return {
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
    fontSize: 17,
    marginHorizontal: 50,
    marginVertical: 10,
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