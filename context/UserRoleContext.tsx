// context/UserRoleContext.tsx
import React, { createContext, useContext, useState } from 'react';

type UserRole = 'owner' | 'sitter';

interface UserInfo {
  userId: string;
  role: UserRole;
}

interface UserRoleContextProps {
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo) => void;
  logout: () => void;
}

const UserRoleContext = createContext<UserRoleContextProps | undefined>(undefined);

export const UserRoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const logout = () => setUserInfo(null);

  return (
    <UserRoleContext.Provider value={{ userInfo, setUserInfo, logout }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) throw new Error('useUserRole must be used within UserRoleProvider');
  return context;
};
