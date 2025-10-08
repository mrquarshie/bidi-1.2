import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Card from '@/components/card';

const mockOMCs = [
  { id: '1', name: 'Goil', code: 'GOIL', stations: 15, contact: '0241234567' },
  { id: '2', name: 'Shell', code: 'SHELL', stations: 12, contact: '0247654321' },
  { id: '3', name: 'Total', code: 'TOTAL', stations: 8, contact: '0245556677' },
  { id: '4', name: 'BP', code: 'BP', stations: 6, contact: '0248889999' },
];

export default function OMCList() {
  const renderOMCItem = ({ item }: { item: any }) => (
    <Card style={styles.omcCard}>
      <View style={styles.omcHeader}>
        <Text style={styles.omcName}>{item.name}</Text>
        <Text style={styles.omcCode}>{item.code}</Text>
      </View>
      <View style={styles.omcDetails}>
        <Text style={styles.detailText}>Stations: {item.stations}</Text>
        <Text style={styles.detailText}>Contact: {item.contact}</Text>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registered OMCs</Text>
      <FlatList
        data={mockOMCs}
        renderItem={renderOMCItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 20,
  },
  listContent: {
    gap: 12,
  },
  omcCard: {
    padding: 16,
  },
  omcHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  omcName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  omcCode: {
    fontSize: 14,
    fontWeight: '500',
    color: '#34C759',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  omcDetails: {
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
});