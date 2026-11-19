"use client";

// ⚠️ HUMAN REVIEW REQUIRED
// Authentication Context and Real-time Auth State Provider

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUserProfile, grantParentalConsent as firestoreGrantConsent } from "@/lib/firestore";
import {
  loginWithEmail,
  registerWithEmail,
  signInWithGoogle,
  signOutUser,
} from "@/lib/auth";
import { UserDoc, AgeGroup } from "@/types";

interface AuthContextType {
  user: UserDoc | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<UserDoc>;
  register: (params: {
    email: string;
    pass: string;
    displayName: string;
    ageGroup: AgeGroup;
    parentEmail?: string;
  }) => Promise<UserDoc>;
  loginGoogle: () => Promise<UserDoc>;
  logout: () => Promise<void>;
  simulateConsentGrant: (childUid: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDoc | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync with Firebase Auth state
  useEffect(() => {
    // Check localStorage for offline demo session if present
    const savedOfflineUser = typeof window !== "undefined" ? localStorage.getItem("hizlioku_offline_user") : null;
    if (savedOfflineUser) {
      try {
        setUser(JSON.parse(savedOfflineUser));
      } catch (e) {
        console.error("Failed to parse saved offline user", e);
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        try {
          const profile = await getUserProfile(fbUser.uid);
          setUser(profile);
          if (profile && typeof window !== "undefined") {
            localStorage.setItem("hizlioku_offline_user", JSON.stringify(profile));
          }
        } catch (err) {
          console.error("Failed to load user profile on auth state change:", err);
        }
      } else {
        if (!savedOfflineUser) {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (email: string, pass: string): Promise<UserDoc> => {
    setLoading(true);
    try {
      const profile = await loginWithEmail(email, pass);
      setUser(profile);
      if (typeof window !== "undefined") {
        localStorage.setItem("hizlioku_offline_user", JSON.stringify(profile));
      }
      return profile;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (params: {
    email: string;
    pass: string;
    displayName: string;
    ageGroup: AgeGroup;
    parentEmail?: string;
  }): Promise<UserDoc> => {
    setLoading(true);
    try {
      const profile = await registerWithEmail(params);
      setUser(profile);
      if (typeof window !== "undefined") {
        localStorage.setItem("hizlioku_offline_user", JSON.stringify(profile));
      }
      return profile;
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (): Promise<UserDoc> => {
    setLoading(true);
    try {
      const profile = await signInWithGoogle();
      setUser(profile);
      if (typeof window !== "undefined") {
        localStorage.setItem("hizlioku_offline_user", JSON.stringify(profile));
      }
      return profile;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (): Promise<void> => {
    setLoading(true);
    try {
      await signOutUser();
      setUser(null);
      setFirebaseUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("hizlioku_offline_user");
      }
    } finally {
      setLoading(false);
    }
  };

  // ⚠️ HUMAN REVIEW REQUIRED: Parental consent simulation for Phase 1 staging/dev
  const handleSimulateConsent = async (childUid: string): Promise<void> => {
    try {
      await firestoreGrantConsent(childUid);
    } catch (e) {
      console.warn("Firestore update omitted in mock mode; updating local state.");
    }
    if (user && user.uid === childUid) {
      const updatedUser: UserDoc = { ...user, consentStatus: "granted" };
      setUser(updatedUser);
      if (typeof window !== "undefined") {
        localStorage.setItem("hizlioku_offline_user", JSON.stringify(updatedUser));
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        login: handleLogin,
        register: handleRegister,
        loginGoogle: handleGoogleLogin,
        logout: handleLogout,
        simulateConsentGrant: handleSimulateConsent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
