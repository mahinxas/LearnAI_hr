import { useState, useRef, useEffect } from 'react';
import { Copy, Check, Save, MessageSquare, ArrowUp, Paperclip, X } from 'lucide-react';
import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/features/auth/AuthProvider';

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/` +
  `gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;

const buildContents = (msgs) =>
  msgs.map((m) => {
    const parts = [];
    if (m.fileData) {
      if (m.fileData.mimeType === 'text/plain') {
        parts.push({ text: `CV CONTENT:\n${m.fileData.text}` });
      } else {
        parts.push({ inlineData: { mimeType: m.fileData.mimeType, data: m.fileData.base64 } });
      }
    }
    parts.push({ text: m.analysisText || m.text });
    return { role: m.role === 'user' ? 'user' : 'model', parts };
  });

const renderInline = (text) =>
  text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i} className="font-semibold text-parchment-50">{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*'))
      return <em key={i} className="italic text-parchment-200">{part.slice(1, -1)}</em>;
    return part;
  });

const renderMarkdown = (text) => {
  const lines = text.split('\n');
  const out   = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) { i++; continue; }

    if (/^#{1,3} /.test(line)) {
      out.push(
        <p key={i} className="mt-3 mb-1 font-semibold text-parchment-50 text-[13px]">
          {renderInline(line.replace(/^#{1,3} /, ''))}
        </p>
      );
      i++; continue;
    }

    if (/^[-*]\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s/, ''));
        i++;
      }
      out.push(
        <ul key={`ul${i}`} className="my-2 space-y-1.5">
          {items.map((b, j) => (
            <li key={j} className="flex items-start gap-2">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-coral-400" />
              <span>{renderInline(b)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ''));
        i++;
      }
      out.push(
        <ol key={`ol${i}`} className="my-2 space-y-1.5">
          {items.map((b, j) => (
            <li key={j} className="flex items-start gap-2">
              <span className="shrink-0 font-mono text-[10px] text-coral-400 mt-[3px]">{j + 1}.</span>
              <span>{renderInline(b)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    out.push(
      <p key={i} className="leading-relaxed">{renderInline(line)}</p>
    );
    i++;
  }

  return <div className="flex flex-col gap-1.5 text-[13px]">{out}</div>;
};

export function ScoreCard({ score }) {
  return (
    <div className="rounded-2xl border border-midnight-100 bg-gradient-to-br from-parchment-100 to-parchment-50 p-6">
      <p className="eyebrow mb-3">Prompt readiness score</p>
      <div className="mb-3 flex items-baseline gap-2">
        <span className="font-display text-6xl text-midnight-950 tabular-nums">{score}</span>
        <span className="font-display text-2xl text-midnight-500">%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-midnight-100">
        <div
          className="h-full rounded-full bg-coral-500 transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-midnight-600">
        Higher score means the prompt is more structured, safer, and easier to verify.
        The score measures prompt quality — not candidate quality.
      </p>
    </div>
  );
}

export function FinalPrompt({ prompt }) {
  const [copied,       setCopied]       = useState(false);
  const [saved,        setSaved]        = useState(false);
  const { user } = useAuth();

  const [chatOpen,     setChatOpen]     = useState(false);
  const [messages,     setMessages]     = useState([]);
  const [input,        setInput]        = useState('');
  const [aiLoading,    setAiLoading]    = useState(false);
  const [aiError,      setAiError]      = useState('');
  const [attachedFile, setAttachedFile] = useState(null); // { name, mimeType, base64? | text? }
  const [fileLoading,  setFileLoading]  = useState(false);
  const [cvLoaded,     setCvLoaded]     = useState(false);
  const messagesEndRef                  = useRef(null);
  const messagesContainerRef            = useRef(null);
  const inputRef                        = useRef(null);
  const fileInputRef                    = useRef(null);

  const copy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const save = async () => {
    if (!user) {
      alert('Sign in to save prompts to your account.');
      return;
    }
    try {
      const ref = doc(collection(db, 'users', user.uid, 'prompts'));
      await setDoc(ref, { prompt, createdAt: serverTimestamp() });
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    } catch (e) {
      console.error(e);
      alert('Could not save. Check Firebase config.');
    }
  };

  const SYSTEM_PROMPT = `You are leAIrn AI, a specialist recruitment support assistant embedded inside the leAIrn HR platform. You help recruiters use AI consciously and safely in early-stage recruitment.

The recruiter has built the following structured HR prompt using the leAIrn Prompt Builder. It defines the task, job context, candidate information, evaluation criteria, output format, length, safety rules, and review instructions:

--- BUILT PROMPT START ---
${prompt}
--- BUILT PROMPT END ---

Your role is to:
1. Answer questions about the candidate based ONLY on information in the built prompt above or in any CV the recruiter attaches. Never invent facts not present in either.
2. Help the recruiter interpret AI output they received from running this prompt.
3. Suggest follow-up interview questions based on gaps found in the candidate information.
4. Flag missing information the recruiter should verify in the original CV.
5. Help rewrite or improve any of the 8 prompt elements if the recruiter asks.
6. Explain what any prompt element does and why it matters.

You MUST NOT:
- Make final hiring recommendations (hire / reject / rank candidates).
- Infer or mention age, gender, ethnicity, religion, health, family status, nationality, or political views.
- Add facts or claims not present in the built prompt or uploaded CV.
- Use subjective comparison language (e.g. "better fit", "stronger personality", "more suitable").
- Reproduce the entire built prompt back unless explicitly asked.

Tone: professional, concise, direct. You are a recruitment tool, not a life coach.
Keep every response under 200 words unless the recruiter explicitly asks for detail.
Respond in the same language the recruiter writes in. Default to English.

End EVERY response with exactly one of these tags on its own line — no exceptions:
[VERIFY IN CV] — if the recruiter must check something in the original document
[PROMPT GAP]   — if the built prompt is missing something that would improve output
[OUTPUT READY] — if the response is complete and the recruiter can act on it`;

  const callGemini = async (contents) => {
    const body = JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { temperature: 0.3, maxOutputTokens: 2048, topP: 0.8 },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH',  threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    });

    let res;
    for (let attempt = 0; attempt < 4; attempt++) {
      res = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      if (res.status !== 429 && res.status !== 503) break;
      if (attempt < 3) await new Promise((r) => setTimeout(r, 2 ** (attempt + 1) * 1000));
    }

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      const msg = errBody?.error?.message ?? `HTTP ${res.status}`;
      if (res.status === 429) {
        throw new Error('Rate limit reached — please wait a few seconds and try again.');
      }
      throw new Error(msg);
    }

    const data = await res.json();
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      'No response received. Try again.'
    );
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || aiLoading) return;
    if (!GEMINI_KEY) {
      setAiError('Add VITE_GEMINI_API_KEY to .env.local and restart the dev server.');
      return;
    }

    const userMsg = { role: 'user', text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setAiLoading(true);
    setAiError('');

    try {
      const reply = await callGemini(buildContents(nextMessages));
      setMessages((prev) => [...prev, { role: 'model', text: reply }]);
    } catch (err) {
      setAiError(err.message);
      console.error('Gemini error:', err);
    } finally {
      setAiLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    setFileLoading(true);
    const reader = new FileReader();

    if (file.type === 'text/plain') {
      reader.onload = (ev) => {
        setAttachedFile({ name: file.name, mimeType: 'text/plain', text: ev.target.result });
        setFileLoading(false);
      };
      reader.readAsText(file);
    } else {
      reader.onload = (ev) => {
        const base64 = ev.target.result.split(',')[1];
        setAttachedFile({ name: file.name, mimeType: file.type, base64 });
        setFileLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!attachedFile || aiLoading) return;

    const analyse = async () => {
      if (!GEMINI_KEY) {
        setAiError('Add VITE_GEMINI_API_KEY to .env.local and restart the dev server.');
        setAttachedFile(null);
        return;
      }

      const analysisText =
        "I'm attaching a candidate CV. Please:\n" +
        "1. Identify job-relevant skills and experience that match the role defined in the built prompt.\n" +
        "2. Flag important gaps between this CV and the role requirements.\n" +
        "3. Suggest 3 targeted follow-up interview questions based on those gaps.\n\n" +
        "Analyse only job-relevant information. Do not comment on personal characteristics.";

      const userMsg = {
        role: 'user',
        text: `📎 ${attachedFile.name}`,
        fileData: attachedFile,
        analysisText,
      };

      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      setAttachedFile(null);
      setAiLoading(true);
      setAiError('');

      try {
        const reply = await callGemini(buildContents(nextMessages));
        setMessages((prev) => [...prev, { role: 'model', text: reply }]);
        setCvLoaded(true);
      } catch (err) {
        setAiError(err.message);
        console.error('Gemini CV analysis error:', err);
      } finally {
        setAiLoading(false);
      }
    };

    analyse();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attachedFile]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }, [messages, aiLoading]);

  useEffect(() => {
    if (chatOpen) {
      setTimeout(() => inputRef.current?.focus(), 320);
    } else {
      setMessages([]);
      setInput('');
      setAiError('');
      setAttachedFile(null);
      setCvLoaded(false);
    }
  }, [chatOpen]);

  return (
    <div className="overflow-hidden rounded-2xl border border-midnight-100 bg-midnight-950 text-parchment-100 shadow-soft">
      <div className="flex items-center justify-between border-b border-midnight-700 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-coral-200">
            Step 09 · Final prompt
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="mx-1.5 h-3 w-px bg-midnight-600" />
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5
              py-1.5 text-xs text-parchment-200 transition-colors hover:bg-midnight-800"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={save}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5
              py-1.5 text-xs text-parchment-200 transition-colors hover:bg-midnight-800"
          >
            {saved ? <Check size={12} /> : <Save size={12} />}
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      <pre className="scrollbar-thin max-h-[320px] overflow-auto whitespace-pre-wrap px-5 py-4 font-mono text-[12.5px] leading-relaxed text-parchment-100">
        {prompt}
      </pre>

      {/* Prominent AI Chat CTA — shown when chat is closed */}
      {!chatOpen && (
        <div className="border-t border-midnight-700 px-5 py-4">
          <button
            onClick={() => setChatOpen(true)}
            className="group flex w-full items-center justify-between gap-4 rounded-xl border border-midnight-600 bg-midnight-800/60 px-4 py-3.5 text-left transition-all hover:border-coral-500/50 hover:bg-midnight-800"
          >
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-coral-500/20">
                <MessageSquare size={15} className="text-coral-400" />
                <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral-400 opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-coral-500" />
                </span>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-parchment-100">
                  Chat with leAIrn AI
                </p>
                <p className="text-[11px] text-midnight-400">
                  Ask about the candidate · attach a CV · refine the prompt
                </p>
              </div>
            </div>
            <span className="shrink-0 rounded-md bg-coral-500 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white transition-all group-hover:bg-coral-400">
              Open
            </span>
          </button>
        </div>
      )}

      {/* Close chat button — shown when chat is open */}
      {chatOpen && (
        <div className="border-t border-midnight-700 px-5 py-2">
          <button
            onClick={() => setChatOpen(false)}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium bg-coral-500 text-parchment-50 transition-all hover:bg-coral-400"
          >
            <MessageSquare size={12} />
            Close AI chat
          </button>
        </div>
      )}

      {/* ── AI Chat Panel ── */}
      <div
        style={{
          maxHeight: chatOpen ? '700px' : '0px',
          opacity:   chatOpen ? 1 : 0,
          overflow:  'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
        }}
      >
        <div className="border-t border-midnight-700">
          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sage-500" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-parchment-300">
                leAIrn AI · Gemini 2.5 Flash
              </span>
            </div>
            <button
              onClick={() => { setMessages([]); setInput(''); setAiError(''); setCvLoaded(false); }}
              className="font-mono text-[10px] uppercase tracking-[0.14em] text-midnight-400 transition-colors hover:text-parchment-200"
            >
              Clear chat
            </button>
          </div>

          <div className="mx-5 mb-3 flex items-center justify-between rounded-lg px-3 py-2"
            style={{ background: 'rgba(253,250,243,0.06)' }}>
            <p className="font-mono text-[10px] text-midnight-300">
              ✦ Your built prompt is loaded — AI sees your current Steps 1–8
            </p>
            {cvLoaded && (
              <span className="ml-3 shrink-0 rounded-full bg-sage-500/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-sage-400">
                CV in context
              </span>
            )}
          </div>

          {!GEMINI_KEY && (
            <div className="mx-5 mb-3 rounded-lg border border-coral-500/30 bg-coral-500/10 px-3 py-2">
              <p className="text-xs text-coral-300">
                Add <code className="font-mono">VITE_GEMINI_API_KEY</code> to{' '}
                <code className="font-mono">.env.local</code> and restart the server to enable AI chat.
              </p>
            </div>
          )}

          <div
            ref={messagesContainerRef}
            className="scrollbar-thin flex flex-col gap-3 overflow-y-auto px-5 py-2"
            style={{ maxHeight: '256px' }}
          >
            {messages.length === 0 && (
              <p className="py-6 text-center font-mono text-[11px] text-midnight-400">
                Your built prompt is loaded.
                <br />
                Ask a question or attach a CV with{' '}
                <span className="inline-flex items-center gap-0.5 rounded border border-midnight-600 px-1 py-0.5 text-midnight-300">
                  <Paperclip size={9} /> +
                </span>{' '}
                for instant fit analysis.
              </p>
            )}

            {messages.map((m, i) => {
              const isUser = m.role === 'user';
              const TAG_RE = /\[(VERIFY IN CV|PROMPT GAP|OUTPUT READY)\]\s*$/;
              const tagMatch = !isUser ? m.text.match(TAG_RE) : null;
              const tag  = tagMatch?.[1] ?? null;
              const body = tag
                ? m.text.slice(0, m.text.lastIndexOf('[' + tag + ']')).trimEnd()
                : m.text;

              const tagStyle = {
                'VERIFY IN CV': 'bg-parchment-200/10 text-parchment-300',
                'PROMPT GAP':   'bg-coral-500/20 text-coral-300',
                'OUTPUT READY': 'bg-sage-500/20 text-sage-400',
              }[tag] ?? '';

              return (
                <div key={i} className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
                  {isUser && m.fileData && (
                    <span className="flex items-center gap-1.5 rounded-full border border-midnight-600 bg-midnight-800 px-2.5 py-1 font-mono text-[10px] text-midnight-300">
                      <Paperclip size={9} />
                      {m.fileData.name}
                    </span>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                      isUser
                        ? 'rounded-tr-sm text-parchment-50'
                        : 'rounded-tl-sm bg-midnight-800 text-parchment-100'
                    }`}
                    style={isUser ? { background: 'rgba(240,73,36,0.18)' } : {}}
                  >
                    {isUser ? body : renderMarkdown(body)}
                  </div>
                  {tag && (
                    <span className={`rounded-full px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] ${tagStyle}`}>
                      {tag}
                    </span>
                  )}
                </div>
              );
            })}

            {aiLoading && (
              <div className="flex items-start">
                <div className="rounded-2xl rounded-tl-sm bg-midnight-800 px-4 py-3">
                  <span className="flex items-center gap-1">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-coral-400"
                        style={{ animation: `lairnBounce 1.2s ease-in-out ${d * 0.2}s infinite` }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            )}

            {aiError && (
              <div className="rounded-xl border border-coral-500/30 bg-coral-500/10 px-4 py-3 text-xs text-coral-300">
                {aiError}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {(fileLoading || attachedFile) && (
            <div className="mx-5 mb-2 flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full border border-midnight-600 bg-midnight-800 px-2.5 py-1 font-mono text-[10px] text-parchment-300">
                <Paperclip size={9} />
                {fileLoading ? 'Reading file…' : attachedFile?.name}
              </span>
              {attachedFile && !aiLoading && (
                <button
                  onClick={() => setAttachedFile(null)}
                  className="text-midnight-500 transition-colors hover:text-parchment-200"
                  aria-label="Remove attachment"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          )}

          <div className="flex items-end gap-2 border-t border-midnight-700 px-5 py-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={aiLoading || fileLoading || !!attachedFile || !GEMINI_KEY}
              aria-label="Attach CV"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-midnight-600 text-midnight-300 transition-all hover:border-midnight-400 hover:text-parchment-200 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Paperclip size={15} />
            </button>
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about the candidate, role, or output…"
              disabled={aiLoading || !GEMINI_KEY}
              className="flex-1 resize-none rounded-xl border border-midnight-600 bg-midnight-800 px-4 py-2.5 text-[13px] text-parchment-100 placeholder:text-midnight-400 focus:border-midnight-400 focus:outline-none disabled:opacity-40"
              style={{ minHeight: '40px', maxHeight: '80px', fontSize: '16px' }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || aiLoading || !GEMINI_KEY}
              aria-label="Send message"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-coral-500 text-white transition-all hover:bg-coral-400 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExplanationGrid({ format, length }) {
  const items = [
    ['Task',                  'Defines what AI should do.'],
    ['Job context',           'Adapts the output to the role.'],
    ['Candidate information', 'Gives source material.'],
    ['Criteria',              'Controls what AI should focus on.'],
    ['Format',                `Controls readability. Current: ${format}.`],
    ['Length',                `Controls depth. Current: ${length}.`],
    ['Safety rules',          'Reduce risk.'],
    ['Review instruction',    'Supports human verification.'],
  ];
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map(([title, text]) => (
        <div key={title} className="rounded-xl border border-midnight-100 bg-parchment-50/50 p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-midnight-500">{title}</p>
          <p className="mt-1 text-sm text-midnight-700">{text}</p>
        </div>
      ))}
    </div>
  );
}

export function LogicMap({ state }) {
  const items = [
    {
      title: 'Task selection',
      selected: state.task,
      why: 'It defines the recruitment activity.',
      output: 'The response focuses on one support task.',
    },
    {
      title: 'Job context',
      selected: state.jobTitle || 'not provided',
      why: 'It tells AI which role requirements matter.',
      output: 'The summary becomes role-specific.',
    },
    {
      title: 'Candidate information',
      selected: state.candidateInfo?.trim() ? 'anonymized CV text provided' : 'not provided',
      why: 'It gives the source material.',
      output: 'AI can extract evidence only from supplied text.',
    },
    {
      title: 'Criteria',
      selected: `${state.criteria.length} criteria selected`,
      why: 'Directs attention to job-related evidence.',
      output: 'Easier to compare and audit.',
    },
    {
      title: 'Format & length',
      selected: `${state.format} · ${state.length}`,
      why: 'Shapes how the recruiter reads the output.',
      output: 'Easier to scan, compare, share.',
    },
    {
      title: 'Safety & review',
      selected: `${state.safety.length} safety, ${state.review.length} review`,
      why: 'Keeps AI in a support role.',
      output: 'Framed as a draft for recruiter review.',
    },
  ];

  return (
    <div className="grid gap-2">
      {items.map((item) => (
        <div key={item.title} className="rounded-xl border border-midnight-100 bg-white p-4">
          <h4 className="font-display text-base text-midnight-950">{item.title}</h4>
          <div className="mt-2 grid gap-1 text-xs text-midnight-600">
            <p><span className="text-midnight-500">Selected:</span> {item.selected}</p>
            <p><span className="text-midnight-500">Why:</span> {item.why}</p>
            <p><span className="text-midnight-500">Output:</span> {item.output}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChecklistMini({ checks }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {checks.map((c) => (
        <li
          key={c.label}
          className={`flex items-start gap-2 rounded-xl border p-3 text-sm transition-colors ${
            c.passed
              ? 'border-sage-300 bg-sage-50 text-sage-600'
              : 'border-midnight-100 bg-parchment-50/50 text-midnight-600'
          }`}
        >
          <span
            className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${
              c.passed ? 'bg-sage-500 text-white' : 'border border-midnight-300'
            }`}
          >
            {c.passed && <Check size={10} />}
          </span>
          <span>{c.label}</span>
        </li>
      ))}
    </ul>
  );
}
