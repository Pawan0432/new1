import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  View, Text, StyleSheet, FlatList, Switch,
  Image, TouchableOpacity, Dimensions, ActivityIndicator,
  TextInput, Button, Alert, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext'; // adjust path if needed

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8 + 20;

export default function HomeScreen() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const navigation = useNavigation();

  const flatListRef = useRef(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      currentIndexRef.current = (currentIndexRef.current + 1) % products.length;
      flatListRef.current?.scrollToOffset({
        offset: currentIndexRef.current * ITEM_WIDTH,
        animated: true,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [products]);

  const handleFeedbackSubmit = () => {
    if (feedback.trim() === '') {
      Alert.alert('Empty Feedback', 'Please submit your feedback');
      return;
    }
    Alert.alert('Feedback Submitted', 'Thank you for your feedback!');
    setFeedback('');
  };

  const renderBannerItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.bannerCard, darkMode && { backgroundColor: '#1e1e1e', borderColor: '#444' }]}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.bannerImage} />
      <View style={[styles.bannerInfo, darkMode && { backgroundColor: '#2c2c2c' }]}>
        <Text numberOfLines={1} style={[styles.bannerTitle, darkMode && { color: '#fff' }]}>{item.title}</Text>
        <Text style={styles.bannerPrice}>₹ {item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, darkMode && styles.darkBackground]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Toggle Section */}
        <View style={styles.toggleRow}>
          <Text style={[styles.toggleLabel, darkMode && styles.darkText]}>
            {darkMode ? 'Dark' : 'Light'}
          </Text>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>

        <Text style={[styles.header, darkMode && styles.darkText]}>
          Home Page
        </Text>
        

        <Text style={[styles.subHeader, darkMode && styles.darkText]}>
          Products
        </Text>

        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            ref={flatListRef}
            data={products}
            renderItem={renderBannerItem}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.bannerList}
            snapToInterval={ITEM_WIDTH}
            decelerationRate="normal"
            pagingEnabled
            getItemLayout={(data, index) => ({
              length: ITEM_WIDTH,
              offset: ITEM_WIDTH * index,
              index,
            })}
          />
        )}

        {/* Feedback Section */}
        {/* <View style={styles.feedbackContainer}>
          <Text style={[styles.feedbackHeader, darkMode && styles.darkText]}>Feedback</Text>
          <TextInput
            style={[
              styles.feedbackInput,
              darkMode && { backgroundColor: '#2c2c2c', color: '#fff', borderColor: '#555' }
            ]}
            multiline
            placeholder="Your Feedback inspires us"
            placeholderTextColor={darkMode ? '#aaa' : '#888'}
            value={feedback}
            onChangeText={setFeedback}
          />
          <Button title="Submit" color="#20bf6b" onPress={handleFeedbackSubmit} />
        </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#3B060A', // f2f4f6
  },
  darkBackground: {
    backgroundColor: '#121212',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 15,
  },
  toggleLabel: {
    fontSize: 16,
    marginRight: 8,
    color: '#1e272e',
  },
  darkText: {
    color: '#ffffff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
  paragraph: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 25,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#ffffff',
  },
  bannerList: {
    marginBottom: 30,
  },
  bannerCard: {
    width: width * 0.24,
    marginRight: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderColor: '#dfe6e9',
    borderWidth: 1,
  },
  bannerImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  bannerInfo: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    height: 50,
    
    justifyContent: 'center',
    backgroundColor: '#C83F12',//dff9fb
  },
  bannerTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#ffffff',
    lineHeight: 16,
  },
  bannerPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF287',
    marginTop: 2,
  },
  feedbackContainer: {
    marginTop: 30,
    marginBottom: 60,
  },
  feedbackHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2d3436',
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#b2bec3',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 10,
    minHeight: 80,
    textAlignVertical: 'top',
    color: '#2d3436',
  },
});
