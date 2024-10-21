import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button } from 'react-native';

// Import screens 
import WelcomeScreen from './screens/WelcomeScreen'; 
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import NavigationScreen from './screens/NavigationScreen'; // Import the TabNavigator
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import FoodDetail from './screens/FoodDetailPage';
import CheckoutScreen from './screens/CheckoutScreen';
import AppreciationScreen from './screens/AppreciationScreen';
import HomeScreen from './screens/HomeScreen';

import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true); // Ignore all logs

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ route, navigation }) => {
  const { username } = route.params || {};

  return (
    <Drawer.Navigator
      drawerPosition="right" // Move the drawer to the right
      screenOptions={{
        headerStyle: { backgroundColor: '#242424' },
        headerTintColor: '#fff',
        drawerStyle: { backgroundColor: '#000', width: 240 },
        drawerActiveTintColor: '#ff9966',
        drawerInactiveTintColor: '#fff',
        drawerContentContainerStyle: { backgroundColor: '#000' }, // Add this line
        headerRight: () => (
          <Button
            onPress={() => navigation.navigate('Home')} // Modify to navigate to desired screen
            title="Back"
            color="#ff9966" // Customize back button color
          />
        ),
      }}
    >
      <Drawer.Screen
        name="Home"
        component={NavigationScreen}
        initialParams={{ username }} // Pass the username to the TabNavigator
      />
      <Drawer.Screen name="Contact" component={ContactScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen
        name="Logout"
        component={LogoutScreen} // Implement LogoutScreen to handle logout
      />
    </Drawer.Navigator>
  );
};

const LogoutScreen = ({ navigation }) => {
  React.useEffect(() => {
    // Navigate to LoginScreen and reset the stack
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }, [navigation]);

  return null; // Render nothing as it's just for navigation reset
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: { backgroundColor: '#242424' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="FoodDetail" component={FoodDetail} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        <Stack.Screen name="AppreciationScreen" component={AppreciationScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen 
          name="Navigation" 
          component={DrawerNavigator} // Use DrawerNavigator here
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
