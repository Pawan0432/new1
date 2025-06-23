import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }
    login(username, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        autoCapitalize="none"
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>if it is your 1st time ,click here </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupLink}> Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#3B060A', // soft neutral background
  },
  header: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#ffffff', // rich black
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#8A0000',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dfe6e9', // lighter border
    marginBottom: 15,
    fontSize: 16,
    color: '#ffffff',
  },
  loginButton: {
    backgroundColor: '#FFF287', // bright blue
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  signupText: {
    color: '#ffffff', // soft gray
    fontSize: 14,
  },
  signupLink: {
    color: '#FFF287', // matching accent blue
    fontSize: 14,
    fontWeight: 'bold',
  },
});
