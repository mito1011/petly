// screens/MessagesScreen.tsx
import { useUserRole } from '@/context/UserRoleContext';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const sampleApplications = {
  pending: [
    { name: 'Sarah', role: 'Dog Walking', date: '20/10/25', image: 'https://i.pravatar.cc/100?img=1' },
    { name: 'Liam', role: 'Dog Walking', date: '20/10/25', image: 'https://i.pravatar.cc/100?img=2' },
  ],
  accepted: [
    { name: 'Ava', role: 'Dog Walking', date: '20/10/25', image: 'https://i.pravatar.cc/100?img=3' },
  ],
};

export const MessagesScreen = () => {
  const { role } = useUserRole();
  const navigation = useNavigation() as any;

  const handlePress = () => navigation.navigate('ApplicationDetail');

  return (
    <ScrollView style={styles.container}>
      {(['pending', 'accepted'] as const).map((status) => (
        <View key={status}>
          <Text style={styles.sectionTitle}>{status.charAt(0).toUpperCase() + status.slice(1)}</Text>
          {sampleApplications[status].map((app, idx) => (
            <TouchableOpacity key={idx} onPress={handlePress} style={styles.row}>
              <Image source={{ uri: app.image }} style={styles.avatar} />
              <View>
                <Text style={styles.name}>{app.name}</Text>
                <Text style={styles.details}>{app.role} · {app.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
  },
  details: {
    color: '#666',
    fontSize: 14,
  },
});

export default MessagesScreen;
