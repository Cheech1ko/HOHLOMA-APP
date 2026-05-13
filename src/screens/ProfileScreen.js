import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Linking,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../styles/colors';
import { CONTACTS } from '../data/contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginName, setLoginName] = useState('');
  const [bookingHistory, setBookingHistory] = useState('');

  useEffect(() => {
    loadUserData();
    loadHistory();
  }, []);

  const loadUserData = async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      const phone = await AsyncStorage.getItem('userPhone');
      if (name && phone) {
        setUserName(name);
        setUserPhone(phone);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Ошибка загрузки', error);
    }
  };

  const loadHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('bookingHistory');
      if (history) {
        setBookingHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Ошибка загрузки истории', error);
    }
  };

  const handleLogin = async () => {
    if (!loginName.trim() || !loginPhone.trim()) {
      Alert.alert('Ошибка', 'Заполните имя и телефон');
      return;
    }

    try {
      await AsyncStorage.setItem('userName', loginName);
      await AsyncStorage.setItem('userPhone', loginPhone);
      setUserName(loginName);
      setUserPhone(loginPhone);
      setIsLoggedIn(true);
      setLoginName('');
      setLoginPhone('');
      Alert.alert('Успешно', 'Вы вошли в аккаунт');
    } catch (error) {
      Alert.alert('Ошибка','Не удалось сохранить данные');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userName');
      await AsyncStorage.removeItem('userPhone');
      setIsLoggedIn(false);
      setUserName('');
      setUserPhone('');
      Alert.alert('Вы вышли из аккаунта!');
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось выйти');
  }
  };

  if (!isLoggedIn) {
  return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
        
        <View style={styles.header}>
          <Text style={styles.title}>Профиль</Text>
          <Text style={styles.subtitle}>Войдите, чтобы видеть историю</Text>
        </View>
        
        <ScrollView style={styles.scrollView}>
          <LinearGradient colors={[Colors.surface, Colors.surfaceLight]} style={styles.loginCard}>
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={50} color={Colors.accent} />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Ваше имя</Text>
              <TextInput
                style={styles.input}
                placeholder="Иван Петров"
                placeholderTextColor={Colors.textMuted}
                value={loginName}
                onChangeText={setLoginName}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Номер телефона</Text>
              <TextInput
                style={styles.input}
                placeholder="+7 (999) 123-45-67"
                placeholderTextColor={Colors.textMuted}
                keyboardType="phone-pad"
                value={loginPhone}
                onChangeText={setLoginPhone}
              />
            </View>
            
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <LinearGradient colors={[Colors.accent, Colors.accentDark]} style={styles.loginButtonGradient}>
                <Text style={styles.loginButtonText}>Войти</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Профиль</Text>
        <Text style={styles.subtitle}>Добро пожаловать</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <LinearGradient colors={[Colors.surface, Colors.surfaceLight]} style={styles.userCard}>
          <View style={styles.avatarLoggedIn}>
            <Ionicons name="person" size={40} color={Colors.accent} />
          </View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userPhone}>{userPhone}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Выйти</Text>
          </TouchableOpacity>
        </LinearGradient>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>История посещений</Text>
          {bookingHistory.length > 0 ? (
            bookingHistory.map((item, idx) => (
              <View key={idx} style={styles.historyCard}>
                <View style={styles.historyIcon}>
                  <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
                </View>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyService}>{item.service}</Text>
                  <Text style={styles.historyDetails}>
                    {item.master} • {item.date}
                  </Text>
                  <Text style={styles.historyPrice}>{item.price}₽</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>У вас пока нет посещений</Text>
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Контакты студии</Text>
          
          <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL(`tel:${CONTACTS.phoneRaw}`)}>
            <Ionicons name="call" size={22} color={Colors.accent} />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Позвонить</Text>
              <Text style={styles.contactValue}>{CONTACTS.phone}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL(`https://maps.google.com/?q=${CONTACTS.coordinates.lat},${CONTACTS.coordinates.lng}`)}>
            <Ionicons name="location" size={22} color={Colors.accent} />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Как проехать</Text>
              <Text style={styles.contactValue}>{CONTACTS.address}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
          
          <View style={styles.contactItem}>
            <Ionicons name="time" size={22} color={Colors.accent} />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Режим работы</Text>
              <Text style={styles.contactValue}>{CONTACTS.workHours}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: Spacing.xl, paddingBottom: Spacing.md, paddingHorizontal: Spacing.md, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: Colors.border },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.accent, marginBottom: 4 },
  subtitle: { fontSize: 12, color: Colors.textSecondary },
  scrollView: { flex: 1 },
  
  loginCard: { margin: Spacing.md, padding: Spacing.lg, borderRadius: BorderRadius.lg, alignItems: 'center' },
  userCard: { margin: Spacing.md, padding: Spacing.lg, borderRadius: BorderRadius.lg, alignItems: 'center' },
  avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.surfaceLight, justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.md, borderWidth: 2, borderColor: Colors.accent },
  avatarLoggedIn: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.surfaceLight, justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.md, borderWidth: 2, borderColor: Colors.accent },
  
  inputGroup: { width: '100%', marginBottom: Spacing.md },
  label: { fontSize: 14, fontWeight: '500', color: Colors.text, marginBottom: Spacing.xs },
  input: { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, borderRadius: BorderRadius.md, padding: Spacing.md, fontSize: 16, color: Colors.text },
  
  loginButton: { width: '100%', borderRadius: BorderRadius.round, overflow: 'hidden', marginTop: Spacing.sm },
  loginButtonGradient: { alignItems: 'center', paddingVertical: Spacing.md },
  loginButtonText: { fontSize: 16, fontWeight: 'bold', color: Colors.background },
  
  userName: { fontSize: 20, fontWeight: 'bold', color: Colors.text, marginBottom: 4 },
  userPhone: { fontSize: 14, color: Colors.textSecondary, marginBottom: Spacing.md },
  logoutButton: { padding: Spacing.sm },
  logoutText: { color: '#e74c3c', fontSize: 14 },
  
  section: { marginTop: Spacing.lg, paddingHorizontal: Spacing.md },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text, marginBottom: Spacing.md },
  
  historyCard: { flexDirection: 'row', backgroundColor: Colors.surface, padding: Spacing.md, borderRadius: BorderRadius.md, marginBottom: Spacing.sm, borderWidth: 1, borderColor: Colors.border },
  historyIcon: { marginRight: Spacing.md, justifyContent: 'center' },
  historyInfo: { flex: 1 },
  historyService: { fontSize: 15, fontWeight: '600', color: Colors.text, marginBottom: 2 },
  historyDetails: { fontSize: 12, color: Colors.textSecondary, marginBottom: 4 },
  historyPrice: { fontSize: 13, fontWeight: 'bold', color: Colors.accent },
  
  contactItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, padding: Spacing.md, borderRadius: BorderRadius.md, marginBottom: Spacing.sm, borderWidth: 1, borderColor: Colors.border },
  contactInfo: { flex: 1, marginLeft: Spacing.md },
  contactLabel: { fontSize: 13, color: Colors.textMuted },
  contactValue: { fontSize: 14, color: Colors.text },
  emptyText: { textAlign: 'center', color: Colors.textMuted, padding: Spacing.lg },
});