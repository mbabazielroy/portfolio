import { ArrowRight } from 'lucide-react';
import type { MouseEvent } from 'react';

const TRACTION = [
  'Ontario Corp.',
  'MVP Shipped',
  'User Testing Live',
  '3 Incubator Applications',
];

export default function Hero() {
  const handleScroll = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="pt-24 min-h-screen flex items-center relative overflow-hidden bg-white dark:bg-zinc-950">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-grid-slate opacity-[0.06] dark:opacity-[0.10] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          {/* Left — text */}
          <div className="flex-1 space-y-8">

            {/* Minimal founder chip */}
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-sendly" />
              Founder &amp; Product Builder
            </span>

            <div className="space-y-5">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight text-zinc-900 dark:text-zinc-50">
                Building safer<br />
                <span className="text-sendly">mobile money.</span>
              </h1>
              <p className="text-sm text-zinc-400 dark:text-zinc-500 font-medium tracking-widest uppercase">
                Elroy Mbabazi &nbsp;&middot;&nbsp; Founder, Mbabazi Technologies Inc.
              </p>
              <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-lg leading-relaxed">
                Millions of East Africans lose money to a single mistyped digit —
                instantly, and with no way back. I'm building{' '}
                <strong className="text-sendly font-semibold">Sendly</strong> to fix
                that: username-based transfers with recipient confirmation before any
                funds move.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#building"
                onClick={(e) => handleScroll(e, 'building')}
                className="group bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-8 py-3.5 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
              >
                See Sendly
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, 'contact')}
                className="group px-8 py-3.5 rounded-xl font-semibold inline-flex items-center gap-2 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Traction bar */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
              {TRACTION.map((item, i) => (
                <span key={item} className="flex items-center gap-2 text-sm">
                  {i > 0 && (
                    <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  )}
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">{item}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right — clean photo, no blobs */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-72 md:w-[400px] md:h-[400px]">
              <img
                src="/elroyheadshot.jpg"
                alt="Elroy Mbabazi"
                className="w-full h-full object-cover rounded-full border border-zinc-100 dark:border-zinc-800 shadow-lg"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
