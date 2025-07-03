// app/(tabs)/home.tsx
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import FeatureBanner from '../../components/FeatureBanner';
import ListingCard from '../../components/ListingCard';
import LiveTrackingCard from '../../components/LiveTrackingCard';
import SearchBar from '../../components/SearchBar';
import TagSelector from '../../components/TagSelector';
import { useUserRole } from '../../context/UserRoleContext';
import { dummyCaretakers } from '../../data/dummyCaretakers'; // 👈 Sitters!
import { dummyListings } from '../../data/dummyListing';

const BASE_URL = 'http://localhost:3000/api/v1';

export default function HomeScreen() {
  const { userInfo } = useUserRole();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAnimalTypes, setSelectedAnimalTypes] = useState<string[]>([]);
  const [backendListings, setBackendListings] = useState([]);
  const [loading, setLoading] = useState(false);

  const animalTypeTags = ['Dogs', 'Cats', 'Bird', 'Exotic', 'Other'];

  useFocusEffect(
    useCallback(() => {
      if (!userInfo || userInfo.role !== 'sitter') return;

      setLoading(true);
      fetch(`${BASE_URL}/listings`)
        .then((res) => res.json())
        .then((data) => {
          console.log('✅ Backend-Listings:', data);
          setBackendListings(data);
        })
        .catch((err) => {
          console.error('❌ Fehler beim Laden der Listings:', err);
          setBackendListings([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [userInfo])
  );

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

  const handleFeatureBannerPress = () => {
    router.push('/feature-preview');
  };

  const allListings = [...backendListings, ...dummyListings];
  const filteredListings = filterItems(allListings);
  const filteredSitters = filterItems(dummyCaretakers); // Nur lokal

  if (!userInfo) {
    return <Text style={{ padding: 20 }}>User not found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
      {/* Feature Banner */}
      <FeatureBanner onPress={handleFeatureBannerPress} />
      
      {/* Live Tracking Demo - nur für Owner */}
      {userInfo.role === 'owner' && <LiveTrackingCard />}
        <View style={{ padding: 16 }}>
        <SearchBar value={query} onChange={setQuery} />
        <TagSelector
          tags={animalTypeTags}
          selectedTags={selectedAnimalTypes}
          onSelectTag={(type: string) =>
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
          onSelectTag={(tag: string) =>
            setSelectedTags((prev) =>
              prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
            )
          }
        />

        {loading && userInfo.role === 'sitter' && (
          <Text style={{ marginTop: 20 }}>Loading listings...</Text>
        )}

        {userInfo.role === 'sitter' && (
          <>
            <Text style={{ fontSize: 18, marginVertical: 12, fontWeight: 'bold' }}>
              Pets Near You
            </Text>
            {filteredListings.map((listing, index) => (
              <ListingCard
                key={`${listing.id}-${index}`}
                listing={listing}
                from="Home"
              />
            ))}
          </>
        )}

        {userInfo.role === 'owner' && (
          <>
            <Text style={{ fontSize: 18, marginVertical: 12, fontWeight: 'bold' }}>
              Sitters Near You
            </Text>
            {filteredSitters.map((sitter, index) => (
              <ListingCard
                key={`${sitter.id}-${index}`}
                listing={sitter}
                from="Home"
              />
            ))}
          </>
        )}
      </View>
    </ScrollView>
  );
}
