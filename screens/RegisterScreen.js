import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, ImageBackground, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CryptoJS from 'crypto-js';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneNumError, setPhoneNumError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios');
    setDateOfBirth(currentDate);
  };

  const validateInputs = () => {
    let isValid = true;

    // Reset error messages
    setUsernameError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setPhoneNumError('');
    setEmailError('');
    setDateOfBirthError('');

    // Validate username
    if (username.trim() === '') {
      setUsernameError('Username is required');
      isValid = false;
    }

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character');
      isValid = false;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    // Validate phone number
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phoneNum)) {
      setPhoneNumError('Please enter a valid 10-digit phone number');
      isValid = false;
    }

    // Validate date of birth
    const dobString = dateOfBirth.toISOString().split('T')[0];
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dobRegex.test(dobString)) {
      setDateOfBirthError('Date of birth must be in YYYY-MM-DD format');
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = async () => {
    if (!validateInputs()) {
      return;
    }

    // Hash the password using SHA-256 before sending to server
    const hashedPassword = CryptoJS.SHA256(password).toString();

    try {
      // Send the registration data to the backend server (Flask API)
      const response = await fetch('http://10.0.2.2:5001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password: hashedPassword,
          phoneNum,
          emailAddress,
          dateOfBirth: dateOfBirth.toISOString().split('T')[0],
        }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'User Registered Successfully', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      } else {
        Alert.alert('Registration Failed', result.message);
      }
    } catch (error) {
      console.log('Error during registration: ', error);
      Alert.alert('Registration Failed', 'An error occurred during registration');
    }
  };

  return (
    <ImageBackground source={require('../assets/images/DeMorgan/background.jpg')} style={styles.outerContainer} blurRadius={1}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Welcome to DeMorgan</Text>
        <Text style={styles.subtitle}>Register to continue</Text>

        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
        />
        {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry
        />
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          value={phoneNum}
          onChangeText={setPhoneNum}
          placeholder="Enter your phone number"
          keyboardType="numeric"
        />
        {phoneNumError ? <Text style={styles.errorText}>{phoneNumError}</Text> : null}

        <Text style={styles.label}>Email Address:</Text>
        <TextInput
          style={styles.input}
          value={emailAddress}
          onChangeText={setEmailAddress}
          placeholder="Enter your email address"
          keyboardType="email-address"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <Text style={styles.label}>Date of Birth:</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={styles.input}
            value={dateOfBirth.toISOString().split('T')[0]}
            editable={false}
            placeholder="Select your date of birth"
          />
        </TouchableOpacity>
        {dateOfBirthError ? <Text style={styles.errorText}>{dateOfBirthError}</Text> : null}

        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Login here</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#f8f4f4',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    width: '90%',
    minHeight: 600,
    minWidth: 350,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d9534f',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#5a5a5a',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#d9534f',
    borderRadius: 8,
    paddingVertical: 15,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#5a5a5a',
    textAlign: 'center',
  },
  loginLink: {
    color: '#d9534f',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
