import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../styles/colors';
import { CONTACTS } from '../data/contacts';

export default function ContactsScreen() {
  const callPhone = () => {
    Linking.openURL(`tel:${CONTACTS.phoneRaw}`);
  };
  
  const openMaps = () => {
    const url = `https://maps.google.com/?q=${CONTACTS.coordinates.lat},${CONTACTS.coordinates.lng}`;
    Linking.openURL(url);
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Контакты</Text>
        <Text style={styles.subtitle}>Свяжитесь с нами</Text>
      </View>
      
      <View style={styles.card}>
        <TouchableOpacity style={styles.contactRow} onPress={callPhone}>
          <Ionicons name="call" size={28} color={Colors.accent} />
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Позвонить</Text>
            <Text style={styles.contactValue}>{CONTACTS.phone}</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.contactRow} onPress={openMaps}>
          <Ionicons name="location" size={28} color={Colors.accent} />
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Как проехать</Text>
            <Text style={styles.contactValue}>{CONTACTS.address}</Text>
          </View>
        </TouchableOpacity>
        
        <View style={styles.contactRow}>
          <Ionicons name="time" size={28} color={Colors.accent} />
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Режим работы</Text>
            <Text style={styles.contactValue}>{CONTACTS.workHours}</Text>
          </View>
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
  },
  card: {
    backgroundColor: Colors.surface,
    margin: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  contactInfo: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 16,
    color: Colors.text,
  },
});