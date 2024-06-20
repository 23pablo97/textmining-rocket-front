"use client";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { initFlowbite } from 'flowbite';
import { Navbar } from "./navbar";
import { Sidebar } from './sidebar';
import { UserProvider } from './userContext';

interface User {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = Cookies.get('user');
    if (userData) {
      try {
        const parsedData: User = JSON.parse(userData);
        setUser(parsedData);
      } catch (error) {
        console.error("Failed to parse user data from cookies", error);
      }
    }
    initFlowbite();
  }, []);

  return (
    <UserProvider user={user}>
      <div>
        <Navbar user={user} />
        <Sidebar user={user} />
        <div className="p-4 sm:ml-64 mt-14">
          {children}
        </div>
      </div>
    </UserProvider>
  );
}
