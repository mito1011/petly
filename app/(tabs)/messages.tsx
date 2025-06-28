// 📁 app/(tabs)/Messages.tsx
import { dummyApplications } from '@/data/dummyApplications';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Messages() {
  const router = useRouter();
  const pending = dummyApplications.filter(app => app.status === 'pending');
  const accepted = dummyApplications.filter(app => app.status === 'accepted');

  const renderApp = (app) => (
    <TouchableOpacity
      key={app.id}
      style={styles.row}
      onPress={() => router.push(`/application/${app.id}`)}
    >
      <Image source={{ uri: app.avatar }} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{app.name}</Text>
        <Text style={styles.meta}>{app.service} · {app.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.sectionTitle}>Pending</Text>
      {pending.map(renderApp)}

      <Text style={styles.sectionTitle}>Accepted</Text>
      {accepted.map(renderApp)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
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
    fontWeight: 'bold',
    fontSize: 15,
  },
  meta: {
    color: '#888',
    fontSize: 13,
  },
});
