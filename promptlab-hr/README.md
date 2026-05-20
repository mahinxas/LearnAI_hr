# PromptLab HR

An educational platform that teaches recruiters how to use AI **consciously** in early-stage recruitment — CV screening, candidate summaries, and recruiter communication, without giving hiring decisions to AI.

Built with **React + Vite + Tailwind + Firebase**.

---

## What's inside

| Page | Path | Purpose |
| --- | --- | --- |
| Welcome | `/` | Hero, four practice cards, learning outcomes |
| Purpose | `/purpose` | When to use AI / when not to, Do / Do Not |
| AI in HR Learning | `/learning` | Tabbed Q&A (When · Basics · Semi-Pro) |
| Prompt Builder | `/builder` | The core feature — 8-step interactive prompt builder + live score |
| Safety Checklist | `/safety` | 8-point post-output verification checklist |
| Progress | `/progress` | Visual progress tracking across modules |
| Login | `/login` | Email/password + Google sign-in |

## Tech stack

- **Frontend:** React 18, Vite 5, Tailwind CSS 3, React Router, Framer Motion, Lucide icons, Zustand (state + persistence)
- **Backend:** Firebase (Auth, Firestore, Hosting)
- **Design:** Custom design system — Fraunces (display serif) + Geist (sans) + Geist Mono. Midnight navy / parchment cream / coral palette.

## Project structure

```
promptlab-hr/
├── src/
│   ├── components/         Layout, shared UI (Card, RevealCard, etc.)
│   ├── pages/              Welcome, Purpose, Learning, Builder, Safety, Progress, Login
│   ├── features/
│   │   ├── auth/           AuthProvider + useAuth hook
│   │   └── builder/        builderStore, BuilderStep, OutputPanel
│   ├── data/content.js     All lesson content (move to Firestore for live editing)
│   ├── lib/firebase.js     Firebase init
│   ├── styles/globals.css  Tailwind + custom utilities
│   ├── App.jsx             Router
│   └── main.jsx            Entry
├── firebase.json           Hosting + Firestore rules config
├── firestore.rules         Security rules
├── tailwind.config.js      Design tokens
├── vite.config.js
└── package.json
```

---

## Getting started

### 1. Install

```bash
npm install
```

### 2. Set up Firebase

1. Go to <https://console.firebase.google.com/> and create a new project (e.g. `promptlab-hr`).
2. In the project, click the **Web** icon (`</>`) and register a web app.
3. Copy the config object Firebase shows you.
4. In **Authentication → Sign-in method**, enable:
   - **Email/Password**
   - **Google**
5. In **Firestore Database**, click "Create database" → start in **production mode**.
6. Copy `.env.example` to `.env.local` and paste your values:

```bash
cp .env.example .env.local
```

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=promptlab-hr.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=promptlab-hr
VITE_FIREBASE_STORAGE_BUCKET=promptlab-hr.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### 3. Run locally

```bash
npm run dev
```

App opens at <http://localhost:5173>.

> The app **works without Firebase** for browsing — auth and saved prompts simply won't function. Builder state persists in `localStorage` either way.

---

## Deploy

### One-time setup

```bash
npm install -g firebase-tools
firebase login
firebase use --add        # pick your project
```

### Deploy everything

```bash
npm run deploy
```

This runs `vite build` then `firebase deploy` (hosting + Firestore rules).

To deploy just one piece:

```bash
firebase deploy --only hosting
firebase deploy --only firestore:rules
```

---

## Firestore data model

```
/users/{uid}
  email, displayName, createdAt, lastLogin

/users/{uid}/prompts/{promptId}
  prompt: string
  createdAt: timestamp

/users/{uid}/progress/safety
  checks: { 0: true, 1: false, ... }
  updatedAt: timestamp

/content/...                        (optional — move lessons here for live editing)
```

Users can only access their own data — enforced by `firestore.rules`.

---

## How features map to the original prototype

| Original (HTML/JS prototype) | New implementation |
| --- | --- |
| Hash-based `showPage(id)` | React Router |
| Vanilla DOM render functions (`renderCards`, etc.) | React components driven by `/src/data/content.js` |
| Global `updatePrompt()` | `buildPromptText(state)` + `useMemo` in `Builder.jsx` |
| Readiness scoring | `computeReadinessScore(state)` in `builderStore.js` |
| `<details>` reveals | Reusable `<RevealCard>` component |
| No persistence | `zustand/persist` (local) + Firestore (signed-in users) |
| No accounts | Firebase Auth (email + Google) |

All original content is preserved verbatim — the lesson copy, builder lessons, criteria/safety/review lists, and safety checklist are byte-identical to the prototype.

---

## Roadmap ideas

- Cloud Function to call Claude/OpenAI API directly from the builder ("Run this prompt")
- Admin role + CMS for editing lesson content from a dashboard
- Export prompts as PDF
- Internationalization (currently English-only)
- Analytics on which modules users complete most

---

## License

Educational use only.
