import { useState } from 'react';
import { Copy, Check, Save } from 'lucide-react';
import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/features/auth/AuthProvider';

export function ScoreCard({ score }) {
  return (
    <div className="rounded-2xl border border-midnight-100 bg-gradient-to-br from-parchment-100 to-parchment-50 p-6">
      <p className="eyebrow mb-3">Prompt readiness score</p>
      <div className="mb-3 flex items-baseline gap-2">
        <span className="font-display text-6xl text-midnight-950 tabular-nums">{score}</span>
        <span className="font-display text-2xl text-midnight-500">%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-midnight-100">
        <div
          className="h-full rounded-full bg-coral-500 transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-midnight-600">
        Higher score means the prompt is more structured, safer, and easier to verify.
        The score measures prompt quality — not candidate quality.
      </p>
    </div>
  );
}

export function FinalPrompt({ prompt }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = useAuth();

  const copy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const save = async () => {
    if (!user) {
      alert('Sign in to save prompts to your account.');
      return;
    }
    try {
      const ref = doc(collection(db, 'users', user.uid, 'prompts'));
      await setDoc(ref, {
        prompt,
        createdAt: serverTimestamp(),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    } catch (e) {
      console.error(e);
      alert('Could not save. Check Firebase config.');
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-midnight-100 bg-midnight-950 text-parchment-100 shadow-soft">
      <div className="flex items-center justify-between border-b border-midnight-700 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-coral-200">
            Step 09 · Final prompt
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-parchment-200 transition-colors hover:bg-midnight-800"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={save}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-parchment-200 transition-colors hover:bg-midnight-800"
          >
            {saved ? <Check size={12} /> : <Save size={12} />}
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
      <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap px-5 py-4 font-mono text-[12.5px] leading-relaxed text-parchment-100">
        {prompt}
      </pre>
    </div>
  );
}

export function ExplanationGrid({ format, length }) {
  const items = [
    ['Task',                  'Defines what AI should do.'],
    ['Job context',           'Adapts the output to the role.'],
    ['Candidate information', 'Gives source material.'],
    ['Criteria',              'Controls what AI should focus on.'],
    ['Format',                `Controls readability. Current: ${format}.`],
    ['Length',                `Controls depth. Current: ${length}.`],
    ['Safety rules',          'Reduce risk.'],
    ['Review instruction',    'Supports human verification.'],
  ];
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map(([title, text]) => (
        <div key={title} className="rounded-xl border border-midnight-100 bg-parchment-50/50 p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-midnight-500">{title}</p>
          <p className="mt-1 text-sm text-midnight-700">{text}</p>
        </div>
      ))}
    </div>
  );
}

export function LogicMap({ state }) {
  const items = [
    {
      title: 'Task selection',
      selected: state.task,
      why: 'It defines the recruitment activity.',
      output: 'The response focuses on one support task.',
    },
    {
      title: 'Job context',
      selected: state.jobTitle || 'not provided',
      why: 'It tells AI which role requirements matter.',
      output: 'The summary becomes role-specific.',
    },
    {
      title: 'Candidate information',
      selected: state.candidateInfo?.trim() ? 'anonymized CV text provided' : 'not provided',
      why: 'It gives the source material.',
      output: 'AI can extract evidence only from supplied text.',
    },
    {
      title: 'Criteria',
      selected: `${state.criteria.length} criteria selected`,
      why: 'Directs attention to job-related evidence.',
      output: 'Easier to compare and audit.',
    },
    {
      title: 'Format & length',
      selected: `${state.format} · ${state.length}`,
      why: 'Shapes how the recruiter reads the output.',
      output: 'Easier to scan, compare, share.',
    },
    {
      title: 'Safety & review',
      selected: `${state.safety.length} safety, ${state.review.length} review`,
      why: 'Keeps AI in a support role.',
      output: 'Framed as a draft for recruiter review.',
    },
  ];

  return (
    <div className="grid gap-2">
      {items.map((item) => (
        <div key={item.title} className="rounded-xl border border-midnight-100 bg-white p-4">
          <h4 className="font-display text-base text-midnight-950">{item.title}</h4>
          <div className="mt-2 grid gap-1 text-xs text-midnight-600">
            <p><span className="text-midnight-500">Selected:</span> {item.selected}</p>
            <p><span className="text-midnight-500">Why:</span> {item.why}</p>
            <p><span className="text-midnight-500">Output:</span> {item.output}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChecklistMini({ checks }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {checks.map((c) => (
        <li
          key={c.label}
          className={`flex items-start gap-2 rounded-xl border p-3 text-sm transition-colors ${
            c.passed
              ? 'border-sage-300 bg-sage-50 text-sage-600'
              : 'border-midnight-100 bg-parchment-50/50 text-midnight-600'
          }`}
        >
          <span
            className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${
              c.passed ? 'bg-sage-500 text-white' : 'border border-midnight-300'
            }`}
          >
            {c.passed && <Check size={10} />}
          </span>
          <span>{c.label}</span>
        </li>
      ))}
    </ul>
  );
}
