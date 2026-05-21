# LeAIrn HR

An educational platform that teaches recruiters how to use AI **consciously** in early-stage recruitment — CV screening, candidate summaries, and recruiter communication, without giving hiring decisions to AI.

Built with **React + Vite + Tailwind + Firebase + Cloud Functions**.

> Built for **BIP ISPGAYA** — a Blended Intensive Programme under the **Erasmus+** project, bringing together students and educators across European institutions to explore AI's role in modern HR practices.

---

## What's inside

| Page | Path | Purpose |
| --- | --- | --- |
| Welcome | `/` | Hero, four practice cards, learning outcomes |
| Purpose | `/purpose` | When to use AI / when not to, Do / Do Not |
| AI in HR Learning | `/learning` | Tabbed Q&A (When · Basics · Semi-Pro) |
| Prompt Builder | `/builder` | 8-step interactive prompt builder + live score + AI chat |
| Safety Checklist | `/safety` | 8-point post-output verification checklist |
| Progress | `/progress` | Visual progress tracking across modules |
| Login | `/login` | Email/password + Google sign-in |

## Tech stack

- **Frontend:** React 18, Vite 5, Tailwind CSS 3, React Router, Framer Motion, Lucide icons, Zustand (state + persistence)
- **Backend:** Firebase (Auth, Firestore, Hosting), Firebase Cloud Functions (Node 20)
- **AI:** Gemini 2.5 Flash via server-side proxy (Cloud Function)
- **PWA:** Service worker, offline support, installable on mobile/desktop
- **Design:** Custom design system — Fraunces (display serif) + Geist (sans) + Geist Mono. Midnight navy / parchment cream / coral palette. Dark mode logo support.

## Project structure

```
promptlab-hr/
├── src/
│   ├── components/         Layout, shared UI (Card, RevealCard, Logo, etc.)
│   ├── pages/              Welcome, Purpose, Learning, Builder, Safety, Progress, Login
│   ├── features/
│   │   ├── auth/           AuthProvider + useAuth hook
│   │   ├── builder/        builderStore, BuilderStep, OutputPanel (AI chat)
│   │   └── progress/       Progress tracking
│   ├── data/content.js     All lesson content (move to Firestore for live editing)
│   ├── lib/firebase.js     Firebase init (Auth, Firestore, Functions)
│   ├── styles/globals.css  Tailwind + custom utilities (thin scrollbar)
│   ├── App.jsx             Router
│   └── main.jsx            Entry
├── functions/
│   ├── index.js            Cloud Function: geminiProxy (Gemini 2.5 Flash + rate limiting)
│   └── package.json
├── public/
│   ├── manifest.json       PWA manifest
│   └── icons/              App icons (192, 512, maskable)
├── firebase.json           Hosting + Firestore + Functions config
├── firestore.rules         Security rules
├── tailwind.config.js      Design tokens
├── vite.config.js
└── package.json
```

---

## Getting started

### 1. Install

```bash
# App dependencies
npm install

# Cloud Functions dependencies
cd functions && npm install && cd ..
```

### 2. Set up Firebase

1. Go to <https://console.firebase.google.com/> and create a new project (e.g. `leairn-hr`).
2. Click the **Web** icon (`</>`) and register a web app.
3. Copy the config object Firebase shows you.
4. In **Authentication → Sign-in method**, enable:
   - **Email/Password**
   - **Google**
5. In **Firestore Database**, click "Create database" → start in **production mode**.
6. Copy `.env.example` to `.env.local` and paste your Firebase values:

```bash
cp .env.example .env.local
```

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=leairn-hr.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=leairn-hr
VITE_FIREBASE_STORAGE_BUCKET=leairn-hr.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### 3. Set up the Gemini API key (for AI chat)

The AI chat feature in the Prompt Builder calls Gemini 2.5 Flash through a **server-side Cloud Function** — the API key is never exposed to the browser.

**For local development**, create `functions/.env`:

```env
GEMINI_API_KEY=your-key-here
```

**For production**, set it as a Firebase secret:

```bash
firebase functions:secrets:set GEMINI_API_KEY
```

Get a Gemini API key from <https://aistudio.google.com/>.

### 4. Run locally

```bash
npm run dev
```

App opens at <http://localhost:5173>.

To also run Cloud Functions locally (enables AI chat in dev):

```bash
firebase emulators:start --only functions
```

> The app **works without Firebase** for browsing — auth and saved prompts simply won't function. Builder state persists in `localStorage` either way.

---

## AI Chat (Prompt Builder)

The **OutputPanel** in the Prompt Builder includes an embedded AI assistant powered by Gemini 2.5 Flash. After building a prompt, recruiters can:

- Ask questions about a candidate based on the built prompt
- **Attach a CV** (PDF, image, or plain text) for analysis
- Request follow-up interview questions
- Refine any of the 8 prompt elements
- Get output flagged with one of three structured tags:
  - `[VERIFY IN CV]` — recruiter must check the source document
  - `[PROMPT GAP]` — the prompt is missing something
  - `[OUTPUT READY]` — response is complete and actionable

**Rate limit:** 20 AI calls per user per hour (enforced server-side via Firestore).

The AI is explicitly prevented from making hire/reject recommendations or inferring personal characteristics (age, gender, ethnicity, etc.).

---

## Deep-linking

Builder steps can be linked directly via URL hash — e.g. `/builder#step-3` scrolls to and opens step 3. Useful for sharing specific steps in training materials.

---

## PWA

LeAIrn HR is installable as a Progressive Web App on mobile and desktop. It includes offline support — the core learning content and builder work without a network connection. Auth and AI chat require connectivity.

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

This runs `vite build` then `firebase deploy` (hosting + Firestore rules + Cloud Functions).

To deploy just one piece:

```bash
firebase deploy --only hosting
firebase deploy --only firestore:rules
firebase deploy --only functions
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

/users/{uid}/rateLimits/gemini
  count: number
  windowStart: timestamp         (20 calls per hour, reset per window)

/content/...                     (optional — move lessons here for live editing)
```

Users can only access their own data — enforced by `firestore.rules`.

---

## Roadmap ideas

- Admin role + CMS for editing lesson content from a dashboard
- Export prompts as PDF
- Internationalization (currently English-only)
- Analytics on which modules users complete most
- Stream Gemini responses token-by-token (currently waits for full response)

---

## License

Educational use only. Not a substitute for human hiring decisions.
