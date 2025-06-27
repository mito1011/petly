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
          else if (route.name === 'save') iconName = 'add-circle';
          else if (route.name === 'messages') iconName = 'chatbubbles';
          else if (route.name === 'profile') iconName = 'person';

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1E5128',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="save" />
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
