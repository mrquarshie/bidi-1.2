import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Header from './Header';
import { api } from './api';

export default function ReportsScreen() {
  const [date, setDate] = useState('');
  const [station, setStation] = useState('');
  const [reports, setReports] = useState({ totalLiters: 0, totalAmount: 0 });

  const fetchReports = async () => {
    try {
      const data = await api.getReports({ date, station });
      setReports(data);
    } catch (error) {
      // Offline fallback
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header title="Reports" />
      <View style={{ padding: 20 }}>
        <Input placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} />
        <Input placeholder="Station Code" value={station} onChangeText={setStation} />
        <Button title="Filter Reports" onPress={fetchReports} buttonStyle={{ marginVertical: 8 }} />
        <Text>Total Liters: {reports.totalLiters}</Text>
        <Text>Total Amount: GHS {reports.totalAmount}</Text>
      </View>
    </View>
  );
}