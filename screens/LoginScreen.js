import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import CryptoJS from 'crypto-js';

// Function to hash the password using SHA-256
const hashPassword = (password) => CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Validate Login
    const handleLogin = async () => {
        if (username.trim() === '' || password.trim() === '') {
            setError('Please fill in both fields.');
            return;
        }

        const hashedPassword = hashPassword(password);
        setLoading(true);

        try {
            const response = await fetch('http://10.0.2.2:5001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password: hashedPassword,
                }),
            });

            const result = await response.json();
            setLoading(false);

            if (response.ok) {
                setError('');
                console.log("Login success");
                navigation.navigate('Navigation', { username });
            } else {
                setError(result.message || 'Invalid username or password.');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <ImageBackground source={require('../assets/images/DeMorgan/background.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to DeMorgan</Text>
                <Text style={styles.subtitle}>Login to continue</Text>

                <Text style={styles.label}>Username:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Password:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                    autoCapitalize="none"
                />

                {error ? <Text style={styles.error}>{error}</Text> : null}
                {loading ? <ActivityIndicator size="large" color="#d9534f" /> : null}

                <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerText}>
                        Don't have an account? <Text style={styles.registerLink}>Register here</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

// Styles
const styles = StyleSheet.create({
    background: {
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
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    error: {
        color: '#d9534f',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#d9534f',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerText: {
        color: '#333',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
    },
    registerLink: {
        color: '#0000ff',
        fontWeight: 'bold',
    },
});

export default LoginScreen;
