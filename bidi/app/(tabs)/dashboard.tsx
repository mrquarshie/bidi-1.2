import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function DashboardScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Dashboard</ThemedText>
      <View style={styles.card}>
        <ThemedText>Welcome to the dashboard.</ThemedText>
        <ThemedText>Use other tabs to manage OMCs, Stations, Attendants, and Membership.</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  card: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
});


