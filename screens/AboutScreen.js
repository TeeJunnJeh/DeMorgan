import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AboutScreen = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground 
            source={require('../assets/images/DeMorgan/background2.jpg')} 
            style={styles.background}
        >
            <ScrollView contentContainerStyle={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>About DeMorgan Restaurant</Text>
                </View>

                {/* Our Story */}
                <View style={styles.section}>
                    <Image 
                        source={require('../assets/images/DeMorgan/restaurant2.jpg')} 
                        style={styles.image} 
                    />
                    <Text style={styles.sectionTitle}>Our Story</Text>
                    <Text style={styles.sectionText}>
                        DeMorgan Restaurant was established in 2020 with a vision to blend tradition and innovation in the culinary world. 
                        Founded by John DeMorgan, the restaurant is the culmination of years of passion for cooking and a desire to create 
                        a dining experience that celebrates the art of food. The legacy of DeMorgan began with John's grandmother, whose 
                        recipes and love for family gatherings inspired him to bring those same feelings of warmth and togetherness to 
                        his restaurant.
                    </Text>

                    <Image 
                        source={require('../assets/images/DeMorgan/family.jpg')} 
                        style={styles.inlineImage} 
                    />
                    <Text style={styles.sectionText}>
                        Over the years, DeMorgan has grown from a humble family-owned eatery into a renowned destination for food lovers. 
                        Every dish on our menu is a tribute to our roots, with a contemporary twist that reflects the evolving tastes of 
                        our guests. Our story is one of dedication, creativity, and an unyielding commitment to excellence.
                    </Text>
                </View>

                {/* Our Cuisines */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Our Cuisines</Text>
                    <Text style={styles.sectionText}>
                        At DeMorgan, we pride ourselves on offering a diverse array of cuisines that cater to a wide range of palates. Our culinary team is dedicated to crafting dishes that are both innovative and rooted in tradition. Our menu includes:
                    </Text>
                    <Image 
                        source={require('../assets/images/DeMorgan/food.jpg')} 
                        style={styles.image} 
                    />
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>
                            <Text style={styles.boldText}>Italian Cuisine:</Text> Delight in our classic Italian dishes, featuring authentic pasta, risotto, and freshly baked pizzas crafted with traditional techniques and high-quality ingredients.
                        </Text>
                    </View>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>
                            <Text style={styles.boldText}>Asian Fusion:</Text> Experience our innovative Asian fusion dishes that blend traditional flavors with modern culinary twists, incorporating ingredients from various Asian cultures.
                        </Text>
                    </View>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>
                            <Text style={styles.boldText}>Mediterranean Delights:</Text> Enjoy the fresh and vibrant flavors of the Mediterranean with dishes that highlight the region’s rich culinary heritage, including grilled meats, fresh salads, and savory dips.
                        </Text>
                    </View>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>
                            <Text style={styles.boldText}>American Classics:</Text> Relish in our American comfort foods, from juicy burgers and fries to hearty steaks, all prepared with a focus on quality and taste.
                        </Text>
                    </View>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>
                            <Text style={styles.boldText}>Decadent Desserts:</Text> Indulge in a selection of desserts that range from classic favorites to creative new treats, each crafted to provide a perfect sweet ending to your meal.
                        </Text>
                    </View>
                </View>


                {/* Our Mission */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Our Mission</Text>
                    <Text style={styles.sectionText}>
                        At DeMorgan, our mission is to create a welcoming environment where every guest feels like family. We are committed 
                        to delivering exceptional service and using the finest ingredients to craft dishes that delight the senses. Our goal 
                        is to make every meal a celebration of food, family, and tradition, ensuring that each visit to our restaurant is 
                        memorable and enjoyable.
                    </Text>
                    <Image 
                        source={require('../assets/images/DeMorgan/mission.jpg')} 
                        style={styles.inlineImage} 
                    />
                </View>

                {/* Our Values */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Our Values</Text>
                    <Text style={styles.sectionText}>
                        At the heart of DeMorgan Restaurant are our core values, which guide every aspect of our operations:
                    </Text>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>
                            <Text style={styles.boldText}>Excellence:</Text> We strive for perfection in every dish we prepare, from the sourcing of our ingredients to the presentation on the plate.
                        </Text>
                    </View>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>
                            <Text style={styles.boldText}>Innovation:</Text> While we honor tradition, we are constantly exploring new techniques and flavors to keep our menu fresh and exciting.
                        </Text>
                    </View>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>
                            <Text style={styles.boldText}>Community:</Text> We believe in giving back to the community that has supported us, and we regularly participate in local events and initiatives.
                        </Text>
                    </View>
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>
                            <Text style={styles.boldText}>Sustainability:</Text> We are committed to environmentally responsible practices, from reducing waste to sourcing sustainable ingredients.
                        </Text>
                    </View>
                </View>

                {/* What Motivated Us */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>What Motivated Us</Text>
                    <Text style={styles.sectionText}>
                        The desire to create a space where people could come together to enjoy good food and good company is what motivated 
                        us to open DeMorgan Restaurant. We wanted to build a place where the warmth of family dinners and the excitement of 
                        culinary innovation could coexist, offering our guests a truly unique dining experience.
                    </Text>
                    <Text style={styles.sectionText}>
                        Our motivation comes from the joy of seeing our guests enjoy the food we prepare and the memories they create in 
                        our restaurant. We are driven by a passion for excellence and a commitment to making DeMorgan a place where people 
                        come to connect, celebrate, and savor life’s special moments.
                    </Text>
                    <Image 
                        source={require('../assets/images/DeMorgan/motivation.jpg')} 
                        style={styles.image} 
                    />
                </View>

                {/* Contact Us */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact Us</Text>
                    <Text style={styles.sectionText}>
                        Whether you have a question, feedback, or just want to say hello, we’d love to hear from you. Here’s how you can reach us:
                    </Text>
                    <Text style={styles.contactInfo}>
                        <Text style={styles.boldText}>Address:</Text> 12, Culinary Avenue, Foodie City, Kuala Lumpur, Malaysia{'\n'}
                        <Text style={styles.boldText}>Phone:</Text> (60) 1856792642{'\n'}
                        <Text style={styles.boldText}>Email:</Text> info@demorganrestaurant.com
                    </Text>
                    <TouchableOpacity 
                        style={styles.contactButton} 
                        onPress={() => navigation.navigate('Contact')}
                    >
                        <Text style={styles.contactButtonText}>Get in Touch</Text>
                    </TouchableOpacity>
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
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    headerTitle: {
        fontSize: 36,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
    },
    section: {
        marginBottom: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 20,
        borderRadius: 10,
    },
    sectionTitle: {
        fontSize: 30,
        fontWeight: '600', // Slightly lighter than header
        color: '#333',
        marginBottom: 12,
        textAlign: 'center',
        borderBottomWidth: 1, // Border under section titles for separation
        borderBottomColor: 'grey',
        paddingBottom: 8,
    },
    sectionText: {
        fontSize: 16,
        color: '#555', // Softer color for readability
        lineHeight: 24,
        marginBottom: 12,
        textAlign: 'justify', // More professional text alignment
    },
    boldText: {
        fontWeight: '700',
        color: '#000',
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
    },
    inlineImage: {
        width: '100%',
        height: 150,
        marginVertical: 15,
        borderRadius: 10,
    },
    bulletContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    bulletPoint: {
        fontSize: 24,
        color: '#ff6347',
        marginRight: 10,
    },
    bulletText: {
        flex: 1,
        fontSize: 18,
        color: '#333',
    },
    contactInfo: {
        fontSize: 18,
        color: '#333',
        marginVertical: 15,
        lineHeight: 28,
    },
    contactButton: {
        backgroundColor: '#ff6347',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    contactButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
    },
    footer: {
        alignItems: 'center',
        marginTop: 30,
        paddingVertical: 20,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
    },
    footerText: {
        fontSize: 16,
        color: '#ccc',
    },
});

export default AboutScreen;
