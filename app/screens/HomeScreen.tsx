// screens/HomeScreen.tsx
import { ListingCard } from '@/components/ListingCard';

 
import { SearchBar } from '@/components/SearchBar';
import { TagSelector } from '@/components/TagSelector';
import { useUserRole } from '@/context/UserRoleContext';
import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';

const careTags = ['Boarding', 'House Sitting', 'Drop-In Visits', 'Dog Walking', 'Day Care', 'Training'];
const typeTags = ['Dog', 'Cat', 'Other'];

const exampleSitterData = [
  { name: 'Sarah M.', description: 'Dog Boarding', rating: 4.9, reviews: 12, image: 'https://i.pravatar.cc/100?img=1' },
  { name: 'Mark L.', description: 'Dog Walking', rating: 5.0, reviews: 25, image: 'https://i.pravatar.cc/100?img=2' },
  { name: 'Emily R.', description: 'Cat Sitting', rating: 4.8, reviews: 8, image: 'https://i.pravatar.cc/100?img=3' },
];

const examplePetData = [
  { name: 'Buddy', description: 'Dog Boarding', rating: 4.9, reviews: 12, image: 'https://place-puppy.com/100x100' },
  { name: 'Whiskers', description: 'Dog Walking', rating: 5.0, reviews: 25, image: 'https://placekitten.com/100/100' },
  { name: 'Mittens', description: 'Cat Sitting', rating: 4.8, reviews: 8, image: 'https://placekitten.com/101/101' },
];

export const HomeScreen = () => {
  const { role } = useUserRole();
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const data = role === 'owner' ? exampleSitterData : examplePetData;
  const title = role === 'owner' ? 'Find a Sitter' : 'Find a Pet';
  const placeholder = role === 'owner' ? 'Search for sitters' : 'Search for pets';

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>{title}</Text>
      <SearchBar placeholder={placeholder} value={search} onChange={setSearch} />
      <TagSelector tags={typeTags} selected={selectedTags} onSelect={toggleTag} />
      <TagSelector tags={careTags} selected={selectedTags} onSelect={toggleTag} />

      <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 12 }}>
        {role === 'owner' ? 'Sitters' : 'Pets'} Near You
      </Text>

      {data.map((entry, index) => (
        <ListingCard key={index} {...entry} />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;