// screens/LoginScreen.tsx
import { useUserRole } from '@/context/UserRoleContext';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const testUsers = [
  { name: 'Sitter1', role: 'sitter' },
  { name: 'Sitter2', role: 'sitter' },
  { name: 'Sitter3', role: 'sitter' },
  { name: 'Owner1', role: 'owner' },
  { name: 'Owner2', role: 'owner' },
  { name: 'Owner3', role: 'owner' },
];
type RootStackParamList = {
  Main: undefined;
  // add other routes here if needed
};

export const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Main'>>();
  const { setRole } = useUserRole();

  const handleLogin = (role: 'owner' | 'sitter') => {
    setRole(role);
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to PetPal</Text>
      <Text style={styles.subtitle}>Find your new furry best friend</Text>

      {testUsers.map((user) => (
        <TouchableOpacity
          key={user.name}
          style={styles.button}
          onPress={() => handleLogin(user.role as 'owner' | 'sitter')}
        >
          <Text style={styles.buttonText}>Log in as {user.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#D1E7DD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default LoginScreen;
