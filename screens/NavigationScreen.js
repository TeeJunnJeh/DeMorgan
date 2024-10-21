// NavigationScreen.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import CartScreen from './CartScreen';
import ProfileScreen from './ProfileScreen';
import MenuScreen from './MenuScreen';
import { Image, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const TabIcon = (icon, focusedIcon, focused) => {
  return (
    <Image
      source={focused ? focusedIcon : icon}
      style={styles.icon}
    />
  );
};

export default function NavigationScreen({ route }) {
  const { username } = route?.params || {};

  // For debugging: Check if username is correctly passed
  console.log('Navigated with username:', username);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let focusedIconName;

          switch (route.name) {
            case 'Home':
              iconName = require('../assets/images/icons/homeIcon.png');
              focusedIconName = require('../assets/images/icons/homeIconFocused.png'); // Focused state icon
              break;
            case 'Menu':
              iconName = require('../assets/images/icons/menuIcon.png');
              focusedIconName = require('../assets/images/icons/menuIconFocused.png'); // Focused state icon
              break;
            case 'Cart':
              iconName = require('../assets/images/icons/cartIcon.png');
              focusedIconName = require('../assets/images/icons/cartIconFocused.png'); // Focused state icon
              break;
            case 'Profile':
              iconName = require('../assets/images/icons/profileIcon.png');
              focusedIconName = require('../assets/images/icons/profileIconFocused.png'); // Focused state icon
              break;
            default:
              iconName = require('../assets/images/icons/homeIcon.png');
              focusedIconName = require('../assets/images/icons/homeIconFocused.png'); // Focused state icon
              break;
          }

          return TabIcon(iconName, focusedIconName, focused);
        },
        tabBarActiveTintColor: '#ff9966',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: styles.tabBarStyle,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerStyle: { backgroundColor: '#000000' }, headerTintColor: '#ffffff', headerShown: false }}
        initialParams={{ username }} // Pass the username to HomeScreen
        
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{ headerStyle: { backgroundColor: '#000000' }, headerTintColor: '#ffffff' }} 
        initialParams={{ username }} // Pass the username to HomeScreen
      />
      <Tab.Screen 
        name="Menu" 
        component={MenuScreen} 
        options={{ headerStyle: { backgroundColor: '#000000' }, headerTintColor: '#ffffff' }} 
        initialParams={{ username }} // Pass the username to HomeScreen
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ headerStyle: { backgroundColor: '#000000' }, headerTintColor: '#ffffff' }} 
        initialParams={{ username }} // Pass the username to HomeScreen
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: 'black',
    borderTopWidth: 0,
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});
