import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { quotesMapping } from '../QuotesPath.js'; // Import the quotes paths
import { useNavigation } from '@react-navigation/native';
import styles from './Styles';  // Import styles from external stylesheet

function AppreciationScreen(route) {
  const { username } = route?.params || {};
  const [randomImage, setRandomImage] = useState<any>(null);
  const [countdown, setCountdown] = useState<number>(15);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Get an array of image keys from the quotesMapping object
    const imageKeys = Object.keys(quotesMapping);

    // Select a random key
    const randomKey = imageKeys[Math.floor(Math.random() * imageKeys.length)];

    // Set the random image path
    setRandomImage(quotesMapping[randomKey as keyof typeof quotesMapping]);

    // Generate a random order number between 100 and 199
    const randomOrderNumber = Math.floor(Math.random() * 100) + 100;
    setOrderNumber(randomOrderNumber);

    // Countdown logic
    const timer = setInterval(() => {
      setCountdown(prevCountdown => (prevCountdown > 0 ? prevCountdown - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);  // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigation.navigate('Login');  
    }
  }, [countdown, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.thankYouText}>Thank You!</Text>
      {orderNumber && (
        <Text style={styles.orderNumberText}>Your order number is {orderNumber}</Text>
      )}
      <Text style={styles.quotesLabel}>The quotes of the day:</Text>
      {randomImage ? (
        <Image source={randomImage} style={styles.image} />
      ) : (
        <Text>Loading...</Text>
      )}
      <Text style={styles.countdownText}>Returning to login page in {countdown} seconds</Text>
    </View>
  );
}

export default AppreciationScreen;
