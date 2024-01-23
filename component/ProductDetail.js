import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ProductDetails = ({ id }) => {
    const [product, setProduct] = useState(null);

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

    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View>
            <View style={styles.container}>
                <Image style={styles.productImage} source={{ uri: product.image }} />

                {/* Các tương tác khác hoặc thêm logic xóa sản phẩm */}
            </View>
            <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{product.title}</Text>
                <Text style={styles.productPrice}>{`Giá: ${product.price} VNĐ`}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginVertical: 5,
        height: 300
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productDetails: {
        width: '100%',
        height: '30%',
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productPrice: {
        color: 'red',
        fontWeight: 'bold',
    },
    productDescription: {
        fontSize: 12,
        color: '#777',
    },
});

export default ProductDetails;
