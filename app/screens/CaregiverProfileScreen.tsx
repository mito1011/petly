// screens/CaregiverProfileScreen.tsx
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const CaregiverProfileScreen = () => {
  const profile = {
    name: 'Sarah Miller',
    role: 'Dog Caregiver',
    verified: true,
    stats: {
      completed: '100+',
      repeat: '50+',
      stars: '100+',
    },
    about: "I'm a passionate dog lover with 5+ years of experience caring for dogs of all breeds and sizes...",
    experience: '2018 - Present',
    rating: 4.9,
    reviews: [
      {
        name: 'Emily Carter',
        comment: 'Sarah is amazing! She took such great care of my golden retriever...',
        stars: 5,
        time: '2 months ago',
      },
      {
        name: 'David Lee',
        comment: 'Sarah is the best! She’s reliable, trustworthy, and truly loves dogs...',
        stars: 5,
        time: '3 months ago',
      },
    ],
    image: 'https://i.pravatar.cc/100?img=10',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: profile.image }} style={styles.avatar} />
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.role}>{profile.role} {profile.verified && '✓ Verified'}</Text>

      <View style={styles.statsRow}>
        <StatBox label="Completed Care" value={profile.stats.completed} />
        <StatBox label="Repeat Clients" value={profile.stats.repeat} />
        <StatBox label="5-Star Reviews" value={profile.stats.stars} />
      </View>

      <Text style={styles.section}>About</Text>
      <Text style={styles.paragraph}>{profile.about}</Text>

      <Text style={styles.section}>Experience</Text>
      <Text style={styles.paragraph}>{profile.experience}</Text>

      <Text style={styles.section}>Reviews</Text>
      <Text style={styles.rating}>{profile.rating} ★</Text>

      {profile.reviews.map((review, i) => (
        <View key={i} style={styles.review}>
          <Text style={styles.reviewName}>{review.name}</Text>
          <Text>{'★'.repeat(review.stars)} - {review.time}</Text>
          <Text style={styles.paragraph}>{review.comment}</Text>
        </View>
      ))}

      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#28A745' }]}> 
          <Text style={styles.btnText}>Book</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#007bff' }]}> 
          <Text style={styles.btnText}>Message</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const StatBox = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
  },
  role: {
    textAlign: 'center',
    color: '#555',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
    color: '#333',
    marginBottom: 14,
  },
  rating: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  review: {
    marginBottom: 16,
  },
  reviewName: {
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  btn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CaregiverProfileScreen;
