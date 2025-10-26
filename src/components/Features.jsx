import React from 'react';
import { Mic, MessageSquare, Shield, Heart } from 'lucide-react';

const features = [
  {
    icon: Mic,
    title: 'Voice & Face Awareness',
    desc: 'Decode tone, pace, hesitation, and emotional tension from voice or video inputs in real time.',
  },
  {
    icon: MessageSquare,
    title: 'Intent-Aligned Rewrites',
    desc: 'Transform raw thoughts into messages that are polite, firm, supportive, or concise—true to your intent.',
  },
  {
    icon: Heart,
    title: 'Therapy & Coaching Ready',
    desc: 'Track emotional states, session-to-session progress, and moments of stress or avoidance.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    desc: 'On-device processing options and granular control over what gets shared or stored.',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative mx-auto w-full max-w-6xl px-6 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-semibold sm:text-3xl">Human Emotion Interface</h2>
        <p className="mt-2 text-white/70">Bridging feelings and language—so you get heard the way you mean to be.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {features.map((f, i) => (
          <div key={i} className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/[0.08]">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-violet-500/20 to-fuchsia-500/20 text-violet-300">
              <f.icon size={18} />
            </div>
            <h3 className="text-base font-medium">{f.title}</h3>
            <p className="mt-2 text-sm text-white/70">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
