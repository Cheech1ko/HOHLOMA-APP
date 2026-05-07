import React, { useState } from 'react';
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
import { PIERCING_MASTERS, PIERCING_PRICES, JEWELRY_PRICES } from '../data/piercing';

export default function PiercingScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('masters');
  
  const handleMasterPress = (master) => {
    navigation.navigate('Запись', { 
      service: 'Пирсинг',
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
        <Text style={styles.title}>Пирсинг</Text>
        <Text style={styles.subtitle}>Профессиональный пирсинг, стерильность, качественные украшения</Text>
      </LinearGradient>
      
      {/* Табы */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'masters' && styles.activeTab]}
          onPress={() => setActiveTab('masters')}>
          <Text style={[styles.tabText, activeTab === 'masters' && styles.activeTabText]}>Мастера</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'prices' && styles.activeTab]}
          onPress={() => setActiveTab('prices')}>
          <Text style={[styles.tabText, activeTab === 'prices' && styles.activeTabText]}>Цены</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'jewelry' && styles.activeTab]}
          onPress={() => setActiveTab('jewelry')}>
          <Text style={[styles.tabText, activeTab === 'jewelry' && styles.activeTabText]}>Украшения</Text>
        </TouchableOpacity>
      </View>
      
      {/* Мастера */}
      {activeTab === 'masters' && (
        <View>
          {PIERCING_MASTERS.map((master) => (
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
                  
                  <View style={styles.infoContainer}>
                    <Text style={styles.masterName}>{master.name}</Text>
                    <Text style={styles.masterDetail}>⭐ Стаж: {master.experience}</Text>
                    {master.medical && <Text style={styles.masterDetail}>🏥 Медицинское образование</Text>}
                    <Text style={styles.masterDetail}>💉 {master.specialty}</Text>
                    
                    <View style={styles.priceContainer}>
                      <View style={styles.priceChip}>
                        <Text style={styles.priceLabel}>Прокол</Text>
                        <Text style={styles.priceValue}>{master.price}₽</Text>
                      </View>
                    </View>
                  </View>
                  
                  <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
          <Text style={styles.restrictionText}>
            🔞 Пирсинг ушей: с 6 лет (в присутствии родителей). Пирсинг лица, пупка, языка: с 16 лет. Интимный пирсинг: строго с 18 лет.
          </Text>
        </View>
      )}
      
      {/* Цены - ПРАЙС-ЛИСТ */}
      {activeTab === 'prices' && (
        <View style={styles.pricesContainer}>
          <Text style={styles.infoText}>
            Пирсинг делается специальными стерильными одноразовыми иглами. Мастера НЕ работают с принесенными украшениями.
          </Text>
          
          <Text style={styles.pricesTitle}>💉 Стоимость проколов</Text>
          {PIERCING_PRICES.map((item, idx) => (
            <View key={idx} style={styles.priceCard}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.servicePrice}>{item.price}</Text>
            </View>
          ))}
        </View>
      )}
      
      {/* Украшения */}
      {activeTab === 'jewelry' && (
        <View style={styles.jewelryContainer}>
          <Text style={styles.pricesTitle}>💎 Каталог украшений</Text>
          {JEWELRY_PRICES.map((item, idx) => (
            <View key={idx} style={styles.jewelryCard}>
              <Text style={styles.jewelryName}>{item.name}</Text>
              <Text style={styles.jewelryDesc}>{item.desc}</Text>
              <Text style={styles.jewelryPrice}>{item.price}</Text>
            </View>
          ))}
          <Text style={styles.note}>С полным каталогом украшений можно ознакомиться в студии</Text>
        </View>
      )}
      
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
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    padding: Spacing.sm,
    margin: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: BorderRadius.sm,
  },
  activeTab: {
    backgroundColor: Colors.accent,
  },
  tabText: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  activeTabText: {
    color: Colors.background,
    fontWeight: 'bold',
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
    height: 64,
    borderRadius: 32,
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
  restrictionText: {
    fontSize: 11,
    color: Colors.textMuted,
    margin: Spacing.md,
    lineHeight: 16,
  },
  pricesContainer: {
    paddingBottom: Spacing.lg,
  },
  pricesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  infoText: {
    fontSize: 12,
    color: Colors.textSecondary,
    margin: Spacing.md,
    lineHeight: 18,
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
    fontSize: 13,
    color: Colors.text,
    flex: 1,
  },
  servicePrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.accent,
  },
  jewelryContainer: {
    paddingBottom: Spacing.lg,
  },
  jewelryCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  jewelryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  jewelryDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  jewelryPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.accent,
  },
  note: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
    margin: Spacing.md,
  },
  bottomPadding: {
    height: 40,
  },
});