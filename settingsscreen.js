import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { Button } from 'react-native-elements';
import Header from './Header';
import { useAuth } from './auth';

export default function SettingsScreen() {
  const { logout } = useAuth();
  const [offlineMode, setOfflineMode] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Header title="Settings" />
      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text>Offline Resilience</Text>
          <Switch value={offlineMode} onValueChange={setOfflineMode} />
        </View>
        <Text>Token Expiry: 24 hours (configurable)</Text>
        <Button title="Logout" onPress={logout} buttonStyle={{ backgroundColor: '#DC3545', marginTop: 20 }} />
      </View>
    </View>
  );
}