import { useUserRole } from '@/context/UserRoleContext';
// import { dummyApplications } from '@/data/dummyApplications'; // entfernt
import { dummyListings } from '@/data/dummyListing';
import { getAnimalImageUrl } from '@/data/dummyURL'; // Falls noch nicht importiert
import { dummyUsers } from '@/data/dummyUsers';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Alert,
  Button,
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
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);

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

  // Nur noch Backend-Bewerbungen verwenden!
  const filteredApplications = backendApplications;

  // OWNER-VIEW
  if (userInfo.role === 'owner') {
    // 1. Zeige Liste der eigenen Inserate
    if (!selectedListingId) {
      const myListings = allListings
        .filter((l) => String(l.ownerId) === String(userInfo.userId))
        .map((listing) => {
          let animalType =
            listing.species === 'dog'
              ? 'Dogs'
              : listing.species === 'cat'
              ? 'Cats'
              : listing.species === 'bird'
              ? 'Birds'
              : listing.species === 'exotic'
              ? 'Exotic'
              : 'Other';
          return {
            ...listing,
            image: listing.image || getAnimalImageUrl(animalType, listing.id),
          };
        });

      // Hilfsfunktion: Hat das Inserat eine angenommene Bewerbung?
      const isClosed = (listingId: string) =>
        filteredApplications.some(
          (app) =>
            String(app.listingId) === String(listingId) &&
            app.status === 'accepted'
        );

      // Listen aufteilen
      const openListings = myListings.filter((l) => !isClosed(l.id));
      const closedListings = myListings.filter((l) => isClosed(l.id));

      const renderListing = ({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => setSelectedListingId(item.id)}
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
          <Text style={styles.header}>Your Listings</Text>
          <Text style={[styles.label, { marginTop: 0, marginBottom: 0 }]}>Open</Text>
          <FlatList
            data={openListings}
            renderItem={renderListing}
            keyExtractor={(item) => String(item.id)}
            ListEmptyComponent={<Text style={styles.sub}>No open listings.</Text>}
            style={{ marginBottom: 0 }}
            contentContainerStyle={{ paddingBottom: 0, marginBottom: 0 }}
          />
          <Text style={[styles.label, { marginTop: 0, marginBottom: 4 }]}>Closed</Text>
          <FlatList
            data={closedListings}
            renderItem={renderListing}
            keyExtractor={(item) => String(item.id)}
            ListEmptyComponent={<Text style={styles.sub}>No closed listings.</Text>}
            style={{ marginBottom: 0 }}
            contentContainerStyle={{ paddingTop: 0, marginTop: 0 }}
          />
        </View>
      );
    }

    // 2. Zeige Bewerbungen für das ausgewählte Inserat
    const applicationsForListing = filteredApplications
      .filter(
        (app) =>
          String(app.listingId) === String(selectedListingId) &&
          dummyUsers.some((u) => u.id === app.sitterId)
      )
      .map((app) => {
        const user = dummyUsers.find((u) => u.id === app.sitterId);
        const listing = allListings.find((l) => String(l.id) === String(app.listingId));
        return {
          ...app,
          avatar: user?.avatar,
          name: user?.name,
          image: listing?.image, // Bild aus Listing hinzufügen
        };
      });

    const handleStatusChange = async (appId: string, status: 'accepted' | 'denied') => {
      // Mapping für Backend
      const backendStatus = status === 'denied' ? 'rejected' : status;

      try {
        const response = await fetch(`${BASE_URL}/applications/${appId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: backendStatus }),
        });

        if (!response.ok) {
          throw new Error('Update failed');
        }

        const updatedApp = await response.json();

        setBackendApplications((prev) =>
          prev.map((a) =>
            String(a.id) === String(appId) ? { ...a, status: updatedApp.status } : a
          )
        );
        Alert.alert('Status geändert', `Bewerbung ${appId} wurde auf ${backendStatus} gesetzt.`);
      } catch (e) {
        Alert.alert('Fehler', 'Status konnte nicht gespeichert werden.');
      }
    };

    const renderAppItem = ({ item }) => (
      <TouchableOpacity
        style={[styles.item, { opacity: item.status === 'denied' ? 0.5 : 1 }]}
        onPress={() =>
          router.push({
            pathname: `/sitter/${item.sitterId}`,
          })
        }
      >
        <Image
          source={{ uri: item.avatar || 'https://via.placeholder.com/48' }}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.sub}>
            {item.service} · {item.date}
          </Text>
          <Text
            style={[
              styles.status,
              item.status === 'accepted'
                ? styles.accepted
                : item.status === 'denied'
                ? styles.denied
                : styles.pending,
            ]}
          >
            Status: {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
        {item.status === 'pending' && (
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button
              title="Accept"
              color="green"
              onPress={() => handleStatusChange(item.id, 'accepted')}
            />
            <Button
              title="Deny"
              color="red"
              onPress={() => handleStatusChange(item.id, 'denied')}
            />
          </View>
        )}
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setSelectedListingId(null)}>
          <Text style={[styles.sub, { color: '#1E5128', marginBottom: 12 }]}>
            ← Back to Listings
          </Text>
        </TouchableOpacity>
        <Text style={styles.header}>Applications</Text>
        <FlatList
          data={applicationsForListing}
          renderItem={renderAppItem}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={<Text style={styles.sub}>No applications yet.</Text>}
        />
      </View>
    );
  }

  // SITTER-VIEW
  const sitterApplications = filteredApplications.filter(
    (app) => app.sitterId === userInfo.userId
  );

  const appliedListings = sitterApplications
    .map((app) => {
      const listing = allListings.find((l) => String(l.id) === String(app.listingId));
      if (!listing) return null;
      let animalType =
        listing.species === 'dog'
          ? 'Dogs'
          : listing.species === 'cat'
          ? 'Cats'
          : listing.species === 'bird'
          ? 'Birds'
          : listing.species === 'exotic'
          ? 'Exotic'
          : 'Other';
      return {
        listing: {
          ...listing,
          image: listing.image || getAnimalImageUrl(animalType, listing.id),
        },
        status: app.status,
      };
    })
    .filter(Boolean);

  const renderListingItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        router.push({
          pathname: `/listing/${item.listing.id}`,
          params: { from: 'Applications' },
        })
      }
    >
      <Image
        source={{ uri: item.listing.image || 'https://via.placeholder.com/48' }}
        style={styles.avatar}
      />
      <View>
        <Text style={styles.name}>{item.listing.title}</Text>
        <Text style={styles.sub}>{(item.listing.tags || []).join(', ')}</Text>
        <Text
          style={[
            styles.status,
            item.status === 'accepted'
              ? styles.accepted
              : item.status === 'denied'
              ? styles.denied
              : styles.pending,
          ]}
        >
          Status: {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Applications</Text>
      <FlatList
        data={appliedListings}
        renderItem={renderListingItem}
        keyExtractor={(item, idx) => String(item.listing.id) + '-' + idx}
        ListEmptyComponent={<Text style={styles.sub}>No applications yet.</Text>}
      />
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
  status: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 2,
  },
  accepted: { color: 'green' },
  denied: { color: 'red' },
  pending: { color: '#FFA500' },
});
