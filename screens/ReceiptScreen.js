import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function ReceiptScreen() {
  const route = useRoute();
  const { order } = route.params;

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No order data found.</Text>
      </View>
    );
  }

  const { product, buyer, date } = order;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🧾 Receipt</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{date}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Product:</Text>
        <Text style={styles.value}>{product.title}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Amount Paid:</Text>
        <Text style={styles.value}>₹ {product.price}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Buyer Name:</Text>
        <Text style={styles.value}>{buyer.name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Delivery Address:</Text>
        <Text style={styles.value}>{buyer.address}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Payment Method:</Text>
        <Text style={styles.value}>{buyer.paymentMethod}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#f9fafe',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF287',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    borderColor: '#e1e8ee',
    borderWidth: 1,
  },
  label: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 18,
    color: '#FFF287',
    fontWeight: '500',
  },
  error: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: 'red',
  },
});
