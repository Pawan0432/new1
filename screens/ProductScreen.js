import React, { useEffect, useState, useContext } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  ActivityIndicator, StyleSheet, Image, ScrollView
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext'; // <-- Make sure path is correct

export default function ProductScreen() {
  const { darkMode } = useContext(ThemeContext); // <-- Use global dark mode
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await axios.get('https://fakestoreapi.com/products');
        const categoryRes = await axios.get('https://fakestoreapi.com/products/categories');

        setAllProducts(productRes.data);
        setProducts(productRes.data);
        setCategories(['All', ...categoryRes.data]);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setProducts(allProducts);
    } else {
      const filtered = allProducts.filter(p => p.category === category);
      setProducts(filtered);
    }
  };

  const renderCategory = (category) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.categoryButtonActive,
        darkMode && styles.categoryButtonDark
      ]}
      onPress={() => filterByCategory(category)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === category && styles.categoryTextActive,
          darkMode && { color: selectedCategory === category ? '#fff' : '#ccc' }
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;

  return (
    <View style={[styles.wrapper, darkMode && styles.darkBackground]}>
      <Text style={[styles.header, darkMode && styles.darkText]}>Products 🛍</Text>

      <View style={styles.mainContent}>
        <View style={[styles.sidebar, darkMode && styles.sidebarDark]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {categories.map(renderCategory)}
          </ScrollView>
        </View>

        <View style={styles.productList}>
          <FlatList
            data={products}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('ProductDetail', { product: item })}
                style={[styles.card, darkMode && styles.cardDark]}
              >
                <Image source={{ uri: item.image }} style={styles.image} />
                <br /><br />
                <View style={styles.details}>
                  <Text style={[styles.title, darkMode && styles.darkText]} numberOfLines={2}>{item.title}</Text>
                  <Text style={[styles.price, darkMode && { color: '#aaa' }]}>₹ {item.price}</Text>
                </View>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 5,
    backgroundColor: '#3B060A', // soft light gray background
    paddingTop: 20,
  },
  darkBackground: {
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  darkText: {
    color: '#ffffff',
  },
  mainContent: {
    flex:1 ,
    flexDirection: 'row',
  },
  sidebar: {
    height:300,
    width: 150,
    paddingLeft: 10,
    paddingRight:10,
    paddingTop: 30,
    backgroundColor: '#8A0000',
    borderRightWidth: 1,
    borderRightColor: '#dcdde1',
  },
  sidebarDark: {
    backgroundColor: '#8A0000',
    borderRightColor: '#444',
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 6,
    backgroundColor: '#C83F12',
  },
  categoryButtonDark: {
    backgroundColor: '#2c2c2c',
  },
  categoryButtonActive: {
    backgroundColor: '#FFF287',
  },
  categoryText: {
    fontSize: 13,
    color: '#FFF287',
    textTransform: 'capitalize',
  },
  categoryTextActive: {
    color: '#3B060A',
    fontWeight: 'bold',
  },
  productList: {
    flex: 5,
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#C83F12',
    marginBottom: 10,
    borderRadius: 8,
    borderColor: '#8A0000',
    borderWidth: 2,
  },
  cardDark: {
    backgroundColor: '#1e1e1e',
    borderColor: '#444',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  price: {
    fontSize: 14,
    color: '#FFF287', // vibrant price color
    marginTop: 4,
  },
});
