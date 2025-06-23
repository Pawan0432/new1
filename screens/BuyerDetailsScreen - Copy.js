import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  Button, Alert, Picker, ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

export default function BuyerDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;
  const { userInfo } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleProceed = () => {
    if (!name || !address || !paymentMethod) {
      Alert.alert('Missing Information', 'Please fill all the details.');
      return;
    }

    const buyer = { name, address, paymentMethod };
    navigation.navigate('Payment', { product, buyer });
  };

  const autofillDetails = () => {
    if (userInfo) {
      setName(userInfo.name || '');
      setAddress(userInfo.address || '');
    } else {
      Alert.alert('Error', 'User details not found in profile.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Enter Buyer Details 🧾</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Delivery Address</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter your full address"
        value={address}
        onChangeText={setAddress}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Payment Method</Text>
      <Picker
        selectedValue={paymentMethod}
        onValueChange={(itemValue) => setPaymentMethod(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select a payment method" value="" />
        <Picker.Item label="Cash on Delivery" value="Cash on Delivery" />
        <Picker.Item label="UPI" value="UPI" />
        <Picker.Item label="Credit/Debit Card" value="Card" />
      </Picker>

      <Button title="Autofill from Profile" color="#4b7bec" onPress={autofillDetails} />

      <View style={styles.buttonContainer}>
        <Button title="Proceed to Payment" color="#20bf6b" onPress={handleProceed} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2f4f6', // Soft light gray for pleasant UX
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2d3436', // Dark neutral
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#34495e', // Slightly stronger label color
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#dcdde1', // Soft border
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  picker: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dcdde1',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
