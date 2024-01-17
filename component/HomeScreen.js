import React, { useState, useEffect } from 'react';
import { Button, FlatList, Dimensions, Image, ScrollView, Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import Slide from './Slide';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import CartItem from './CartItem';

function HomeScreen({ navigation }) {
  const [productData, setProductData] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isQuantityModalVisible, setQuantityModalVisible] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const uniqueCategories = [...new Set(productData.map(item => item.category))];
  const allCategories = ['All', ...uniqueCategories];


  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleToggle = (productId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id) => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  const handleRemove = (productId) => {
    // Xóa sản phẩm khỏi giỏ hàng
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
    // Xóa sản phẩm khỏi danh sách đơn hàng
    setOrderList((prevOrders) => prevOrders.filter((item) => item.productId !== productId));
    // Bỏ chọn sản phẩm
    handleToggle(productId);
  };

  const handleCheckout = () => {
    if (selectedProducts.length > 0) {
      // Thực hiện thanh toán cho các sản phẩm đã chọn
      const paidProducts = cart.filter((item) => selectedProducts.includes(item.productId));

      // TODO: Thực hiện logic thanh toán (gọi API thanh toán, cập nhật trạng thái đơn hàng, ...)

      // Cập nhật giỏ hàng và danh sách đơn hàng sau khi thanh toán
      setCart((prevCart) => prevCart.filter((item) => !selectedProducts.includes(item.productId)));
      setOrderList((prevOrders) => prevOrders.filter((item) => !selectedProducts.includes(item.productId)));

      // Bỏ chọn các sản phẩm
      setSelectedProducts([]);
    }
  };


  const getDataUsingAsyncAwaitGetCall = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProductData(response.data);
      setDisplayedProducts(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error.message);
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

  useEffect(() => {
    // Update displayed products based on search keyword
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

    // Thêm sản phẩm vào giỏ hàng
    setCart([...cart, selectedProduct]);

    // Thêm sản phẩm vào danh sách đơn hàng
    setOrderList([...orderList, selectedProduct]);

    // Đóng modal và đặt lại giá trị
    setQuantityModalVisible(false);
    setSelectedProductId(null);
    setSelectedQuantity(1);

    // Hiển thị danh sách đơn hàng trong console
    console.log("Danh sách đơn hàng:", orderList);
  };

  const handleCancel = () => {
    // Đóng modal và đặt lại giá trị
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
      <TextInput
        placeholder="Tìm kiếm"
        style={styles.searchInput}
        onChangeText={(text) => setSearchKeyword(text)}
        value={searchKeyword}
        onSubmitEditing={() => {
          // Khi nhấn Enter trên bàn phím, thực hiện tìm kiếm
          handleConfirm();
        }}
      />
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
        onPress={() => navigation.navigate('Carts', { cartList: cart, onCheckout: handleCheckout })}
      />

      <Text>Gio hang:</Text>
      {orderList.map((product) => (
        <CartItem
          key={product.productId}
          id={product.productId}
          quantity={product.quantity}
          onRemove={() => handleRemove(product.productId)}
        />
      ))}
      {/* Thêm nút chọn thanh toán */}
      <Button
        title="Chọn thanh toán"
        onPress={() => {
          if (selectedProducts.length > 0) {
            setQuantityModalVisible(true);
          }
        }}
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
