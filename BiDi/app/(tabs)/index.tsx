import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function LoginScreen() {
  const [stationCode, setStationCode] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (stationCode === 'ST001' && password === 'admin') {
      router.push('/dashboard');
    } else {
      Alert.alert('Error', 'Invalid station code or credentials.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Bidi Fuel - Pump Attendant Login</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Station Code (e.g., ST001)"
        value={stationCode}
        onChangeText={setStationCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
});
