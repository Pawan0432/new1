import React, { useContext } from 'react';
import {
  View, Text, FlatList, Button,Image,
  StyleSheet, TouchableOpacity
} from 'react-native';
import { CartContext } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '../context/ThemeContext';

export default function CartScreen() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigation = useNavigation();

  const styles = useThemedStyles(lightStyles, darkStyles);

  const handleBuy = (product) => {
    navigation.navigate('BuyerDetails', { product });
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={styles.icon.color} />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.header}>Your Cart</Text>

        <FlatList
          data={cartItems}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.empty}>Your cart is empty</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.item}>
              
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.price}>₹ {item.price}</Text>

              <View style={styles.buttonsRow}>
                <View style={styles.buttonWrapper}>
                  <Button title="Remove" color="#8A0000" onPress={() => removeFromCart(item.id)} />
                </View>
                <View style={styles.buttonWrapper}>
                  <Button title="Buy" color="#C83F12" onPress={() => handleBuy(item)} />
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}


const lightStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#3B060A',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
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
  icon: {
    color: '#333',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  empty: {
    marginTop: 50,
    textAlign: 'center',
    color: '#FFF287',
    fontSize: 20,
  },
  item: {
    backgroundColor: '#FFF287',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B060A',
  },
  price: {
    fontSize: 18,
    color: '#9e3434',
    marginVertical: 5,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});

const darkStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 5,
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    elevation: 3,
  },
  icon: {
    color: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  empty: {
    marginTop: 50,
    textAlign: 'center',
    color: '#aaa',
    fontSize: 16,
  },
  item: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#444',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  price: {
    fontSize: 14,
    color: '#ccc',
    marginVertical: 5,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});

