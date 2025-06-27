// app/(tabs)/home.tsx
import React from 'react';
import { ScrollView, Text } from 'react-native';
import ListingCard from '../../components/ListingCard';
import SearchBar from '../../components/SearchBar';
import TagSelector from '../../components/TagSelector';
import { useUserRole } from '../../context/UserRoleContext';
import { dummyCaretakers } from '../../data/dummyCaretakers'; // <— hier!
import { dummyListings } from '../../data/dummyData';

export default function HomeScreen() {
  const { role } = useUserRole();
  const [query, setQuery] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const filterItems = (items: any[]) => {
    return items.filter((item) => {
      const matchQuery = item.name?.toLowerCase().includes(query.toLowerCase()) || item.title?.toLowerCase().includes(query.toLowerCase());
      const matchTags = selectedTags.length === 0 || selectedTags.some((tag) => item.tags.includes(tag));
      return matchQuery && matchTags;
    });
  };

  const filteredListings = filterItems(dummyListings);
  const filteredCaretakers = filterItems(dummyCaretakers);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <SearchBar value={query} onChange={setQuery} />
      <TagSelector
        tags={['Walks', 'Feeding', 'Daycare', 'Training', 'Overnight']}
        selectedTags={selectedTags}
        onSelectTag={(tag) =>
          setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
          )
        }
      />

      {role === 'sitter' && (
        <>
          <Text style={{ fontSize: 18, marginVertical: 12 }}>Aktuelle Inserate</Text>
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </>
      )}

      {role === 'owner' && (
        <>
          <Text style={{ fontSize: 18, marginVertical: 12 }}>Verfügbare Sitter</Text>
          {filteredCaretakers.map((sitter) => (
            <ListingCard key={sitter.id} listing={sitter} />
          ))}
        </>
      )}
    </ScrollView>
  );
}
