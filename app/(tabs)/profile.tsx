// app/(tabs)/profile.tsx
import { useUserRole } from '@/context/UserRoleContext';
import { dummyUsers } from '@/data/dummyUsers';
import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const { role, setRole } = useUserRole();
  const router = useRouter();
  const user = dummyUsers.find((u) => u.role === role);

  if (!user) return <Text style={styles.error}>User not found</Text>;

  const handleLogout = () => {
    router.replace('/login'); // navigiert zur Login-Seite
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.location}>{user.location}</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>Member Since</Text>
        <Text>{user.memberSince}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>About</Text>
        <Text>{user.about}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Statistics</Text>
        <View style={styles.statsRow}>
          {Object.entries({
            Pets: user.petsOwned || 0,
            Listings: user.listingsCreated || 0,
            ...(user.completedJobs ? { Jobs: user.completedJobs } : {}),
            ...(user.repeatClients ? { Clients: user.repeatClients } : {})
          }).map(([label, value]) => (
            <View key={label} style={styles.statBox}>
              <Text style={styles.statValue}>{String(value)}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  error: {
    padding: 20,
    textAlign: 'center',
    color: 'red',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  location: {
    color: '#666',
    marginBottom: 20,
  },
  section: {
    width: '100%',
    marginBottom: 20,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
