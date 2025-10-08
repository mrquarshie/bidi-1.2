import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Header from './Header';
import LoadingSpinner from './LoadingSpinner';
import { api } from './api';

export default function EnterTokenScreen() {
  const [tokenCode, setTokenCode] = useState('');
  const [product, setProduct] = useState('Petrol');
  const [liters, setLiters] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenDetails, setTokenDetails] = useState(null);

  const validateToken = async () => {
    if (!tokenCode) return Alert.alert('Error', 'Enter token code');
    setLoading(true);
    try {
      const data = await api.getToken(tokenCode);
      if (data.valid) {
        setTokenDetails(data);
        Alert.alert('Valid Token', `Amount: ${data.amount}, Expiry: ${data.expiry}`);
      } else {
        Alert.alert('Invalid/Expired Token', 'Please check and try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Network issue – check offline logs');
    }
    setLoading(false);
  };

  const dispenseFuel = async () => {
    if (!liters || parseFloat(liters) > (tokenDetails?.availableLiters || 0)) {
      return Alert.alert('Error', 'Invalid liters');
    }
    setLoading(true);
    try {
      await api.createTransaction({ tokenCode, product, liters });
      Alert.alert('Success', `Dispensed ${liters}L. SMS sent to buyer.`);
      setTokenDetails(null);
      setLiters('');
    } catch (error) {
      Alert.alert('Error', 'Transaction failed');
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Enter Token" />
      {loading ? <LoadingSpinner /> : (
        <View style={{ padding: 20 }}>
          <Input
            placeholder="Token Code"
            value={tokenCode}
            onChangeText={setTokenCode}
            leftIcon={{ type: 'font-awesome', name: 'qrcode' }}
          />
          <Button title="Validate Token" onPress={validateToken} buttonStyle={{ marginVertical: 8 }} />

          {tokenDetails && (
            <View>
              <Text>Buyer: {tokenDetails.buyerPhone}</Text>
              <Text>Station: {tokenDetails.station}</Text>
              <Input
                placeholder="Product"
                value={product}
                onChangeText={setProduct}
                leftIcon={{ type: 'font-awesome', name: 'gas-pump' }}
              />
              <Input
                placeholder="Liters"
                value={liters}
                onChangeText={setLiters}
                keyboardType="numeric"
                leftIcon={{ type: 'font-awesome', name: 'tint' }}
              />
              <Button title="Confirm Dispense" onPress={dispenseFuel} buttonStyle={{ backgroundColor: '#28A745' }} />
            </View>
          )}
        </View>
      )}
    </View>
  );
}