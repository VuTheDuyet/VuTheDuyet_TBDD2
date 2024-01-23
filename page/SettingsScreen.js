import React, { useState } from 'react';
import { Button, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SettingsScreen({ route, navigation }) {
  const { totalPrice } = route.params || {};
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [nextOrderId, setNextOrderId] = useState(1);

  const addToPaymentHistory = () => {
    const newPayment = { orderId: nextOrderId, totalPrice };
    setPaymentHistory((prevHistory) => [...prevHistory, newPayment]);
    setNextOrderId((prevId) => prevId + 1);
  };

  const removeFromPaymentHistory = (orderId) => {
    const updatedHistory = paymentHistory.filter((item) => item.orderId !== orderId);
    setPaymentHistory(updatedHistory);
  };

  const handleDelete = (orderId) => {
    Alert.alert(
      'Xóa đơn hàng',
      'Bạn có chắc chắn muốn xóa đơn hàng này?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xóa', onPress: () => removeFromPaymentHistory(orderId) },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginTop: 20 }}>
        Total Price from Carts: ${totalPrice ? totalPrice.toFixed(2) : 0}
      </Text>
      <Button
        title="Add to Payment History"
        onPress={() => {
          addToPaymentHistory();
          navigation.navigate('Home');
        }}
      />

      <Text style={{ fontSize: 20, marginTop: 20 }}>Payment History:</Text>

      {paymentHistory.length > 0 ? (
        <FlatList
          data={paymentHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginTop: 10 }}>
              <Text>Order ID: {item.orderId}</Text>
              <Text>Total Price: ${item.totalPrice.toFixed(2)}</Text>
              <TouchableOpacity
                style={{ marginTop: 5, backgroundColor: 'red', padding: 5, borderRadius: 5 }}
                onPress={() => handleDelete(item.orderId)}
              >
                <Text style={{ color: 'white' }}>Xóa đơn hàng</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={{ fontSize: 16, marginTop: 10 }}>Danh sách trống</Text>
      )}
    </View>
  );
}

export default SettingsScreen;
