import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../styles/colors';
import { TATTOO_MASTERS, TATTOO_FEATURES, TATTOO_PRICES, WEEKEND_SURCHARGE } from '../data/tattooMasters';

export default function TattooScreen({ navigation }) {
  const handleMasterPress = (master) => {
    navigation.navigate('Запись', { 
      service: 'Тату',
      master: master.name 
    });
  };
  
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[Colors.surface, Colors.background]}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Тату-студия</Text>
        <Text style={styles.subtitle}>Индивидуальный подход, стерильность, профессиональные мастера</Text>
      </LinearGradient>
      
      {/* Преимущества */}
      <View style={styles.featuresContainer}>
        {TATTOO_FEATURES.map((feature, idx) => (
          <View key={idx} style={styles.featureChip}>
            <Text style={styles.featureText}>✓ {feature}</Text>
          </View>
        ))}
      </View>
      
      {/* Мастера */}
      <Text style={styles.sectionTitle}> Мастера тату</Text>
      {TATTOO_MASTERS.map((master) => (
        <TouchableOpacity
          key={master.id}
          style={styles.masterCard}
          onPress={() => handleMasterPress(master)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[Colors.surface, Colors.surfaceLight]}
            style={styles.cardGradient}
          >
            <View style={styles.cardContent}>
              {/* Аватар с фото */}
              <View style={styles.avatarContainer}>
                {master.photo ? (
                  <Image 
                    source={master.photo} 
                    style={styles.avatar}
                    onError={() => console.log('Ошибка фото:', master.name)}
                  />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>{master.name.charAt(0)}</Text>
                  </View>
                )}
                <View style={[styles.levelBadge, { backgroundColor: Colors.accent }]}>
                  <Text style={styles.levelBadgeText}>{master.level}</Text>
                </View>
              </View>
              
              {/* Информация */}
              <View style={styles.infoContainer}>
                <Text style={styles.masterName}>{master.name}</Text>
                <Text style={styles.masterDetail}> {master.style}</Text>
                <Text style={styles.masterDetail}> Стаж: {master.experience}</Text>
                <Text style={styles.masterDetail}> {master.specialty}</Text>
                
                <View style={styles.priceContainer}>
                  <View style={styles.priceChip}>
                    <Text style={styles.priceLabel}>До 5 см</Text>
                    <Text style={styles.priceValue}>{master.price.small}₽</Text>
                  </View>
                  <View style={styles.priceChip}>
                    <Text style={styles.priceLabel}>Сеанс (3ч)</Text>
                    <Text style={styles.priceValue}>{master.price.session}₽</Text>
                  </View>
                  {master.price.coverup && (
                    <View style={styles.priceChip}>
                      <Text style={styles.priceLabel}>Перекрытие</Text>
                      <Text style={styles.priceValue}>{master.price.coverup}₽</Text>
                    </View>
                  )}
                </View>
              </View>
              
              <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      ))}
      
      <Text style={styles.sectionTitle}>💰 Прайс-лист</Text>
      {TATTOO_PRICES.map((item, idx) => (
        <View key={idx} style={styles.priceCard}>
          <Text style={styles.serviceName}>{item.name}</Text>
          <Text style={styles.servicePrice}>{item.price}</Text>
        </View>
      ))}

      <Text style={styles.note}>* В выходные и праздничные дни +{WEEKEND_SURCHARGE}₽</Text>
      <View style={styles.bottomPadding} />
    </ScrollView>
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
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: Spacing.md,
    gap: 8,
  },
  featureChip: {
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.round,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  featureText: {
    fontSize: 11,
    color: Colors.accent,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  masterCard: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
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
  priceContainer: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 8,
    flexWrap: 'wrap',
  },
  priceChip: {
    flexDirection: 'row',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.round,
    gap: 4,
  },
  priceLabel: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  priceValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.accent,
  },
  note: {
    textAlign: 'center',
    color: Colors.textMuted,
    fontSize: 11,
    marginTop: Spacing.md,
  },
  bottomPadding: {
    height: 40,
  },
});