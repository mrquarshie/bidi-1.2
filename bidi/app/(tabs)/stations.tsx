import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const stations = [
  { id: 'ST001', name: 'Goil Station Accra', manager: 'John Doe' },
  { id: 'ST002', name: 'Shell Station Kumasi', manager: 'Jane Smith' },
];

export default function StationsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Stations</ThemedText>
      <FlatList
        data={stations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedView style={styles.row}>
            <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
            <ThemedText>ID: {item.id} • Manager: {item.manager}</ThemedText>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  row: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
});


