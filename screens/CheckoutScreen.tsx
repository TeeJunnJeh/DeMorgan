import React, { useState, useEffect } from 'react';
import { Text, View, Image, Alert, FlatList, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
let config = require('../Config');
import { imageMapping } from '../imagePath.js';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles'; // Import external styles

interface CartItem {
  foodId: string;
  foodName: string;
  foodPrice: number;
  quantity: number;
  foodImage: string;
}

interface ListItem {
  type: 'header' | 'total' | 'cart' | 'input';
  value?: string; // Optional, depending on the type
}

const data: ListItem[] = [
  { type: 'header', value: 'Checkout' },
  { type: 'total' },
  { type: 'cart' },
  { type: 'input' }
];

const calculateTotal = (items: CartItem[]) => {
  return items.reduce((total, item) => {
    const price = item.foodPrice;
    const quantity = Number(item.quantity);

    if (!isNaN(price) && !isNaN(quantity)) {
      return total + (price * quantity);
    } else {
      console.error(`Invalid values - Price: ${price}, Quantity: ${quantity}`);
      return total;
    }
  }, 0);
};

const paymentMethods = [
  { label: 'Touch and Go', value: 'Touch and Go', logo: require('../assets/images/payment/TouchnGo.png') },
  { label: 'GrabPay', value: 'GrabPay', logo: require('../assets/images/payment/GrabPay.png') },
  { label: 'ShopeePay', value: 'ShopeePay', logo: require('../assets/images/payment/ShopeePay.png') },
  { label: 'Cash', value: 'Cash', logo: require('../assets/images/payment/Cash.png') },
];

function CheckoutPage({ route }) {
  const { username } = route?.params || {};
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [name, setName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    
      fetch(`${config.settings.serverPath}/get-cart-items/${username}`)
        .then(response => {
          console.log('Response status:', response.status);
          if (!response.ok) {
            Alert.alert('Error:', response.status.toString());
            throw Error('Error ' + response.status);
          }
          return response.json();
        })
        .then(data => {
          console.log('Received data:', data);
          const formattedData = data.map((item: any) => ({
            ...item,
            foodPrice: parseFloat(item.foodPrice.replace(/[^0-9.]/g, '')), // Convert to number
          }));
          setCartItems(formattedData);
        })
        .catch(error => {
          console.error('Error fetching cart items:', error);
        });
    }, []);

  const totalAmount = calculateTotal(cartItems);

  const onAppreciation = () => {
    navigation.navigate('Menu');
  };


  const clearCart = () => {
    fetch(`${config.settings.serverPath}/clear-cart?username=${username}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error:', response.status.toString());
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(() => {
        Alert.alert('Success', 'Your order has been submitted');
        setCartItems([]);
      })
      .catch(error => {
        console.error('Error clearing cart:', error);
      });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Error', 'Your cart is empty.');
      return;
    }

    if (!name) {
      Alert.alert('Error', 'Please enter your name.');
      return;
    }

    if (!paymentMethod) {
      Alert.alert('Error', 'Please select a payment method.');
      return;
    }

    Alert.alert(
      'Confirm Checkout',
      `Do you confirm with ${paymentMethod}? Are you sure you want to checkout all the items using this payment method?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm', onPress: () => {
            console.log('Name:', name);
            console.log('Payment Method:', paymentMethod);
            console.log('Total Amount:', totalAmount);
            clearCart(); // Clear cart
            navigation.navigate('AppreciationScreen', {username}); // Navigate to AppreciationScreen
          }
        }
      ]
    );
  };
  

  const renderItemCard = ({ item }: { item: CartItem }) => (
    <View key={item.foodId} style={styles.itemCard}>
      <Image source={imageMapping[item.foodImage as keyof typeof imageMapping]} style={styles.foodImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.foodName}>{item.foodName}</Text>
        <Text style={styles.foodPrice}>RM {item.foodPrice.toFixed(2)} x {item.quantity}</Text>
      </View>
    </View>
  );

  const renderPaymentMethodItem = ({ item }: { item: typeof paymentMethods[0] }) => (
    <TouchableOpacity
      style={[styles.paymentOption, paymentMethod === item.value && styles.selectedPaymentOption]}
      onPress={() => setPaymentMethod(item.value)}
    >
      <Image source={item.logo} style={styles.paymentLogo} />
      <Text style={styles.paymentMethodText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: ListItem }) => {
    switch (item.type) {
      case 'header':
        return <Text style={styles.header}>{item.value}</Text>;
      case 'total':
        return <Text style={styles.totalAmount}>Total Amount: RM {totalAmount.toFixed(2)}</Text>;
      case 'cart':
        return cartItems.length > 0 ? (
          <FlatList
            data={cartItems}
            renderItem={renderItemCard}
            keyExtractor={(item) => item.foodId}
          />
        ) : (
          <Text style={styles.emptyCartText}>No items in the cart</Text>
        );
      case 'input':
        return (
          <View style={styles.inputSection}>
            <Text style={styles.confirmationText}>Are you sure to place the order?</Text>
            <Text style={styles.confirmationText}>Please enter your name below for food collection.</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={text => setName(text)}
            />
            <Text style={styles.paymentMethodLabel}>Select Payment Method:</Text>
            <FlatList
              data={paymentMethods}
              renderItem={renderPaymentMethodItem}
              keyExtractor={(item) => item.value}
              extraData={paymentMethod}
            />
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Confirm Checkout</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/payment/checkoutBackground.jpeg')}
      style={styles.backgroundImage}
    >
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.container}
      />
    </ImageBackground>
  );
}

export default CheckoutPage;

