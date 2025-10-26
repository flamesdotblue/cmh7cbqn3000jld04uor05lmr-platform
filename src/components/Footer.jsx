import React from 'react';

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-6 pb-16">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-white/60">© {new Date().getFullYear()} Human Emotion Interface. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <a href="#features" className="hover:text-white/90">Features</a>
            <a href="#try" className="hover:text-white/90">Demo</a>
            <a href="#" className="hover:text-white/90">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
