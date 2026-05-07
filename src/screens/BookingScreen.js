import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors, Spacing, BorderRadius } from '../styles/colors';

export default function BookingScreen() {
  const handleBooking = () => {
    alert('Форма записи скоро будет добавлена!');
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Запись</Text>
        <Text style={styles.subtitle}>Онлайн-бронирование</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.infoText}>
          Здесь будет форма записи с выбором услуги, мастера, даты и времени.
        </Text>
        <Text style={styles.infoTextSub}>
          Заявки будут отправляться в Telegram и CRM Арника.
        </Text>
        
        <TouchableOpacity style={styles.button} onPress={handleBooking}>
          <Text style={styles.buttonText}>📅 Записаться</Text>
        </TouchableOpacity>
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
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.accent,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  card: {
    backgroundColor: Colors.surface,
    margin: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  infoTextSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  button: {
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.round,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});