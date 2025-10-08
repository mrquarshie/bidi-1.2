import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Header from './Header';
import { api } from './api';

export default function ManualSaleScreen() {
  const [buyerPhone, setBuyerPhone] = useState('');
  const [product, setProduct] = useState('Petrol');
  const [liters, setLiters] = useState('');
  const [pricePerLiter, setPricePerLiter] = useState('');

  const handleManualSale = async () => {
    if (!buyerPhone || !liters || !pricePerLiter) return Alert.alert('Error', 'Fill all fields');
    try {
      await api.createTransaction({ buyerPhone, product, liters, pricePerLiter, type: 'manual' });
      Alert.alert('Success', `Manual sale recorded. Total: ${parseFloat(liters) * parseFloat(pricePerLiter)} GHS`);
    } catch (error) {
      Alert.alert('Error', 'Sale failed');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Manual Sale" />
      <View style={{ padding: 20 }}>
        <Input placeholder="Buyer Phone" value={buyerPhone} onChangeText={setBuyerPhone} />
        <Input placeholder="Product" value={product} onChangeText={setProduct} />
        <Input placeholder="Liters" value={liters} onChangeText={setLiters} keyboardType="numeric" />
        <Input placeholder="Price per Liter (GHS)" value={pricePerLiter} onChangeText={setPricePerLiter} keyboardType="numeric" />
        <Button title="Record Sale" onPress={handleManualSale} buttonStyle={{ backgroundColor: '#28A745', marginTop: 16 }} />
      </View>
    </View>
  );
}