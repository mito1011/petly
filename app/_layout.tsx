import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,  // Versteckt den Header komplett
      }}
    />
  );
}
