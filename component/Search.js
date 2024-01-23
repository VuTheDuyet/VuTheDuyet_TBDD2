import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native';

const Search = ({ onTextInputChange }) => {
    const [text, setText] = useState('');

    const handleTextChange = (inputText) => {
        setText(inputText);
        onTextInputChange(inputText); // Gọi hàm callback khi TextInput thay đổi
    };


    return (
        <View><TextInput
            placeholder="Tìm kiếm"
            style={styles.searchInput}
            value={text}
            onChangeText={handleTextChange}
        /></View>
    )
}
const styles = StyleSheet.create({

    searchInput: {
        flex: 1,
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderRadius: 20,
        borderWidth: 1,
        margin: 10,
        paddingLeft: 10,
    },

});
export default Search;
