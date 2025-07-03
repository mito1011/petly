// 📁 app/sitter/[id].tsx
import { dummyUsers } from '@/data/dummyUsers';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SitterProfile() {
  const router = useRouter();
  const { id, from } = useLocalSearchParams<{ id: string; from?: string }>();
  // Nur in dummyUsers suchen
  const sitter = dummyUsers.find((u) => u.id === String(id));

  if (!sitter) {
    return <Text style={{ padding: 20 }}>Sitter nicht gefunden</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (from === 'Applications') {
              router.replace('/Applications');
            } else {
              router.back(); // fallback
            }
          }}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1E5128" />
        </TouchableOpacity>
        <Text style={styles.title}>{sitter.name ?? sitter.title}</Text>
      </View>

      <Image source={{ uri: sitter.avatar || 'https://via.placeholder.com/100' }} style={styles.avatar} />
      <Text style={styles.name}>{sitter.name ?? sitter.title}</Text>
      <Text style={styles.description}>{sitter.description ?? ''}</Text>

      {/* Optional: Falls du weitere Felder aus dummyUsers anzeigen willst, hier ergänzen */}

      {/* Beispiel für About, falls vorhanden */}
      {sitter.about && (
        <>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.about}>{sitter.about}</Text>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 16 },
  name: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  description: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8 },
  about: { fontSize: 15, color: '#444', lineHeight: 20 },
  header: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    height: 40,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
});
