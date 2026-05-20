import { useMemo } from 'react';
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
import { AlertTriangle } from 'lucide-react';

export default function Builder() {
  const state = useBuilderStore();
  const prompt = useMemo(() => buildPromptText(state), [state]);
  const { score, checks } = useMemo(() => computeReadinessScore(state), [state]);

  const set = (field) => (e) => state.setField(field, e.target.value);

  return (
    <div className="px-6 py-12 md:px-10 lg:px-14">
      <PageHeader
        eyebrow="Advanced HR Prompt Builder · Module 04"
        title="Build a recruitment prompt, element by element."
        intro="Each step shows how a prompt component changes the AI output. The readiness score and logic map update as you build."
      />

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
              <div>
                <FieldLabel>Anonymized CV text</FieldLabel>
                <textarea rows={5} className="input-base" value={state.candidateInfo} onChange={set('candidateInfo')} />
              </div>
              <div>
                <FieldLabel>Recruiter notes</FieldLabel>
                <textarea rows={2} className="input-base" value={state.recruiterNotes} onChange={set('recruiterNotes')} />
              </div>
              <div>
                <FieldLabel>Candidate portfolio notes</FieldLabel>
                <textarea rows={2} className="input-base" value={state.portfolioNotes} onChange={set('portfolioNotes')} />
              </div>
              <div className="flex gap-2 rounded-xl border border-coral-200 bg-coral-50 p-3 text-sm text-coral-700">
                <AlertTriangle size={16} className="mt-0.5 shrink-0" />
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

        {/* Output sidebar */}
        <aside className="lg:col-span-5">
          <div className="sticky top-24 flex flex-col gap-5">
            <ScoreCard score={score} />
            <FinalPrompt prompt={prompt} />

            <section>
              <p className="eyebrow mb-3">Step 10 · Prompt explanation</p>
              <ExplanationGrid format={state.format} length={state.length} />
            </section>

            <section>
              <p className="eyebrow mb-3">Observable process · Logic map</p>
              <LogicMap state={state} />
            </section>

            <section>
              <p className="eyebrow mb-3">Step 11 · Evaluation checklist</p>
              <ChecklistMini checks={checks} />
            </section>
          </div>
        </aside>
      </div>
    </div>
  );
}
