// 📁 app/sitter/[id].tsx
import RatingBar from '@/components/RatinBar';
import { dummyCaretakers } from '@/data/dummyCaretakers';
import { useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SitterProfile() {
  const { id } = useLocalSearchParams();
  const sitter = dummyCaretakers.find((s) => s.id === String(id));

  if (!sitter) {
    return <Text style={{ padding: 20 }}>Sitter nicht gefunden</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: sitter.image }} style={styles.avatar} />
      <Text style={styles.name}>{sitter.title}</Text>
      <Text style={styles.description}>{sitter.description}</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{sitter.completedCare}</Text>
          <Text style={styles.statLabel}>Completed Cares</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{sitter.repeatClients}</Text>
          <Text style={styles.statLabel}>Repeat Clients</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{sitter.starReviews}</Text>
          <Text style={styles.statLabel}>5★ Reviews</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>About</Text>
      <Text style={styles.about}>{sitter.about}</Text>

      <Text style={styles.sectionTitle}>Experience</Text>
      <Text style={styles.experience}>{sitter.experience} since {sitter.experienceSince}</Text>

      <Text style={styles.sectionTitle}>Tags</Text>
      <View style={styles.tagsContainer}>
        {sitter.tags.map((tag) => (
          <View key={tag} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Animal Types</Text>
      <View style={styles.tagsContainer}>
        {sitter.animalTypes.map((type) => (
          <View key={type} style={styles.tag}><Text style={styles.tagText}>{type}</Text></View>
        ))}
      </View>

      <RatingBar ratingBreakdown={sitter.ratingBreakdown} />

      <Text style={styles.sectionTitle}>Reviews</Text>
      {sitter.reviewsDetail.length > 0 ? sitter.reviewsDetail.map((review) => (
        <View key={review.id} style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Image source={{ uri: review.avatar }} style={styles.reviewAvatar} />
            <View>
              <Text style={styles.reviewName}>{review.name}</Text>
              <Text style={styles.reviewMeta}>{review.date} • ★ {review.rating}</Text>
            </View>
          </View>
          <Text style={styles.reviewComment}>{review.comment}</Text>
        </View>
      )) : (
        <Text>No reviews yet.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 16 },
  name: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  description: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 16 },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  statBox: { alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: 'bold' },
  statLabel: { fontSize: 12, color: '#888' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8 },
  about: { fontSize: 15, color: '#444', lineHeight: 20 },
  experience: { fontSize: 15, color: '#444' },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  tag: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: { fontSize: 13, color: '#333' },
  reviewCard: {
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  reviewName: {
    fontWeight: 'bold',
  },
  reviewMeta: {
    fontSize: 12,
    color: '#888',
  },
  reviewComment: {
    fontSize: 14,
    color: '#444',
  },
});
