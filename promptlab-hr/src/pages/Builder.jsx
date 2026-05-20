import { useMemo, useState } from 'react';
import {
  tasks, criteria, formats, lengths,
  safetyRules, reviewInstructions, builderLessons,
} from '@/data/content';
import {
  useBuilderStore, buildPromptText, computeReadinessScore,
} from '@/features/builder/builderStore';
import {
  BuilderStep, ChipGroup, SegmentGroup, FieldLabel,
} from '@/features/builder/BuilderStep';
import {
  ScoreCard, FinalPrompt, ExplanationGrid, LogicMap, ChecklistMini,
} from '@/features/builder/OutputPanel';
import { PageHeader } from '@/components/ui';
import { AlertTriangle, MessageSquare, RotateCcw, Lightbulb, BarChart2, X } from 'lucide-react';

export default function Builder() {
  const state = useBuilderStore();
  const prompt = useMemo(() => buildPromptText(state), [state]);
  const { score, checks } = useMemo(() => computeReadinessScore(state), [state]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const set = (field) => (e) => state.setField(field, e.target.value);

  const handleReset = () => {
    if (resetConfirm) {
      state.reset();
      setResetConfirm(false);
    } else {
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 3000);
    }
  };

  const OutputContent = () => (
    <div className="flex flex-col gap-5">
      <ScoreCard score={score} />
      <FinalPrompt prompt={prompt} />
      <section>
        <p className="eyebrow mb-3">Prompt explanation</p>
        <ExplanationGrid format={state.format} length={state.length} />
      </section>
      <section>
        <p className="eyebrow mb-3">Observable process · Logic map</p>
        <LogicMap state={state} />
      </section>
      <section>
        <p className="eyebrow mb-3">Evaluation checklist</p>
        <ChecklistMini checks={checks} />
      </section>
    </div>
  );

  return (
    <div className="px-6 py-12 md:px-10 lg:px-14">
      <PageHeader
        eyebrow="Advanced HR Prompt Builder · Module 04"
        title="Build a recruitment prompt, element by element."
        intro="Each step shows how a prompt component changes the AI output. The readiness score and logic map update as you build."
      />

      {/* Sample scenario banner */}
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-midnight-200 dark:border-midnight-700 bg-white dark:bg-midnight-800 px-5 py-4 shadow-soft">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-parchment-200 dark:bg-midnight-700">
          <Lightbulb size={16} className="text-midnight-600 dark:text-parchment-300" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-midnight-500 dark:text-midnight-400">
            Sample scenario
          </p>
          <p className="truncate text-sm text-midnight-800 dark:text-parchment-200">
            {state.jobTitle} · {state.department} · {state.seniority}
          </p>
        </div>
        <button
          onClick={handleReset}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
            resetConfirm
              ? 'border-coral-300 bg-coral-50 dark:border-coral-700 dark:bg-coral-900/30 text-coral-700 dark:text-coral-300'
              : 'border-midnight-200 dark:border-midnight-600 bg-white dark:bg-midnight-700 text-midnight-600 dark:text-parchment-300 hover:border-midnight-400 dark:hover:border-midnight-500'
          }`}
        >
          <RotateCcw size={12} />
          {resetConfirm ? 'Confirm reset?' : 'Reset to sample'}
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Form column */}
        <form className="flex flex-col gap-5 lg:col-span-7" onSubmit={(e) => e.preventDefault()}>

          {/* Step 1: Task */}
          <BuilderStep number="1" title="Select HR task" lesson={builderLessons[0]}>
            <ChipGroup
              items={tasks}
              selected={[state.task]}
              onToggle={(v) => state.setField('task', v)}
            />
          </BuilderStep>

          {/* Step 2: Job context */}
          <BuilderStep number="2" title="Add job context" lesson={builderLessons[1]}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel>Job title</FieldLabel>
                <input className="input-base" value={state.jobTitle} onChange={set('jobTitle')} />
              </div>
              <div>
                <FieldLabel>Department</FieldLabel>
                <input className="input-base" value={state.department} onChange={set('department')} />
              </div>
              <div>
                <FieldLabel>Seniority level</FieldLabel>
                <input className="input-base" value={state.seniority} onChange={set('seniority')} />
              </div>
              <div>
                <FieldLabel>Work model</FieldLabel>
                <input className="input-base" value={state.workModel} onChange={set('workModel')} />
              </div>
              <div className="sm:col-span-2">
                <FieldLabel>Main responsibilities</FieldLabel>
                <textarea rows={2} className="input-base" value={state.responsibilities} onChange={set('responsibilities')} />
              </div>
              <div>
                <FieldLabel>Must-have requirements</FieldLabel>
                <textarea rows={3} className="input-base" value={state.mustHave} onChange={set('mustHave')} />
              </div>
              <div>
                <FieldLabel>Nice-to-have requirements</FieldLabel>
                <textarea rows={3} className="input-base" value={state.niceHave} onChange={set('niceHave')} />
              </div>
              <div className="sm:col-span-2">
                <FieldLabel>Location (if relevant)</FieldLabel>
                <input className="input-base" value={state.location} onChange={set('location')} />
              </div>
            </div>
          </BuilderStep>

          {/* Step 3: Candidate info */}
          <BuilderStep number="3" title="Add candidate information" lesson={builderLessons[2]}>
            <div className="space-y-4">

              {/* AI Chat callout */}
              <div className="relative overflow-hidden rounded-xl border border-midnight-800 bg-midnight-950">
                <div className="relative z-10 flex items-start gap-4 px-5 py-4">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-coral-500 text-white shadow-sm">
                    <MessageSquare size={15} />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold leading-snug text-parchment-50">
                      CV analysis is handled by the AI Chat panel
                    </p>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-parchment-400">
                      Complete your prompt in Steps 1–8, then open{' '}
                      <span className="rounded-md border border-midnight-600 bg-midnight-800 px-1.5 py-0.5 font-mono text-[10px] tracking-wide text-coral-300">
                        Chat with AI
                      </span>{' '}
                      in the Final Prompt panel. Attach a PDF or TXT CV there for instant
                      fit analysis — no manual extraction needed.
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-coral-500/8 via-transparent to-transparent" />
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 py-1">
                <div className="h-px flex-1 bg-midnight-100 dark:bg-midnight-700" />
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-midnight-400">
                  or add context notes manually
                </span>
                <div className="h-px flex-1 bg-midnight-100 dark:bg-midnight-700" />
              </div>

              <div>
                <FieldLabel>
                  Anonymized CV text{' '}
                  <span className="font-normal text-midnight-400">(optional)</span>
                </FieldLabel>
                <textarea
                  rows={5}
                  className="input-base"
                  placeholder="Paste anonymized candidate experience and skills here…"
                  value={state.candidateInfo}
                  onChange={set('candidateInfo')}
                />
              </div>
              <div>
                <FieldLabel>
                  Recruiter notes{' '}
                  <span className="font-normal text-midnight-400">(optional)</span>
                </FieldLabel>
                <textarea
                  rows={2}
                  className="input-base"
                  placeholder="Items to verify in the original document…"
                  value={state.recruiterNotes}
                  onChange={set('recruiterNotes')}
                />
              </div>
              <div>
                <FieldLabel>
                  Candidate portfolio notes{' '}
                  <span className="font-normal text-midnight-400">(optional)</span>
                </FieldLabel>
                <textarea
                  rows={2}
                  className="input-base"
                  placeholder="Portfolio links, work samples, or 'not provided'…"
                  value={state.portfolioNotes}
                  onChange={set('portfolioNotes')}
                />
              </div>

              {/* Privacy warning */}
              <div className="flex gap-2.5 rounded-xl border border-coral-200 dark:border-coral-700/50 bg-coral-50 dark:bg-coral-900/20 p-3.5 text-sm text-coral-700 dark:text-coral-300">
                <AlertTriangle size={15} className="mt-0.5 shrink-0" />
                <span>
                  <strong>Privacy warning:</strong> Do not enter unnecessary personal data
                  or protected characteristics.
                </span>
              </div>
            </div>
          </BuilderStep>

          {/* Step 4: Criteria */}
          <BuilderStep number="4" title="Define evaluation criteria" lesson={builderLessons[3]}>
            <ChipGroup
              items={criteria}
              selected={state.criteria}
              onToggle={(v) => state.toggleArrayItem('criteria', v)}
            />
          </BuilderStep>

          {/* Step 5: Format */}
          <BuilderStep number="5" title="Choose output format" lesson={builderLessons[4]}>
            <SegmentGroup
              items={formats}
              value={state.format}
              onChange={(v) => state.setField('format', v)}
            />
          </BuilderStep>

          {/* Step 6: Length */}
          <BuilderStep number="6" title="Select detail level and length" lesson={builderLessons[5]}>
            <SegmentGroup
              items={lengths}
              value={state.length}
              onChange={(v) => state.setField('length', v)}
            />
          </BuilderStep>

          {/* Step 7: Safety */}
          <BuilderStep number="7" title="Add safety and fairness rules" lesson={builderLessons[6]}>
            <ChipGroup
              items={safetyRules}
              selected={state.safety}
              onToggle={(v) => state.toggleArrayItem('safety', v)}
            />
          </BuilderStep>

          {/* Step 8: Review */}
          <BuilderStep number="8" title="Add review instruction" lesson={builderLessons[7]}>
            <ChipGroup
              items={reviewInstructions}
              selected={state.review}
              onToggle={(v) => state.toggleArrayItem('review', v)}
            />
          </BuilderStep>
        </form>

        {/* Output sidebar — desktop only */}
        <aside className="hidden lg:block lg:col-span-5">
          <div className="sticky top-24 flex flex-col gap-5">
            <OutputContent />
          </div>
        </aside>
      </div>

      {/* Mobile floating output button */}
      <div className="fixed bottom-6 right-6 z-30 lg:hidden">
        <button
          onClick={() => setSheetOpen(true)}
          className="flex items-center gap-2 rounded-full bg-midnight-950 dark:bg-parchment-100 px-5 py-3 text-sm font-medium text-parchment-50 dark:text-midnight-950 shadow-lift transition-all hover:-translate-y-px active:translate-y-0"
        >
          <BarChart2 size={16} />
          View output · {score}%
        </button>
      </div>

      {/* Mobile bottom-sheet */}
      {sheetOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-midnight-950/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSheetOpen(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-3xl border-t border-midnight-100 dark:border-midnight-700 bg-parchment-50 dark:bg-midnight-900 px-5 pb-10 pt-4 animate-slide-up lg:hidden">
            <div className="mb-4 flex items-center justify-between">
              <div className="mx-auto h-1 w-10 rounded-full bg-midnight-200 dark:bg-midnight-600" />
              <button
                onClick={() => setSheetOpen(false)}
                className="absolute right-5 top-4 grid h-8 w-8 place-items-center rounded-full border border-midnight-200 dark:border-midnight-700 bg-white dark:bg-midnight-800 text-midnight-600 dark:text-parchment-300"
                aria-label="Close panel"
              >
                <X size={14} />
              </button>
            </div>
            <p className="eyebrow mb-4 text-center">Prompt output</p>
            <OutputContent />
          </div>
        </>
      )}
    </div>
  );
}
