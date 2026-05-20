import { useEffect, useState } from 'react';
import { Check, X, CheckCircle2, XCircle } from 'lucide-react';
import { purposeBlocks, circumstanceBlocks, doList, dontList } from '@/data/content';
import { Card, PageHeader, RevealCard } from '@/components/ui';
import { useProgressStore } from '@/features/progress/progressStore';

const QUIZ_QUESTIONS = [
  {
    q: 'What is the primary role of AI in the LeAIrn HR platform?',
    options: [
      'To make final hiring decisions autonomously',
      'To provide structured support for human review',
      'To interview candidates on behalf of recruiters',
      'To rank candidates by suitability',
    ],
    answer: 1,
  },
  {
    q: 'Which action should you ALWAYS take after receiving AI output?',
    options: [
      'Publish the output directly to candidates',
      'Use it to automatically filter applicants',
      'Verify the output against the original CV',
      'Forward to management without review',
    ],
    answer: 2,
  },
  {
    q: 'AI should NEVER comment on or infer which type of characteristics?',
    options: [
      'Technical skills and certifications',
      'Work experience and education',
      'Protected characteristics (age, gender, ethnicity, etc.)',
      'Language proficiency',
    ],
    answer: 2,
  },
];

export default function Purpose() {
  const markVisited      = useProgressStore((s) => s.markVisited);
  const purposeQuizPassed = useProgressStore((s) => s.purposeQuizPassed);
  const markQuizPassed   = useProgressStore((s) => s.markQuizPassed);

  useEffect(() => { markVisited('purpose'); }, [markVisited]);

  return (
    <div className="px-6 py-12 md:px-10 lg:px-14">
      <PageHeader
        eyebrow="App Instruction Module · 02"
        title="How LeAIrn HR should be used."
        intro="LeAIrn HR teaches recruiters how to use AI to structure early-stage recruitment work. It supports learning, prompt design, CV reading, candidate summarization, and output verification. It does not automate hiring decisions."
      />

      {/* Two-column board */}
      <div className="mb-16 grid gap-10 lg:grid-cols-2">
        <section>
          <div className="mb-5 border-l-2 border-coral-500 pl-4">
            <p className="eyebrow mb-2">Purpose</p>
            <h3 className="font-display text-2xl text-midnight-950 dark:text-parchment-50">
              Use AI when it improves structure, consistency, and review.
            </h3>
          </div>
          <div className="flex flex-col gap-4">
            {purposeBlocks.map((b) => (
              <Card key={b.title}>
                <h4 className="mb-2 font-display text-lg text-midnight-950 dark:text-parchment-50">{b.title}</h4>
                <p className="text-midnight-600 dark:text-midnight-300">{b.visible}</p>
                <RevealCard label="Why this matters">{b.hidden}</RevealCard>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-5 border-l-2 border-sage-500 pl-4">
            <p className="eyebrow mb-2">Circumstances</p>
            <h3 className="font-display text-2xl text-midnight-950 dark:text-parchment-50">
              Use AI only when criteria, privacy, and verification are clear.
            </h3>
          </div>
          <div className="flex flex-col gap-4">
            {circumstanceBlocks.map((b) => (
              <Card key={b.title}>
                <h4 className="mb-2 font-display text-lg text-midnight-950 dark:text-parchment-50">{b.title}</h4>
                <p className="text-midnight-600 dark:text-midnight-300">{b.visible}</p>
                <RevealCard label="Show explanation">{b.hidden}</RevealCard>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Do / Don't */}
      <section className="mb-12 overflow-hidden rounded-3xl border border-midnight-100 dark:border-midnight-700">
        <div className="border-b border-midnight-100 dark:border-midnight-700 bg-white dark:bg-midnight-800 px-8 py-6">
          <p className="eyebrow mb-2">Decision boundary</p>
          <h3 className="font-display text-3xl text-midnight-950 dark:text-parchment-50">Do / Do Not</h3>
        </div>
        <div className="grid divide-midnight-100 dark:divide-midnight-700 md:grid-cols-2 md:divide-x">
          <div className="bg-sage-50 dark:bg-sage-900/20 px-8 py-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-sage-500 text-white">
                <Check size={16} />
              </div>
              <h4 className="font-display text-2xl text-sage-600 dark:text-sage-400">Do</h4>
            </div>
            <ul className="space-y-3">
              {doList.map((item) => (
                <li key={item} className="flex gap-3 text-midnight-700 dark:text-midnight-300">
                  <span className="mt-2 h-1 w-1 rounded-full bg-sage-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-coral-50 dark:bg-coral-900/20 px-8 py-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-coral-500 text-white">
                <X size={16} />
              </div>
              <h4 className="font-display text-2xl text-coral-700 dark:text-coral-300">Do Not</h4>
            </div>
            <ul className="space-y-3">
              {dontList.map((item) => (
                <li key={item} className="flex gap-3 text-midnight-700 dark:text-midnight-300">
                  <span className="mt-2 h-1 w-1 rounded-full bg-coral-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <Card className="!p-8 !bg-parchment-100/50 dark:!bg-midnight-800/50 mb-8">
        <p className="eyebrow mb-3">Module 2 · Learning outcomes</p>
        <ul className="grid gap-3 md:grid-cols-2">
          {[
            'User can describe the main purpose of the platform in one sentence.',
            'User can list 4 situations where AI can support early recruitment.',
            'User can list 4 situations where AI should not be used.',
            'User can explain why anonymization and verification are necessary.',
          ].map((o) => (
            <li key={o} className="flex gap-3 text-midnight-700 dark:text-midnight-300">
              <Check size={16} className="mt-1 shrink-0 text-coral-500" />
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Knowledge quiz */}
      <PurposeQuiz
        questions={QUIZ_QUESTIONS}
        alreadyPassed={purposeQuizPassed}
        onPass={() => markQuizPassed('purpose')}
      />
    </div>
  );
}

function PurposeQuiz({ questions, alreadyPassed, onPass }) {
  const [answers, setAnswers]     = useState({});
  const [submitted, setSubmitted] = useState(alreadyPassed);
  const [score, setScore]         = useState(alreadyPassed ? questions.length : 0);

  const allAnswered = Object.keys(answers).length === questions.length;

  const handleSubmit = () => {
    if (!allAnswered) return;
    const correct = questions.filter((q, i) => answers[i] === q.answer).length;
    setScore(correct);
    setSubmitted(true);
    if (correct === questions.length) onPass();
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const passed = submitted && score === questions.length;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="eyebrow">Module 2 · Knowledge check</p>
        {alreadyPassed && (
          <span className="flex items-center gap-1.5 rounded-full bg-sage-100 dark:bg-sage-900/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-sage-600 dark:text-sage-400">
            <CheckCircle2 size={11} /> Quiz passed
          </span>
        )}
      </div>

      <div className="rounded-3xl border border-midnight-100 dark:border-midnight-700 bg-white dark:bg-midnight-800 p-8">
        {passed && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-sage-300 dark:border-sage-700 bg-sage-50 dark:bg-sage-900/30 px-4 py-3">
            <CheckCircle2 size={18} className="shrink-0 text-sage-500" />
            <p className="text-sm font-medium text-sage-700 dark:text-sage-400">
              All {questions.length} questions correct — knowledge check passed!
            </p>
          </div>
        )}

        {submitted && !passed && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-coral-200 dark:border-coral-700/50 bg-coral-50 dark:bg-coral-900/20 px-4 py-3">
            <XCircle size={18} className="mt-0.5 shrink-0 text-coral-500" />
            <p className="text-sm font-medium text-coral-700 dark:text-coral-300">
              {score} of {questions.length} correct — review the content above and try again.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-8">
          {questions.map((q, qi) => {
            const selectedOption = answers[qi];
            return (
              <div key={qi}>
                <p className="mb-3 font-medium text-midnight-950 dark:text-parchment-100">
                  <span className="mr-2 font-mono text-xs text-coral-500">Q{qi + 1}</span>
                  {q.q}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {q.options.map((opt, oi) => {
                    const isSelected = selectedOption === oi;
                    const isCorrect  = oi === q.answer;
                    let cls = 'cursor-pointer rounded-xl border px-4 py-3 text-sm text-left transition-all ';
                    if (!submitted) {
                      cls += isSelected
                        ? 'border-midnight-950 bg-midnight-950 dark:border-parchment-200 dark:bg-parchment-100 text-parchment-50 dark:text-midnight-950'
                        : 'border-midnight-100 dark:border-midnight-700 bg-white dark:bg-midnight-900 text-midnight-700 dark:text-midnight-300 hover:border-midnight-400 dark:hover:border-midnight-500';
                    } else {
                      if (isCorrect) cls += 'border-sage-400 bg-sage-50 dark:bg-sage-900/30 text-sage-700 dark:text-sage-400 font-medium';
                      else if (isSelected && !isCorrect) cls += 'border-coral-300 bg-coral-50 dark:bg-coral-900/20 text-coral-700 dark:text-coral-300';
                      else cls += 'border-midnight-100 dark:border-midnight-700 bg-white dark:bg-midnight-900 text-midnight-500 dark:text-midnight-500 opacity-60';
                    }
                    return (
                      <button
                        key={oi}
                        className={cls}
                        disabled={submitted}
                        onClick={() => !submitted && setAnswers((a) => ({ ...a, [qi]: oi }))}
                      >
                        <span className="flex items-center gap-2">
                          {submitted && isCorrect && <CheckCircle2 size={14} className="shrink-0 text-sage-500" />}
                          {submitted && isSelected && !isCorrect && <XCircle size={14} className="shrink-0 text-coral-500" />}
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center gap-3">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              Submit answers
            </button>
          ) : !passed ? (
            <button onClick={handleRetry} className="btn-secondary">
              Try again
            </button>
          ) : null}
          {!submitted && (
            <p className="text-sm text-midnight-500 dark:text-midnight-400">
              {Object.keys(answers).length}/{questions.length} answered
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
