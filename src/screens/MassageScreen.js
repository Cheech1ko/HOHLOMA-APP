import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../styles/colors';
import { MASSAGE_MASTER, MASSAGE_PRICES } from '../data/massage';

export default function MassageScreen({ navigation }) {
  const handleBooking = () => {
    navigation.navigate('Запись', { 
      service: 'Массаж',
      master: MASSAGE_MASTER.name 
    });
  };
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Массаж</Text>
        <Text style={styles.subtitle}>Классический, спортивный, антицеллюлитный массаж</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* Мастер */}
        <TouchableOpacity style={styles.masterCard} onPress={handleBooking} activeOpacity={0.8}>
          <LinearGradient colors={[Colors.surface, Colors.surfaceLight]} style={styles.cardGradient}>
            <View style={styles.cardContent}>
              <View style={styles.avatarContainer}>
                {MASSAGE_MASTER.photo ? (
                  <Image source={MASSAGE_MASTER.photo} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>{MASSAGE_MASTER.name.charAt(0)}</Text>
                  </View>
                )}
                <View style={[styles.levelBadge, { backgroundColor: Colors.accent }]}>
                  <Text style={styles.levelBadgeText}>{MASSAGE_MASTER.level}</Text>
                </View>
              </View>
              
              <View style={styles.infoContainer}>
                <Text style={styles.masterName}>{MASSAGE_MASTER.name}</Text>
                <Text style={styles.masterDetail}> Стаж: {MASSAGE_MASTER.experience}</Text>
                <Text style={styles.masterDetail}> {MASSAGE_MASTER.specialty}</Text>
                <Text style={styles.masterDetail}> {MASSAGE_MASTER.education}</Text>
              </View>
              
              <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
        
        {/* Прайс-лист */}
        <Text style={styles.sectionTitle}>💰 Прайс-лист</Text>
        {MASSAGE_PRICES.map((item, idx) => (
          <View key={idx} style={styles.priceCard}>
            <Text style={styles.serviceName}>{item.name}</Text>
            <Text style={styles.servicePrice}>{item.price}₽</Text>
          </View>
        ))}
        
        <Text style={styles.note}>✨ Массаж проводится с использованием профессиональных масел и кремов</Text>
        <Text style={styles.note}>🕐 Рекомендуется предварительная запись за 1-2 дня</Text>
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
  masterCard: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    marginTop: Spacing.md,
  },
  cardGradient: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  avatar: {
    width: 64,
    height: 80,
    borderRadius: 20,
    backgroundColor: Colors.surfaceLight,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.accent,
  },
  levelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.round,
  },
  levelBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: Colors.background,
  },
  infoContainer: {
    flex: 1,
  },
  masterName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 2,
  },
  masterDetail: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  priceCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.accent,
  },
  note: {
    textAlign: 'center',
    color: Colors.textMuted,
    fontSize: 11,
    marginVertical: Spacing.sm,
    marginHorizontal: Spacing.md,
  },
  bottomPadding: {
    height: 40,
  },
});