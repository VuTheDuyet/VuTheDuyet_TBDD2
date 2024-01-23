// App.js

import React, { useState } from 'react';
import { Text, View, SafeAreaView, Image, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './page/HomeScreen';
import SettingsScreen from './page/SettingsScreen';
import UserScreen from './page/UserScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import Carts from './page/Carts';

const Tab = createBottomTabNavigator();

export default function App() {
  const [searchKeyword, setSearchKeyword] = useState(null);


  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Trang chủ" options={{
          tabBarLabel: 'Trang chủ',
          tabBarBadge: 39,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
          header: () => (
            <SafeAreaView>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('./assets/favicon.png')}
                  style={{ width: 40, height: 40, borderRadius: 20, margin: 10 }}
                />
                <TextInput
                  placeholder="Tìm kiếm"
                  style={{ flex: 1, height: 40, borderColor: 'gray', borderRadius: 20, borderWidth: 1, margin: 10, paddingLeft: 10 }}
                  value={searchKeyword}
                  onChangeText={(text) => setSearchKeyword(text)}
                />
                <View style={{ width: 30, height: 30, marginRight: 10 }}>
                  <Icon name="notifications-outline" size={30} color="black" />
                  <View
                    style={{
                      position: 'absolute',
                      top: -5,
                      right: -5,
                      backgroundColor: 'red',
                      borderRadius: 10,
                      width: 20,
                      height: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: 'white' }}>{39}</Text>
                  </View>
                </View>
              </View>
            </SafeAreaView>
          ),
        }}>
          {({ navigation }) => (
            <HomeScreen
              onSearch={searchKeyword}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name='Carts' component={Carts} options={{

          tabBarBadge: 39,
          tabBarIcon: ({ color, size }) => (
            <Icon name="camera-outline" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name=" " component={UserScreen} options={{
          tabBarLabel: 'Thông báo',
          tabBarBadge: 39,
          tabBarIcon: ({ color, size }) => (
            <Icon name="notifications-outline" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name='Login' component={UserScreen} options={{
          tabBarLabel: 'Tôi',
          tabBarBadge: 39,
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name="Cài đặt" component={SettingsScreen} options={{
          tabBarLabel: 'Cài đặt',
          tabBarBadge: 39,
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings-outline" color={color} size={size} />
          ),
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}