import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Card } from 'react-native-elements';
import Header from './Header';
import { api } from './api';

export default function HistoryScreen() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await api.getTransactions();
        setTransactions(data);
      } catch (error) {
        // Offline: Load from local storage
      }
    };
    fetchHistory();
  }, []);

  const renderItem = ({ item }) => (
    <Card>
      <Text>{item.product} - {item.liters}L - GHS {item.total}</Text>
      <Text>Token: {item.tokenCode} | Date: {item.date}</Text>
    </Card>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header title="History" />
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}