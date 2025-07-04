import { useUserRole } from '@/context/UserRoleContext';
import { dummyListings } from '@/data/dummyListing';
import { getAnimalImageUrl } from '@/data/dummyURL'; // Import ergänzen
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const BASE_URL = 'http://localhost:3000/api/v1';

export default function ListingDetails() {
  const router = useRouter();
  const { id, from, image: navImage } = useLocalSearchParams<{ id: string; from?: string; image?: string }>();
  const listingId = Array.isArray(id) ? id[0] : id;
  const { userInfo } = useUserRole();

  const [listing, setListing] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!listingId) return;

    const fetchListing = async () => {
      try {
        const res = await fetch(`${BASE_URL}/listings/${listingId}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setListing(data);
      } catch (err) {
        const fallback = dummyListings.find((l) => String(l.id) === String(listingId));
        setListing(fallback || null);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  const handleBookNow = async () => {
    if (!userInfo || userInfo.role !== 'sitter') {
      Alert.alert('Not allowed', 'Only sitters can apply.');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/listings/${listing.id}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sitterId: userInfo.userId,
        }),
      });

      if (!res.ok) throw new Error('Application failed');

      const result = await res.json();
      console.log('✅ Bewerbung erstellt:', result);
      Alert.alert('Success', 'Application submitted!');
      router.push('/Applications');
    } catch (err) {
      console.error('❌ Fehler bei Buchung:', err);
      Alert.alert('Fehler', 'Bewerbung konnte nicht gesendet werden.');
    }
  };

  if (loading) return <Text style={styles.error}>Loading...</Text>;
  if (!listing) return <Text style={styles.error}>Listing not found.</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (from === 'Home' || !from) {
              router.push('/Home');
            } else {
              router.push('/Applications');
            }
          }}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1E5128" />
        </TouchableOpacity>
        <Text style={styles.title}>{listing.title}</Text>
      </View>

      <Image
        source={{
          uri:
            // 1. Bild aus Navigation verwenden, falls vorhanden
            (typeof navImage === 'string' && navImage) ||
            // 2. Sonst wie gehabt
            listing.image ||
            getAnimalImageUrl(
              listing.animalTypes?.[0] ||
                (listing.species === 'dog'
                  ? 'Dogs'
                  : listing.species === 'cat'
                  ? 'Cats'
                  : listing.species === 'bird'
                  ? 'Birds'
                  : listing.species === 'exotic'
                  ? 'Exotic'
                  : 'Other'),
              listing.id
            ) ||
            'https://via.placeholder.com/300',
        }}
        style={styles.image}
      />

      <View style={styles.section}>
        <Text style={styles.about}>About {listing.title}</Text>
        <Text style={styles.description}>{listing.about || listing.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Care Requirements</Text>
        <View style={styles.separator} />
        <View style={styles.row}>
          <Info label="Species" value={listing.species} />
          <Info label="Breed" value={listing.breed} />
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <Info label="Age" value={listing.age} />
          <Info label="Size" value={listing.size} />
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <Info label="Exercise" value={listing.exercise} />
          <Info label="Feeding" value={listing.feeding} />
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <Info label="Medication" value={listing.medication} />
          <Info label="Listing Type" value={(listing.listingType || []).join(', ')} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Listing Details</Text>
        <View style={styles.separator} />
        <View style={styles.row}>
          <Info label="Start Date" value={listing.startDate} />
          <Info label="End Date" value={listing.endDate} />
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <Info label="Price" value={listing.price ? `${listing.price} €` : ''} />
          <Info label="Sitter Verified" value={listing.sitterVerified ? 'Yes' : 'No'} />
        </View>
        <View style={styles.separator} />
        
      </View>

      {userInfo?.role === 'sitter' && from !== 'Applications' &&(
        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, styles.accept]} onPress={handleBookNow}>
            <Text style={styles.buttonText}>Book Now</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

function Info({ label, value }: { label: string; value: any }) {
  return (
    <View style={{ flexBasis: '50%', marginVertical: 8 }}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
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
    height: 60,
    backgroundColor: '#fff',
    zIndex: 2,
    flexDirection: 'row', // NEU: horizontal anordnen
  },
  backButton: {
    position: 'absolute',
    left: 0,
    paddingHorizontal: 10,
    zIndex: 3,
    height: '100%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    paddingLeft: 32, // Platz für den Pfeil
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 10, // Platz für Header
  },
  section: {
    marginBottom: 24,
  },
  about: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 8,
    fontSize: 15,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: 30,
  },
  button: {
    flex: 1,
    padding: 12,
    marginHorizontal: 6,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#1E9E62',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 4,
  },
});
