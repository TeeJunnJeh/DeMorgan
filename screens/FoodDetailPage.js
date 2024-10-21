import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import foodData from '../assets/foodData.json'; 
import { imageMapping } from '../imagePath.js';
let config = require('../Config');

const FoodDetailPage = ({ route }) => {
  const { username } = route?.params || {}; // 获取 username
  const { foodId } = route.params;

  // 查找食物项
  const findFoodItem = (id) => {
    for (const category in foodData) {
      const item = foodData[category].find((food) => food.id === id);
      if (item) return item;
    }
    return null;
  };

  const foodItem = findFoodItem(foodId);

  if (!foodItem) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Food item not found</Text>
      </View>
    );
  }

  const imageSource = imageMapping[foodItem.image];

  const handleAddToCart = async () => {
    try {
      const food_quantity = 1; // keep the key consistent with Flask
  
      const response = await fetch(config.settings.serverPath + '/add-to-cart', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username, // 使用 username
          food_id: foodItem.id,
          food_name: foodItem.name,
          food_price: foodItem.price,
          food_image: foodItem.image, // 发送图片URL而不是本地路径
          food_quantity: food_quantity, // consistent key naming
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', result.message);
      } else {
        Alert.alert('Error', result.error || 'An error occurred');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add item to cart');
      console.error('Add to cart error:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={imageSource}
          style={styles.image}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{foodItem.name}</Text>
        <Text style={styles.subtitle}>{foodItem.subtitle}</Text>
        <Text style={styles.rating}>{foodItem.rating}</Text>
        <Text style={styles.description}>{foodItem.description}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{foodItem.price}</Text>
        </View>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>

        <View style={styles.reviewContainer}>
          {foodItem.reviews.map((review, index) => (
            <View key={index} style={styles.review}>
              <Text style={styles.reviewName}>{review.name}</Text>
              <Text style={styles.reviewText}>{review.text}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  imageContainer: {
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
    marginTop: 5,
  },
  rating: {
    fontSize: 18,
    color: '#FFD700',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginVertical: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  priceText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#6b52ae',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#6b52ae',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  reviewContainer: {
    marginTop: 20,
  },
  review: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FoodDetailPage;
