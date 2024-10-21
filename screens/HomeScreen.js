import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import io from 'socket.io-client';

const HomeScreen = ({ route, navigation }) => {
    const { username } = route?.params || {};
    // For debugging: Check if username is correctly passed
    console.log('Navigated with username:', username);
    
    const [carouselImages, setCarouselImages] = useState([
        { id: '1', image: require('../assets/images/tumblr/tumblr1.jpg') },
        { id: '2', image: require('../assets/images/tumblr/tumblr2.jpg') },
        { id: '3', image: require('../assets/images/tumblr/tumblr3.jpg') },
        { id: '4', image: require('../assets/images/tumblr/tumblr4.jpg') },
        { id: '5', image: require('../assets/images/tumblr/tumblr5.jpg') },
    ]);

    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Initialize WebSocket connection
        const socket = io('http://10.0.2.2:7000/events');

        // On connection
        socket.on('connect', () => {
            console.log('Connected to server');

            // Emit client connected event
            socket.emit('client_connected', { connected: true });

            // Request events
            socket.emit('fetch_events');
        });

        // On receiving events from server
        socket.on('server_send_events', (data) => {
            setEvents(data);
        });

        // Clean up on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    const renderCarouselItem = ({ item }) => (
        <View style={styles.carouselItem}>
            <Image source={item.image} style={styles.carouselImage} />
        </View>
    );

    const renderEventItem = (event) => (
        <View key={event.id} style={styles.eventItem}>
            <View style={styles.eventTextContainer}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDate}>{event.date}</Text>
                <Text style={styles.eventDescription}>{event.description}</Text>
            </View>
        </View>
    );

    return (
        <ImageBackground
            source={require('../assets/images/DeMorgan/background2.jpg')}
            style={styles.backgroundImage}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeText}>Welcome, {username}!</Text>
                </View>

                {/* Title Container with Logo */}
                <View style={styles.titleContainer}>
                    <Image source={require('../assets/images/DeMorgan/logo.jpg')} style={styles.restaurantLogo} />
                    <Text style={styles.catchPhrase}>Welcome to DeMorgan Restaurant!</Text>
                </View>

                {/* Food Details and Categories */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Explore Our Food</Text>
                    <Image source={require('../assets/images/DeMorgan/food.jpg')} style={styles.restaurantImage} />
                    <Text style={styles.foodDetails}>
                        Discover our diverse menu featuring an array of appetizing dishes that cater to all tastes. From savory main courses to delightful desserts,
                        we have something for everyone. Browse our categories and find your favorite dishes today!
                    </Text>
                    <TouchableOpacity style={styles.orderNowButton} onPress={() => navigation.navigate('Menu')}>
                        <Text style={styles.orderNowButtonText}>Go to Menu</Text>
                    </TouchableOpacity>
                </View>

                {/* About the Restaurant */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>About DeMorgan Restaurant</Text>
                    <Image source={require('../assets/images/DeMorgan/restaurant2.jpg')} style={styles.restaurantImage} />
                    <Text style={styles.restaurantDescription}>
                        Established in 2020, DeMorgan Restaurant offers a wide variety of delectable dishes made with the freshest ingredients.
                        Our restaurant is renowned for its welcoming atmosphere and exceptional service. Enjoy a culinary experience like no other!
                    </Text>
                    <TouchableOpacity style={styles.readMoreButton} onPress={() => navigation.navigate('About')}>
                        <Text style={styles.readMoreButtonText}>Read More</Text>
                    </TouchableOpacity>
                </View>

                {/* Upcoming Special Events */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Upcoming Special Events</Text>
                    {events.map(renderEventItem)}
                </View>

                {/* Carousel Container */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Explore Our Restaurant Merchandise</Text>
                    <Text style={styles.foodDetails}>
                        Explore our exciting new merchandise—an exclusive Tumblr you can take anywhere.
                        Grab yours now when you visit our restaurant, available for a limited time.
                    </Text>
                    <Carousel
                        data={carouselImages}
                        renderItem={renderCarouselItem}
                        sliderWidth={400}
                        itemWidth={300}
                        containerCustomStyle={styles.carousel}
                    />
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceText}>RM 35.99</Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>© 2024 DeMorgan Restaurant. All rights reserved.</Text>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    restaurantLogo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    catchPhrase: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    sectionContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 15,
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#ff8c00',
        paddingBottom: 5,
    },
    carousel: {
        alignSelf: 'center',
        marginTop: 20,
    },
    carouselItem: {
        alignItems: 'center',
    },
    carouselImage: {
        width: 300,
        height: 200,
        borderRadius: 15,
    },
    restaurantImage: {
        width: '100%',
        height: 200,
        borderRadius: 15,
        marginVertical: 15,
    },
    orderNowButton: {
        backgroundColor: '#ff8c00',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    orderNowButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    foodDetails: {
        fontSize: 16,
        color: '#555',
        textAlign: 'justify',
        marginBottom: 15,
    },
    readMoreButton: {
        backgroundColor: '#ff8c00',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    readMoreButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    restaurantDescription: {
        fontSize: 16,
        color: '#555',
        textAlign: 'justify',
        marginBottom: 15,
    },
    priceContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    priceText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff8c00',
    },
    footer: {
        backgroundColor: '#ff8c00',
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        color: '#fff',
        fontSize: 14,
    },
    eventItem: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    eventTextContainer: {
        justifyContent: 'center',
    },
    eventTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    eventDate: {
        fontSize: 15,
        color: 'blue',
        fontWeight: 'bold',
    },
    eventDescription: {
        fontSize: 15,
        color: '#555',
    },
    welcomeContainer: {
        marginTop: 10,
        marginBottom: 5,
        padding: 10,
        backgroundColor:  '#000000', // Dark
        borderRadius: 10,
        borderWidth: 0,
        borderColor: '#333', // Dark border for a more contained look
        alignItems: 'flex-start', // Align items to the start (left)
        width: '100%', // Full width of the container
      },
      welcomeText: {
        fontSize: 20,
        fontWeight: '600', // Slightly lighter than 'bold'
        color: '#fff',
      },
});

export default HomeScreen;
