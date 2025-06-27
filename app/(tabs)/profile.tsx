// 📁 app/(tabs)/profile.tsx
import { Image, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatar} />
      <Text style={styles.name}>Max Mustermann</Text>
      <Text style={styles.info}>Tierliebhaber aus Berlin</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  name: { fontSize: 20, fontWeight: 'bold' },
  info: { fontSize: 16, color: 'gray' },
});