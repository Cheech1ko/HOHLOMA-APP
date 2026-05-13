import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../styles/colors';

const NEWS = [
  {
    id: '1',
    title: 'Новый мастер по тату!',
    date: '5 мая 2026',
    description: 'В команду Хохлома присоединился новый мастер — Анна Морозова. Специализируется на реализме и акварели.',
  },
  {
    id: '2',
    title: 'Апрельская акция',
    date: '30 апреля 2026',
    description: 'Скидка 10% на первый сеанс тату для всех клиентов! Акция действует до конца мая.',
  },
  {
    id: '3',
    title: 'График работы в праздники',
    date: '28 апреля 2026',
    description: '1-3 мая студия работает с 10:00 до 18:00. 9 мая — выходной.',
  },
];

export default function NewsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Новости и акции</Text>
        <Text style={styles.subtitle}>Будьте в курсе событий</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {NEWS.map((item) => (
          <View key={item.id} style={styles.newsCard}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsDate}>{item.date}</Text>
            <Text style={styles.newsText}>{item.description}</Text>
          </View>
        ))}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: Spacing.md,
    top: Spacing.xl,
    zIndex: 1,
    padding: Spacing.sm,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.accent,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  newsCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
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
  bottomPadding: {
    height: 40,
  },
});