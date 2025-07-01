import { useUserRole } from '@/context/UserRoleContext';
import { dummyApplications } from '@/data/dummyApplications';
import { dummyListings } from '@/data/dummyListing';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const BASE_URL = 'http://localhost:3000/api/v1';

export default function ApplicationDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { userInfo } = useUserRole();

  const [application, setApplication] = useState(null);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    router.push('/Messages');
  };

  useEffect(() => {
    if (!id || !userInfo) return;

    const fetchFromBackend = async () => {
      try {
        let allApps = [];

        if (userInfo.role === 'sitter') {
          const res = await fetch(`${BASE_URL}/sitters/${userInfo.userId}/applications`);
          allApps = await res.json();
        } else if (userInfo.role === 'owner') {
          const listingRes = await fetch(`${BASE_URL}/listings/owner/${userInfo.userId}`);
          const listings = await listingRes.json();

          const appsByListing = await Promise.all(
            listings.map((l) =>
              fetch(`${BASE_URL}/listings/${l.id}/applications`).then((res) => res.json())
            )
          );
          allApps = appsByListing.flat();
        }

        const combinedApps = [...allApps, ...dummyApplications];
        const app = combinedApps.find((a) => String(a.id) === String(id));
        if (!app) throw new Error('Application not found');
        setApplication(app);

        const listingRes = await fetch(`${BASE_URL}/listings/${app.listingId}`);
        const listingData = await listingRes.json();
        const combinedListing = listingData || dummyListings.find((l) => l.id === app.listingId);

        setListing(combinedListing);
      } catch (err) {
        console.error('❌ Fehler beim Laden:', err);

        const fallbackApp = dummyApplications.find((a) => String(a.id) === String(id));
        setApplication(fallbackApp);
        setListing(dummyListings.find((l) => l.id === fallbackApp?.listingId));
      } finally {
        setLoading(false);
      }
    };

    fetchFromBackend();
  }, [id, userInfo]);

  const updateStatus = async (status: 'accepted' | 'rejected') => {
    if (!application || !listing) return;

    try {
      let appId = application.id;
      const isDummy = typeof appId === 'string' && appId.startsWith('a');

      if (isDummy) {
        const res = await fetch(`${BASE_URL}/listings/${listing.id}/applications`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sitterId: application.sitterId }),
        });

        if (!res.ok) throw new Error('Erstellen der Bewerbung fehlgeschlagen');
        const created = await res.json();
        appId = created.id;
        console.log('✅ Dummy-Bewerbung im Backend erstellt:', created);
      }

      const patchRes = await fetch(`${BASE_URL}/applications/${appId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!patchRes.ok) throw new Error('Status konnte nicht gesetzt werden');
      const updated = await patchRes.json();

      setApplication({ ...application, id: appId, status });
      console.log('✅ Bewerbung aktualisiert:', updated);
    } catch (err) {
      console.error('❌ Fehler beim Bewerbungs-Update:', err);
    }
  };

  if (!userInfo) return <Text style={styles.error}>User not found</Text>;
  if (loading) return <Text style={styles.error}>Loading...</Text>;
  if (!application) return <Text style={styles.error}>Application not found</Text>;

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
          <Image source={{ uri: application.avatar || 'https://via.placeholder.com/100' }} style={styles.avatar} />
          <Text style={styles.name}>{application.name}</Text>
          <Text style={styles.role}>{application.service}</Text>
        </>
      ) : listing ? (
        <>
          <Image source={{ uri: listing.image || 'https://via.placeholder.com/100' }} style={styles.avatar} />
          <Text style={styles.name}>{listing.title}</Text>
          <Text style={styles.role}>{listing.breed}</Text>
        </>
      ) : null}

      <Text style={{ textAlign: 'center', color: '#888', marginBottom: 12 }}>
        Status: {application.status || 'pending'}
      </Text>

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
            ? application.bio || 'No bio provided.'
            : listing?.about || 'No description provided.'}
        </Text>
      </View>

      {userInfo.role === 'owner' && (
        <View style={styles.buttonRow}>
          <Pressable style={[styles.button, styles.accept]} onPress={() => updateStatus('accepted')}>
            <Text style={styles.buttonText}>Accept</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.deny]} onPress={() => updateStatus('rejected')}>
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
    marginBottom: 12,
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
    backgroundColor: '#d9534f',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
