// app/listing/[id].tsx
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BASE_URL = 'http://localhost:3000/api/v1';

export default function ListingDetails() {
  const router = useRouter();
  const { id, from } = useLocalSearchParams<{ id: string; from?: string }>();
  const listingId = Array.isArray(id) ? id[0] : id;

  const [listing, setListing] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!listingId) return;

    fetch(`${BASE_URL}/listings/${listingId}`)
      .then((res) => res.json())
      .then((data) => setListing(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [listingId]);

  if (loading) return <Text style={styles.error}>Loading...</Text>;
  if (!listing) return <Text style={styles.error}>Listing not found.</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (from === 'home') {
              router.push('/Home');
            } else {
              router.push('/Messages');
            }
          }}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1E5128" />
        </TouchableOpacity>
        <Text style={styles.title}>{listing.title}</Text>
      </View>

      <Image source={{ uri: listing.image || 'https://via.placeholder.com/300' }} style={styles.image} />

      <View style={styles.section}>
        <Text style={styles.about}>About {listing.title}</Text>
        <Text style={styles.description}>{listing.about}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Care Requirements</Text>
        <View style={styles.separator} />
        <View style={styles.row}>
          <Info label="Breed" value={listing.breed} />
          <Info label="Age" value={listing.age} />
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
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
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, styles.accept]}>
          <Text style={styles.buttonText}>Book Now</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function Info({ label, value }: { label: string; value: string }) {
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
    height: 40,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
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
