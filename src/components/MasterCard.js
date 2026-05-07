import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius } from '../styles/colors';

export default function MasterCard({ name, level, experience, specialty, price }) {
  const getLevelColor = (lvl) => {
    if (lvl === 'TOP') return Colors.accent;
    if (lvl === 'PROF') return '#3498db';
    if (lvl === 'BARBER') return '#2ecc71';
    return Colors.textMuted;
  };
  
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        {level && (
          <View style={[styles.levelBadge, { backgroundColor: getLevelColor(level) }]}>
            <Text style={styles.levelText}>{level}</Text>
          </View>
        )}
      </View>
      <Text style={styles.detail}>⭐ Стаж: {experience}</Text>
      <Text style={styles.detail}>✂️ {specialty}</Text>
      {price && (
        <View style={styles.priceContainer}>
          {price.haircut && (
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Стрижка:</Text>
              <Text style={styles.priceValue}>{price.haircut}₽</Text>
            </View>
          )}
          {price.beard && (
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Борода:</Text>
              <Text style={styles.priceValue}>{price.beard}₽</Text>
            </View>
          )}
          {price.both && (
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Стрижка+борода:</Text>
              <Text style={styles.priceValue}>{price.both}₽</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  levelBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.round,
  },
  levelText: {
    color: Colors.background,
    fontSize: 10,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  priceContainer: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  priceLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.accent,
  },
});