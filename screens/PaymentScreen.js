import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Button, Alert, ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default function PaymentScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { product, buyer } = route.params;

  const [paymentDone, setPaymentDone] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  const handlePayment = async () => {
    try {
      const order = {
        id: Date.now().toString(),
        product,
        buyer,
        date: new Date().toISOString(),
      };

      const existing = await AsyncStorage.getItem('@order_history');
      const orders = existing ? JSON.parse(existing) : [];
      orders.push(order);
      await AsyncStorage.setItem('@order_history', JSON.stringify(orders));

      setPaymentDone(true);
      setLastOrder(order);

      Alert.alert(
        'Payment Successful',
        `Thank you ${buyer.name}, your payment of ₹${product.price} was successful!`
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to process payment.');
    }
  };

  const downloadReceipt = async () => {
    if (!lastOrder) return;

    const htmlContent = `
      <html>
        <body style="font-family: sans-serif; padding: 20px;">
          <h1>Receipt</h1>
          <p><strong>consumer-id:</strong> ${lastOrder.id}</p>
          <p><strong>Product:</strong> ${lastOrder.product.title}</p>
          <p><strong>Amount Paid:</strong> ₹${lastOrder.product.price}</p>
          <p><strong>Buyer Name:</strong> ${lastOrder.buyer.name}</p>
          <p><strong>Address:</strong> ${lastOrder.buyer.address}</p>
          <p><strong>Payment Method:</strong> ${lastOrder.buyer.paymentMethod}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          <hr />
          <p style="text-align:center;">Thank you for shopping with us! 🛍️</p>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate PDF receipt.');
      console.error('PDF error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🧾 Payment Gateway (Demo)</Text>

      <Text style={styles.label}>Product:</Text>
      <Text style={styles.value}>{product.title}</Text>

      <Text style={styles.label}>Amount:</Text>
      <Text style={styles.value}>₹ {product.price}</Text>

      <Text style={styles.label}>Buyer:</Text>
      <Text style={styles.value}>{buyer.name}</Text>

      <Text style={styles.label}>Address:</Text>
      <Text style={styles.value}>{buyer.address}</Text>

      <Text style={styles.label}>Payment Method:</Text>
      <Text style={styles.value}>{buyer.paymentMethod}</Text>

      <View style={styles.buttonContainer}>
        {!paymentDone ? (
          <Button title="Pay Now" color="#20bf6b" onPress={handlePayment} />
        ) : (
          <>
            <Button title="Download Receipt (PDF)" onPress={downloadReceipt} color="#4b7bec" />
            <View style={{ height: 10 }} />
            <Button title="Go Home" onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })} color="#636e72" />
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    backgroundColor: '#3B060A', // soft gray
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#FFF287', // dark slate gray
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    color: '#C83F12', 
  },
  buttonContainer: {
    marginTop: 30,
  },
});
