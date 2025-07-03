import { useUserRole } from '@/context/UserRoleContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ListingProps = {
  id: string;
  title: string;
  image?: string;
  tags?: string[];
  rating?: number;
  reviews?: number;
};

type UserProps = {
  id: string;
  name: string;
  avatar?: string;
  tags?: string[];
  rating?: number;
  reviews?: number;
  completedJobs?: number; // Optional, falls vorhanden
  repeatClients?: number; // Optional, falls vorhanden
  about?: string; // Optional, falls vorhanden
};

type Props = {
  listing?: ListingProps;
  user?: UserProps;
  right?: React.ReactNode;
  from?: 'Home' | 'Applications';
};

export default function ListingCard({ listing, user, right, from = 'Home' }: Props) {
  const router = useRouter();
  const { userInfo } = useUserRole();

  if (!userInfo) {
    return <Text style={{ padding: 20 }}>User not found</Text>;
  }

  // 👇 Entscheide anhand übergebenem Prop, nicht anhand der Rolle
  const display = user
    ? {
        id: user.id,
        title: user.name,
        image: user.avatar || 'https://via.placeholder.com/80',
        tags: user.tags || [],
        rating: user.rating,
        reviews: user.reviews,
        completedJobs: user.completedJobs, // Optional, falls vorhanden
        repeatClients: user.repeatClients, // Optional, falls vorhanden
        about: user.about, // Optional, falls vorhanden
      }
    : listing
    ? {
        id: listing.id,
        title: listing.title,
        image: listing.image || 'https://via.placeholder.com/80',
        tags: listing.tags,
        rating: listing.rating,
        reviews: listing.reviews,
      }
    : null;

  if (!display) return null;

  const handlePress = () => {
    if (user) {
      router.push({
        pathname: `/sitter/${user.id}`,
        params: { from },
      });
    } else if (listing) {
      router.push({
        pathname: `/listing/${listing.id}`,
        params: { from },
      });
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.content}>
        <Text style={styles.title}>{display.title}</Text>
        <View style={styles.score}>
          {display.reviews && (
            <Text style={styles.reviews}> {display.reviews.toFixed(1)} Jobs Completed</Text>
          )}
        </View>
        <View style={styles.tags}>
          {(display.tags ?? []).map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
      <Image source={{ uri: display.image }} style={styles.image} />
      {right && <View style={styles.right}>{right}</View>}
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
