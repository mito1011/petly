// 📁 app/(tabs)/save.tsx
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PostScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Neues Inserat erstellen</Text>
      <TextInput placeholder="Titel" style={styles.input} />
      <TextInput placeholder="Beschreibung" style={styles.input} multiline />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Inserat speichern</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#34c759',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});