import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          if (route.name === 'home') iconName = 'home';
          else if (route.name === 'Post') iconName = 'add-circle';
          else if (route.name === 'messages') iconName = 'chatbubbles';
          else if (route.name === 'profile') iconName = 'person';

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1E5128',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="Post" options={{ title: 'Post' }} />
      <Tabs.Screen name="messages" options={{ title: 'Messages' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />

      {/* 👇 Diese Screens nicht als Tab anzeigen */}
      <Tabs.Screen name="listing/[id]" options={{ href: null }} />
      <Tabs.Screen name="sitter/[id]" options={{ href: null }} />
      <Tabs.Screen name="application/[id]" options={{ href: null }} />
    </Tabs>
  );
}
