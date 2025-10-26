import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(25,25,40,0.2),rgba(0,0,0,0.8))]" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
          <Rocket size={14} className="text-violet-300" />
          <span>AI Emotion-to-Text Translator</span>
        </div>
        <h1 className="text-balance bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-4xl font-semibold leading-tight text-transparent sm:text-5xl md:text-6xl">
          Speak your feelings. Send the right words.
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-white/70">
          Real-time emotion decoding for voice and text. Detect micro-emotions, confidence, stress, or sarcasm—and instantly rewrite your message to match your true intent.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#try" className="group rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90">
            Try the demo
          </a>
          <a href="#features" className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur-sm transition hover:border-white/30 hover:bg-white/5">
            How it works
          </a>
        </div>
      </div>
    </section>
  );
}
