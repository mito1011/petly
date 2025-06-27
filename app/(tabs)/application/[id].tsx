// 📁 app/application/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function ApplicationDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bewerbung #{id}</Text>
      <Text>Sitter: Anna S.</Text>
      <Text>Nachricht: Ich würde mich freuen, Bella zu betreuen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});