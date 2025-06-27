import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = (user: string) => {
    // Später hier UserRoleContext verwenden
    router.replace('/(tabs)/home');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login as test user:</Text>
      <Button title="Sitter1" onPress={() => handleLogin('Sitter1')} />
      <Button title="Sitter2" onPress={() => handleLogin('Sitter2')} />
      <Button title="Owner1" onPress={() => handleLogin('Owner1')} />
    </View>
  );
}
