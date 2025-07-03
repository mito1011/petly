import { useUserRole } from '@/context/UserRoleContext';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const { userInfo } = useUserRole();

  if (!userInfo) return null;

  const isSitter = userInfo.role === 'sitter';
  const isOwner = userInfo.role === 'owner';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1E5128',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 56,
          paddingBottom: 0,
          paddingTop: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Applications"
        options={{
          tabBarLabel: 'Applications',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-text" color={color} size={size} />
          ),
        }}
      />
      {isOwner ? (
      <Tabs.Screen
        name="Post"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
        }}
      />
    ) : (
      <Tabs.Screen name="Post" options={{ href: null }} />
    )}
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Unsichtbare Screens */}
      <Tabs.Screen name="listing/[id]" options={{ href: null }} />
      <Tabs.Screen name="sitter/[id]" options={{ href: null }} />
      <Tabs.Screen name="application/[id]" options={{ href: null }} />
      <Tabs.Screen name="Messages" options={{ href: null }} />
      <Tabs.Screen name="home" options={{ href: null }} />
    </Tabs>
  );
}