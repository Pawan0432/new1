// App.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthProvider, AuthContext } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';


import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductScreen from './screens/ProductScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import BuyerDetailsScreen from './screens/BuyerDetailsScreen'; 
import PaymentScreen from './screens/PaymentScreen'; 
import OrderHistoryScreen from './screens/OrderHistoryScreen';




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
  screenOptions={{
    headerShown: false,
    tabBarStyle: {
      backgroundColor: '#1e1e1e',     // Softer dark instead of full black
      borderTopWidth: 0,
      paddingBottom: 5,
      paddingTop: 5,
    },
    tabBarActiveTintColor: '#4b7bec', // Blue accent for active tab
    tabBarInactiveTintColor: '#888',
    tabBarLabelStyle: {
      fontSize: 13,
      fontWeight: '700',
      textTransform: 'uppercase',
    },
  }}
>

      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Products" component={ProductScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Order" component={OrderHistoryScreen} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { accessToken, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {accessToken == null ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="BuyerDetails" component={BuyerDetailsScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
}