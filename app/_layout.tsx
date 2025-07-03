import { Slot } from 'expo-router';
import { UserRoleProvider } from '../context/UserRoleContext';

export default function Layout() {
  return (
    <UserRoleProvider>
      <Slot />
    </UserRoleProvider>
  );
}