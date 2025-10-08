import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function MembershipScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const onSubmit = () => {
    if (!name || !phone) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    Alert.alert('Saved', `Member ${name} saved (mock).`);
    setName('');
    setPhone('');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Membership</ThemedText>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} />
      <Button title="Save" onPress={onSubmit} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E7',
    padding: 12,
    borderRadius: 8,
  },
});


