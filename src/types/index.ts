// ⚠️ HUMAN REVIEW REQUIRED
// Core user and authorization data models for HızlıOku

export type UserRole = "child" | "adult" | "admin";

export type AgeGroup = "child" | "adult";

export type ConsentStatus = "pending" | "granted" | "not_required";

export interface UserDoc {
  uid: string;
  role: UserRole;
  displayName: string;
  ageGroup: AgeGroup;
  email?: string;
  parentEmail?: string;
  consentStatus: ConsentStatus;
  createdAt: string; // ISO 8601
}

// ⚠️ HUMAN REVIEW REQUIRED: Child profiles may only exist after consentStatus === "granted"
export interface ChildProfile {
  uid: string;
  readingLevel: number;
  streak: number;
  badges: string[];
  parentUid?: string;
  updatedAt: string;
}

export interface AuthState {
  user: UserDoc | null;
  firebaseUser: import("firebase/auth").User | null;
  loading: boolean;
  isConfigured: boolean;
}
