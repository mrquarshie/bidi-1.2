import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Header from './Header';

export default function DashboardScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Dashboard" />
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Card>
          <Text style={{ fontSize: 18, textAlign: 'center' }}>Quick Actions</Text>
        </Card>
        <Button
          title="Enter Token"
          buttonStyle={{ marginVertical: 8, backgroundColor: '#007AFF' }}
        />
        <Button
          title="Manual Sale"
          buttonStyle={{ marginVertical: 8, backgroundColor: '#28A745' }}
        />
        <Button
          title="View History"
          buttonStyle={{ marginVertical: 8, backgroundColor: '#FFC107' }}
        />
        <Card>
          <Text>Today's Summary: 500L dispensed, GHS 2500 revenue</Text> {/* From API */}
        </Card>
      </ScrollView>
    </View>
  );
}