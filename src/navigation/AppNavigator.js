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

// Импорт экранов услуг (открываются как отдельные страницы)
import BarberScreen from '../screens/BarberScreen';
import TattooScreen from '../screens/TattooScreen';
import PiercingScreen from '../screens/PiercingScreen';
import MassageScreen from '../screens/MassageScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Компонент таб-навигации (4 основных экрана)
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
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: Colors.background,
          borderBottomWidth: 1,
          borderBottomColor: Colors.border,
        },
        headerTintColor: Colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Главная" component={HomeScreen}
      options={{ headerShown: false }} />
      <Tab.Screen name="Новости" component={NewsScreen} />
      <Tab.Screen name="Запись" component={BookingScreen} />
      <Tab.Screen name="Профиль" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Главный навигатор (Stack + Tab вместе)
export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Скрываем заголовок Stack, так как у табов он уже есть
      }}
    >
      {/* Таб-навигатор как главный экран */}
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      
      {/* Экраны услуг (открываются поверх табов с кнопкой "Назад") */}
      <Stack.Screen 
        name="Барбершоп" 
        component={BarberScreen}
        options={{
          headerShown: true,
          title: 'Барбершоп',
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.text,
          headerBackTitle: 'Назад',
        }}
      />
      <Stack.Screen 
        name="Тату" 
        component={TattooScreen}
        options={{
          headerShown: true,
          title: 'Тату-студия',
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.text,
          headerBackTitle: 'Назад',
        }}
      />
      <Stack.Screen 
        name="Пирсинг" 
        component={PiercingScreen}
        options={{
          headerShown: true,
          title: 'Пирсинг',
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.text,
          headerBackTitle: 'Назад',
        }}
      />
      <Stack.Screen 
        name="Массаж" 
        component={MassageScreen}
        options={{
          headerShown: true,
          title: 'Массаж',
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.text,
          headerBackTitle: 'Назад',
        }}
      />
    </Stack.Navigator>
  );
}