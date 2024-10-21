import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const contactInfo = {
  whatsapp: [
    { name: 'Josephine', number: '+60123456789', image: 'https://example.com/josephine.jpg' },
    { name: 'Siti Aishah', number: '+60129876543', image: 'https://example.com/siti.jpg' }
  ],
  email: 'info@demorganrestaurant.my',
  address: '12 Holland Park Rd, London W14 8LZ',
  mapLocation: 'https://www.google.com/maps/place/The+De+Morgan+Cafe/@51.4987429,-0.2056191,17z/data=!3m1!4b1!4m6!3m5!1s0x48760ff38d23eb75:0xa723df370b675b6e!8m2!3d51.4987429!4d-0.2030442!16s%2Fg%2F11vcxlgcqw?entry=ttu&g_ep=EgoyMDI0MDkwOS4wIKXMDSoASAFQAw%3D%3D'
};

const saveContactInfo = async () => {
  try {
    await AsyncStorage.setItem('contactInfo', JSON.stringify(contactInfo));
    console.log('Contact information saved.');
  } catch (error) {
    console.error('Failed to save contact information.', error);
  }
};

const loadContactInfo = async () => {
  try {
    const storedContactInfo = await AsyncStorage.getItem('contactInfo');
    return storedContactInfo ? JSON.parse(storedContactInfo) : null;
  } catch (error) {
    console.error('Failed to load contact information.', error);
    return null;
  }
};

const ContactScreen = () => {
  const [contactData, setContactData] = useState({
    whatsapp: [],
    email: '',
    address: '',
    mapLocation: ''
  });

  useEffect(() => {
    saveContactInfo(); 

    const fetchContactInfo = async () => {
      const info = await loadContactInfo();
      if (info) setContactData(info);
    };

    fetchContactInfo();
  }, []);

  const handleWhatsAppClick = (number) => {
    const url = `https://wa.me/${number.replace(/^\+/, '')}`;
    Linking.openURL(url);
  };

  const handleEmailClick = (email) => {
    const url = `mailto:${email}`;
    Linking.openURL(url);
  };

  const handleMapClick = (locationUrl) => {
    Linking.openURL(locationUrl);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Contact Us</Text>

      {/* WhatsApp */}
      <View style={styles.contactContainer}>
        <Text style={styles.sectionHeader}>WhatsApp</Text>
        {contactData.whatsapp.map((contact, index) => (
          <View key={index} style={styles.contactCard}>
            <Icon name="chat" size={24} color="#25D366" />
            <View style={styles.contactDetails}>
              <Text style={styles.name}>{contact.name}</Text>
              <TouchableOpacity onPress={() => handleWhatsAppClick(contact.number)} style={styles.contactButton}>
                <Text style={styles.contactText}>{contact.number}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Email */}
      <View style={styles.emailContainer}>
        <Text style={styles.sectionHeader}>Email</Text>
        <TouchableOpacity onPress={() => handleEmailClick(contactData.email)} style={styles.emailCard}>
          <Icon name="email" size={24} color="#D44638" />
          <Text style={styles.contactText}>{contactData.email}</Text>
        </TouchableOpacity>
      </View>

      {/* Address */}
      <View style={styles.addressContainer}>
        <Text style={styles.sectionHeader}>Address</Text>
        <View style={styles.addressCard}>
          <Icon name="location-on" size={24} color="#FF5722" />
          <Text style={styles.contactText}>{contactData.address}</Text>
        </View>
      </View>

      {/* Google Map Location */}
      <View style={styles.mapContainer}>
        <Text style={styles.sectionHeader}>Location</Text>
        <TouchableOpacity onPress={() => handleMapClick(contactData.mapLocation)} style={styles.mapButton}>
          <Icon name="map" size={24} color="#3F51B5" />
          <Text style={styles.contactText}>View on Google Maps</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#25242a',  
  },
  header: {
    fontSize: 48,  
    fontWeight: '700',
    color: '#FFF',  
    textAlign: 'center',
    marginBottom: 20,  
  },
  contactContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,  
    padding: 20,
    marginTop: 20,  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,  
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 30,  
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',  
    color: '#555',  
    marginBottom: 10,
    fontFamily: 'Poppins',
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#F9F9F9',  
    borderRadius: 12,  
    padding: 10,
    marginBottom: 10,
  },
  contactDetails: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    fontFamily: 'Poppins',
  },
  contactButton: {
    marginTop: 5,
  },
  contactText: {
    fontSize: 16,
    color: '#007BFF',  
    fontWeight: '500',  
    fontFamily: 'Poppins',
  },
  emailContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  emailCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});


export default ContactScreen;
