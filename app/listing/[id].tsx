// 📁 app/listing/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ListingDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inseratsdetails: {id}</Text>
      <Text>Beschreibung: Betreuung für Hund Bella in Berlin</Text>
      <Button title="Jetzt bewerben" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});