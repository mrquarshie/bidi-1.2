import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Alert, ScrollView, FlatList } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Mock Data (kept local to this screen)
const mockStations = {
  ST001: { name: 'Goil Station Accra', manager: 'John Doe', contact: '+233 123456' },
};

const mockProducts = {
  ST001: [
    { id: 1, type: 'Petrol', price: 15.5, available: 1000 },
    { id: 2, type: 'Diesel', price: 14.2, available: 800 },
  ],
};

const mockTokens: Record<string, any> = {
  TOKEN123: {
    code: 'TOKEN123',
    amount: 200,
    buyerPhone: '+233 987654',
    product: 'Petrol',
    station: 'ST001',
    expiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    used: false,
  },
};

type Transaction = {
  id: number;
  token: string;
  buyerPhone: string;
  product: string;
  liters: number;
  cost: number;
  attendant: string;
  date: string;
};

let transactions: Transaction[] = [];

export default function FuelScreen() {
  const [activeView, setActiveView] = useState<'dashboard' | 'token' | 'manual' | 'history' | 'reports'>('dashboard');
  const [tokenCode, setTokenCode] = useState('');
  const [tokenDetails, setTokenDetails] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [liters, setLiters] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterProduct, setFilterProduct] = useState('');

  const stationCode = 'ST001';

  const totalLiters = transactions.reduce((sum, t) => sum + t.liters, 0);

  const validateToken = () => {
    const token = mockTokens[tokenCode];
    if (!token) {
      Alert.alert('Error', 'Invalid token.');
      return;
    }
    if (new Date(token.expiry) < new Date()) {
      Alert.alert('Error', 'Token expired.');
      return;
    }
    if (token.used) {
      Alert.alert('Error', 'Token already used.');
      return;
    }
    setTokenDetails(token);
  };

  const confirmDispense = () => {
    if (!selectedProduct || !liters || parseFloat(liters) <= 0) {
      Alert.alert('Error', 'Select product and enter valid liters.');
      return;
    }
    const product = mockProducts[stationCode].find((p) => p.type === selectedProduct);
    if (!product) {
      Alert.alert('Error', 'Product not found.');
      return;
    }
    const cost = parseFloat(liters) * product.price;
    if (tokenDetails && cost > tokenDetails.amount) {
      Alert.alert('Error', 'Liters exceed token amount.');
      return;
    }

    const transaction: Transaction = {
      id: Date.now(),
      token: tokenDetails ? tokenCode : 'Manual',
      buyerPhone: tokenDetails ? tokenDetails.buyerPhone : buyerPhone,
      product: selectedProduct,
      liters: parseFloat(liters),
      cost,
      attendant: 'Current User',
      date: new Date().toISOString(),
    };
    transactions.push(transaction);

    if (tokenDetails) {
      mockTokens[tokenCode].used = true;
      Alert.alert('Success', `SMS sent to ${tokenDetails.buyerPhone}: Dispensed ${liters}L of ${selectedProduct} for GHC ${cost}.`);
    } else {
      Alert.alert('Success', `SMS sent to ${buyerPhone}: Manual sale - ${liters}L of ${selectedProduct} for GHC ${cost}.`);
    }

    setTokenDetails(null);
    setTokenCode('');
    setSelectedProduct('');
    setLiters('');
    setBuyerPhone('');
  };

  const filteredTransactions = transactions.filter((t) => {
    const dateMatch = !filterDate || t.date.startsWith(filterDate);
    const productMatch = !filterProduct || t.product === filterProduct;
    return dateMatch && productMatch;
  });

  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.cost, 0);

  const Dashboard = () => (
    <ScrollView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Fuel Dashboard</ThemedText>
      <ThemedView style={styles.statsContainer}>
        <ThemedText type="subtitle">Total Liters Dispensed Today: {totalLiters.toFixed(2)}</ThemedText>
        <ThemedText type="subtitle">Total Transactions: {transactions.length}</ThemedText>
      </ThemedView>
      <Button title="Enter Token" onPress={() => setActiveView('token')} />
      <Button title="Manual Sale" onPress={() => setActiveView('manual')} />
      <Button title="History" onPress={() => setActiveView('history')} />
      <Button title="Reports" onPress={() => setActiveView('reports')} />
    </ScrollView>
  );

  const TokenEntry = () => (
    <ScrollView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Enter Token</ThemedText>
      {!tokenDetails ? (
        <>
          <TextInput style={styles.input} placeholder="Token Code" value={tokenCode} onChangeText={setTokenCode} />
          <Button title="Validate Token" onPress={validateToken} />
        </>
      ) : (
        <>
          <ThemedText>Buyer Phone: {tokenDetails.buyerPhone}</ThemedText>
          <ThemedText>Amount: GHC {tokenDetails.amount}</ThemedText>
          <ThemedText>Product: {tokenDetails.product}</ThemedText>
          <ThemedText>Station: {mockStations[stationCode]?.name}</ThemedText>
          <ThemedText>Expiry: {new Date(tokenDetails.expiry).toLocaleString()}</ThemedText>
          <ThemedText type="subtitle">Select Product:</ThemedText>
          <FlatList
            data={mockProducts[stationCode]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Button
                title={`${item.type} (GHC ${item.price}/L)`}
                onPress={() => setSelectedProduct(item.type)}
                color={selectedProduct === item.type ? 'green' : 'gray'}
              />
            )}
          />
          <TextInput style={styles.input} placeholder="Liters" value={liters} onChangeText={setLiters} keyboardType="numeric" />
          <Button title="Confirm Dispense" onPress={confirmDispense} />
          <Button title="Back" onPress={() => { setTokenDetails(null); setTokenCode(''); }} />
        </>
      )}
      <Button title="Back to Dashboard" onPress={() => setActiveView('dashboard')} />
    </ScrollView>
  );

  const ManualSale = () => (
    <ScrollView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Manual Sale</ThemedText>
      <TextInput style={styles.input} placeholder="Buyer Phone" value={buyerPhone} onChangeText={setBuyerPhone} />
      <ThemedText type="subtitle">Select Product:</ThemedText>
      <FlatList
        data={mockProducts[stationCode]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Button
            title={`${item.type} (GHC ${item.price}/L)`}
            onPress={() => setSelectedProduct(item.type)}
            color={selectedProduct === item.type ? 'green' : 'gray'}
          />
        )}
      />
      <TextInput style={styles.input} placeholder="Liters" value={liters} onChangeText={setLiters} keyboardType="numeric" />
      <Button title="Confirm Sale" onPress={confirmDispense} />
      <Button title="Back to Dashboard" onPress={() => setActiveView('dashboard')} />
    </ScrollView>
  );

  const History = () => (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Transaction History</ThemedText>
      <FlatList
        data={transactions.slice().reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ThemedView style={styles.item}>
            <ThemedText>{item.date}: {item.liters}L {item.product} for GHC {item.cost} (Buyer: {item.buyerPhone})</ThemedText>
          </ThemedView>
        )}
      />
      <Button title="Back to Dashboard" onPress={() => setActiveView('dashboard')} />
    </ThemedView>
  );

  const Reports = () => (
    <ScrollView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Reports</ThemedText>
      <TextInput style={styles.input} placeholder="Filter Date (YYYY-MM-DD)" value={filterDate} onChangeText={setFilterDate} />
      <TextInput style={styles.input} placeholder="Filter Product (e.g., Petrol)" value={filterProduct} onChangeText={setFilterProduct} />
      <ThemedText type="subtitle">Total Liters: {filteredTransactions.reduce((sum, t) => sum + t.liters, 0).toFixed(2)} | Total Amount: GHC {totalAmount.toFixed(2)}</ThemedText>
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ThemedView style={styles.item}>
            <ThemedText>{item.date}: {item.liters}L {item.product} for GHC {item.cost}</ThemedText>
          </ThemedView>
        )}
      />
      <Button title="Export (Mock)" onPress={() => Alert.alert('Exported', 'Reports exported to CSV (mock).')} />
      <Button title="Back to Dashboard" onPress={() => setActiveView('dashboard')} />
    </ScrollView>
  );

  switch (activeView) {
    case 'token':
      return <TokenEntry />;
    case 'manual':
      return <ManualSale />;
    case 'history':
      return <History />;
    case 'reports':
      return <Reports />;
    default:
      return <Dashboard />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});




