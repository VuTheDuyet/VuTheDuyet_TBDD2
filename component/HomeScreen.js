import { useEffect, useState } from 'react';
import { Button, FlatList, Dimensions, Image, ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Slide from './Slide';
import axios from 'axios';
function HomeScreen({ navigation }) {

  const [productData, setProductData] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  // Thêm useState để theo dõi category được chọn
  const [selectedCategory, setSelectedCategory] = useState('All');
  // Lọc ra danh sách các category duy nhất
  const uniqueCategories = [...new Set(productData.map(item => item.category))];

  // Thêm "All" vào đầu danh sách
  const allCategories = ['All', ...uniqueCategories];

  const getDataUsingAsyncAwaitGetCall = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProductData(response.data);
      console.log(response.data); // In dữ liệu ra console.log
    } catch (error) {
      alert(error.message);
    }
  };


  useEffect(() => {
    getDataUsingAsyncAwaitGetCall();
  }, []); // Call the API when the component mounts

  const renderItem = ({ item }) => (
    <View style={{ marginVertical: 10, backgroundColor: 'white', margin: 10, borderRadius: 20, height: 240, width: '48%' }}>
      <View style={{ flex: 3 }}>
        <Image
          source={{ uri: item.image }}
          style={{
            flex: 1,
            width: '100%', // Sử dụng chiều rộng 100%
            height: '100%', // Sử dụng chiều cao 100%
            resizeMode: 'contain', // Đảm bảo tỷ lệ hình ảnh được giữ nguyên và vừa với View
            padding: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>
      <View style={{ flex: 1, paddingTop: 0, paddingHorizontal: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 14, lineHeight: 5 }}>{item.title}</Text>
        {/* <Text style={{ color: 'gray' }}>Category: {item.category}</Text> */}
        <Text style={{ color: 'red', fontWeight: 'bold' }}>Giá: ${item.price}</Text>
        <Text style={{ color: 'orange' }}>Đánh giá: {item.rating.rate} ({item.rating.count} reviews)</Text>
      </View>
    </View>
  );


  const handleLayoutChange = () => {
    const { width } = Dimensions.get('window');
    // Calculate the number of columns based on the screen width
    const newNumColumns = Math.floor(width / 200); // You can adjust the item width as needed
    setNumColumns(newNumColumns);
  };



  return (
    <ScrollView style={{ flex: 1, width: "100%" }}>
      <Slide></Slide>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScrollView}>
        {allCategories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryContainer,
              { backgroundColor: selectedCategory === category ? 'gray' : 'lightgray' },
            ]}
            onPress={() => {
              setSelectedCategory(category);
              console.log('Pressed on category:', category);
            }}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={{ fontSize: 25 }}>Sản phẩm mới</Text>
      <FlatList
        data={productData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        onLayout={handleLayoutChange}
      />


    </ScrollView>
  );
}
export default HomeScreen;
const styles = StyleSheet.create({
  // ... (code styles trước đó)

  categoryScrollView: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  categoryContainer: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'lightgray',
    borderRadius: 15,
  },
  categoryText: {
    fontWeight: 'bold',
  },
});
