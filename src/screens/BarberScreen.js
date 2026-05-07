import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../styles/colors';
import { BARBERS, BARBER_PRICES } from '../data/barbers';

const { width } = Dimensions.get('window');

export default function BarberScreen({ navigation }) {
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  
  const levels = ['ALL', 'BARBER', 'PROF', 'TOP'];
  
  const filteredBarbers = selectedLevel === 'ALL' 
    ? BARBERS 
    : BARBERS.filter(b => b.level === selectedLevel);
  
  const getLevelColor = (level) => {
    switch(level) {
      case 'TOP': return Colors.accent;
      case 'PROF': return '#3498db';
      case 'BARBER': return '#2ecc71';
      default: return Colors.textMuted;
    }
  };
  
  const handleMasterPress = (master) => {
    navigation.navigate('Запись', { 
      service: 'Барбершоп',
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
        <Text style={styles.title}>Барбершоп</Text>
        <Text style={styles.subtitle}>Мужские стрижки, бритьё, моделирование бороды</Text>
      </LinearGradient>
      
      {/* Фильтр по рангам */}
      <View style={styles.filterContainer}>
        {levels.map(level => (
          <TouchableOpacity
            key={level}
            style={[styles.filterChip, selectedLevel === level && styles.filterChipActive]}
            onPress={() => setSelectedLevel(level)}>
            <Text style={[styles.filterText, selectedLevel === level && styles.filterTextActive]}>
              {level === 'ALL' ? 'Все' : level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Мастера с фото */}
      <Text style={styles.sectionTitle}>👨‍🎨 Наши мастера</Text>
      {filteredBarbers.map(barber => {
        const levelColor = getLevelColor(barber.level);
        return (
          <TouchableOpacity
            key={barber.id}
            style={styles.masterCard}
            onPress={() => handleMasterPress(barber)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[Colors.surface, Colors.surfaceLight]}
              style={styles.cardGradient}
            >
              <View style={styles.cardContent}>
                {/* Аватар с фото */}
                <View style={styles.avatarContainer}>
                  {barber.photo ? (
                    <Image 
                      source={barber.photo} 
                      style={styles.avatar}
                      onError={() => console.log('Ошибка фото:', barber.name)}
                    />
                  ) : (
                    <View style={styles.avatarPlaceholder}>
                      <Text style={styles.avatarText}>{barber.name.charAt(0)}</Text>
                    </View>
                  )}
                  <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
                    <Text style={styles.levelBadgeText}>{barber.level}</Text>
                  </View>
                </View>
                
                {/* Информация */}
                <View style={styles.infoContainer}>
                  <Text style={styles.masterName}>{barber.name}</Text>
                  
                  <View style={styles.priceContainer}>
                    <View style={styles.priceChip}>
                      <Text style={styles.priceLabel}>Стрижка</Text>
                      <Text style={styles.priceValue}>{barber.price.haircut}₽</Text>
                    </View>
                    <View style={styles.priceChip}>
                      <Text style={styles.priceLabel}>Борода</Text>
                      <Text style={styles.priceValue}>{barber.price.beard}₽</Text>
                    </View>
                    <View style={styles.priceChip}>
                      <Text style={styles.priceLabel}>Комбо</Text>
                      <Text style={styles.priceValue}>{barber.price.both}₽</Text>
                    </View>
                  </View>
                </View>
                
                <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        );
      })}
      
      {/* Прайс-лист */}
      <Text style={styles.sectionTitle}>💰 Прайс-лист</Text>
      {BARBER_PRICES.map((item, idx) => (
        <View key={idx} style={styles.priceCard}>
          <Text style={styles.serviceName}>{item.name}</Text>
          <View style={styles.priceRowList}>
            {item.prices.BARBER && <Text style={styles.priceTag}>Барбер: {item.prices.BARBER}₽</Text>}
            {item.prices.PROF && <Text style={styles.priceTag}>PROF: {item.prices.PROF}₽</Text>}
            {item.prices.TOP && <Text style={styles.priceTag}>TOP: {item.prices.TOP}₽</Text>}
          </View>
        </View>
      ))}
      
      <Text style={styles.note}>* В выходные и праздничные дни +200₽</Text>
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
  filterContainer: {
    flexDirection: 'row',
    padding: Spacing.md,
    gap: 12,
    flexWrap: 'wrap',
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  filterText: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  filterTextActive: {
    color: Colors.background,
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
  priceContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 5,
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
    fontSize: 9,
    color: Colors.textMuted,
  },
  priceValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.accent,
  },
  priceCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  priceRowList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  priceTag: {
    fontSize: 12,
    color: Colors.accent,
    fontWeight: '500',
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