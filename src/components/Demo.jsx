import React, { useMemo, useState } from 'react';
import { Mic } from 'lucide-react';

function rewriteText(input, options) {
  let text = (input || '').trim();
  if (!text) return '';

  // Normalize aggressive shorthand
  const replacements = [
    [/\bASAP\b/gi, 'as soon as possible'],
    [/\bFYI\b/gi, 'for your information'],
    [/\bFWD\b/gi, 'forward'],
    [/\bPLS\b/gi, 'please'],
  ];
  for (const [pattern, rep] of replacements) text = text.replace(pattern, rep);

  // Remove excessive punctuation
  text = text.replace(/[!?]{2,}/g, (m) => (m.includes('!') ? '!' : '?'));

  // Tone shaping
  const prefaces = [];
  const closers = [];

  if (options.neutralizeSarcasm) {
    text = text
      .replace(/\b(sure|yeah|right)\b\s*,?\s*(whatever|fine)/gi, 'I have reservations, but I can proceed')
      .replace(/\b(obviously|clearly)\b/gi, '');
  }

  if (options.intent === 'polite_firm') {
    prefaces.push("Quick note:");
    text = text
      .replace(/\b(I need|We need)\b/gi, 'We need')
      .replace(/\b(you should|you must)\b/gi, 'please make sure to');
    closers.push('Thanks for prioritizing this.');
  }

  if (options.intent === 'supportive') {
    prefaces.push('I appreciate your effort.');
    text = text
      .replace(/\b(you messed up|you failed|this is wrong)\b/gi, 'there is an issue we can fix')
      .replace(/\b(blame|fault)\b/gi, 'cause');
    closers.push('Let me know how I can help.');
  }

  if (options.intent === 'concise') {
    // Remove fillers
    text = text
      .replace(/\b(kind of|sort of|just|really|basically|literally|actually)\b/gi, '')
      .replace(/\s{2,}/g, ' ');
  }

  if (options.intent === 'empathetic') {
    prefaces.push("I hear your concerns.");
    text = text
      .replace(/\b(calm down)\b/gi, 'take your time')
      .replace(/\b(why didn\'t you)\b/gi, 'could you share what happened when');
    closers.push('Your feelings make sense given the context.');
  }

  // Confidence / stress modulation
  if (options.confidence > 0.66) {
    text = text.replace(/\b(maybe|perhaps|I think|I guess)\b/gi, 'I recommend');
  } else if (options.confidence < 0.34) {
    text = text.replace(/\b(need|must|definitely)\b/gi, 'might');
  }

  if (options.stress > 0.66) {
    prefaces.unshift('Taking a breath.');
    text = text.replace(/!+/g, '!');
  }

  const prefix = prefaces.length ? prefaces.join(' ') + ' ' : '';
  const close = closers.length ? ' ' + closers.join(' ') : '';

  // Capitalize first letter and tidy spacing
  const final = (prefix + text + close).replace(/\s+/g, ' ').trim();
  return final.charAt(0).toUpperCase() + final.slice(1);
}

export default function Demo() {
  const [input, setInput] = useState(
    "This is NOT okay!! You should fix it ASAP."
  );
  const [intent, setIntent] = useState('polite_firm');
  const [neutralizeSarcasm, setNeutralizeSarcasm] = useState(true);
  const [confidence, setConfidence] = useState(0.7);
  const [stress, setStress] = useState(0.4);

  const output = useMemo(
    () => rewriteText(input, { intent, neutralizeSarcasm, confidence, stress }),
    [input, intent, neutralizeSarcasm, confidence, stress]
  );

  return (
    <section id="try" className="relative mx-auto w-full max-w-6xl px-6 py-16">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold sm:text-3xl">Try the Emotion-to-Text demo</h2>
        <p className="mt-2 text-white/70">Simulated processing—no audio recorded. Adjust intent, confidence, and stress to see how your message adapts.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <label className="mb-2 block text-sm text-white/70">Your raw thoughts</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste or type what you want to say…"
            className="h-56 w-full resize-none rounded-xl border border-white/10 bg-black/30 p-4 outline-none transition placeholder:text-white/40 focus:border-white/20"
          />

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs uppercase tracking-wider text-white/50">Intent</label>
              <select
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/20"
              >
                <option value="polite_firm">Polite but Firm</option>
                <option value="supportive">Supportive</option>
                <option value="empathetic">Empathetic</option>
                <option value="concise">Concise</option>
              </select>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-black/30 p-3">
              <div className="flex items-center gap-2 text-sm">
                <input
                  id="sarcasm"
                  type="checkbox"
                  checked={neutralizeSarcasm}
                  onChange={(e) => setNeutralizeSarcasm(e.target.checked)}
                  className="h-4 w-4"
                />
                <label htmlFor="sarcasm" className="text-white/80">Neutralize sarcasm</label>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/10"
                onClick={() => {
                  // simulate capturing tone (no real audio)
                  setStress((s) => Math.min(1, Math.max(0, s + (Math.random() * 0.4 - 0.2))));
                  setConfidence((c) => Math.min(1, Math.max(0, c + (Math.random() * 0.4 - 0.2))));
                }}
              >
                <Mic size={16} />
                Simulate voice tone
              </button>
            </div>

            <div className="col-span-full grid gap-4 sm:grid-cols-2">
              <div>
                <div className="mb-2 flex items-center justify-between text-xs text-white/60">
                  <span>Confidence</span>
                  <span>{Math.round(confidence * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={confidence}
                  onChange={(e) => setConfidence(parseFloat(e.target.value))}
                  className="range range-sm w-full"
                />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-xs text-white/60">
                  <span>Stress</span>
                  <span>{Math.round(stress * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={stress}
                  onChange={(e) => setStress(parseFloat(e.target.value))}
                  className="range range-sm w-full accent-fuchsia-400"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.06] p-4">
            <label className="mb-2 block text-sm text-white/70">Emotion-aware rewrite</label>
            <div className="min-h-[14rem] whitespace-pre-wrap rounded-xl border border-white/10 bg-black/30 p-4 text-white/90">
              {output || <span className="text-white/40">Your rewrite will appear here…</span>}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <button
              onClick={() => setIntent('polite_firm')}
              className={`rounded-lg border px-4 py-2 text-sm transition ${
                intent === 'polite_firm'
                  ? 'border-white/30 bg-white/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              Polite + Firm
            </button>
            <button
              onClick={() => setIntent('supportive')}
              className={`rounded-lg border px-4 py-2 text-sm transition ${
                intent === 'supportive'
                  ? 'border-white/30 bg-white/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              Supportive
            </button>
            <button
              onClick={() => setIntent('concise')}
              className={`rounded-lg border px-4 py-2 text-sm transition ${
                intent === 'concise'
                  ? 'border-white/30 bg-white/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              Concise
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
            This is a front-end prototype that demonstrates the interaction model. In production, audio/vision models would infer emotion and intent in real-time, while privacy settings let you keep sensitive data on-device.
          </div>
        </div>
      </div>
    </section>
  );
}
