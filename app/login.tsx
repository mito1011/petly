// app/login.tsx
import { useUserRole } from '@/context/UserRoleContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const { setUserInfo } = useUserRole();

  const handleLogin = (userId: string, role: 'sitter' | 'owner') => {
    setUserInfo({ userId, role });
    router.replace('/(tabs)/home');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Login as test user:</Text>
      <Button title="Sitter1" onPress={() => handleLogin('sitter1', 'sitter')} />
      <Button title="Sitter2" onPress={() => handleLogin('sitter2', 'sitter')} />
      <Button title="Sitter3" onPress={() => handleLogin('sitter3', 'sitter')} />
      <Button title="Owner1" onPress={() => handleLogin('owner1', 'owner')} />
      <Button title="Owner2" onPress={() => handleLogin('owner2', 'owner')} />
      <Button title="Owner3" onPress={() => handleLogin('owner3', 'owner')} />
    </View>
  );
}
