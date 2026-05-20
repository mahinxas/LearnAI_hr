import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { lessons } from '@/data/content';
import { PageHeader, Tag } from '@/components/ui';

const TABS = [
  { id: 'when',   label: 'When to use AI' },
  { id: 'basics', label: 'AI Basics' },
  { id: 'semi',   label: 'AI Semi-Pro' },
];

export default function Learning() {
  const [tab, setTab] = useState('when');
  const columns = lessons[tab].reduce(
    (groups, lesson, i) => {
      groups[i % 2].push({ lesson, index: i + 1 });
      return groups;
    },
    [[], []]
  );

  return (
    <div className="px-6 py-12 md:px-10 lg:px-14">
      <PageHeader
        eyebrow="AI in HR Learning Module · 03"
        title="AI in early-stage recruitment: from basic understanding to controlled use."
        intro="This module teaches when AI can support HR work, how prompts influence output, and how recruiters can move from basic AI use to semi-professional AI-supported workflows."
      />

      {/* Tabs */}
      <div className="mb-10 inline-flex rounded-full border border-midnight-200 bg-white p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              tab === t.id
                ? 'bg-midnight-950 text-parchment-50'
                : 'text-midnight-600 hover:text-midnight-950'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Q&A */}
      <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
        {columns.map((column, columnIndex) => (
          <div key={`${tab}-column-${columnIndex}`} className="flex flex-col gap-4">
            {column.map(({ lesson, index }) => (
              <QACard key={`${tab}-${lesson.question}`} lesson={lesson} index={index} />
            ))}
          </div>
        ))}
      </div>

      {/* Outcomes */}
      <div className="mt-14 rounded-3xl bg-parchment-100/50 p-8">
        <p className="eyebrow mb-4">Module 3 · Learning outcomes</p>
        <ul className="grid gap-3 md:grid-cols-2">
          {[
            'User can identify at least 5 HR tasks suitable for AI support.',
            'User can explain why AI should not make hiring decisions.',
            'User can define prompt, context, criteria, format, and safety rules.',
            'User can build a simple AI workflow for CV screening.',
            'User can explain how to reduce hallucination and bias risk.',
          ].map((o, i) => (
            <li key={o} className="flex gap-3 text-midnight-700">
              <span className="font-mono text-sm text-coral-500">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function QACard({ lesson, index }) {
  const [open, setOpen] = useState(false);
  return (
    <article
      className={`rounded-2xl border bg-white transition-all ${
        open ? 'border-midnight-950 shadow-lift' : 'border-midnight-100 shadow-soft'
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between gap-4 p-6 text-left"
      >
        <div className="flex-1">
          <Tag tone="cream">Q{index}</Tag>
          <h3 className="mt-3 font-display text-xl leading-tight text-midnight-950">
            {lesson.question}
          </h3>
          <p className="mt-2 text-sm text-midnight-600">{lesson.answer}</p>
        </div>
        <ChevronDown
          size={18}
          className={`mt-1 shrink-0 text-midnight-500 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="border-t border-midnight-100 px-6 py-5 animate-fade-in">
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
      <p className={`mb-1 font-mono text-[10px] uppercase tracking-[0.18em] ${tone === 'coral' ? 'text-coral-500' : 'text-midnight-500'}`}>
        {label}
      </p>
      <p className="text-sm leading-relaxed text-midnight-700">{children}</p>
    </div>
  );
}
