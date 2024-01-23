import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const RenderItem = ({ item }) => {




    // const addToCart = (productId) => {
    //     setSelectedProductId(productId);
    //     setQuantityModalVisible(true);
    // };

    // const handleQuantityChange = (amount) => {
    //     const newQuantity = selectedQuantity + amount;
    //     if (newQuantity > 0) {
    //         setSelectedQuantity(newQuantity);
    //     }
    // };

    // const handleConfirm = () => {
    //     const selectedProduct = {
    //         productId: selectedProductId,
    //         quantity: selectedQuantity,
    //     };

    //     // Thêm sản phẩm vào giỏ hàng
    //     setCart([...cart, dataCard]);

    //     // Thêm sản phẩm vào danh sách đơn hàng
    //     setOrderList([...orderList, selectedProduct]);

    //     // Đóng modal và đặt lại giá trị
    //     setQuantityModalVisible(false);
    //     setSelectedProductId(null);
    //     setSelectedQuantity(1);

    //     // Hiển thị danh sách đơn hàng trong console
    //     console.log("Danh sách đơn hàng:", orderList);
    // };

    // const handleCancel = () => {
    //     // Đóng modal và đặt lại giá trị
    //     setQuantityModalVisible(false);
    //     setSelectedProductId(null);
    //     setSelectedQuantity(1);
    // };


    return (
        <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.productPrice}>{`Giá: ${item.price} VNĐ`}</Text>
            <TouchableOpacity onPress={() => addToCart(item.id)}>
                <Text style={styles.addToCartButton}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
        </View>
    );

};
const styles = StyleSheet.create({
    productContainer: {
        marginVertical: 10,
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 20,
        height: 250,
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

    addToCartButton: {
        color: 'blue',
        fontWeight: 'bold',
    },
});
export default RenderItem;