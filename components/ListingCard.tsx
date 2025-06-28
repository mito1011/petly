import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  listing: {
    id: string;
    title: string;
    image: string;
    tags: string[];
    rating?: number;
    reviews?: number;
  };
  right?: React.ReactNode;
};

export default function ListingCard({ listing, right }: Props) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/listing/${listing.id}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.content}>
        <Text style={styles.title}>{listing.title}</Text>
        <div style={styles.score}>
        {listing.rating && (
          <Text style={styles.rating}>⭐ {listing.rating.toFixed(1)} •</Text>
        )}
        {listing.reviews && (
          <Text style={styles.reviews}> {listing.reviews.toFixed(1)} Reviews</Text>
        )}
        </div>
        <View style={styles.tags}>
          {listing.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
      {right && <View style={styles.right}>{right}</View>}
      <Image source={{ uri: listing.image }} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    marginBottom: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 6,
    marginTop: 4,
    marginLeft: -6,
  },
  tagText: {
    fontSize: 12,
    color: '#333',
  },
  rating: {
    marginTop: 6,
    fontSize: 12,
    color: '#666',
  },
  reviews: {
    marginTop: 6,
    fontSize: 12,
    color: '#666',
  },
    score: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    },
  right: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
