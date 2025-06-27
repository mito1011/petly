// app/_layout.tsx
import { Slot } from 'expo-router';
import React from 'react';
import { UserRoleProvider } from '../context/UserRoleContext';

export default function Layout() {
  return (
    <UserRoleProvider>
      <Slot />
    </UserRoleProvider>
  );
}
