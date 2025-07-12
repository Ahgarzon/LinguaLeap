'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const value = { user, loading, signIn, signOutUser };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthButton = () => {
    const { user, loading, signIn, signOutUser } = useAuth();

    if (loading) {
        return <Button variant="ghost" size="sm" disabled>Cargando...</Button>;
    }

    if (user) {
        return (
            <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground hidden sm:inline">Hola, {user.displayName}</span>
                <Button variant="outline" size="sm" onClick={signOutUser}>Cerrar Sesión</Button>
            </div>
        );
    }

    return (
        <Button onClick={signIn}>
            <LogIn className="mr-2 h-4 w-4" />
            Iniciar Sesión con Google
        </Button>
    );
}
