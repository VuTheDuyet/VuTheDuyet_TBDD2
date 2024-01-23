import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Lấy dữ liệu người dùng từ API khi màn hình được tải
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
      } else {
        Alert.alert('Đăng nhập thất bại', 'Sai mật khẩu. Vui lòng kiểm tra lại mật khẩu.');
      }
    } else {
      Alert.alert('Đăng nhập thất bại', 'Người dùng không tồn tại. Vui lòng kiểm tra lại tên đăng nhập.');
    }
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

      {userData && (
        <View style={styles.userDataContainer}>
          <Text style={styles.userDataTitle}>Thông tin người dùng:</Text>
          <Text></Text>
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

export default Login;
