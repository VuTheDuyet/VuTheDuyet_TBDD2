// ProductDetailModal.js
import React from 'react';
import { View, Text, Modal, Button, Image } from 'react-native';

const ProductDetailModal = ({ isVisible, product, onClose }) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={false}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={{ uri: product.image }} style={{ width: 200, height: 200 }} />
        <Text>{product.title}</Text>
        <Text>{`Price: ${product.price}`}</Text>
        {/* Thêm các thông tin chi tiết sản phẩm khác tại đây */}
        <Button title="Đóng" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default ProductDetailModal;
