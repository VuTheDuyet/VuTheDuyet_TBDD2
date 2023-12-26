import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const YourComponent = ({ id, title }) => {
  return (
    <View style={styles.cardContainer}>
      
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 100,
    backgroundColor: 'white', // Optional: Set a background color
    padding: 10, // Optional: Add padding for better appearance
    // Other styling properties as needed
  },
  text: {
    fontSize: 16, // Optional: Set font size
    // Other text styling properties as needed
  },
});

export default YourComponent;
