// ⚠️ HUMAN REVIEW REQUIRED
// Firestore data helpers for user documents, parental consent, and child profiles

import { db } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { UserDoc, ChildProfile, UserRole, AgeGroup, ConsentStatus } from "@/types";
import { isMockFirebase } from "./auth";

/**
 * Fetch a user profile document by UID
 */
export async function getUserProfile(uid: string): Promise<UserDoc | null> {
  if (isMockFirebase && typeof window !== "undefined") {
    const raw = localStorage.getItem("hizlioku_offline_user");
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {}
    }
  }

  try {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) return null;
    return snap.data() as UserDoc;
  } catch (error: any) {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("hizlioku_offline_user");
      if (raw) {
        try {
          return JSON.parse(raw);
        } catch (e) {}
      }
    }
    console.error("Error fetching user profile:", error);
    return null;
  }
}

/**
 * Create a new user profile document upon sign up
 * ⚠️ HUMAN REVIEW REQUIRED: Enforces age gate and consent logic
 */
export async function createUserProfile(params: {
  uid: string;
  email?: string;
  displayName: string;
  ageGroup: AgeGroup;
  parentEmail?: string;
}): Promise<UserDoc> {
  const isChild = params.ageGroup === "child";
  const role: UserRole = isChild ? "child" : "adult";
  const consentStatus: ConsentStatus = isChild ? "pending" : "not_required";

  const userDoc: UserDoc = {
    uid: params.uid,
    role,
    displayName: params.displayName,
    ageGroup: params.ageGroup,
    email: params.email || "",
    ...(isChild && params.parentEmail ? { parentEmail: params.parentEmail } : {}),
    consentStatus,
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    localStorage.setItem("hizlioku_offline_user", JSON.stringify(userDoc));
  }

  if (!isMockFirebase) {
    try {
      const userRef = doc(db, "users", params.uid);
      await setDoc(userRef, userDoc);
    } catch (e) {
      console.warn("Firestore save omitted in demo/offline mode:", e);
    }
  }

  return userDoc;
}

/**
 * ⚠️ HUMAN REVIEW REQUIRED: Grant parental consent
 * Only invoked upon verified parental consent email confirmation (or simulated dev trigger)
 */
export async function grantParentalConsent(childUid: string, parentUid?: string): Promise<void> {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("hizlioku_offline_user");
    if (raw) {
      try {
        const u = JSON.parse(raw);
        u.consentStatus = "granted";
        localStorage.setItem("hizlioku_offline_user", JSON.stringify(u));
      } catch (e) {}
    }
  }

  if (!isMockFirebase) {
    try {
      const userRef = doc(db, "users", childUid);
      await updateDoc(userRef, {
        consentStatus: "granted",
      });

      const childProfileRef = doc(db, "childProfiles", childUid);
      const childProfile: ChildProfile = {
        uid: childUid,
        readingLevel: 1,
        streak: 0,
        badges: [],
        ...(parentUid ? { parentUid } : {}),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(childProfileRef, childProfile);
    } catch (e) {
      console.warn("Firestore update omitted in demo/offline mode:", e);
    }
  }
}

/**
 * Update non-sensitive profile information
 */
export async function updateUserDisplayName(uid: string, displayName: string): Promise<void> {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("hizlioku_offline_user");
    if (raw) {
      try {
        const u = JSON.parse(raw);
        u.displayName = displayName;
        localStorage.setItem("hizlioku_offline_user", JSON.stringify(u));
      } catch (e) {}
    }
  }

  if (!isMockFirebase) {
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, { displayName });
    } catch (e) {
      console.warn("Firestore update omitted in demo/offline mode:", e);
    }
  }
}
