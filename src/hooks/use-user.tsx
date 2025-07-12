
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import type { Topic } from '@/lib/data';
import { topicsData } from '@/lib/data';

export type UserLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserProfile {
  id: number;
  name: string;
  nativeLanguage: string;
  level: UserLevel | null;
  topics: Topic[];
}

interface UserContextType {
  users: UserProfile[];
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  updateCurrentUser: (updates: Partial<UserProfile>) => void;
  addUser: (name: string) => UserProfile;
  clearCurrentUser: () => void;
  addTopicToCurrentUser: (topic: Topic) => void;
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

  const setCurrentUser = (user: UserProfile | null) => {
    setCurrentUserInternal(user);
    if (isInitialized) {
        if (user) {
            localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
        }
    }
  };

  const updateCurrentUser = (updates: Partial<UserProfile>) => {
    if (currentUser) {
        const updatedUser = { ...currentUser, ...updates };
        setCurrentUser(updatedUser);
        
        const userIndex = users.findIndex(u => u.id === updatedUser.id);
        if (userIndex !== -1) {
            const updatedUsers = [...users];
            updatedUsers[userIndex] = updatedUser;
            setUsers(updatedUsers);
        }
    }
  }

  const addTopicToCurrentUser = useCallback((topic: Topic) => {
    if (currentUser) {
        const newTopics = [...(currentUser.topics || []), topic];
        updateCurrentUser({ topics: newTopics });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, users]);
  
  const clearCurrentUser = () => {
    setCurrentUser(null);
  }

  const addUser = (name: string): UserProfile => {
    const newUser: UserProfile = {
      id: Date.now(),
      name,
      nativeLanguage: '',
      level: null,
      topics: topicsData, // Start with default topics
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    return newUser;
  };

  const value = { users, currentUser, setCurrentUser, updateCurrentUser, addUser, clearCurrentUser, addTopicToCurrentUser };

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
