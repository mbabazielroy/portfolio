import { ArrowRight } from 'lucide-react';
import type { MouseEvent } from 'react';

const TRACTION = [
  'Ontario Corp.',
  'MVP Shipped',
  'User Testing Live',
  '3 Incubator Applications',
];

export default function Hero() {
  const handleScroll = (
    e: MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="pt-24 min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-950 dark:to-emerald-950 -z-10" />
      <div className="absolute inset-0 bg-grid-slate opacity-30 dark:opacity-20 -z-10" />
      <div className="absolute inset-0 bg-glow opacity-80 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          {/* Left — text */}
          <div className="flex-1 space-y-8">
            {/* Founder label */}
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Founder &amp; Product Builder
            </span>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-stone-900 via-emerald-800 to-amber-700 dark:from-white dark:via-emerald-200 dark:to-amber-300">
                  Building safer
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-amber-600 dark:from-emerald-400 dark:to-amber-400">
                  mobile money.
                </span>
              </h1>
              <p className="text-lg text-stone-500 dark:text-slate-400 font-medium">
                Elroy Mbabazi &nbsp;·&nbsp; Founder, Mbabazi Technologies Inc.
              </p>
              <p className="text-xl text-stone-700 dark:text-slate-200 max-w-lg leading-relaxed">
                Millions of East Africans lose money to a single mistyped digit.
                I'm building <strong className="text-emerald-700 dark:text-emerald-400">Sendly</strong> to fix that — username-based transfers with recipient confirmation before any funds move.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#building"
                onClick={(e) => handleScroll(e, 'building')}
                className="group bg-gradient-to-r from-emerald-700 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold inline-flex items-center gap-2 hover:scale-105 transition-all duration-200 shadow-lg shadow-emerald-700/20"
              >
                See Sendly
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, 'contact')}
                className="group px-8 py-4 rounded-2xl font-semibold inline-flex items-center gap-2 bg-white/80 dark:bg-slate-900/70 hover:scale-105 transition-all duration-200 border border-stone-200 dark:border-slate-700 text-stone-800 dark:text-slate-100"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Traction bar */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
              {TRACTION.map((item, i) => (
                <span key={item} className="flex items-center gap-2 text-sm text-stone-500 dark:text-slate-400">
                  {i > 0 && <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-slate-600" />}
                  <span className="font-medium text-stone-700 dark:text-slate-300">{item}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right — photo */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-72 md:w-[420px] md:h-[420px]">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-amber-500/20 rounded-full blur-3xl" />
              <div className="absolute inset-6 bg-gradient-to-br from-amber-400/20 to-emerald-500/20 rounded-full blur-2xl" />
              <div className="absolute inset-10 bg-white/60 dark:bg-slate-900/60 rounded-full" />
              <img
                src="/elroyheadshot.jpg"
                alt="Elroy Mbabazi"
                className="relative w-full h-full object-cover rounded-full border-4 border-white dark:border-slate-800 shadow-2xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
