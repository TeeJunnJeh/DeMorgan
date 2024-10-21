import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
let config = require('../Config');
import { imageMapping } from '../imagePath.js';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

interface CartItem {
  foodId: string;
  foodName: string;
  foodPrice: number;
  quantity: number;
  foodImage: string;
}

function CartPage({ route }): JSX.Element {
  const { username } = route?.params || {};
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
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
    }
  }, [isFocused]);

  const updateQuantity = (itemId: string, change: number) => {
    let url: string | undefined;

    if (change > 0) {
      url = `${config.settings.serverPath}/update-cart-item/increase/${itemId}/${username}`;
    } else if (change < 0) {
      url = `${config.settings.serverPath}/update-cart-item/decrease/${itemId}/${username}`;
    } else {
      console.error('Invalid change value. It should be either positive or negative.');
      return;
    }

    if (!url) {
      console.error('URL is undefined.');
      return;
    }

    fetch(url, {
      method: 'PUT',
    })
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error:', response.status.toString());
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(updatedItem => {
        if (updatedItem.quantity !== undefined) {
          setCartItems(prevItems => {
            const updatedItems = prevItems.map(item => {
              if (item.foodId === itemId) {
                return { ...item, quantity: updatedItem.quantity };
              }
              return item;
            });
            return updatedItems;
          });
        } else {
          console.error('Server did not return updated quantity:', updatedItem);
        }
      })
      .catch(error => {
        console.error('Error updating cart item quantity:', error);
      });
  };

  const increaseQuantity = (itemId: string) => {
    updateQuantity(itemId, 1);
  };

  const decreaseQuantity = (itemId: string) => {
    const item = cartItems.find(item => item.foodId === itemId);
    if (item && item.quantity > 1) {
      updateQuantity(itemId, -1);
    } else {
      Alert.alert('Cannot decrease quantity below 1.');
    }
  };

   // Function to remove a cart item
   const removeItem = (foodId: string) => {
    fetch(`${config.settings.serverPath}/delete-cart-item/${foodId}/${username}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error:', response.status.toString());
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(() => {
        // Remove the item from state
        setCartItems(prevItems => prevItems.filter(item => item.foodId !== foodId));
      })
      .catch(error => {
        console.error('Error deleting cart item:', error);
      });
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
        Alert.alert('Success', 'Cart has been cleared');
        setCartItems([]);
      })
      .catch(error => {
        console.error('Error clearing cart:', error);
      });
  };


  

  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((total, item) => {
      const price = item.foodPrice;
      const quantity = Number(item.quantity);

      if (!isNaN(price) && !isNaN(quantity)) {
        return total + price * quantity;
      } else {
        console.error(`Invalid values - Price: ${price}, Quantity: ${quantity}`);
        return total;
      }
    }, 0);
  };

  const onCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Error', 'Your cart is empty! Please add items to your cart before checking out.');
    } else {
      navigation.navigate('CheckoutScreen', { username, clearCart }); // Pass clearCart function
    }
  };

  const renderItem = ({ item }: { item: CartItem }) => {
    const imageSource = imageMapping[item.foodImage as keyof typeof imageMapping];

    return (
      <View style={styles.itemWrapper}>
        <View style={styles.itemImageContainer}>
          <Image source={imageSource} style={styles.itemImage} />
        </View>
        <View style={styles.itemDetailsContainer}>
          <Text style={styles.itemName}>{item.foodName}</Text>
          <View style={styles.quantityControlsContainer}>
            <TouchableOpacity onPress={() => decreaseQuantity(item.foodId)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => increaseQuantity(item.foodId)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.itemPrice}>Price: RM {item.foodPrice.toFixed(2)}</Text>
          <TouchableOpacity onPress={() => removeItem(item.foodId)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground source={require('../assets/images/cart/cartBackground.jpeg')} style={styles.background}>
      <View style={styles.overlay} />
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.foodId}
        ListHeaderComponent={<Text style={styles.title}>Cart Page</Text>}
        ListFooterComponent={
          <View>
            <View style={styles.totalSection}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>RM {calculateTotal(cartItems).toFixed(2)}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.clearCartButton} onPress={clearCart}>
                <Text style={styles.buttonText}>Clear Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
                <Text style={styles.buttonText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slightly darker overlay for better contrast
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 15,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // More opaque background
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  itemImageContainer: {
    padding: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  itemDetailsContainer: {
    flex: 1,
    padding: 10,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  quantityControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 50,
    marginHorizontal: 5,
    elevation: 2,
  },
  quantityButtonText: {
    fontSize: 22,
    color: '#333',
  },
  quantityText: {
    fontSize: 22,
    color: '#333',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00008B',
  },
  removeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ff6f61',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  removeButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  totalLabel: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  totalAmount: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  clearCartButton: {
    backgroundColor: '#ff6f61',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3,
  },
  checkoutButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export default CartPage;


