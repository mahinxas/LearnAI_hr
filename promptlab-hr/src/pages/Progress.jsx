import { useMemo } from 'react';
import { PageHeader, Card, StatTile } from '@/components/ui';
import { useBuilderStore, computeReadinessScore } from '@/features/builder/builderStore';
import { safetyChecklist } from '@/data/content';

export default function Progress() {
  const state = useBuilderStore();
  const { score, checks } = useMemo(() => computeReadinessScore(state), [state]);

  const safetyData = JSON.parse(localStorage.getItem('promptlab-safety-checks') || '{}');
  const safetyCompleted = Object.values(safetyData).filter(Boolean).length;

  const elementsLearned = checks.filter((c) => c.passed).length;

  const overallPct = Math.round(
    ((elementsLearned / checks.length) * 0.5 +
      (safetyCompleted / safetyChecklist.length) * 0.5) *
      100
  );

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
              <h3 className="mb-2 font-display text-3xl text-midnight-950">
                Conscious AI use in early recruitment
              </h3>
              <p className="max-w-md text-midnight-600">
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

      <section>
        <p className="eyebrow mb-4">Module status</p>
        <div className="overflow-hidden rounded-2xl border border-midnight-100 bg-white">
          {[
            { name: 'Welcome',          status: 'Complete',   tone: 'sage' },
            { name: 'Purpose',          status: 'Complete',   tone: 'sage' },
            { name: 'AI in HR Learning', status: 'In progress', tone: 'coral' },
            { name: 'Prompt Builder',   status: `${score}% ready`, tone: score >= 80 ? 'sage' : 'coral' },
            { name: 'Safety Checklist', status: `${safetyCompleted}/${safetyChecklist.length} confirmed`, tone: safetyCompleted === safetyChecklist.length ? 'sage' : 'coral' },
          ].map((m, i) => (
            <div
              key={m.name}
              className={`flex items-center justify-between px-6 py-4 ${
                i !== 0 ? 'border-t border-midnight-100' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-midnight-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-medium text-midnight-950">{m.name}</span>
              </div>
              <span
                className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${
                  m.tone === 'sage'
                    ? 'bg-sage-100 text-sage-600'
                    : 'bg-coral-100 text-coral-700'
                }`}
              >
                {m.status}
              </span>
            </div>
          ))}
        </div>
      </section>
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
        <circle cx="60" cy="60" r={r} fill="none" stroke="#e6ebf3" strokeWidth="8" />
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
        <span className="font-display text-2xl text-midnight-950">{value}%</span>
      </div>
    </div>
  );
}
