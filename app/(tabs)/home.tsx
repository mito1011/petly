// app/(tabs)/home.tsx
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import ListingCard from '../../components/ListingCard';
import SearchBar from '../../components/SearchBar';
import TagSelector from '../../components/TagSelector';
import { useUserRole } from '../../context/UserRoleContext';
import { dummyListings } from '../../data/dummyListing'; // Lokale Dummy-Daten

const BASE_URL = 'http://localhost:3000/api/v1';

export default function HomeScreen() {
  const { userInfo } = useUserRole();
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAnimalTypes, setSelectedAnimalTypes] = useState<string[]>([]);
  const [backendListings, setBackendListings] = useState([]);
  const [loading, setLoading] = useState(false);

  const animalTypeTags = ['Dogs', 'Cats', 'Exotic', 'Other'];

  useFocusEffect(
    useCallback(() => {
      if (!userInfo) return;

      setLoading(true);
      console.log('🏠 Home fokussiert – Lade Backend-Daten ...');

      fetch(`${BASE_URL}/listings`)
        .then((res) => res.json())
        .then((data) => {
          console.log('✅ Backend-Daten geladen:', data);
          setBackendListings(data);
        })
        .catch((err) => {
          console.error('❌ Fehler beim Laden der Listings:', err);
          setBackendListings([]); // trotzdem Dummy-Daten anzeigen
        })
        .finally(() => {
          setLoading(false);
        });
    }, [userInfo])
  );

  // Kombinierte Listings
  const allListings = [...backendListings, ...dummyListings];

  const filterItems = (items: any[]) => {
    return items.filter((item) => {
      const matchQuery =
        item.name?.toLowerCase().includes(query.toLowerCase()) ||
        item.title?.toLowerCase().includes(query.toLowerCase());

      const matchTags =
        (selectedTags.length === 0 ||
          selectedTags.some((tag) => item.tags?.includes(tag))) &&
        (selectedAnimalTypes.length === 0 ||
          selectedAnimalTypes.some((type) =>
            item.animalTypes?.includes(type)
          ));

      return matchQuery && matchTags;
    });
  };

  const filteredListings = filterItems(allListings);

  if (!userInfo) {
    return <Text style={{ padding: 20 }}>User not found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <SearchBar value={query} onChange={setQuery} />
      <TagSelector
        tags={animalTypeTags}
        selectedTags={selectedAnimalTypes}
        onSelectTag={(type) =>
          setSelectedAnimalTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
          )
        }
      />
      <Text style={{ fontSize: 18, marginVertical: 12, fontWeight: 'bold' }}>
        Care Needs
      </Text>
      <TagSelector
        tags={['Walks', 'Feeding', 'Daycare', 'Training', 'Overnight']}
        selectedTags={selectedTags}
        onSelectTag={(tag) =>
          setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
          )
        }
      />

      {loading && <Text style={{ marginTop: 20 }}>Loading listings...</Text>}

      {!loading && userInfo.role === 'sitter' && (
        <>
          <Text style={{ fontSize: 18, marginVertical: 12, fontWeight: 'bold' }}>
            Pets Near You
          </Text>
          {filteredListings.map((listing, index) => (
            <ListingCard key={`${listing.id}-${listing.ownerId || index}`} listing={listing} />
          ))}
        </>
      )}

      {!loading && userInfo.role === 'owner' && (
        <>
          <Text style={{ fontSize: 18, marginVertical: 12, fontWeight: 'bold' }}>
            Sitters Near You
          </Text>
          {filteredListings.map((listing, index) => (
            <ListingCard key={`${listing.id}-${listing.ownerId || index}`} listing={listing} />
          ))}
        </>
      )}
    </ScrollView>
  );
}
