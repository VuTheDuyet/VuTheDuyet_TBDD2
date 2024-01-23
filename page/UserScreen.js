import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import thêm useNavigation
import RegisterModal from './RegisterModal';

const UserScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);


  const navigation = useNavigation(); // Sử dụng useNavigation để lấy đối tượng navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/users');
        setUserData(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogin = () => {
    if (!userData) {
      Alert.alert('Lỗi', 'Không thể đăng nhập. Vui lòng thử lại sau.');
      return;
    }

    const user = userData.find((user) => user.username === username);

    if (user) {
      if (user.password === password) {
        Alert.alert('Đăng nhập thành công!', `Chào mừng ${user.name.firstname}`);
        console.log('Thông tin người dùng:', user);
        setUserData(user);

        // Chuyển hướng về trang HomeScreen
        navigation.navigate('Trang chủ');
      } else {
        Alert.alert('Đăng nhập thất bại', 'Sai mật khẩu. Vui lòng kiểm tra lại mật khẩu.');
      }
    } else {
      Alert.alert('Đăng nhập thất bại', 'Người dùng không tồn tại. Vui lòng kiểm tra lại tên đăng nhập.');
    }
  };

  const handleRegisterButton = () => {
    // Chuyển hướng về trang đăng ký khi nút đăng ký được nhấn
    navigation.navigate('Đăng ký');
  };
  const handleOpenRegisterModal = () => {
    setRegisterModalVisible(true);
  };

  const handleCloseRegisterModal = () => {
    setRegisterModalVisible(false);
  };

  const handleRegister = (newUser) => {
    setUserData((prevUserData) => [...prevUserData, newUser]);
    handleCloseRegisterModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trang Đăng nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Đăng nhập" onPress={handleLogin} />
      <Button title="Đăng ký" onPress={handleOpenRegisterModal} />
      <RegisterModal
        isVisible={isRegisterModalVisible}
        onClose={handleCloseRegisterModal}
        onRegister={handleRegister}
      />

      {userData && (
        <View style={styles.userDataContainer}>
          <Text style={styles.userDataTitle}>Thông tin người dùng:</Text>
          <Text>{`Email: ${userData.email}`}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%',
  },
  userDataContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  userDataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default UserScreen;
