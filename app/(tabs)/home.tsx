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
import { getAnimalImageUrl } from '../../data/dummyURL';
import { dummyUsers } from '../../data/dummyUsers'; // ganz oben

const BASE_URL = 'http://localhost:3000/api/v1';

function mapBackendListingsWithImages(listings) {
  const tagMap = {
    'house-sitting': 'House Sitting',
    'drop-in-visit': 'Drop-in Visit',
    'day-care': 'Daycare',
    'walks': 'Walks',
    'feeding': 'Feeding',
    'overnight': 'Overnight',
    'medication': 'Medication',
  };

  return listings.map((listing) => {
    // Tierart ins Dummy-Format bringen
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

    // Bild anhand der ID generieren (immer gleich für jede ID)
    const image = getAnimalImageUrl(animalType, listing.id);

    return {
      id: listing.id,
      title: listing.title,
      description: listing.description,
      image,
      tags: (listing.listingType || []).map((t) => tagMap[t] || t),
      animalTypes: [animalType],
      about: listing.about || '',
      breed: listing.breed,
      age: listing.age ? `${listing.age} years` : '',
      size: listing.size,
      exercise: listing.exercise || '',
      feeding: listing.feeding,
      medication: listing.medication,
      appliedBy: listing.appliedBy || [],
    };
  });
}

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

  // Nur noch Backend-Listings verwenden!
  const mappedBackendListings = mapBackendListingsWithImages(backendListings);
  const filteredListings = filterItems(mappedBackendListings);
  const sittersFromUsers = dummyUsers.filter((u) => u.role === 'sitter');
  const filteredSitters = filterItems(sittersFromUsers);

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
        tags={['Walks', 'Feeding', 'Daycare', 'House Sitting','Drop-in Visit','Medication', 'Overnight']}
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

      {/* Sitter sieht Pflegeanzeigen */}
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

      {/* Owner sieht Sitter-Profile (über user) */}
      {userInfo.role === 'owner' && (
        <>
          <Text style={{ fontSize: 18, marginVertical: 12, fontWeight: 'bold' }}>
            Sitters Near You
          </Text>
          {filteredSitters.map((sitter, index) => {
            const userProps = {
              id: sitter.id,
              name: sitter.name,
              avatar: sitter.avatar,
              tags: ['Reliable', 'Verified'], // z. B. fixer Tag-Satz
              rating: Math.random() * 1 + 4, // Dummy
              reviews: sitter.completedJobs ?? 0, // Dummy
            };

            console.log('👤 ListingCard sitter from dummyUsers:', userProps);

            return (
              <ListingCard
                key={`${sitter.id}-${index}`}
                user={userProps}
                from="Home"
              />
            );
          })}
        </>
      )}
    </View>
  </ScrollView>
);
}
