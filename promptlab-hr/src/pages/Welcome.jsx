import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { welcomeCards } from '@/data/content';
import { Card, RevealCard, Tag } from '@/components/ui';

export default function Welcome() {
  const cardColumns = welcomeCards.reduce(
    (groups, card, i) => {
      groups[i % 2].push({ card, index: i + 1 });
      return groups;
    },
    [[], []]
  );

  return (
    <div className="px-6 py-12 md:px-10 lg:px-14">
      {/* Hero */}
      <section className="mb-20 border-b border-midnight-100 pb-16">
        <div className="mb-5 flex items-center gap-3">
          <span className="inline-block rounded-sm bg-coral-500 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white">
            Module 01
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-midnight-400">
            Starting module · Welcome
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="mb-6 font-sans text-4xl font-semibold leading-tight tracking-tight text-midnight-950 md:text-5xl lg:text-[3.25rem]">
              Learn to use AI{' '}
              <span className="text-coral-500">consciously</span>{' '}
              in early-stage recruitment.
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-midnight-600">
              Structure CV screening, candidate summaries, and recruiter communication —
              without giving hiring decisions to AI.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/purpose" className="btn-primary">
                Start learning <ArrowUpRight size={16} />
              </Link>
              <Link to="/builder" className="btn-secondary">
                <Sparkles size={16} /> Open Prompt Builder
              </Link>
              <Link to="/safety" className="btn-ghost !text-midnight-500 underline-offset-4 hover:underline">
                View safe AI rules
              </Link>
            </div>
          </div>

          {/* Stats panel */}
          <div className="lg:col-span-5 lg:flex lg:items-center">
            <div className="w-full rounded-2xl border border-midnight-100 bg-white p-8 shadow-soft">
              <p className="eyebrow mb-6">Platform at a glance</p>
              <p className="mb-6 text-sm leading-relaxed text-midnight-600">
                AI prepares the structure. The recruiter remains responsible.
              </p>
              <div className="grid grid-cols-3 gap-6 border-t border-midnight-100 pt-6">
                <div>
                  <p className="text-3xl font-semibold text-midnight-950">8</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-midnight-400">
                    Prompt elements
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-midnight-950">9</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-midnight-400">
                    Safety rules
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-midnight-950">6</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-midnight-400">
                    Modules
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform purpose */}
      <section className="mb-20 grid gap-10 rounded-3xl border border-midnight-100 bg-white p-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-4">Platform purpose</p>
          <h2 className="display-md">
            LeAIrn HR teaches structured AI support for recruitment work.
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="text-lg leading-relaxed text-midnight-700">
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
          <p className="hidden font-mono text-xs text-midnight-500 md:block">
            01 — 04
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 md:items-start">
          {cardColumns.map((column, columnIndex) => (
            <div key={`welcome-column-${columnIndex}`} className="flex flex-col gap-5">
              {column.map(({ card, index }) => (
                <Card key={card.title} className="!p-7 hover:shadow-lift transition-shadow">
                  <div className="mb-4 flex items-center justify-between">
                    <Tag tone="coral">{card.label}</Tag>
                    <span className="font-mono text-xs text-midnight-400">
                      {String(index).padStart(2, '0')} / 04
                    </span>
                  </div>
                  <h3 className="mb-3 font-display text-2xl text-midnight-950">
                    {card.title}
                  </h3>
                  <p className="text-midnight-600">{card.visible}</p>
                  <RevealCard>{card.hidden}</RevealCard>
                </Card>
              ))}
            </div>
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
