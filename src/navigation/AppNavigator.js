import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';

// Импорт экранов для таб-бара
import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import BookingScreen from '../screens/BookingScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Импорт экранов услуг
import BarberScreen from '../screens/BarberScreen';
import TattooScreen from '../screens/TattooScreen';
import PiercingScreen from '../screens/PiercingScreen';
import MassageScreen from '../screens/MassageScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Таб-навигатор
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Главная') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Новости') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Запись') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Профиль') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 75,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Главная" component={HomeScreen} />
      <Tab.Screen name="Новости" component={NewsScreen} />
      <Tab.Screen name="Запись" component={BookingScreen}
      options = {{ headerShown: false, headerTitle: '' }}/>
      <Tab.Screen name="Профиль" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Главный навигатор
export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="Барбершоп" component={BarberScreen} />
      <Stack.Screen name="Тату" component={TattooScreen} />
      <Stack.Screen name="Пирсинг" component={PiercingScreen} />
      <Stack.Screen name="Массаж" component={MassageScreen} />
      <Stack.Screen name="Запись" component={BookingScreen} />
    </Stack.Navigator>
  );
}