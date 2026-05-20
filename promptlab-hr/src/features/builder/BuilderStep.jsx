import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function BuilderStep({ number, title, lesson, children }) {
  const [showLesson, setShowLesson] = useState(false);

  return (
    <article className="rounded-2xl border border-midnight-100 bg-white p-6 shadow-soft transition-shadow hover:shadow-lift">
      <header className="mb-5 flex items-start gap-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-midnight-950 font-mono text-sm text-parchment-50">
          {number}
        </span>
        <div className="flex-1">
          <h3 className="font-display text-xl text-midnight-950">{title}</h3>
          {lesson?.simple && (
            <p className="mt-1 text-sm text-midnight-600">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-coral-500">
                Rule
              </span>{' '}
              {lesson.simple}
            </p>
          )}
        </div>
      </header>

      <div>{children}</div>

      {lesson && (
        <>
          <div className="mt-5 rounded-xl border border-dashed border-midnight-200 bg-parchment-50/50 p-4 text-sm text-midnight-700">
            {lesson.visible}
          </div>
          <button
            onClick={() => setShowLesson((s) => !s)}
            className="mt-3 flex items-center gap-2 text-sm font-medium text-midnight-600 hover:text-midnight-950"
          >
            <ChevronDown
              size={14}
              className={`transition-transform ${showLesson ? 'rotate-180' : ''}`}
            />
            {showLesson ? 'Hide lesson' : 'Reveal full lesson'}
          </button>
          {showLesson && (
            <div className="mt-3 space-y-2 rounded-xl bg-midnight-950 p-5 text-sm text-parchment-100 animate-fade-in">
              <p>{lesson.hidden}</p>
              <p>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-coral-200">Example</span>
                <br />
                <span className="text-parchment-200">{lesson.example}</span>
              </p>
              <p>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-coral-200">Impact on AI output</span>
                <br />
                <span className="text-parchment-200">{lesson.impact}</span>
              </p>
            </div>
          )}
        </>
      )}
    </article>
  );
}

export function ChipGroup({ items, selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const active = selected.includes(item);
        return (
          <button
            key={item}
            type="button"
            onClick={() => onToggle(item)}
            className={`chip ${active ? 'chip-active' : ''}`}
          >
            {active && <span className="text-coral-200">✓</span>}
            {item}
          </button>
        );
      })}
    </div>
  );
}

export function SegmentGroup({ items, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={`rounded-full border px-4 py-2 text-sm transition-all ${
            value === item
              ? 'border-midnight-950 bg-midnight-950 text-parchment-50'
              : 'border-midnight-200 bg-white text-midnight-700 hover:border-midnight-950'
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export function FieldLabel({ children }) {
  return (
    <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-midnight-500">
      {children}
    </label>
  );
}
