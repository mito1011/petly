// app/(tabs)/messages.tsx
import { useUserRole } from '@/context/UserRoleContext';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const BASE_URL = 'http://localhost:3000/api/v1';

export default function MessagesScreen() {
  const { userInfo } = useUserRole();
  const router = useRouter();
  const [pendingApps, setPendingApps] = useState([]);
  const [acceptedApps, setAcceptedApps] = useState([]);
  const [appliedListings, setAppliedListings] = useState([]);

  useEffect(() => {
    if (!userInfo) return;

    if (userInfo.role === 'owner') {
      // Schritt 1: Lade Listings des Owners
      fetch(`${BASE_URL}/listings/owner/${userInfo.userId}`)
        .then((res) => res.json())
        .then((listings) => {
          // Schritt 2: Für jedes Listing Bewerbungen laden
          Promise.all(
            listings.map((listing) =>
              fetch(`${BASE_URL}/listings/${listing.id}/applications`).then((res) =>
                res.json()
              )
            )
          ).then((allApplications) => {
            const all = allApplications.flat();
            setPendingApps(all.filter((app) => app.status === 'pending'));
            setAcceptedApps(all.filter((app) => app.status === 'accepted'));
          });
        })
        .catch(console.error);
    } else if (userInfo.role === 'sitter') {
      // Bewerbungen des Sitters laden
      fetch(`${BASE_URL}/sitters/${userInfo.userId}/applications`)
        .then((res) => res.json())
        .then((applications) => {
          // Optional: zugehörige Listings laden
          Promise.all(
            applications.map((app) =>
              fetch(`${BASE_URL}/listings/${app.listingId}`).then((res) =>
                res.json()
              )
            )
          ).then(setAppliedListings);
        })
        .catch(console.error);
    }
  }, [userInfo]);

  const renderAppItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => router.push(`/application/${item.id}`)}
    >
      <Image source={{ uri: item.avatar || 'https://via.placeholder.com/48' }} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.sub}>{item.service} · {item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderListingItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        router.push({ pathname: `/listing/${item.id}`, params: { from: 'messages' } })
      }
    >
      <Image source={{ uri: item.image || 'https://via.placeholder.com/48' }} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.sub}>{(item.tags || []).join(', ')}</Text>
      </View>
    </TouchableOpacity>
  );

  if (!userInfo) {
    return <Text style={{ padding: 20 }}>User not found</Text>;
  }

  return (
    <View style={styles.container}>
      {userInfo.role === 'owner' ? (
        <>
          <Text style={styles.header}>Applications</Text>
          <Text style={styles.label}>Pending</Text>
          <FlatList
            data={pendingApps}
            renderItem={renderAppItem}
            keyExtractor={(item) => item.id}
          />
          <Text style={styles.label}>Accepted</Text>
          <FlatList
            data={acceptedApps}
            renderItem={renderAppItem}
            keyExtractor={(item) => item.id}
          />
        </>
      ) : (
        <>
          <Text style={styles.header}>Your Applications</Text>
          <FlatList
            data={appliedListings}
            renderItem={renderListingItem}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  sub: {
    color: '#666',
  },
});
