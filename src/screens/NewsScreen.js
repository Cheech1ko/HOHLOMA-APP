import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors, Spacing } from '../styles/colors';

export default function NewsScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Новости и акции</Text>
        <Text style={styles.subtitle}>Будьте в курсе событий</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.newsCard}>
          <Text style={styles.newsTitle}>✨ Новый мастер по тату!</Text>
          <Text style={styles.newsDate}>5 мая 2026</Text>
          <Text style={styles.newsText}>
            В команду Хохлома присоединился новый мастер — Анна Морозова. 
            Специализируется на реализме и акварели.
          </Text>
        </View>

        <View style={styles.newsCard}>
          <Text style={styles.newsTitle}>🎉 Апрельская акция</Text>
          <Text style={styles.newsDate}>30 апреля 2026</Text>
          <Text style={styles.newsText}>
            Скидка 10% на первый сеанс тату для всех клиентов! 
            Акция действует до конца мая.
          </Text>
        </View>

        <View style={styles.newsCard}>
          <Text style={styles.newsTitle}>📅 График работы в праздники</Text>
          <Text style={styles.newsDate}>28 апреля 2026</Text>
          <Text style={styles.newsText}>
            1-3 мая студия работает с 10:00 до 18:00. 
            9 мая — выходной.
          </Text>
        </View>
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
    textAlign: 'center',
  },
  content: {
    padding: Spacing.md,
  },
  newsCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: 12,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  newsDate: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  newsText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});