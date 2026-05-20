import { useEffect } from 'react';
import { Check } from 'lucide-react';
import { safetyChecklist } from '@/data/content';
import { PageHeader } from '@/components/ui';
import { useAuth } from '@/features/auth/AuthProvider';
import { useProgressStore } from '@/features/progress/progressStore';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Safety() {
  const { user } = useAuth();
  const { safetyChecks, toggleSafetyCheck, setSafetyChecks } = useProgressStore();

  // Sync from Firestore when user signs in
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'users', user.uid, 'progress', 'safety'));
        if (snap.exists()) setSafetyChecks(snap.data().checks || {});
      } catch (e) {
        console.warn('safety read skipped:', e.message);
      }
    })();
  }, [user, setSafetyChecks]);

  const toggle = async (i) => {
    toggleSafetyCheck(i);
    const next = { ...safetyChecks, [i]: !safetyChecks[i] };
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid, 'progress', 'safety'), {
          checks: next,
          updatedAt: new Date().toISOString(),
        });
      } catch (e) {
        console.warn('safety write skipped:', e.message);
      }
    }
  };

  const completedCount = Object.values(safetyChecks).filter(Boolean).length;
  const pct = Math.round((completedCount / safetyChecklist.length) * 100);

  return (
    <div className="px-6 py-12 md:px-10 lg:px-14">
      <PageHeader
        eyebrow="Safety Checklist · Module 05"
        title="Recruiter review before using AI output."
        intro="This checklist is used after AI produces a prompt draft, CV summary, comparison table, or communication draft. It confirms that AI output remains support material for human review."
      />

      <div className="mb-8 flex items-center justify-between rounded-2xl border border-midnight-100 bg-white p-5">
        <div>
          <p className="eyebrow">Verification progress</p>
          <p className="mt-1 font-display text-2xl text-midnight-950">
            {completedCount} <span className="text-midnight-400">/ {safetyChecklist.length} confirmed</span>
          </p>
        </div>
        <div className="w-40">
          <div className="h-1.5 overflow-hidden rounded-full bg-midnight-100">
            <div
              className="h-full bg-sage-500 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-1 text-right text-xs text-midnight-500">{pct}%</p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {safetyChecklist.map((item, i) => {
          const isOn = !!safetyChecks[i];
          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={`group flex items-start gap-4 rounded-2xl border p-5 text-left transition-all ${
                isOn
                  ? 'border-sage-300 bg-sage-50'
                  : 'border-midnight-100 bg-white hover:border-midnight-300'
              }`}
            >
              <span
                className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full transition-all ${
                  isOn
                    ? 'bg-sage-500 text-white'
                    : 'border-2 border-midnight-300 group-hover:border-midnight-950'
                }`}
              >
                {isOn && <Check size={14} />}
              </span>
              <span className={`text-sm ${isOn ? 'text-sage-600' : 'text-midnight-800'}`}>
                {item}
              </span>
            </button>
          );
        })}
      </div>

      {!user && (
        <p className="mt-8 rounded-xl bg-parchment-100/50 p-4 text-sm text-midnight-600">
          Tip: <a href="/login" className="font-medium text-coral-500 underline">Sign in</a> to
          sync your checklist progress across devices.
        </p>
      )}
    </div>
  );
}
