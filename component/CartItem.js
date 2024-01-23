// CartItem.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const CartItem = ({ id, quantity, price, isChecked, onToggle, onQuantityChange, onBuy, onRemove }) => {
    const [product, setProduct] = useState(null);
    const [localQuantity, setLocalQuantity] = useState(quantity);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error(`Error fetching product details for productId ${id}:`, error);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleIncrement = () => {
        const newQuantity = localQuantity + 1;
        setLocalQuantity(newQuantity);
        onQuantityChange(id, newQuantity, price); // Pass the updated quantity and price
    };

    const handleDecrement = () => {
        if (localQuantity > 1) {
            const newQuantity = localQuantity - 1;
            setLocalQuantity(newQuantity);
            onQuantityChange(id, newQuantity, price); // Pass the updated quantity and price
        }
    };

    const handleBuy = async () => {
        const totalPrice = await calculateTotalPrice(id, localQuantity);
        onBuy({ productId: id, quantity: localQuantity, totalPrice });
    };

    const handleRemovePress = () => {
        onRemove(id);
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
                <TouchableOpacity style={styles.removeButton} onPress={handleRemovePress}>
                    <Text style={styles.buttonText}>Remove</Text>
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
    buyButton: {
        backgroundColor: 'blue',
        padding: 5,
        borderRadius: 5,
        marginRight: 5,
    },
    removeButton: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
        marginRight: 5,
    },
});

export default CartItem;
