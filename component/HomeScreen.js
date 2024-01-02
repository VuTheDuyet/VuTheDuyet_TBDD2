import React, { useEffect, useState } from 'react';
import { Button, FlatList, Dimensions, Image, ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Slide from './Slide';
import axios from 'axios';

function HomeScreen({ navigation }) {
  const [productData, setProductData] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [displayedProducts, setDisplayedProducts] = useState([]);

  const uniqueCategories = [...new Set(productData.map(item => item.category))];
  const allCategories = ['All', ...uniqueCategories];

  const getDataUsingAsyncAwaitGetCall = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProductData(response.data);
      setDisplayedProducts(response.data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getDataUsingAsyncAwaitGetCall();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setDisplayedProducts(productData);
    } else {
      const filteredProducts = productData.filter(item => item.category === selectedCategory);
      setDisplayedProducts(filteredProducts);
    }
  }, [selectedCategory, productData]);

  const renderItem = ({ item }) => (
    <View style={{ marginVertical: 10, backgroundColor: 'white', margin: 5, borderRadius: 20, height: 200, width: '48%' }}>
      <View style={{ flex: 3 }}>
        <Image
          source={{ uri: item.image }}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            padding: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>
      <View style={{ flex: 2, paddingTop: 0, paddingHorizontal: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 14, }} numberOfLines={2}>{item.title}</Text>
        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 15, margin: 5 }} numberOfLines={1}>Giá: {item.price} VNĐ</Text>
        <Text style={{ color: 'orange', fontSize: 10 }} numberOfLines={1}>Đánh giá: {item.rating.rate} ({item.rating.count} reviews)</Text>
      </View>
    </View>
  );

  const handleLayoutChange = () => {
    const { width } = Dimensions.get('window');
    const newNumColumns = Math.floor(width / 200);
    setNumColumns(newNumColumns);
  };

  return (
    <ScrollView style={{ flex: 1, width: '100%' }}>
      <Slide />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScrollView}>
        {allCategories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryContainer,
              { backgroundColor: selectedCategory === category ? 'gray' : 'lightgray' },
            ]}
            onPress={() => {
              setSelectedCategory(category);
            }}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={{ fontSize: 25 }}>Sản phẩm mới</Text>
      <FlatList
        data={displayedProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        onLayout={handleLayoutChange}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoryScrollView: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  categoryContainer: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'lightgray',
    borderRadius: 15,
  },
  categoryText: {
    fontWeight: 'bold',
  },
});

export default HomeScreen;
