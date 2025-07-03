import { useUserRole } from '@/context/UserRoleContext';
import { dummyApplications } from '@/data/dummyApplications';
import { dummyListings } from '@/data/dummyListing';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
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
  const [backendApplications, setBackendApplications] = useState([]);
  const [backendListings, setBackendListings] = useState([]);

  useFocusEffect(
    useCallback(() => {
      if (!userInfo) return;

      if (userInfo.role === 'owner') {
        fetch(`${BASE_URL}/listings/owner/${userInfo.userId}`)
          .then((res) => res.json())
          .then((listings) => {
            setBackendListings(listings);

            return Promise.all(
              listings.map((l) =>
                fetch(`${BASE_URL}/listings/${l.id}/applications`).then((res) =>
                  res.json()
                )
              )
            );
          })
          .then((apps) => {
            setBackendApplications(apps.flat());
          })
          .catch(console.error);
      } else if (userInfo.role === 'sitter') {
        fetch(`${BASE_URL}/sitters/${userInfo.userId}/applications`)
          .then((res) => res.json())
          .then((apps) => {
            setBackendApplications(apps);

            return Promise.all(
              apps.map((a) =>
                fetch(`${BASE_URL}/listings/${a.listingId}`).then((res) =>
                  res.json()
                )
              )
            );
          })
          .then((listings) => {
            setBackendListings(listings);
          })
          .catch(console.error);
      }
    }, [userInfo])
  );

  if (!userInfo) {
    return <Text style={{ padding: 20 }}>User not found</Text>;
  }

  const allListings = [...backendListings, ...dummyListings];

  // 👇 Nur Dummy-Bewerbungen behalten, die nicht schon im Backend existieren
  const filteredApplications = [
    ...backendApplications,
    ...dummyApplications.filter((dummy) =>
      !backendApplications.some(
        (real) =>
          String(real.listingId) === String(dummy.listingId) &&
          String(real.sitterId) === String(dummy.sitterId)
      )
    ),
  ];

  const getOwnerId = (listingId) => {
    const match = allListings.find(
      (l) => String(l.id) === String(listingId)
    );
    return match?.ownerId;
  };

  if (userInfo.role === 'owner') {
    const pending = filteredApplications.filter(
      (app) =>
        app.status === 'pending' &&
        String(getOwnerId(app.listingId)) === String(userInfo.userId)
    );

    const accepted = filteredApplications.filter(
      (app) =>
        app.status === 'accepted' &&
        String(getOwnerId(app.listingId)) === String(userInfo.userId)
    );

    const renderAppItem = ({ item }) => (
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push(`/application/${item.id}`)}
      >
        <Image
          source={{ uri: item.avatar || 'https://via.placeholder.com/48' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.sub}>
            {item.service} · {item.date}
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Applications</Text>
        <Text style={styles.label}>Pending</Text>
        <FlatList
          data={pending}
          renderItem={renderAppItem}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={<Text style={styles.sub}>No pending applications.</Text>}
        />
        <Text style={styles.label}>Accepted</Text>
        <FlatList
          data={accepted}
          renderItem={renderAppItem}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={<Text style={styles.sub}>No accepted applications.</Text>}
        />
      </View>
    );
  } else {
    const sitterApplications = filteredApplications.filter(
      (app) => app.sitterId === userInfo.userId
    );

    const appliedListings = sitterApplications
      .map((app) =>
        allListings.find((l) => String(l.id) === String(app.listingId))
      )
      .filter(Boolean);

    const renderListingItem = ({ item }) => (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          router.push({
            pathname: `/listing/${item.id}`,
            params: { from: 'Applications' },
          })
        }
      >
        <Image
          source={{ uri: item.image || 'https://via.placeholder.com/48' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.sub}>{(item.tags || []).join(', ')}</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Your Applications</Text>
        <FlatList
          data={appliedListings}
          renderItem={renderListingItem}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={<Text style={styles.sub}>No applications yet.</Text>}
        />
      </View>
    );
  }
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
