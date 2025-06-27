// screens/ListingDetailScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const ListingDetailScreen = () => {
  const navigation = useNavigation();

  // Beispiel-Daten (später aus Props oder Navigation übergeben)
  const pet = {
    name: 'Buddy',
    image: 'https://place-puppy.com/300x300',
    description:
      'Buddy is a friendly and energetic Golden Retriever who loves to play fetch and go for walks. He’s well-trained and responds to basic commands.',
    breed: 'Golden Retriever',
    age: '3 years',
    size: 'Medium',
    exercise: 'Daily walks and playtime',
    feeding: 'Twice a day',
    medication: 'None',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: pet.image }} style={styles.image} />

      <Text style={styles.title}>{pet.name}</Text>

      <Text style={styles.sectionTitle}>About {pet.name}</Text>
      <Text style={styles.paragraph}>{pet.description}</Text>

      <Text style={styles.sectionTitle}>Care Requirements</Text>

      <View style={styles.infoGrid}>
        <Text style={styles.infoItem}><Text style={styles.label}>Breed:</Text> {pet.breed}</Text>
        <Text style={styles.infoItem}><Text style={styles.label}>Age:</Text> {pet.age}</Text>
        <Text style={styles.infoItem}><Text style={styles.label}>Size:</Text> {pet.size}</Text>
        <Text style={styles.infoItem}><Text style={styles.label}>Exercise:</Text> {pet.exercise}</Text>
        <Text style={styles.infoItem}><Text style={styles.label}>Feeding:</Text> {pet.feeding}</Text>
        <Text style={styles.infoItem}><Text style={styles.label}>Medication:</Text> {pet.medication}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => alert('Apply clicked!')}>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    color: '#333',
  },
  infoGrid: {
    marginTop: 10,
  },
  infoItem: {
    fontSize: 14,
    marginVertical: 4,
  },
  label: {
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#28A745',
    padding: 14,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ListingDetailScreen;
