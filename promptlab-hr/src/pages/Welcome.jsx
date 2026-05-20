import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, ShieldCheck, ChevronRight } from 'lucide-react';
import { welcomeCards } from '@/data/content';
import { Card, RevealCard, Tag } from '@/components/ui';
import { useProgressStore } from '@/features/progress/progressStore';

const ONBOARDING_PATH = [
  { step: '01', label: 'Purpose',     path: '/purpose',  desc: 'Understand what AI can and cannot do in recruitment.' },
  { step: '02', label: 'AI in HR',    path: '/learning', desc: 'Learn the vocabulary of prompts, criteria, and safety.' },
  { step: '03', label: 'Builder',     path: '/builder',  desc: 'Build your first structured recruitment prompt.' },
  { step: '04', label: 'Safety',      path: '/safety',   desc: 'Confirm the 9 safety rules before using any AI output.' },
  { step: '05', label: 'Progress',    path: '/progress', desc: 'Track your learning and collect your certificate.' },
];

export default function Welcome() {
  const markVisited = useProgressStore((s) => s.markVisited);
  useEffect(() => { markVisited('welcome'); }, [markVisited]);

  return (
    <div className="px-6 py-12 md:px-10 lg:px-14">
      {/* Hero */}
      <section className="mb-16 border-b border-midnight-100 dark:border-midnight-700 pb-16">
        <div className="mb-5 flex items-center gap-3">
          <span className="inline-block rounded-sm bg-coral-500 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white">
            Module 01
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-midnight-400 dark:text-midnight-500">
            Starting module · Welcome
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="mb-6 font-sans text-4xl font-semibold leading-tight tracking-tight text-midnight-950 dark:text-parchment-50 md:text-5xl lg:text-[3.25rem]">
              Screen CVs faster.{' '}
              <span className="text-coral-500">Screen them fairly.</span>
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-midnight-600 dark:text-midnight-300">
              Build a structured prompt, upload a CV, and get a bias-checked fit analysis
              in seconds. AI prepares the output — you make every hiring decision.
            </p>

            {/* Primary CTA hierarchy: guided learning path first */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/purpose" className="btn-primary">
                <BookOpen size={16} />
                Start the learning path
              </Link>
              <Link to="/builder" className="btn-secondary">
                Try the prompt builder <ArrowUpRight size={16} />
              </Link>
              <Link to="/safety" className="btn-ghost text-midnight-500 dark:text-midnight-400 underline-offset-4 hover:underline">
                <ShieldCheck size={14} />
                View safe AI rules
              </Link>
            </div>
          </div>

          {/* Stats panel */}
          <div className="lg:col-span-5 lg:flex lg:items-center">
            <div className="w-full rounded-2xl border border-midnight-100 dark:border-midnight-700 bg-white dark:bg-midnight-800 p-8 shadow-soft">
              <p className="eyebrow mb-5">How it works</p>
              <div className="mb-6 flex flex-col gap-4">
                {[
                  ['01 · Build',  'Set task, criteria & safety rules in 8 steps'],
                  ['02 · Upload', 'Attach a CV for instant structured analysis'],
                  ['03 · Verify', 'AI drafts the output — you make the call'],
                ].map(([step, desc]) => (
                  <div key={step} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-coral-500">
                      {step}
                    </span>
                    <span className="text-sm text-midnight-600 dark:text-midnight-300">{desc}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-6 border-t border-midnight-100 dark:border-midnight-700 pt-6">
                <div>
                  <p className="text-3xl font-semibold text-midnight-950 dark:text-parchment-50">8</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-midnight-400 dark:text-midnight-500">
                    Prompt steps
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-midnight-950 dark:text-parchment-50">9</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-midnight-400 dark:text-midnight-500">
                    Bias guardrails
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-midnight-950 dark:text-parchment-50">6</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-midnight-400 dark:text-midnight-500">
                    Modules
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guided onboarding path — new prominent section */}
      <section className="mb-20">
        <div className="mb-8">
          <p className="eyebrow mb-3">Recommended learning path</p>
          <h2 className="display-md max-w-xl">
            Five modules. One structured workflow.
          </h2>
        </div>
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-6 top-8 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-coral-300 via-coral-200 to-transparent dark:from-coral-700 dark:via-coral-800 lg:block" />
          <div className="flex flex-col gap-3">
            {ONBOARDING_PATH.map((item, i) => (
              <Link
                key={item.step}
                to={item.path}
                className="group flex items-center gap-5 rounded-2xl border border-midnight-100 dark:border-midnight-700 bg-white dark:bg-midnight-800 px-5 py-4 shadow-soft transition-all hover:border-coral-200 dark:hover:border-coral-700 hover:shadow-lift"
              >
                <div className="relative shrink-0">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-parchment-100 dark:bg-midnight-700 font-mono text-sm font-semibold text-midnight-600 dark:text-midnight-300 transition-all group-hover:bg-coral-500 group-hover:text-white">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-midnight-950 dark:text-parchment-100">
                    {item.label}
                  </p>
                  <p className="text-sm text-midnight-500 dark:text-midnight-400">{item.desc}</p>
                </div>
                <ChevronRight
                  size={18}
                  className="shrink-0 text-midnight-300 dark:text-midnight-600 transition-all group-hover:translate-x-1 group-hover:text-coral-500"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Platform purpose */}
      <section className="mb-20 grid gap-10 rounded-3xl border border-midnight-100 dark:border-midnight-700 bg-white dark:bg-midnight-800 p-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-4">Platform purpose</p>
          <h2 className="display-md">
            LeAIrn HR teaches structured AI support for recruitment work.
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="text-lg leading-relaxed text-midnight-700 dark:text-midnight-300">
            LeAIrn HR is an educational platform for recruiters who want to use AI
            as a structured support tool in early-stage recruitment. The platform
            teaches how to build safe, job-related, and reviewable AI prompts for CV
            screening, candidate summaries, and recruitment communication.
          </p>
        </div>
      </section>

      {/* Four learning cards */}
      <section className="mb-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-3">What you'll do</p>
            <h2 className="display-md max-w-xl">Four practices, one disciplined workflow.</h2>
          </div>
          <p className="hidden font-mono text-xs text-midnight-500 dark:text-midnight-400 md:block">
            01 — 04
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {welcomeCards.map((card, idx) => (
            <Card key={card.title} className="!p-7 hover:shadow-lift transition-shadow">
              <div className="mb-4 flex items-center justify-between">
                <Tag tone="coral">{card.label}</Tag>
                <span className="font-mono text-xs text-midnight-400 dark:text-midnight-500">
                  {String(idx + 1).padStart(2, '0')} / 04
                </span>
              </div>
              <h3 className="mb-3 font-display text-2xl text-midnight-950 dark:text-parchment-50">
                {card.title}
              </h3>
              <p className="text-midnight-600 dark:text-midnight-300">{card.visible}</p>
              <RevealCard>{card.hidden}</RevealCard>
            </Card>
          ))}
        </div>
      </section>

      {/* Learning outcomes */}
      <section className="relative overflow-hidden rounded-3xl bg-midnight-950 px-10 py-14 text-parchment-100 grain">
        <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-coral-500/20 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow !text-coral-200 mb-4">Starting module · Outcomes</p>
            <h2 className="font-display text-4xl leading-tight text-parchment-50">
              By the end of this module, you can:
            </h2>
          </div>
          <ul className="lg:col-span-7 space-y-4">
            {[
              'Explain 3 recruitment tasks where AI can support early-stage recruiters.',
              'Identify 3 recruitment tasks where AI should not make decisions.',
              'Name 6 elements of a structured HR prompt.',
              'Explain why recruiter verification is required before using AI output.',
            ].map((o, i) => (
              <li key={i} className="flex gap-4 border-b border-parchment-50/10 pb-4 last:border-0">
                <span className="font-mono text-sm text-coral-200">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-parchment-100">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
