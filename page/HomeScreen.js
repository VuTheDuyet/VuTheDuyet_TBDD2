import React, { useState, useEffect } from 'react';
import { Button, Alert,FlatList, Dimensions, Image, ScrollView, Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import Slide from '../component/Slide';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import CartItem from '../component/CartItem';
import ProductDetails from '../component/ProductDetail';

const HomeScreen = ({isLoggedIn, onSearch }) => {

  const [searchKeyword, setSearchKeyword] = useState('');
  console.log(onSearch);
  useEffect(() => {
    // Kiểm tra xem có nên áp dụng tìm kiếm hay không
    if (onSearch && onSearch.trim() !== '') {
      // Thực hiện tìm kiếm
      const filteredProducts = productData.filter(item =>
        item.title.toLowerCase().includes(onSearch.toLowerCase())
      );
      setDisplayedProducts(filteredProducts);
    } else {
      // Nếu không, hiển thị tất cả sản phẩm
      setDisplayedProducts(productData);
    }
  }, [onSearch, productData]);
  useEffect(() => {
    if (!isLoggedIn) {
      // Hiển thị cảnh báo khi chưa đăng nhập
      Alert.alert(
        'Thông báo',
        'Bạn cần đăng nhập để sử dụng ứng dụng.',
        [
          {
            text: 'Đóng',
            onPress: () => console.log('OK Pressed'),
          },
          {
            text: 'Đăng nhập',
            onPress: () => navigation.navigate('Login'), // Chuyển hướng đến trang đăng nhập
          },
        ],
        { cancelable: false }
      );
    }
  }, [isLoggedIn, navigation]);




  const [productData, setProductData] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState('All');


  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderList, setOrderList] = useState([]);

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isQuantityModalVisible, setQuantityModalVisible] = useState(false);


  const uniqueCategories = [...new Set(productData.map(item => item.category))];
  const allCategories = ['All', ...uniqueCategories];

  const [selectedProductIdForModal, setSelectedProductIdForModal] = useState(null);


  const getDataUsingAsyncAwaitGetCall = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProductData(response.data);
      setDisplayedProducts(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error.message);
    }
  };

  const navigation = useNavigation();

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

  useEffect(() => {
    const filteredProducts = productData.filter(item =>
      item.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setDisplayedProducts(filteredProducts);
  }, [searchKeyword, productData]);

  const handleLayoutChange = () => {
    const { width } = Dimensions.get('window');
    const newNumColumns = Math.floor(width / 200);
    setNumColumns(newNumColumns);
  };

  const addToCart = (productId) => {
    setSelectedProductId(productId);
    setSelectedProductIdForModal(productId);
    setQuantityModalVisible(true);
  };

  const handleQuantityChange = (amount) => {
    const newQuantity = selectedQuantity + amount;
    if (newQuantity > 0) {
      setSelectedQuantity(newQuantity);
    }
  };

  const handleConfirm = () => {
    const selectedProduct = {
      productId: selectedProductId,
      quantity: selectedQuantity,
    };

    setCart([...cart, selectedProduct]);
    setOrderList([...orderList, selectedProduct]);
    setQuantityModalVisible(false);
    setSelectedProductId(null);
    setSelectedQuantity(1);
    console.log("Danh sách đơn hàng:", orderList);
  };

  const handleCancel = () => {
    setQuantityModalVisible(false);
    setSelectedProductId(null);
    setSelectedQuantity(1);
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.productPrice}>{`Giá: ${item.price} VNĐ`}</Text>
      <TouchableOpacity onPress={() => addToCart(item.id)}>
        <Text style={styles.addToCartButton}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
    </View>
  );

  const handleCheckout = () => {
    // Xử lý khi người dùng chọn thanh toán
    console.log("Đã chọn thanh toán!");
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={isQuantityModalVisible}
        onRequestClose={() => setQuantityModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <ProductDetails id={selectedProductIdForModal} />
            </View>
            <Text style={styles.modalTitle}>Chọn số lượng</Text>
            <View style={styles.quantityButtonsContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(-1)}
              >
                <Icon name="minus" size={20} color="white" />
              </TouchableOpacity>
              <Text style={styles.selectedQuantity}>{selectedQuantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(1)}
              >
                <Icon name="plus" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Xác nhận" onPress={handleConfirm} />
              <Button title="Hủy" onPress={handleCancel} color="red" />
            </View>
          </View>
        </View>
      </Modal>
      <Button
        title="Xem giỏ hàng"
        onPress={() => navigation.navigate("Carts", { cartList: cart, onCheckout: handleCheckout })}
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
  productContainer: {
    marginVertical: 10,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 20,
    height: 200,
    width: '48%',
  },
  productImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productTitle: {
    flex: 2,
    paddingTop: 0,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 14,
  },
  productPrice: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
    margin: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderRadius: 20,
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  quantityButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    backgroundColor: '#5cb85c', // You can use your desired color
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedQuantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addToCartButton: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
