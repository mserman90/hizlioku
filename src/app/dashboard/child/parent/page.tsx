"use client";

// ⚠️ HUMAN REVIEW REQUIRED
// Parent View Page: Accessible only to authenticated parent / child profile owner

import React from "react";
import { ParentProgressView } from "@/components/child/ParentProgressView";
import { useAuth } from "@/context/AuthContext";

export default function ChildParentProgressPage() {
  const { user } = useAuth();

  return (
    <div className="py-6">
      <ParentProgressView
        childName={user?.displayName || "Öğrenci"}
      />
    </div>
  );
}
