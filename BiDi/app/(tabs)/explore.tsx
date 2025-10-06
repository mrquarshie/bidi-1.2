import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Alert, ScrollView, FlatList } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Mock Data
const mockStations = {
  ST001: { name: 'Goil Station Accra', manager: 'John Doe', contact: '+233 123456' }
};

const mockProducts = {
  ST001: [
    { id: 1, type: 'Petrol', price: 15.50, available: 1000 },
    { id: 2, type: 'Diesel', price: 14.20, available: 800 }
  ]
};

const mockTokens = {
  'TOKEN123': {
    code: 'TOKEN123',
    amount: 200,
    buyerPhone: '+233 987654',
    product: 'Petrol',
    station: 'ST001',
    expiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    used: false
  },
  'EXPIRED456': {
    code: 'EXPIRED456',
    amount: 100,
    buyerPhone: '+233 111111',
    product: 'Diesel',
    station: 'ST001',
    expiry: new Date(Date.now() - 1000).toISOString(),
    used: false
  }
};

let transactions: any[] = [];

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState('dashboard');
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
    const token = mockTokens[tokenCode as keyof typeof mockTokens];
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
    const product = mockProducts[stationCode].find(p => p.type === selectedProduct);
    const cost = parseFloat(liters) * product!.price;
    if (cost > tokenDetails.amount) {
      Alert.alert('Error', 'Liters exceed token amount.');
      return;
    }

    const transaction = {
      id: Date.now(),
      token: tokenCode,
      buyerPhone: tokenDetails.buyerPhone,
      product: selectedProduct,
      liters: parseFloat(liters),
      cost,
      attendant: 'Current User',
      date: new Date().toISOString()
    };
    transactions.push(transaction);

    mockTokens[tokenCode as keyof typeof mockTokens].used = true;

    Alert.alert('Success', `SMS sent to ${tokenDetails.buyerPhone}: Dispensed ${liters}L of ${selectedProduct} for GHC ${cost}. Attendant: Current User.`);
    Alert.alert('Transaction Saved', 'Added to reports.');

    // Reset form
    setTokenDetails(null);
    setTokenCode('');
    setSelectedProduct('');
    setLiters('');
  };

  const confirmManualSale = () => {
    if (!buyerPhone || !selectedProduct || !liters || parseFloat(liters) <= 0) {
      Alert.alert('Error', 'Enter all details.');
      return;
    }
    const product = mockProducts[stationCode].find(p => p.type === selectedProduct);
    const cost = parseFloat(liters) * product!.price;

    const transaction = {
      id: Date.now(),
      token: 'Manual',
      buyerPhone,
      product: selectedProduct,
      liters: parseFloat(liters),
      cost,
      attendant: 'Current User',
      date: new Date().toISOString()
    };
    transactions.push(transaction);

    Alert.alert('Success', `SMS sent to ${buyerPhone}: Manual sale - ${liters}L of ${selectedProduct} for GHC ${cost}.`);
    Alert.alert('Sale Saved', 'Added to reports.');

    // Reset form
    setBuyerPhone('');
    setSelectedProduct('');
    setLiters('');
  };

  const filteredTransactions = transactions.filter(t => {
    const dateMatch = !filterDate || t.date.startsWith(filterDate);
    const productMatch = !filterProduct || t.product === filterProduct;
    return dateMatch && productMatch;
  });

  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.cost, 0);

  const handleLogout = () => {
    transactions = [];
    router.push('/');
  };

  const renderDashboard = () => (
    <ScrollView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Dashboard</ThemedText>
      <ThemedView style={styles.statsContainer}>
        <ThemedText type="subtitle">Total Liters Dispensed Today: {totalLiters.toFixed(2)}</ThemedText>
        <ThemedText type="subtitle">Total Transactions: {transactions.length}</ThemedText>
      </ThemedView>
      
      <Button title="Enter Token" onPress={() => setActiveTab('token')} />
      <Button title="Manual Sale" onPress={() => setActiveTab('manual')} />
      <Button title="History" onPress={() => setActiveTab('history')} />
      <Button title="Reports" onPress={() => setActiveTab('reports')} />
      <Button title="Settings" onPress={() => setActiveTab('settings')} />
    </ScrollView>
  );

  const renderTokenEntry = () => (
    <ScrollView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Enter Token</ThemedText>
      {!tokenDetails ? (
        <>
          <TextInput 
            style={styles.input} 
            placeholder="Token Code" 
            value={tokenCode} 
            onChangeText={setTokenCode} 
          />
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
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <Button
                title={`${item.type} (GHC ${item.price}/L)`}
                onPress={() => setSelectedProduct(item.type)}
                color={selectedProduct === item.type ? 'green' : 'gray'}
              />
            )}
          />
          <TextInput 
            style={styles.input} 
            placeholder="Liters" 
            value={liters} 
            onChangeText={setLiters} 
            keyboardType="numeric" 
          />
          <Button title="Confirm Dispense" onPress={confirmDispense} />
          <Button title="Back" onPress={() => { setTokenDetails(null); setTokenCode(''); }} />
        </>
      )}
      <Button title="Back to Dashboard" onPress={() => setActiveTab('dashboard')} />
    </ScrollView>
  );

  const renderManualSale = () => (
    <ScrollView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Manual Sale</ThemedText>
      <TextInput 
        style={styles.input} 
        placeholder="Buyer Phone" 
        value={buyerPhone} 
        onChangeText={setBuyerPhone} 
      />
      <ThemedText type="subtitle">Select Product:</ThemedText>
      <FlatList
        data={mockProducts[stationCode]}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Button
            title={`${item.type} (GHC ${item.price}/L)`}
            onPress={() => setSelectedProduct(item.type)}
            color={selectedProduct === item.type ? 'green' : 'gray'}
          />
        )}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Liters" 
        value={liters} 
        onChangeText={setLiters} 
        keyboardType="numeric" 
      />
      <Button title="Confirm Sale" onPress={confirmManualSale} />
      <Button title="Back to Dashboard" onPress={() => setActiveTab('dashboard')} />
    </ScrollView>
  );

  const renderHistory = () => (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Transaction History</ThemedText>
      <FlatList
        data={transactions.slice().reverse()}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ThemedView style={styles.item}>
            <ThemedText>{item.date}: {item.liters}L {item.product} for GHC {item.cost} (Buyer: {item.buyerPhone})</ThemedText>
          </ThemedView>
        )}
      />
      <Button title="Back to Dashboard" onPress={() => setActiveTab('dashboard')} />
    </ThemedView>
  );

  const renderReports = () => (
    <ScrollView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Reports</ThemedText>
      <TextInput 
        style={styles.input} 
        placeholder="Filter Date (YYYY-MM-DD)" 
        value={filterDate} 
        onChangeText={setFilterDate} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Filter Product (e.g., Petrol)" 
        value={filterProduct} 
        onChangeText={setFilterProduct} 
      />
      <ThemedText type="subtitle">Total Liters: {filteredTransactions.reduce((sum, t) => sum + t.liters, 0).toFixed(2)} | Total Amount: GHC {totalAmount.toFixed(2)}</ThemedText>
      <FlatList
        data={filteredTransactions}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ThemedView style={styles.item}>
            <ThemedText>{item.date}: {item.liters}L {item.product} for GHC {item.cost}</ThemedText>
          </ThemedView>
        )}
      />
      <Button title="Export (Mock)" onPress={() => Alert.alert('Exported', 'Reports exported to CSV (mock).')} />
      <Button title="Back to Dashboard" onPress={() => setActiveTab('dashboard')} />
    </ScrollView>
  );

  const renderSettings = () => (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Settings</ThemedText>
      <ThemedText>Station: ST001</ThemedText>
      <Button title="Logout" onPress={handleLogout} color="red" />
      <Button title="Back to Dashboard" onPress={() => setActiveTab('dashboard')} />
    </ThemedView>
  );

  switch (activeTab) {
    case 'token':
      return renderTokenEntry();
    case 'manual':
      return renderManualSale();
    case 'history':
      return renderHistory();
    case 'reports':
      return renderReports();
    case 'settings':
      return renderSettings();
    default:
      return renderDashboard();
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