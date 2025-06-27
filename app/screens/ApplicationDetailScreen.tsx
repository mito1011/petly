// screens/ApplicationDetailScreen.tsx
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const ApplicationDetailScreen = () => {
  const application = {
    name: 'Sarah Miller',
    service: 'Dog Walking',
    date: '20/10/25',
    time: '2:00 PM - 3:00 PM',
    rate: '$20/hr',
    about: 'I\'m a passionate dog lover with 5+ years of experience caring for dogs of all breeds and sizes. I offer a safe, loving environment where your furry friend will feel right at home.',
    image: 'https://i.pravatar.cc/100?img=5',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: application.image }} style={styles.avatar} />
      <Text style={styles.name}>{application.name}</Text>
      <Text style={styles.role}>{application.service}</Text>

      <Text style={styles.section}>Details</Text>
      <Text style={styles.detail}><Text style={styles.label}>Service:</Text> {application.service}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Date:</Text> {application.date}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Time:</Text> {application.time}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Rate:</Text> {application.rate}</Text>

      <Text style={styles.section}>About {application.name.split(' ')[0]}</Text>
      <Text style={styles.about}>{application.about}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#28A745' }]}> 
          <Text style={styles.btnText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#CCC' }]}> 
          <Text style={[styles.btnText, { color: '#333' }]}>Deny</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  section: {
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  detail: {
    alignSelf: 'flex-start',
    fontSize: 14,
    marginBottom: 6,
  },
  label: {
    fontWeight: '600',
  },
  about: {
    fontSize: 14,
    color: '#333',
    marginVertical: 10,
    textAlign: 'left',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
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

export default ApplicationDetailScreen;
