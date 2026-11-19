# AGENTS.md — HızlıOku Project Canonical Guide

## 1. Project Brief & Purpose
**Product Name:** HızlıOku (Speed Reading for Children and Adults)  
**Target Audience:**
- **Children (Ages 6–12):** Gamified flash-reading, phonics-to-whole-word recognition, dyslexia-friendly options, parent/guardian oversight without social pressure or advertising.
- **Adults (Ages 13+):** RSVP (Rapid Serial Visual Presentation), ORP (Optimal Recognition Point) highlighting, adjustable speed (150–1000 WPM), comprehension checks, and eye-muscle exercises (Schulte table, saccades).
- **Admin:** User and consent management, public-domain content curation, and aggregated non-behavioral metrics.

**Core Value Proposition:**
- Children: Low-pressure, playful reading fluency practice adhering to strict child-safety and privacy standards.
- Adults: Measurable reading speed and comprehension improvement with personalized analytics.

---

## 2. Locked Tech Stack
- **Framework:** Next.js (App Router) + React (TypeScript).
- **Styling:** Tailwind CSS with mobile-first breakpoints (360px – 1440px).
- **Authentication:** Firebase Authentication (Google Sign-In + Email/Password).
- **Database:** Firebase Cloud Firestore.
- **Hosting:** Firebase Hosting.
- **State & Architecture:** Server Components for static/read-heavy shells, React Client Components for interactive reading modules and auth listeners.

---

## 3. Non-Negotiable Constraints & Guardrails
1. **Child Safety & Privacy:**
   - Mandatory age-gate at onboarding.
   - For users under 13, parental consent is strictly required (`consentStatus: "pending"` -> `"granted"`).
   - Zero child reading data or profiles are stored before parental consent is verified.
   - No advertising, no third-party trackers, no behavioral profiling of children.
   - No social features (no public leaderboards, comments, or competitor comparisons) for child accounts.
2. **Medical & Educational Claims:**
   - The application is an educational training tool.
   - It must **never** claim medical, psychological, or guaranteed academic or neurological outcomes.
3. **Intellectual Property:**
   - No third-party copyrighted texts bundled by default. Only public-domain texts or user-supplied plain text.
4. **Code Quality & Auditing:**
   - Every piece of code handling authentication, parental consent, sensitive profile data, or security rules must be tagged with `// ⚠️ HUMAN REVIEW REQUIRED`.
   - Never store real secrets or API keys in repository files; use environment variables (`.env.local`).
   - Maintain `THIRD_PARTY_LICENSES.md` for open-source license attribution.
5. **Mobile-First Responsive Design:**
   - Must be fully functional at 360px, 768px, and 1280px+ without horizontal overflow or clipping. Large touch targets (minimum 44x44px).

---

## 4. Development Phasing Plan
- **Phase 1 (Current):** Foundation, responsive shell, Firebase Auth, Age Gate & Parental Consent flow, Firestore Security Rules, Profile Shell.
- **Phase 2:** Child Flash-Reading Module (dyslexia toggle, streak/points, parent view) & Adult RSVP Reader (ORP highlighting, comprehension checks, Schulte table).
- **Phase 3:** Analytics dashboard (WPM / comprehension trends), PDF/EPUB extraction fallback, zigzag/saccade exercises, Admin panel.
- **Phase 4:** Production mobilization, WCAG 2.2 AA accessibility audit, performance optimizations, Firebase hosting deployment scripts.
