import { useState, useEffect } from 'react';
import { ChevronDown, CheckCircle2, XCircle } from 'lucide-react';
import { lessons } from '@/data/content';
import { PageHeader, Tag } from '@/components/ui';
import { useProgressStore } from '@/features/progress/progressStore';

const TABS = [
  { id: 'when',   label: 'When to use AI' },
  { id: 'basics', label: 'AI Basics' },
  { id: 'semi',   label: 'AI Semi-Pro' },
];

const QUIZ_QUESTIONS = [
  {
    q: "What is the role of 'criteria' in a structured HR prompt?",
    options: [
      'To make AI responses longer',
      'To direct AI attention to job-relevant evidence',
      'To add extra safety instructions',
      'To define the output format',
    ],
    answer: 1,
  },
  {
    q: 'What should you do if AI output references information not found in the CV?',
    options: [
      'Trust it — AI has access to external data',
      'Flag it as unsupported and verify in the original document',
      'Assume the candidate provided it verbally',
      'Rerun the prompt with different settings',
    ],
    answer: 1,
  },
  {
    q: "Why does a safety rule say 'Do not make final hiring decisions'?",
    options: [
      "It limits the AI's vocabulary size",
      'It keeps AI in a support role and ensures human oversight',
      'It improves response formatting',
      'It makes the prompt shorter',
    ],
    answer: 1,
  },
];

export default function Learning() {
  const [tab, setTab] = useState('when');
  const markLearningTab  = useProgressStore((s) => s.markLearningTab);
  const learningQuizPassed = useProgressStore((s) => s.learningQuizPassed);
  const markQuizPassed   = useProgressStore((s) => s.markQuizPassed);

  useEffect(() => { markLearningTab('when'); }, [markLearningTab]);

  const handleTabClick = (id) => {
    setTab(id);
    markLearningTab(id);
  };

  return (
    <div className="px-6 py-12 md:px-10 lg:px-14">
      <PageHeader
        eyebrow="AI in HR Learning Module · 03"
        title="AI in early-stage recruitment: from basic understanding to controlled use."
        intro="This module teaches when AI can support HR work, how prompts influence output, and how recruiters can move from basic AI use to semi-professional AI-supported workflows."
      />

      {/* Tabs */}
      <div className="mb-10 inline-flex rounded-full border border-midnight-200 dark:border-midnight-700 bg-white dark:bg-midnight-800 p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => handleTabClick(t.id)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              tab === t.id
                ? 'bg-midnight-950 text-parchment-50 dark:bg-parchment-100 dark:text-midnight-950'
                : 'text-midnight-600 dark:text-midnight-300 hover:text-midnight-950 dark:hover:text-parchment-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Q&A */}
      <div className="grid gap-4 lg:grid-cols-2">
        {lessons[tab].map((lesson, i) => (
          <QACard key={i} lesson={lesson} index={i + 1} />
        ))}
      </div>

      {/* Outcomes */}
      <div className="mt-14 rounded-3xl bg-parchment-100/50 dark:bg-midnight-800/50 p-8">
        <p className="eyebrow mb-4">Module 3 · Learning outcomes</p>
        <ul className="grid gap-3 md:grid-cols-2">
          {[
            'User can identify at least 5 HR tasks suitable for AI support.',
            'User can explain why AI should not make hiring decisions.',
            'User can define prompt, context, criteria, format, and safety rules.',
            'User can build a simple AI workflow for CV screening.',
            'User can explain how to reduce hallucination and bias risk.',
          ].map((o, i) => (
            <li key={o} className="flex gap-3 text-midnight-700 dark:text-midnight-300">
              <span className="font-mono text-sm text-coral-500">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Knowledge quiz */}
      <KnowledgeQuiz
        questions={QUIZ_QUESTIONS}
        alreadyPassed={learningQuizPassed}
        onPass={() => markQuizPassed('learning')}
      />
    </div>
  );
}

function KnowledgeQuiz({ questions, alreadyPassed, onPass }) {
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
    <div className="mt-14">
      <div className="mb-5 flex items-center justify-between">
        <p className="eyebrow">Module 3 · Knowledge check</p>
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
            <div>
              <p className="text-sm font-medium text-coral-700 dark:text-coral-300">
                {score} of {questions.length} correct — review the lessons and try again.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-8">
          {questions.map((q, qi) => {
            const isSubmitted = submitted;
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
                    if (!isSubmitted) {
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
                        disabled={isSubmitted}
                        onClick={() => !isSubmitted && setAnswers((a) => ({ ...a, [qi]: oi }))}
                      >
                        <span className="flex items-center gap-2">
                          {isSubmitted && isCorrect && <CheckCircle2 size={14} className="shrink-0 text-sage-500" />}
                          {isSubmitted && isSelected && !isCorrect && <XCircle size={14} className="shrink-0 text-coral-500" />}
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

function QACard({ lesson, index }) {
  const [open, setOpen] = useState(false);
  return (
    <article
      className={`rounded-2xl border bg-white dark:bg-midnight-800 transition-all ${
        open ? 'border-midnight-950 dark:border-midnight-400 shadow-lift' : 'border-midnight-100 dark:border-midnight-700 shadow-soft'
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between gap-4 p-6 text-left"
      >
        <div className="flex-1">
          <Tag tone="cream">Q{index}</Tag>
          <h3 className="mt-3 font-display text-xl leading-tight text-midnight-950 dark:text-parchment-50">
            {lesson.question}
          </h3>
          <p className="mt-2 text-sm text-midnight-600 dark:text-midnight-300">{lesson.answer}</p>
        </div>
        <ChevronDown
          size={18}
          className={`mt-1 shrink-0 text-midnight-500 dark:text-midnight-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="border-t border-midnight-100 dark:border-midnight-700 px-6 py-5 animate-fade-in">
          <Field label="Expanded explanation">{lesson.explanation}</Field>
          <Field label="Practical HR example">{lesson.example}</Field>
          <Field label="Learning outcome" tone="coral">{lesson.outcome}</Field>
        </div>
      )}
    </article>
  );
}

function Field({ label, children, tone = 'default' }) {
  return (
    <div className="mb-3 last:mb-0">
      <p className={`mb-1 font-mono text-[10px] uppercase tracking-[0.18em] ${tone === 'coral' ? 'text-coral-500' : 'text-midnight-500 dark:text-midnight-400'}`}>
        {label}
      </p>
      <p className="text-sm leading-relaxed text-midnight-700 dark:text-midnight-300">{children}</p>
    </div>
  );
}
