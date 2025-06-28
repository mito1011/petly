// app/(tabs)/home.tsx
import React from 'react';
import { ScrollView, Text } from 'react-native';
import ListingCard from '../../components/ListingCard';
import SearchBar from '../../components/SearchBar';
import TagSelector from '../../components/TagSelector';
import { useUserRole } from '../../context/UserRoleContext';
import { dummyCaretakers } from '../../data/dummyCaretakers'; // <— hier!
import { dummyListings } from '../../data/dummyListing';

export default function HomeScreen() {
  const { role } = useUserRole();
  const [query, setQuery] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [selectedAnimalTypes, setSelectedAnimalTypes] = React.useState<string[]>([]);
  const animalTypeTags = ['Dogs', 'Cats', 'Other'];

  const filterItems = (items: any[]) => {
    return items.filter((item) => {
      const matchQuery = item.name?.toLowerCase().includes(query.toLowerCase()) || item.title?.toLowerCase().includes(query.toLowerCase());
      const matchTags =
      (selectedTags.length === 0 || selectedTags.some((tag) => item.tags.includes(tag))) &&
      (selectedAnimalTypes.length === 0 || selectedAnimalTypes.some((type) => item.animalTypes?.includes(type)));
      return matchQuery && matchTags;
    });
  };

  const filteredListings = filterItems(dummyListings);
  const filteredCaretakers = filterItems(dummyCaretakers);

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
      <Text style={{ fontSize: 18, marginVertical: 12, fontWeight: 'bold'}}>Care Needs</Text>
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
          <Text style={{ fontSize: 18, marginVertical: 12, fontWeight: 'bold' }}>Pets Near You</Text>
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </>
      )}

      {role === 'owner' && (
        <>
          <Text style={{ fontSize: 18, marginVertical: 12, fontWeight: 'bold' }}>Sitters Near You</Text>
          {filteredCaretakers.map((sitter) => (
            <ListingCard key={sitter.id} listing={sitter} />
          ))}
        </>
      )}
    </ScrollView>
  );
}
