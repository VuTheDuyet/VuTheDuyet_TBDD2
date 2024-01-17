import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';

const CartItem = ({ id, quantity, isChecked, onToggle, onQuantityChange, onBuy }) => {
    const [product, setProduct] = useState(null);
    const [localQuantity, setLocalQuantity] = useState(quantity);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error(`Lỗi khi lấy dữ liệu sản phẩm ${id}:`, error);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleIncrement = () => {
        const newQuantity = localQuantity + 1;
        setLocalQuantity(newQuantity);
        onQuantityChange(newQuantity);
    };

    const handleDecrement = () => {
        if (localQuantity > 1) {
            const newQuantity = localQuantity - 1;
            setLocalQuantity(newQuantity);
            onQuantityChange(newQuantity);
        }
    };

    const handleBuy = () => {
        // Tính toán tổng giá trị sản phẩm và gọi hàm onBuy để truyền dữ liệu về Carts
        const totalPrice = product.price * localQuantity;
        onBuy({ productId: id, quantity: localQuantity, totalPrice });
    };

    if (!product) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CheckBox checked={isChecked} onPress={onToggle} />
            <Image source={{ uri: product.image }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>{`Price: ${product.price}`}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.quantityButton} onPress={handleDecrement}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{localQuantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={handleIncrement}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
                    <Text style={styles.buttonText}>Buy</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginVertical: 5,
    },
    checkbox: {
        marginRight: 10,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    price: {
        marginTop: 5,
        color: 'green',
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: '#ddd',
        padding: 5,
        borderRadius: 5,
        marginRight: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    quantity: {
        fontSize: 16,
        marginHorizontal: 5,
    },
});

export default CartItem;
