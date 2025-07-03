// app/(tabs)/profile.tsx
import { useUserRole } from '@/context/UserRoleContext';
import { dummyUsers } from '@/data/dummyUsers';
import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const { userInfo, setUserInfo, } = useUserRole();
  const user = dummyUsers.find((u) => u.id === userInfo?.userId);
  const router = useRouter();

  if (!user) {
    return <Text style={styles.error}>User not found</Text>;
  }

  const handleLogout = () => {
    setUserInfo(null);      // User wirklich abmelden
    router.replace('/login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.sub}>{user.location}</Text>
      <Text style={styles.member}>Member since {user.memberSince}</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>About</Text>
        <Text style={styles.about}>{user.bio || user.about}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>{user.role === 'owner' ? 'My Stats' : 'Experience'}</Text>
        {user.role === 'owner' ? (
          <>
            <Text style={styles.stat}>Pets Owned: {user.petsOwned}</Text>
            <Text style={styles.stat}>Listings Created: {user.listingsCreated}</Text>
          </>
        ) : (
          <>
            <Text style={styles.stat}>Completed Jobs: {user.completedJobs}</Text>
            <Text style={styles.stat}>Repeat Clients: {user.repeatClients}</Text>
          </>
        )}
      </View>
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  error: {
    padding: 20,
    color: 'red',
    textAlign: 'center',
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
  sub: {
    color: '#666',
    marginBottom: 4,
  },
  member: {
    color: '#999',
    marginBottom: 20,
  },
  section: {
    width: '100%',
    marginBottom: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  about: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  stat: {
    fontSize: 14,
    color: '#333',
    marginVertical: 2,
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
