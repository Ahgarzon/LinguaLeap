'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface UserProfile {
  id: number;
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
}

interface UserContextType {
  users: UserProfile[];
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile) => void;
  addUser: (name: string) => void;
  clearCurrentUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'lingualeap_users';
const CURRENT_USER_STORAGE_KEY = 'lingualeap_currentUser';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [currentUser, setCurrentUserInternal] = useState<UserProfile | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }

      const storedCurrentUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
      if (storedCurrentUser) {
        setCurrentUserInternal(JSON.parse(storedCurrentUser));
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      // Clear corrupted data
      localStorage.removeItem(USERS_STORAGE_KEY);
      localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }
  }, [users, isInitialized]);

  const setCurrentUser = (user: UserProfile) => {
    setCurrentUserInternal(user);
    if (isInitialized) {
      localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
    }
  };
  
  const clearCurrentUser = () => {
    setCurrentUserInternal(null);
    if(isInitialized){
        localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    }
  }

  const addUser = (name: string) => {
    const newUser: UserProfile = {
      id: Date.now(),
      name,
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
  };

  const value = { users, currentUser, setCurrentUser, addUser, clearCurrentUser };

  return (
    <UserContext.Provider value={value}>
      {isInitialized ? children : null}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
