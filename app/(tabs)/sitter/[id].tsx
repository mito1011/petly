// 📁 app/sitter/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function SitterProfile() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatar} />
      <Text style={styles.name}>Sitterprofil {id}</Text>
      <Text style={styles.info}>Erfahrene Tiersitterin, bietet Hundespaziergänge und Katzenbetreuung</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  name: { fontSize: 20, fontWeight: 'bold' },
  info: { fontSize: 16, textAlign: 'center', color: 'gray' },
});