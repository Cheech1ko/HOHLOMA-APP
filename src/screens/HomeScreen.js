import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../styles/colors';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const services = [
    { id: 'barber', name: 'БАРБЕРШОП', icon: 'cut', screenName: 'Барбершоп' },
    { id: 'tattoo', name: 'ТАТУ', icon: 'brush', screenName: 'Тату' },
    { id: 'piercing', name: 'ПИРСИНГ', icon: 'body', screenName: 'Пирсинг' },
    { id: 'massage', name: 'МАССАЖ', icon: 'fitness', screenName: 'Массаж' },
  ];

  const features = [
    { icon: 'medkit', title: 'Стерильность', desc: 'Одноразовые иглы и автоклав' },
    { icon: 'color-palette', title: 'Индивидуальный подход', desc: 'Уникальные эскизы' },
    { icon: 'trophy', title: 'Опытные мастера', desc: 'Стаж от 5 до 12 лет' },
    { icon: 'calendar', title: '24/7 Запись', desc: 'Удобное онлайн-бронирование' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero секция с фоновым изображением */}
        <ImageBackground
          source={require('../../assets/images/hero-bg.png')}  // ← путь к твоему bg изображению
          style={styles.heroSection}
          imageStyle={styles.heroBackgroundImage}
        >
          {/* Тёмный overlay сверху (чтобы текст читался) */}
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.85)']}
            style={styles.heroOverlay}
          >
            {/* Логотип */}
            <View style={styles.logoContainer}>
              <Image 
                source={require('../../assets/images/logo-ot-mileny.png')}  // ← путь к лого
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>5 000+</Text>
                <Text style={styles.statLabel}>Клиентов</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>4.9 ★</Text>
                <Text style={styles.statLabel}>247 отзывов</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>2017</Text>
                <Text style={styles.statLabel}>Основаны</Text>
              </View>
            </View>
            
            <TouchableOpacity
              style={styles.bookingButton}
              onPress={() => navigation.navigate('Запись')}
            >
              <Text style={styles.bookingButtonText}>📅 ЗАПИСАТЬСЯ СЕЙЧАС</Text>
            </TouchableOpacity>
          </LinearGradient>
        </ImageBackground>

        {/* Наши услуги */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Наши услуги</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>ВСЕ →</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.servicesGrid}>
            {services.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                onPress={() => navigation.navigate(service.screenName)}
              >
                <Ionicons name={service.icon} size={28} color={Colors.accent} />
                <Text style={styles.serviceName}>{service.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Почему мы */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Почему мы?</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, idx) => (
              <View key={idx} style={styles.featureCard}>
                <Ionicons name={feature.icon} size={28} color={Colors.accent} />
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroSection: {
    width: '100%',
    minHeight: 480,
  },
  heroBackgroundImage: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    minHeight: 480,
    justifyContent: 'center',
  },
  logoContainer: {
    width: 400,
    height: 200,
    marginBottom: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 4,
    color: Colors.accent,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 12,
    letterSpacing: 2,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.border,
  },
  bookingButton: {
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.round,
    width: '100%',
    alignItems: 'center',
  },
  bookingButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  section: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
  },
  lastSection: {
    paddingBottom: Spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  sectionLink: {
    fontSize: 12,
    color: Colors.accent,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  serviceCard: {
    width: (width - Spacing.md * 2 - 36) / 4,
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  serviceName: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    marginTop: 4,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  featureCard: {
    width: (width - Spacing.md * 2 - 12) / 2,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginTop: Spacing.sm,
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 14,
    textAlign: 'center',
  },
});