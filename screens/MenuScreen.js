import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useWebSocket } from '../android/app/src/main/assets/websocketClient'; 

const FoodPage = ({ route }) => {
  const { username } = route?.params || {};
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [promotionMessage, setPromotionMessage] = useState(''); 
  const navigation = useNavigation();

  useWebSocket(setPromotionMessage); 

  const foodItems = [
    { id: '1', name: 'Chicken and Scallop Risotto', category: 'Main Dish', image: require('../assets/images/main_dish/ChickenAndScallopRisotto.jpeg'), price: 'RM 119' },
    { id: '2', name: 'Crispy Soft Shell Crab', category: 'Main Dish', image: require('../assets/images/main_dish/CrispySoftShellCrab.jpg'), price: 'RM 139' },
    { id: '3', name: 'Leg of Lamb', category: 'Main Dish', image: require('../assets/images/main_dish/LegOfLamb.jpeg'), price: 'RM 159' },
    { id: '4', name: 'Lobster and Saffron Risotto', category: 'Main Dish', image: require('../assets/images/main_dish/LobsterSaffronRisotto.jpeg'), price: 'RM 179' },
    { id: '5', name: 'Truffle-Infused Wagyu Steak', category: 'Main Dish', image: require('../assets/images/main_dish/TruffleWagyuSteak.jpeg'), price: 'RM 299' },
    { id: '6', name: 'Aglio Olio', category: 'Spaghetti', image: require('../assets/images/spaghetti/AglioOlio.jpg'), price: 'RM 69' },
    { id: '7', name: 'Frutti di Mare', category: 'Spaghetti', image: require('../assets/images/spaghetti/FruttiDiMare.jpg'), price: 'RM 89' },
    { id: '8', name: 'Pomodorini e Burrata', category: 'Spaghetti', image: require('../assets/images/spaghetti/PomodoriniBurrata.jpg'), price: 'RM 79' },
    { id: '9', name: 'Avocado Dream Cake Delight', category: 'Desserts', image: require('../assets/images/dessert/AvocadoDreamCake.jpg'), price: 'RM 69' },
    { id: '10', name: 'Dark Chocolate Cake', category: 'Desserts', image: require('../assets/images/dessert/DarkChocolateHazelnut.jpg'), price: 'RM 89' },
    { id: '11', name: 'Decadent Caramelized Vanilla Bean Pudding', category: 'Desserts', image: require('../assets/images/dessert/CaramelizedVanillaPudding.jpg'), price: 'RM 99' },
    { id: '12', name: 'Honey Glazed Prawn', category: 'Desserts', image: require('../assets/images/dessert/HoneyGlazedPrawn.jpeg'), price: 'RM 99' },
    { id: '13', name: 'Golden Longan Cheesecake Symphony', category: 'Desserts', image: require('../assets/images/dessert/GoldenLonganCheesecake.jpeg'), price: 'RM 89' },
    { id: '14', name: 'Denver', category: 'Beverages', image: require('../assets/images/beverage/Denver.jpg'), price: 'RM15.00' },
    { id: '15', name: 'Citron Fizz', category: 'Beverages', image: require('../assets/images/beverage/CitronFizz.jpg'), price: 'RM15.00' },
    { id: '16', name: 'Luxury Lavender Lemonade', category: 'Beverages', image: require('../assets/images/beverage/LavenderLemonade.jpg'), price: 'RM18.00' },
    { id: '17', name: 'Majestic Apple Nectar', category: 'Beverages', image: require('../assets/images/beverage/AppleNectar.jpg'), price: 'RM18.00' },
    { id: '18', name: 'Purple Rain', category: 'Beverages', image: require('../assets/images/beverage/PurpleRain.jpg'), price: 'RM22.00' },
    { id: '19', name: 'San Francisco', category: 'Beverages', image: require('../assets/images/beverage/SanFrancisco.jpg'), price: 'RM20.00' },
    { id: '20', name: 'Bodegas La Horra Corimbo 2018', category: 'Alcohol', image: require('../assets/images/alcohol/BodegasLaHorra.jpg'), price: 'RM 299' },
    { id: '21', name: 'Calera Mt. Harlan Jensen Vineyard Pinot Noir 2020', category: 'Alcohol', image: require('../assets/images/alcohol/CaleraPinotNoir.jpg'), price: 'RM 349' },
    { id: '22', name: 'Chateau de Haete Serre (Georges) AOP Cahors 2019', category: 'Alcohol', image: require('../assets/images/alcohol/ChateauDeHaete.jpg'), price: 'RM 279' },
    { id: '23', name: 'Partage Regan Pinot Noir 2018', category: 'Alcohol', image: require('../assets/images/alcohol/PartageReganPinotNoir.jpg'), price: 'RM 319' },
  ];

   // Filter items based on selected category and search query
  const filteredItems = foodItems.filter((item) => {
   const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
   const matchesSearchQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
   return matchesCategory && matchesSearchQuery;
 });

  const handlePress = (foodId) => {
    navigation.navigate('FoodDetail', { foodId, username });
  };

  return (
    <ScrollView style={styles.container}>
      {promotionMessage && (
        <View style={styles.promotionBanner}>
          <Text style={styles.promotionText}>{promotionMessage}</Text>
        </View>
      )}

      <View style={styles.banner}>
        <Image
          source={require('../assets/images/DeMorgan.jpg')}
          style={styles.bannerImage}
        />
        <Text style={styles.bannerTitle}>Menu</Text>
        <Text style={styles.bannerSubtitle}>
        Experience the finest culinary artistry with our Michelin-starred menu, crafted to delight your senses.
        </Text>
      </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)} 
        />
      </View>

      <View style={styles.categories}>
        <TouchableOpacity style={styles.categoryButton} onPress={() => setSelectedCategory('Main Dish')}>
          <Text>Main Dish</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton} onPress={() => setSelectedCategory('Spaghetti')}>
          <Text>Spaghetti</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton} onPress={() => setSelectedCategory('Desserts')}>
          <Text>Desserts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton} onPress={() => setSelectedCategory('Beverages')}>
          <Text>Beverages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton} onPress={() => setSelectedCategory('Alcohol')}>
          <Text>Alcohol</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {filteredItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.foodCard} 
            onPress={() => handlePress(item.id)}
          >
            <Image source={item.image} style={styles.foodImage} />
            <Text style={styles.foodName}>{item.name}</Text>
            <Text style={styles.foodPrice}>{item.price}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25242a',
  },
  promotionBanner: {
    backgroundColor: '#f8d7da',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  promotionText: {
    color: '#721c24',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  banner: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f2f0f2',
  },
  bannerImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  bannerTitle: {
    fontSize: 24,
    color:'#25242a',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchSection: {
    flexDirection: 'row',
    backgroundColor: '#fff', 
    borderRadius: 25,
    margin: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 3,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#333', 
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  foodCard: {
    backgroundColor: '#fff', 
    borderRadius: 20,
    width: '45%',
    marginVertical: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  foodImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  foodName: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: '700',
    color: '#333',
  },
  foodPrice: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 40,
  },
  categoryButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  selectedCategoryButton: {
    backgroundColor: '#e8b4a1',
  },
  categoryText: {
    color: '#000',
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});


export default FoodPage;
