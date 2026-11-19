// ⚠️ HUMAN REVIEW REQUIRED
// Authentication service: Email/Password, Google Sign-In, and Mock/Local Fallback

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "./firebase";
import { createUserProfile, getUserProfile } from "./firestore";
import { AgeGroup, UserDoc } from "@/types";

/**
 * Sign in with Email and Password
 */
export async function loginWithEmail(email: string, pass: string): Promise<UserDoc> {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    const profile = await getUserProfile(cred.user.uid);
    if (!profile) {
      throw new Error("Kullanıcı profili bulunamadı. Lütfen tekrar kayıt olun.");
    }
    return profile;
  } catch (error: any) {
    // If running in preview mode with mock config and Firebase errors with invalid-api-key,
    // allow a safe mock session for local interface testing
    if (error?.code === "auth/invalid-api-key" || error?.code === "auth/api-key-not-valid") {
      console.warn("Using offline mock auth fallback due to placeholder API key.");
      return getMockUser("adult", email);
    }
    throw error;
  }
}

/**
 * Sign up with Email and Password
 * ⚠️ HUMAN REVIEW REQUIRED: Implements mandatory parental consent check for children
 */
export async function registerWithEmail(params: {
  email: string;
  pass: string;
  displayName: string;
  ageGroup: AgeGroup;
  parentEmail?: string;
}): Promise<UserDoc> {
  try {
    const cred = await createUserWithEmailAndPassword(auth, params.email, params.pass);
    const profile = await createUserProfile({
      uid: cred.user.uid,
      email: params.email,
      displayName: params.displayName,
      ageGroup: params.ageGroup,
      parentEmail: params.parentEmail,
    });
    return profile;
  } catch (error: any) {
    if (error?.code === "auth/invalid-api-key" || error?.code === "auth/api-key-not-valid") {
      console.warn("Using offline mock registration fallback due to placeholder API key.");
      return getMockUser(params.ageGroup, params.email, params.displayName, params.parentEmail);
    }
    throw error;
  }
}

/**
 * Sign in / Sign up with Google OAuth
 * ⚠️ HUMAN REVIEW REQUIRED: Only available for adults (13+) to prevent unauthorized child profile collection
 */
export async function signInWithGoogle(): Promise<UserDoc> {
  try {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    let profile = await getUserProfile(cred.user.uid);

    if (!profile) {
      profile = await createUserProfile({
        uid: cred.user.uid,
        email: cred.user.email || "",
        displayName: cred.user.displayName || "Yetişkin Okuyucu",
        ageGroup: "adult",
      });
    }
    return profile;
  } catch (error: any) {
    if (error?.code === "auth/invalid-api-key" || error?.code === "auth/api-key-not-valid") {
      console.warn("Using offline mock Google login fallback due to placeholder API key.");
      return getMockUser("adult", "google-user@example.com", "Google Kullanıcısı");
    }
    throw error;
  }
}

/**
 * Sign out
 */
export async function signOutUser(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Sign out error:", error);
  }
}

/**
 * Mock helper for local offline testing when live Firebase credentials are not yet added
 */
function getMockUser(
  ageGroup: AgeGroup,
  email: string,
  displayName: string = "Test Kullanıcısı",
  parentEmail?: string
): UserDoc {
  const isChild = ageGroup === "child";
  return {
    uid: "mock-uid-" + Math.random().toString(36).substring(2, 8),
    role: isChild ? "child" : "adult",
    displayName,
    ageGroup,
    email,
    parentEmail: isChild ? parentEmail || "veli@example.com" : undefined,
    consentStatus: isChild ? "pending" : "not_required",
    createdAt: new Date().toISOString(),
  };
}
