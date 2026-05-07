import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../styles/colors';

export default function MasterCardPremium({ 
  name, 
  level, 
  experience, 
  specialty, 
  price,
  onPress 
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  
  const getLevelConfig = () => {
    switch(level) {
      case 'TOP':
        return { 
          color: Colors.accent, 
          bg: 'rgba(212, 175, 55, 0.15)', 
          icon: 'ribbon',        // ← иконка вместо смайлика
          iconLib: 'ionicon'
        };
      case 'PROF':
        return { 
          color: '#3498db', 
          bg: 'rgba(52, 152, 219, 0.15)', 
          icon: 'flash',         // ← иконка вместо смайлика
          iconLib: 'ionicon'
        };
      case 'BARBER':
        return { 
          color: '#2ecc71', 
          bg: 'rgba(46, 204, 113, 0.15)', 
          icon: 'cut',           // ← иконка вместо смайлика
          iconLib: 'ionicon'
        };
      default:
        return { 
          color: Colors.textMuted, 
          bg: 'rgba(107, 107, 107, 0.15)', 
          icon: 'brush',         // ← иконка вместо смайлика
          iconLib: 'ionicon'
        };
    }
  };
  
  const levelConfig = getLevelConfig();
  const experiencePercent = Math.min((parseInt(experience) / 12) * 100, 100);
  
  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={[Colors.surface, Colors.surfaceLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.leftSection}>
            <View style={styles.avatarContainer}>
              <View style={[styles.avatarRing, { borderColor: levelConfig.color }]}>
                <Text style={styles.avatarText}>{name.charAt(0)}</Text>
              </View>
              <View style={[styles.levelIcon, { backgroundColor: levelConfig.color }]}>
                <Ionicons name={levelConfig.icon} size={12} color="#fff" />
              </View>
            </View>
          </View>
          
          <View style={styles.rightSection}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{name}</Text>
              <View style={[styles.levelBadge, { backgroundColor: levelConfig.bg }]}>
                <Text style={[styles.levelText, { color: levelConfig.color }]}>{level}</Text>
              </View>
            </View>
            
            <Text style={styles.specialty}>{specialty}</Text>
            
            <View style={styles.experienceContainer}>
              <View style={styles.experienceBarBg}>
                <View 
                  style={[
                    styles.experienceBarFill, 
                    { width: `${experiencePercent}%`, backgroundColor: levelConfig.color }
                  ]} 
                />
              </View>
              <Text style={styles.experienceText}>Стаж {experience}</Text>
            </View>
            
            {price && (
              <View style={styles.priceContainer}>
                {price.haircut && (
                  <View style={styles.priceChip}>
                    <Text style={styles.priceChipLabel}>Стрижка</Text>
                    <Text style={styles.priceChipValue}>{price.haircut}₽</Text>
                  </View>
                )}
                {price.beard && (
                  <View style={styles.priceChip}>
                    <Text style={styles.priceChipLabel}>Борода</Text>
                    <Text style={styles.priceChipValue}>{price.beard}₽</Text>
                  </View>
                )}
                {price.both && (
                  <View style={styles.priceChip}>
                    <Text style={styles.priceChipLabel}>Комбо</Text>
                    <Text style={styles.priceChipValue}>{price.both}₽</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  leftSection: {
    marginRight: Spacing.md,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  levelIcon: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  rightSection: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  levelBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.round,
  },
  levelText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  experienceContainer: {
    marginBottom: Spacing.sm,
  },
  experienceBarBg: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    marginBottom: 4,
  },
  experienceBarFill: {
    height: 4,
    borderRadius: 2,
  },
  experienceText: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  priceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  priceChip: {
    flexDirection: 'row',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.round,
    gap: 4,
  },
  priceChipLabel: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  priceChipValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.accent,
  },
});