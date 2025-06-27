// app/login.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { useUserRole } from '../context/UserRoleContext';

export default function LoginScreen() {
  const router = useRouter();
  const { setRole } = useUserRole();

  const handleLogin = (user: string) => {
    // 🧠 Rolle anhand des Usernamens setzen
    if (user.startsWith('Sitter')) {
      setRole('sitter');
    } else if (user.startsWith('Owner')) {
      setRole('owner');
    }

    // ➡️ Navigation zum Home Tab
    router.replace('/(tabs)/home');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Login as test user:</Text>
      <Button title="Sitter1" onPress={() => handleLogin('Sitter1')} />
      <Button title="Sitter2" onPress={() => handleLogin('Sitter2')} />
      <Button title="Sitter3" onPress={() => handleLogin('Sitter3')} />
      <Button title="Owner1" onPress={() => handleLogin('Owner1')} />
      <Button title="Owner2" onPress={() => handleLogin('Owner2')} />
      <Button title="Owner3" onPress={() => handleLogin('Owner3')} />
    </View>
  );
}
