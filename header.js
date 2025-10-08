import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useAuth } from './auth';

export default function Header({ title, showBack = false, onBack }) {
  const { logout } = useAuth();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#007AFF' }}>
      {showBack ? (
        <TouchableOpacity onPress={onBack}>
          <Icon name="arrow-left" type="font-awesome-5" color="white" />
        </TouchableOpacity>
      ) : null}
      <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
      <TouchableOpacity onPress={logout}>
        <Icon name="sign-out-alt" type="font-awesome-5" color="white" />
      </TouchableOpacity>
    </View>
  );
}