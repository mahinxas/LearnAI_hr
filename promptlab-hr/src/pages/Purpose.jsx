import { Check, X } from 'lucide-react';
import { purposeBlocks, circumstanceBlocks, doList, dontList } from '@/data/content';
import { Card, PageHeader, RevealCard } from '@/components/ui';

export default function Purpose() {
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
            <h3 className="font-display text-2xl text-midnight-950">
              Use AI when it improves structure, consistency, and review.
            </h3>
          </div>
          <div className="flex flex-col gap-4">
            {purposeBlocks.map((b) => (
              <Card key={b.title}>
                <h4 className="mb-2 font-display text-lg text-midnight-950">{b.title}</h4>
                <p className="text-midnight-600">{b.visible}</p>
                <RevealCard label="Why this matters">{b.hidden}</RevealCard>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-5 border-l-2 border-sage-500 pl-4">
            <p className="eyebrow mb-2">Circumstances</p>
            <h3 className="font-display text-2xl text-midnight-950">
              Use AI only when criteria, privacy, and verification are clear.
            </h3>
          </div>
          <div className="flex flex-col gap-4">
            {circumstanceBlocks.map((b) => (
              <Card key={b.title}>
                <h4 className="mb-2 font-display text-lg text-midnight-950">{b.title}</h4>
                <p className="text-midnight-600">{b.visible}</p>
                <RevealCard label="Show explanation">{b.hidden}</RevealCard>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Do / Don't */}
      <section className="mb-12 overflow-hidden rounded-3xl border border-midnight-100">
        <div className="border-b border-midnight-100 bg-white px-8 py-6">
          <p className="eyebrow mb-2">Decision boundary</p>
          <h3 className="font-display text-3xl text-midnight-950">Do / Do Not</h3>
        </div>
        <div className="grid divide-midnight-100 md:grid-cols-2 md:divide-x">
          <div className="bg-sage-50 px-8 py-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-sage-500 text-white">
                <Check size={16} />
              </div>
              <h4 className="font-display text-2xl text-sage-600">Do</h4>
            </div>
            <ul className="space-y-3">
              {doList.map((item) => (
                <li key={item} className="flex gap-3 text-midnight-700">
                  <span className="mt-2 h-1 w-1 rounded-full bg-sage-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-coral-50 px-8 py-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-coral-500 text-white">
                <X size={16} />
              </div>
              <h4 className="font-display text-2xl text-coral-700">Do Not</h4>
            </div>
            <ul className="space-y-3">
              {dontList.map((item) => (
                <li key={item} className="flex gap-3 text-midnight-700">
                  <span className="mt-2 h-1 w-1 rounded-full bg-coral-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <Card className="!p-8 !bg-parchment-100/50">
        <p className="eyebrow mb-3">Module 2 · Learning outcomes</p>
        <ul className="grid gap-3 md:grid-cols-2">
          {[
            'User can describe the main purpose of the platform in one sentence.',
            'User can list 4 situations where AI can support early recruitment.',
            'User can list 4 situations where AI should not be used.',
            'User can explain why anonymization and verification are necessary.',
          ].map((o) => (
            <li key={o} className="flex gap-3 text-midnight-700">
              <Check size={16} className="mt-1 shrink-0 text-coral-500" />
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
