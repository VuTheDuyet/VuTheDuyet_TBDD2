import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';

export default function Carts() {

  const [carts, setCarts] = useState([]);

  useEffect(() => {
    async function fetchCartsData() {
      try {
        const response = await axios.get('https://fakestoreapi.com/carts');
        // Lọc giỏ hàng chỉ cho người dùng có id là 1
        const userCarts = response.data.filter(cart => cart.userId === 1);
        setCarts(userCarts);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu carts:', error);
      }
    }

    fetchCartsData();
  }, []);

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <Text style={{ fontSize: 25 }}>Dữ liệu giỏ hàng</Text>
      <ScrollView>
        {carts.map((cart) => (
          <View key={cart.id} style={{ marginVertical: 10, backgroundColor: 'white', padding: 10, borderRadius: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>ID giỏ hàng: {cart.id}</Text>
            <Text>ID người dùng: {cart.userId}</Text>
            <Text>Ngày: {cart.date}</Text>
            <Text>Sản phẩm:</Text>
            {cart.products.map((product) => (
              <TouchableOpacity key={product.productId} onPress={() => showProductDetails(product.productId)}>
                <View>
                  <Text>{`ID sản phẩm: ${product.productId}, Số lượng: ${product.quantity}`}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
