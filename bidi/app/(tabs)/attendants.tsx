import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const attendants = [
  { id: 'AT001', name: 'Kwame Boateng', stationId: 'ST001' },
  { id: 'AT002', name: 'Ama Nkrumah', stationId: 'ST002' },
];

export default function AttendantsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Attendants</ThemedText>
      <FlatList
        data={attendants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedView style={styles.row}>
            <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
            <ThemedText>ID: {item.id} • Station: {item.stationId}</ThemedText>
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


