import { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';

export function PageHeader({ eyebrow, title, intro, children }) {
  return (
    <header className="mb-12 max-w-3xl">
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h1 className="display-lg mb-5">{title}</h1>
      {intro && <p className="text-lg leading-relaxed text-midnight-600">{intro}</p>}
      {children}
    </header>
  );
}

export function Card({ children, className = '', ...rest }) {
  return (
    <article className={`card ${className}`} {...rest}>
      {children}
    </article>
  );
}

export function RevealCard({ label = 'Reveal lesson', children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4 rounded-xl border border-midnight-100 bg-parchment-50/50">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-midnight-900"
      >
        <span className="flex items-center gap-2">
          <Plus
            size={14}
            className={`text-coral-500 transition-transform ${open ? 'rotate-45' : ''}`}
          />
          {label}
        </span>
        <ChevronDown
          size={14}
          className={`text-midnight-500 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="border-t border-midnight-100 px-4 py-4 text-sm leading-relaxed text-midnight-600 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}

export function StatTile({ label, value, sublabel }) {
  return (
    <div className="rounded-2xl border border-midnight-100 bg-white p-6">
      <p className="eyebrow mb-3">{label}</p>
      <p className="font-display text-4xl text-midnight-950">{value}</p>
      {sublabel && <p className="mt-1 text-sm text-midnight-500">{sublabel}</p>}
    </div>
  );
}

export function Tag({ children, tone = 'default' }) {
  const tones = {
    default: 'bg-midnight-100 text-midnight-700',
    coral:   'bg-coral-100 text-coral-700',
    sage:    'bg-sage-100 text-sage-600',
    cream:   'bg-parchment-200 text-midnight-700',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] ${tones[tone]}`}>
      {children}
    </span>
  );
}
