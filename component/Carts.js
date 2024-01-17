import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Button } from 'react-native';
import axios from 'axios';
import CartItem from './CartItem';

const Carts = () => {
  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    async function fetchCartsData() {
      try {
        const response = await axios.get('https://fakestoreapi.com/carts');
        // Lọc giỏ hàng chỉ cho người dùng có id là 1
        const userCarts = response.data.filter((cart) => cart.userId === 1);
        setCarts(userCarts);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu carts:', error);
      }
    }

    async function fetchData() {
      await fetchCartsData();
    }

    fetchData();
  }, [carts]);

  const handleToggle = (productId) => {
    setSelectedProducts((prevSelectedProducts) => {
      const index = prevSelectedProducts.indexOf(productId);
      if (index === -1) {
        return [...prevSelectedProducts, productId];
      } else {
        const updatedSelectedProducts = [...prevSelectedProducts];
        updatedSelectedProducts.splice(index, 1);
        return updatedSelectedProducts;
      }
    });
  };

  const handleQuantityChange = (productId, newQuantity) => {
    // Update quantity logic here
  };

  const handleBuy = ({ productId, quantity, totalPrice }) => {
    // Handle buying logic here
    console.log(`Buying product ${productId} with quantity ${quantity} at total price ${totalPrice}`);
  };

  useEffect(() => {
    let totalPrice = 0;
    carts.forEach((cart) => {
      cart.products.forEach((product) => {
        if (selectedProducts.includes(product.productId)) {
          totalPrice += product.quantity * product.price;
        }
      });
    });
    setTotalPrice(totalPrice);
  }, [selectedProducts, carts]);

  const handleCheckout = () => {
    // Logic xử lý thanh toán
    console.log('Total Price:', totalPrice);
    console.log('Selected Products:', selectedProducts);
  };

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <Text style={{ fontSize: 25 }}>Dữ liệu giỏ hàng</Text>
      <ScrollView>
        {carts.map((cart) => (
          <View key={cart.id} style={{ marginVertical: 10, backgroundColor: 'white', padding: 10, borderRadius: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Ngày: {cart.date}</Text>
            <Text>Sản phẩm:</Text>
            {cart.products.map((product) => (
              <CartItem
                key={product.productId}
                id={product.productId}
                quantity={product.quantity}
                isChecked={selectedProducts.includes(product.productId)}
                onToggle={() => handleToggle(product.productId)}
                onQuantityChange={(newQuantity) => handleQuantityChange(product.productId, newQuantity)}
                onBuy={(data) => handleBuy(data)}
              />
            ))}
          </View>
        ))}
      </ScrollView>
      <View style={{ height: 70, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Total Price: {totalPrice}</Text>
        <Button title="Checkout" onPress={handleCheckout} />
      </View>
    </View>
  );
};

export default Carts;