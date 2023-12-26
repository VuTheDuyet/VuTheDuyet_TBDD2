import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';

const Slide = () => {
    const data = [
        { id: '1', content: 'Slide 1 Content' },
        { id: '2', content: 'Slide 2 Content' },
        { id: '3', content: 'Slide 3 Content' },
        // Add more slides as needed
    ];

    const flatListRef = useRef(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (flatListRef.current) {
                const newIndex = (flatListRef.current.index + 1) % data.length;
                if (newIndex >= 0 && newIndex < data.length) {
                    flatListRef.current.scrollToIndex({ index: newIndex });
                }
            }
        }, 3000); // Đổi giá trị 3000 thành khoảng thời gian bạn muốn

        return () => clearInterval(intervalId);
    }, [data]);

    return (
        <FlatList
            ref={flatListRef}
            data={data}
            horizontal
            pagingEnabled
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.slide}>
                    <Text>{item.content}</Text>
                </View>
            )}
        />
        
    );
};

const styles = StyleSheet.create({
    slide: {
        width:"100%",
        height:200,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        width: Dimensions.get('window').width,
    },
});

export default Slide;
