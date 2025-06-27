// 📁 app/(tabs)/messages.tsx
import { FlatList, StyleSheet, Text, View } from 'react-native';

const messages = [
  { id: '1', title: 'Bewerbung auf Bella', status: 'Pending' },
  { id: '2', title: 'Direktbuchung Max', status: 'Accepted' },
];

export default function MessagesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nachrichten & Bewerbungen</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Text style={styles.messageText}>{item.title}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  message: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  messageText: { fontSize: 16 },
  status: { fontSize: 14, color: 'gray' },
});