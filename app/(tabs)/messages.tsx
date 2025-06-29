// app/(tabs)/messages.tsx
import { useUserRole } from '@/context/UserRoleContext';
import { dummyApplications } from '@/data/dummyApplications';
import { dummyListings } from '@/data/dummyListing';
import { useRouter } from 'expo-router';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MessagesScreen() {
  const { userInfo } = useUserRole();
  const router = useRouter();

  if (!userInfo) {
    return <Text style={{ padding: 20 }}>User not found</Text>;
  }

  if (userInfo.role === 'owner') {
    const pending = dummyApplications.filter(app => app.status === 'pending' && app.ownerId === userInfo.userId);
    const accepted = dummyApplications.filter(app => app.status === 'accepted' && app.ownerId === userInfo.userId);

    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push(`/application/${item.id}`)}
      >
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.sub}>{item.service} · {item.date}</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Applications</Text>
        <Text style={styles.label}>Pending</Text>
        <FlatList data={pending} renderItem={renderItem} keyExtractor={item => item.id} />
        <Text style={styles.label}>Accepted</Text>
        <FlatList data={accepted} renderItem={renderItem} keyExtractor={item => item.id} />
      </View>
    );
  } else {
    const appliedListings = dummyListings.filter(listing =>
      listing.appliedBy?.includes(userInfo.userId)
    );

    const renderListing = ({ item }) => (
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push({ pathname: `/listing/${item.id}`, params: { from: 'messages' } })}
      >
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.sub}>{item.tags.join(', ')}</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Your Applications</Text>
        <FlatList
          data={appliedListings}
          renderItem={renderListing}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center'
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  sub: {
    color: '#666',
  },
});
