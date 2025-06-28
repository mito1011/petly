import { StyleSheet, TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SearchBar({ value, onChange }: { value: string; onChange: (text: string) => void }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#999" style={styles.icon} />
      <TextInput
        placeholder="Search..."
        value={value}
        onChangeText={onChange}
        style={styles.input}
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Wichtig!
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#abcc',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
    height: '80%',
  },
});
