import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  Platform,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext'; 
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductDetailScreen({ route }) {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);
  const { darkMode } = useContext(ThemeContext); 
  const navigation = useNavigation();

  const handleAddToCart = () => {
    addToCart(product);
    if (Platform.OS === 'web') {
      window.alert('Item added to cart.');
    } else {
      Alert.alert('Success', 'Item added to cart!');
    }
  };

  const handleBuyNow = () => {
    navigation.navigate('BuyerDetails', { product });
  };

  return (
    <View style={[styles.wrapper, darkMode && styles.wrapperDark]}>
      <TouchableOpacity style={[styles.backButton, darkMode && styles.backButtonDark]} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={darkMode ? '#fff' : '#333'} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: product.image }} style={styles.image} />
         <br /><br /><br />
        <Text style={[styles.title, darkMode && styles.textLight]}>{product.title}</Text>
        <Text style={[styles.price, darkMode && styles.textLight]}>₹ {product.price}</Text>
        <Text style={[styles.description, darkMode && styles.textLight]}>{product.description}</Text>

        <View style={styles.buttonContainer}>
          <Button title="Add to Cart" color={darkMode ? '#8A0000' : '#C83F12'} onPress={handleAddToCart} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Buy Now" color={darkMode ? '#C83F12' : '#8A0000'} onPress={handleBuyNow} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#3B060A', 
  },
  wrapperDark: {
    backgroundColor: '#121212', 
  },
  backButton: {
    position: 'absolute',
    top: 40,
    right: 1500,
    zIndex: 10,
    padding: 5,
    backgroundColor: '#FFF287',
    borderRadius: 20,
    elevation: 3,
  },
  backButtonDark: {
    backgroundColor: '#1e1e1e', 
  },
  container: {
    padding: 20,
    paddingTop: 80,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFF287', 
  },
  price: {
    fontSize: 18,
    color: '#ffffff', 
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#ffffff', 
    marginBottom: 20,
  },
  textLight: {
    color: '#ffffff',
  },
  buttonContainer: {
    marginBottom: 15,
  },
});
