import { useMemo, useEffect } from 'react';
import { Award, Download } from 'lucide-react';
import { PageHeader, Card, StatTile } from '@/components/ui';
import { useBuilderStore, computeReadinessScore } from '@/features/builder/builderStore';
import { useProgressStore } from '@/features/progress/progressStore';
import { useAuth } from '@/features/auth/AuthProvider';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { safetyChecklist } from '@/data/content';

const LEARNING_TABS = ['when', 'basics', 'semi'];

export default function Progress() {
  const state = useBuilderStore();
  const { score, checks } = useMemo(() => computeReadinessScore(state), [state]);

  // Granular selectors — each one re-renders only when its slice changes
  const welcomeVisited     = useProgressStore((s) => s.welcomeVisited);
  const purposeVisited     = useProgressStore((s) => s.purposeVisited);
  const learningTabs       = useProgressStore((s) => s.learningTabs);
  const safetyChecks       = useProgressStore((s) => s.safetyChecks);
  const purposeQuizPassed  = useProgressStore((s) => s.purposeQuizPassed);
  const learningQuizPassed = useProgressStore((s) => s.learningQuizPassed);
  const setSafetyChecks    = useProgressStore((s) => s.setSafetyChecks);

  const { user } = useAuth();

  // Sync safety checks from Firestore so Progress page is never stale
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'users', user.uid, 'progress', 'safety'));
        if (snap.exists()) setSafetyChecks(snap.data().checks || {});
      } catch (e) {
        console.warn('progress safety sync skipped:', e.message);
      }
    })();
  }, [user, setSafetyChecks]);

  const safetyCompleted  = Object.values(safetyChecks).filter(Boolean).length;
  const allTabsSeen      = LEARNING_TABS.every((t) => learningTabs.includes(t));
  const anyTabSeen       = learningTabs.length > 0;
  const elementsLearned  = checks.filter((c) => c.passed).length;

  const overallPct = Math.round(
    (
      (welcomeVisited ? 1 : 0) +
      (purposeQuizPassed ? 1 : purposeVisited ? 0.5 : 0) +
      (learningQuizPassed ? 1 : allTabsSeen ? 0.5 : learningTabs.length / LEARNING_TABS.length / 2) +
      score / 100 +
      safetyCompleted / safetyChecklist.length
    ) / 5 * 100
  );

  const allComplete = overallPct >= 80;

  const badgeClass = (tone) => {
    if (tone === 'sage')  return 'bg-sage-100 text-sage-600 dark:bg-sage-900/40 dark:text-sage-400';
    if (tone === 'coral') return 'bg-coral-100 text-coral-700 dark:bg-coral-900/40 dark:text-coral-300';
    return 'bg-midnight-100 text-midnight-500 dark:bg-midnight-700 dark:text-midnight-300';
  };

  const modules = [
    {
      name: 'Welcome',
      status: welcomeVisited ? 'Complete' : 'Not started',
      tone:   welcomeVisited ? 'sage' : 'neutral',
    },
    {
      name: 'Purpose',
      status: purposeQuizPassed ? 'Quiz passed' : purposeVisited ? 'Visited · quiz pending' : 'Not started',
      tone:   purposeQuizPassed ? 'sage' : purposeVisited ? 'coral' : 'neutral',
    },
    {
      name: 'AI in HR Learning',
      status: learningQuizPassed ? 'Quiz passed' : allTabsSeen ? 'Tabs seen · quiz pending' : anyTabSeen ? `${learningTabs.length}/3 tabs` : 'Not started',
      tone:   learningQuizPassed ? 'sage' : allTabsSeen || anyTabSeen ? 'coral' : 'neutral',
    },
    {
      name: 'Prompt Builder',
      status: score >= 80 ? 'Complete' : score > 0 ? `${score}% ready` : 'Not started',
      tone:   score >= 80 ? 'sage' : score > 0 ? 'coral' : 'neutral',
    },
    {
      name: 'Safety Checklist',
      status: safetyCompleted === safetyChecklist.length
        ? 'Complete'
        : safetyCompleted > 0
        ? `${safetyCompleted}/${safetyChecklist.length} confirmed`
        : 'Not started',
      tone: safetyCompleted === safetyChecklist.length ? 'sage' : safetyCompleted > 0 ? 'coral' : 'neutral',
    },
  ];

  return (
    <div className="px-6 py-12 md:px-10 lg:px-14">
      <PageHeader
        eyebrow="Progress · Module 06"
        title="Learning path progress."
        intro="Progress indicators show learning completion, not recruitment performance or candidate quality."
      />

      <div className="mb-10 grid gap-5 md:grid-cols-12">
        <Card className="md:col-span-7 !p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="eyebrow mb-3">Current path</p>
              <h3 className="mb-2 font-display text-3xl text-midnight-950 dark:text-parchment-50">
                Conscious AI use in early recruitment
              </h3>
              <p className="max-w-md text-midnight-600 dark:text-midnight-300">
                Recommended sequence: Welcome → Purpose → AI in HR → Prompt Builder → Safety Checklist.
              </p>
            </div>
            <ProgressRing value={overallPct} />
          </div>
        </Card>
        <div className="grid grid-cols-1 gap-4 md:col-span-5">
          <StatTile label="Prompt readiness" value={`${score}%`} sublabel="Current builder score" />
          <StatTile label="Prompt elements learned" value={elementsLearned} sublabel={`of ${checks.length} core elements`} />
          <StatTile label="Safety checks completed" value={safetyCompleted} sublabel={`of ${safetyChecklist.length} verification rules`} />
        </div>
      </div>

      <section className="mb-8">
        <p className="eyebrow mb-4">Module status</p>
        <div className="overflow-hidden rounded-2xl border border-midnight-100 dark:border-midnight-700 bg-white dark:bg-midnight-800">
          {modules.map((m, i) => (
            <div
              key={m.name}
              className={`flex items-center justify-between px-6 py-4 ${
                i !== 0 ? 'border-t border-midnight-100 dark:border-midnight-700' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-midnight-400 dark:text-midnight-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-medium text-midnight-950 dark:text-parchment-100">{m.name}</span>
              </div>
              <span className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${badgeClass(m.tone)}`}>
                {m.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {allComplete && <CompletionCertificate score={overallPct} />}
    </div>
  );
}

function ProgressRing({ value }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative shrink-0">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="currentColor" strokeWidth="8" className="text-midnight-100 dark:text-midnight-700" />
        <circle
          cx="60" cy="60" r={r}
          fill="none"
          stroke="#f04924"
          strokeWidth="8"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          style={{ transition: 'stroke-dashoffset 600ms ease' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display text-2xl text-midnight-950 dark:text-parchment-50">{value}%</span>
      </div>
    </div>
  );
}

function CompletionCertificate({ score }) {
  const handlePrint = () => window.print();

  return (
    <section className="mt-4">
      <p className="eyebrow mb-4">Completion certificate</p>
      <div
        id="certificate"
        className="relative overflow-hidden rounded-3xl border-2 border-coral-200 dark:border-coral-700 bg-gradient-to-br from-parchment-50 to-parchment-100 dark:from-midnight-800 dark:to-midnight-900 p-10 text-center"
      >
        {/* Decorative corner accents */}
        <div className="pointer-events-none absolute left-4 top-4 h-12 w-12 rounded-full border-2 border-coral-200 dark:border-coral-700/50 opacity-40" />
        <div className="pointer-events-none absolute right-4 top-4 h-12 w-12 rounded-full border-2 border-coral-200 dark:border-coral-700/50 opacity-40" />
        <div className="pointer-events-none absolute bottom-4 left-4 h-12 w-12 rounded-full border-2 border-coral-200 dark:border-coral-700/50 opacity-40" />
        <div className="pointer-events-none absolute bottom-4 right-4 h-12 w-12 rounded-full border-2 border-coral-200 dark:border-coral-700/50 opacity-40" />

        <div className="relative">
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-coral-500 text-white shadow-lift">
            <Award size={28} />
          </div>

          <p className="eyebrow mb-3 text-coral-500">Certificate of completion</p>
          <h2 className="mb-2 font-display text-3xl text-midnight-950 dark:text-parchment-50 md:text-4xl">
            Conscious AI Use in<br />Early-Stage Recruitment
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-midnight-600 dark:text-midnight-300">
            This confirms the completion of the LeAIrn HR learning path, covering structured
            prompt design, AI safety principles, bias prevention, and human-oversight workflows
            in recruitment.
          </p>

          <div className="mx-auto mt-6 mb-2 inline-flex items-center gap-2 rounded-full border border-coral-200 dark:border-coral-700 bg-coral-50 dark:bg-coral-900/20 px-4 py-2">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-coral-700 dark:text-coral-300">
              Learning score · {score}%
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-midnight-500 dark:text-midnight-400">
            <span className="font-mono uppercase tracking-[0.14em]">LeAIrn HR · v1.0</span>
            <span className="h-1 w-1 rounded-full bg-midnight-300 dark:bg-midnight-600" />
            <span className="font-mono uppercase tracking-[0.14em]">Educational use only</span>
            <span className="h-1 w-1 rounded-full bg-midnight-300 dark:bg-midnight-600" />
            <span className="font-mono uppercase tracking-[0.14em]">
              {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long' })}
            </span>
          </div>

          <button
            onClick={handlePrint}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-midnight-200 dark:border-midnight-600 bg-white dark:bg-midnight-800 px-5 py-2.5 text-sm font-medium text-midnight-800 dark:text-parchment-200 shadow-soft transition-all hover:shadow-lift hover:-translate-y-px"
          >
            <Download size={14} />
            Save / Print certificate
          </button>
        </div>
      </div>
    </section>
  );
}
