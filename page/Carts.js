// Carts.js
import React, { useState, useEffect } from 'react';
import { View, Modal, Text, Button } from 'react-native';
import axios from 'axios';
import CartItem from '../component/CartItem';

const Carts = ({ route }) => {
  const { cartList, onCheckout } = route.params;
  const [cartList2, setCartList2] = useState([]);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartList2(cartList);
    updateTotalPrice();
  }, [cartList]);

  const handleRemove = (productId) => {
    const updatedCartList2 = cartList2.filter((product) => product.productId !== productId);
    setCartList2(updatedCartList2);
    updateTotalPrice();
  };

  const handleCheckout = () => {
    setConfirmationVisible(true);
  };

  const handleConfirmation = () => {
    onCheckout();
    setCartList2([]);
    setTotalPrice(0);
    setConfirmationVisible(false);
  };

  // Update cartList2 when quantity changes
  const updateCartList2 = async (productId, newQuantity) => {
    const updatedCartList2 = cartList2.map(async (product) => {
      if (product.productId === productId) {
        // Fetch product details from the API to get the latest price
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        const updatedProduct = { ...product, quantity: newQuantity, price: response.data.price };
        return updatedProduct;
      }
      return product;
    });

    // Wait for all API calls to complete
    const updatedCartList = await Promise.all(updatedCartList2);

    setCartList2(updatedCartList);
    updateTotalPrice();
  };

  // Function to update the total price based on the current cartList2
  const updateTotalPrice = async () => {
    // Fetch the prices for all products in cartList2 from the API
    const totalPricePromises = cartList2.map(async (product) => {
      const response = await axios.get(`https://fakestoreapi.com/products/${product.productId}`);
      return response.data.price * product.quantity;
    });

    // Wait for all API calls to complete
    const productPrices = await Promise.all(totalPricePromises);

    // Calculate the total price
    const updatedTotalPrice = productPrices.reduce((total, productPrice) => total + productPrice, 0);
    setTotalPrice(updatedTotalPrice);
  };

  return (
    <View>
      {/* Display cart items */}
      {cartList2.map((product) => (
        <CartItem
          key={product.productId}
          id={product.productId}
          quantity={product.quantity}
          price={product.price}
          isChecked={product.isChecked}
          onToggle={() => { }}
          onQuantityChange={updateCartList2}
          onBuy={() => { }}
          onRemove={handleRemove}
        />
      ))}

      {/* Display total price */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>
        Total Price: ${totalPrice.toFixed(2)}
      </Text>

      {/* Add checkout button */}
      <Button
        title="Checkout"
        onPress={() => {
          if (cartList2.length > 0) {
            handleCheckout(totalPrice);
          }
        }}
      />

      {/* Confirmation modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isConfirmationVisible}
        onRequestClose={() => setConfirmationVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text>Xác nhận thanh toán {totalPrice.toFixed(2)}</Text>
            <Button title="Xác nhận" onPress={handleConfirmation} />
            <Button title="Hủy" onPress={() => setConfirmationVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Carts;
