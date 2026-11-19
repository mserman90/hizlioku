// ⚠️ HUMAN REVIEW REQUIRED
// Authentication service: Email/Password, Google Sign-In, and Client/Demo Fallback

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { createUserProfile, getUserProfile } from "./firestore";
import { AgeGroup, UserDoc } from "@/types";

export const isMockFirebase =
  !process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY.includes("mock") ||
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "mock-api-key-phase1";

function isApiKeyError(error: any): boolean {
  if (!error) return false;
  const str = `${error.code || ""} ${error.message || ""}`;
  return (
    str.includes("api-key") ||
    str.includes("invalid-api-key") ||
    str.includes("api-key-not-valid") ||
    str.includes("API key")
  );
}

/**
 * Sign in with Email and Password
 */
export async function loginWithEmail(email: string, pass: string): Promise<UserDoc> {
  if (isMockFirebase) {
    return getLocalMockUser("adult", email);
  }

  try {
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    const profile = await getUserProfile(cred.user.uid);
    if (!profile) {
      throw new Error("Kullanıcı profili bulunamadı. Lütfen tekrar kayıt olun.");
    }
    return profile;
  } catch (error: any) {
    if (isApiKeyError(error)) {
      console.warn("Using offline demo fallback due to unconfigured Firebase API key.");
      return getLocalMockUser("adult", email);
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
  if (isMockFirebase) {
    return getLocalMockUser(params.ageGroup, params.email, params.displayName, params.parentEmail);
  }

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
    if (isApiKeyError(error)) {
      console.warn("Using offline demo fallback due to unconfigured Firebase API key.");
      return getLocalMockUser(params.ageGroup, params.email, params.displayName, params.parentEmail);
    }
    throw error;
  }
}

/**
 * Sign in / Sign up with Google OAuth
 * ⚠️ HUMAN REVIEW REQUIRED: Only available for adults (13+) to prevent unauthorized child profile collection
 */
export async function signInWithGoogle(): Promise<UserDoc> {
  if (isMockFirebase) {
    return getLocalMockUser("adult", "google-user@example.com", "Google Kullanıcısı");
  }

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
    if (isApiKeyError(error)) {
      console.warn("Using offline demo Google login fallback due to unconfigured Firebase API key.");
      return getLocalMockUser("adult", "google-user@example.com", "Google Kullanıcısı");
    }
    throw error;
  }
}

/**
 * Sign out
 */
export async function signOutUser(): Promise<void> {
  try {
    if (!isMockFirebase) {
      await firebaseSignOut(auth);
    }
  } catch (error) {
    console.error("Sign out error:", error);
  }
}

/**
 * Mock helper for local offline testing when live Firebase credentials are not yet added
 */
function getLocalMockUser(
  ageGroup: AgeGroup,
  email: string,
  displayName: string = "Test Kullanıcısı",
  parentEmail?: string
): UserDoc {
  const isChild = ageGroup === "child";
  const user: UserDoc = {
    uid: "demo-uid-" + Math.random().toString(36).substring(2, 9),
    role: isChild ? "child" : "adult",
    displayName: displayName || (isChild ? "Küçük Okur" : "Okuyucu"),
    ageGroup,
    email,
    parentEmail: isChild ? parentEmail || "veli@example.com" : undefined,
    consentStatus: isChild ? "pending" : "not_required",
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    localStorage.setItem("hizlioku_offline_user", JSON.stringify(user));
  }

  return user;
}
