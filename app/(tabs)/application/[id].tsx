// app/application/[id].tsx
import { dummyApplications } from '@/data/dummyApplications';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ApplicationDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const application = dummyApplications.find((a) => a.id === id);

  if (!application) return <Text style={styles.error}>Application not found</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E5128" />
        </TouchableOpacity>
        <Text style={styles.title}>Application Details</Text>
      </View>

      <Image source={{ uri: application.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{application.name}</Text>
      <Text style={styles.role}>{application.service}</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>Details</Text>

        <View style={styles.separator} />

        <View style={styles.row}>
          <Info label="Service" value={application.service} />
          <Info label="Date" value={application.date} />
        </View>

        <View style={styles.separator} />

        <View style={styles.row}>
          <Info label="Time" value={application.time} />
          <Info label="Rate" value={application.rate} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>About {application.name.split(' ')[0]}</Text>
        <Text style={styles.about}>
          I'm a passionate dog lover with 5+ years of experience caring for dogs of all breeds and sizes. I offer a safe, loving environment where your furry friend will feel right at home. I'm available for walks, drop-ins, and overnight stays.
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <Pressable style={[styles.button, styles.accept]}>
          <Text style={styles.buttonText}>Accept</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.deny]}>
          <Text style={styles.buttonText}>Deny</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  error: {
    padding: 20,
    textAlign: 'center',
    color: 'red',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginBottom: 16,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 6,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignSelf: 'center',
    marginTop: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
  },
  role: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  about: {
    fontSize: 14,
    color: '#444',
    marginTop: 8,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  button: {
    flex: 1,
    padding: 12,
    marginHorizontal: 6,
    borderRadius: 20,
    alignItems: 'center',
  },
  accept: {
    backgroundColor: '#1E9E62',
  },
  deny: {
    backgroundColor: '#ddd',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
