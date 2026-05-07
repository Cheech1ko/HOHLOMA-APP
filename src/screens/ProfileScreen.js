import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../styles/colors';
import { CONTACTS } from '../data/contacts';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Временное состояние

  const handleCall = () => {
    Linking.openURL(`tel:${CONTACTS.phoneRaw}`);
  };

  const handleMap = () => {
    Linking.openURL(`https://maps.google.com/?q=${CONTACTS.coordinates.lat},${CONTACTS.coordinates.lng}`);
  };

  // История посещений (временные данные)
  const bookingHistory = [
    { id: '1', service: 'Мужская стрижка', master: 'Владимир', date: '28 апреля 2026', price: 1800 },
    { id: '2', service: 'Тату (сеанс)', master: 'Даниил Грачёв', date: '15 марта 2026', price: 7000 },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Шапка профиля */}
      <LinearGradient
        colors={[Colors.surface, Colors.background]}
        style={styles.header}
      >
        <View style={styles.avatarContainer}>
          {isLoggedIn ? (
            <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={40} color={Colors.accent} />
            </View>
          )}
        </View>
        <Text style={styles.userName}>
          {isLoggedIn ? 'Иван Петров' : 'Гость'}
        </Text>
        <Text style={styles.userEmail}>
          {isLoggedIn ? 'ivan@example.com' : 'Войдите в аккаунт'}
        </Text>
        
        {!isLoggedIn && (
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Войти / Зарегистрироваться</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>

      {/* Настройки */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Настройки</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="notifications" size={22} color={Colors.accent} />
            <Text style={styles.settingText}>Push-уведомления</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: Colors.border, true: Colors.accent }}
            thumbColor={Colors.surface}
          />
        </View>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="color-palette" size={22} color={Colors.accent} />
            <Text style={styles.settingText}>Тема оформления</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Контакты студии */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Контакты студии</Text>
        
        <TouchableOpacity style={styles.contactItem} onPress={handleCall}>
          <Ionicons name="call" size={22} color={Colors.accent} />
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Позвонить</Text>
            <Text style={styles.contactValue}>{CONTACTS.phone}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.contactItem} onPress={handleMap}>
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

      {/* История посещений */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>История посещений</Text>
        
        {bookingHistory.length > 0 ? (
          bookingHistory.map((booking) => (
            <View key={booking.id} style={styles.historyItem}>
              <View style={styles.historyIcon}>
                <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
              </View>
              <View style={styles.historyInfo}>
                <Text style={styles.historyService}>{booking.service}</Text>
                <Text style={styles.historyDetails}>
                  {booking.master} • {booking.date}
                </Text>
                <Text style={styles.historyPrice}>{booking.price}₽</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>У вас пока нет посещений</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatarContainer: {
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  loginButton: {
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.round,
  },
  loginButtonText: {
    color: Colors.background,
    fontWeight: 'bold',
  },
  section: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 15,
    color: Colors.text,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  contactInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  contactLabel: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  contactValue: {
    fontSize: 14,
    color: Colors.text,
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  historyIcon: {
    marginRight: Spacing.md,
    justifyContent: 'center',
  },
  historyInfo: {
    flex: 1,
  },
  historyService: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  historyDetails: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  historyPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.accent,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.textMuted,
    padding: Spacing.lg,
  },
});