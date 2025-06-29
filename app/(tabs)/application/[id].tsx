import { useUserRole } from '@/context/UserRoleContext';
import { dummyApplications } from '@/data/dummyApplications';
import { dummyListings } from '@/data/dummyListing';
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
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { userInfo } = useUserRole();

  const application = dummyApplications.find((a) => a.id === id);

  if (!application) return <Text style={styles.error}>Application not found</Text>;

  const listing = dummyListings.find((l) => l.id === application.listingId);

  const handleBack = () => {
    router.push('/Messages');
  };

  if (!userInfo) {
    return <Text style={styles.error}>User not found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E5128" />
        </TouchableOpacity>
        <Text style={styles.title}>Application Details</Text>
      </View>

      {userInfo.role === 'owner' ? (
        <>
          <Image source={{ uri: application.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{application.name}</Text>
          <Text style={styles.role}>{application.service}</Text>
        </>
      ) : (
        listing && (
          <>
            <Image source={{ uri: listing.image }} style={styles.avatar} />
            <Text style={styles.name}>{listing.title}</Text>
            <Text style={styles.role}>{listing.breed}</Text>
          </>
        )
      )}

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
        <Text style={styles.heading}>About</Text>
        <Text style={styles.about}>
          {userInfo.role === 'owner'
            ? `I'm a passionate dog lover with 5+ years of experience caring for dogs of all breeds and sizes. I offer a safe, loving environment where your furry friend will feel right at home.`
            : listing?.about || 'No description provided.'}
        </Text>
      </View>

      {userInfo.role === 'owner' && (
        <View style={styles.buttonRow}>
          <Pressable style={[styles.button, styles.accept]}>
            <Text style={styles.buttonText}>Accept</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.deny]}>
            <Text style={styles.buttonText}>Deny</Text>
          </Pressable>
        </View>
      )}
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
    backgroundColor: '#fff',
    height: '100%',
  },
  error: {
    padding: 20,
    textAlign: 'center',
    color: 'red',
  },
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
    padding: 10,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
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
