import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Header from './Header';
import LoadingSpinner from './LoadingSpinner';
import { useAuth } from './auth';

export default function LoginScreen() {
  const [stationCode, setStationCode] = useState('');
  const [credentials, setCredentials] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!stationCode || !credentials) {
      Alert.alert('Error', 'Please enter station code and credentials');
      return;
    }
    setLoading(true);
    const success = await login({ stationCode, credentials });
    setLoading(false);
    if (!success) Alert.alert('Error', 'Invalid credentials');
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Login" showBack={false} />
      {loading ? <LoadingSpinner /> : (
        <View style={{ padding: 20, justifyContent: 'center', flex: 1 }}>
          <Input
            placeholder="Station Code"
            value={stationCode}
            onChangeText={setStationCode}
            leftIcon={{ type: 'font-awesome', name: 'building' }}
          />
          <Input
            placeholder="Credentials (PIN/Password)"
            value={credentials}
            onChangeText={setCredentials}
            secureTextEntry
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
          />
          <Button title="Login" onPress={handleLogin} buttonStyle={{ backgroundColor: '#007AFF' }} />
        </View>
      )}
    </View>
  );
}