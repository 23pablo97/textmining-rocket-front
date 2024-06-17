import React, { createContext, useContext, ReactNode } from 'react';

interface User {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

interface UserContextProps {
  user: User | null;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children, user }: { children: ReactNode, user: User | null }) => {
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};
