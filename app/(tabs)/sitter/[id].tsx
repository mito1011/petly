import { dummyCaretakers } from '@/data/dummyCaretakers';
import { useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text } from 'react-native';

export default function SitterProfile() {
  const { id } = useLocalSearchParams();
  
  if (!dummyCaretakers || !Array.isArray(dummyCaretakers)) {
    return <Text>Fehler beim Laden der Daten</Text>;
  }

  const sitter = dummyCaretakers.find((s) => s.id === id);

  if (!sitter) {
    return <Text>Sitter nicht gefunden</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: sitter.image }} style={styles.avatar} />
      <Text style={styles.name}>{sitter.title}</Text>
      <Text style={styles.description}>{sitter.description}</Text>
      <Text style={styles.about}>{sitter.about}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginVertical: 8,
  },
  about: {
    fontSize: 15,
    marginVertical: 8,
    textAlign: 'center',
  },
});
