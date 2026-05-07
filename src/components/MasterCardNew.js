import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../styles/colors';

export default function MasterCardNew({ master, onPress }) {
  const getLevelColor = () => {
    switch(master.level) {
      case 'TOP': return Colors.accent;
      case 'PROF': return '#3498db';
      case 'BARBER': return '#2ecc71';
      default: return Colors.textMuted;
    }
  };

  return (
    <TouchableOpacity onPress={() => onPress(master)} activeOpacity={0.9}>
      <LinearGradient
        colors={[Colors.surface, Colors.surfaceLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.leftSection}>
          <Image source={master.photo} style={styles.avatar} />
          <View style={[styles.levelBadge, { backgroundColor: getLevelColor() }]}>
            <Text style={styles.levelText}>{master.level}</Text>
          </View>
        </View>
        
        <View style={styles.rightSection}>
          <Text style={styles.name}>{master.name}</Text>
          <Text style={styles.specialty}>{master.specialty}</Text>
          
          <View style={styles.priceRow}>
            <View style={styles.priceChip}>
              <Text style={styles.priceLabel}>Стрижка</Text>
              <Text style={styles.priceValue}>{master.price.haircut}₽</Text>
            </View>
            <View style={styles.priceChip}>
              <Text style={styles.priceLabel}>Борода</Text>
              <Text style={styles.priceValue}>{master.price.beard}₽</Text>
            </View>
            <View style={styles.priceChip}>
              <Text style={styles.priceLabel}>Комбо</Text>
              <Text style={styles.priceValue}>{master.price.both}₽</Text>
            </View>
          </View>
        </View>
        
        <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  leftSection: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.surfaceLight,
  },
  levelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.round,
  },
  levelText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: Colors.background,
  },
  rightSection: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 2,
  },
  specialty: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    gap: 8,
  },
  priceChip: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.round,
    flexDirection: 'row',
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
});