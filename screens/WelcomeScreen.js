import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import NavigationScreen from './NavigationScreen';

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require('../assets/images/DeMorgan/background.jpg')}
      style={styles.background}
    >
    <NavigationScreen navigation={navigation} />

      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={styles.gradient}
      >
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/DeMorgan/logo.jpg')} style={styles.logo} />
          <Text style={styles.title}>DeMorgan</Text>
        </View>
        
        <Text style={styles.subtitle}>Welcome to DeMorgan Restaurant's Exclusive Menu System</Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <LinearGradient
            colors={['#ff9966', '#ff5e62']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonBackground}
          >
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Register')}
        >
          <LinearGradient
            colors={['#ff9966', '#ff5e62']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonBackground}
          >
            <Text style={styles.buttonText}>Register</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 20,
    color: '#f5f5f5',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  button: {
    width: '80%',
    borderRadius: 30,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonBackground: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default WelcomeScreen;
