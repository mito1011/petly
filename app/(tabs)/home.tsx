// app/(tabs)/home.tsx
import React from 'react';
import { ScrollView, Text } from 'react-native';
import ListingCard from '../../components/ListingCard';
import SearchBar from '../../components/SearchBar';
import TagSelector from '../../components/TagSelector';
import { useUserRole } from '../../context/UserRoleContext';
import { dummyListings } from '../../data/dummyData';

export default function HomeScreen() {
  const { userRole } = useUserRole();
  const [query, setQuery] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const filteredListings = dummyListings.filter((item) => {
    const matchQuery = item.title.toLowerCase().includes(query.toLowerCase());
    const matchTags = selectedTags.length === 0 || selectedTags.some((tag) => item.tags.includes(tag));
    return matchQuery && matchTags;
  });

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <SearchBar value={query} onChange={setQuery} />
      <TagSelector
        tags={['Walks', 'Feeding', 'Daycare']}
        selectedTags={selectedTags}
        onSelectTag={(tag) =>
          setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
          )
        }
      />
      {userRole === 'sitter' && (
        <>
          <Text style={{ fontSize: 18, marginVertical: 12 }}>Aktuelle Inserate</Text>
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </>
      )}
      {userRole === 'owner' && (
        <Text>Du bist als Besitzer eingeloggt – Sitterliste kommt hier hin.</Text>
      )}
    </ScrollView>
  );
}
