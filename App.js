import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './component/HomeScreen';
import SettingsScreen from './component/SettingsScreen';
import UserScreen from './component/UserScreen';
import Icon from 'react-native-vector-icons/Ionicons';



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Trang chủ" component={HomeScreen} options={{
        tabBarLabel: 'Trang chủ',
        tabBarBadge: 39,
        tabBarIcon: ({ color, size }) => (
          <Icon name="home-outline" color={color} size={size} />
        ),
      }}  /> 
        <Tab.Screen name='Live' component={UserScreen} options={{
        tabBarLabel: 'Livetream',
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
      }}/>
        <Tab.Screen name='Tôi' component={UserScreen} options={{
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