import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { MouseEvent } from 'react';

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
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950 -z-10" />
      <div className="absolute inset-0 bg-grid-slate opacity-30 dark:opacity-20 -z-10" />
      <div className="absolute inset-0 bg-glow opacity-80 -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-indigo-600 dark:from-white dark:via-slate-200 dark:to-indigo-300 leading-tight drop-shadow-sm">
                Hi, I'm Elroy Mbabazi
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400">
                Founder & product builder focused on trust, safety, and usability in everyday systems.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>Founder of Mbabazi Technologies Inc. (Ontario, Canada).</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>Creator of Sendly — mobile money for East Africa.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>Full-stack builder: web, mobile, and AI tooling.</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, 'contact')}
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold inline-flex items-center gap-2 hover:scale-105 transition-all duration-200 shadow-lg shadow-indigo-500/20"
              >
                Contact Me
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#building"
                onClick={(e) => handleScroll(e, 'building')}
                className="group px-8 py-4 rounded-2xl font-semibold inline-flex items-center gap-2 bg-white/80 dark:bg-slate-900/70 hover:scale-105 transition-all duration-200 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
              >
                What I'm Building
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="mailto:mbabazielroy@yahoo.com?subject=Resume%20Request"
                className="group px-8 py-4 rounded-2xl font-semibold inline-flex items-center gap-2 bg-white/70 dark:bg-slate-900/70 hover:scale-105 transition-all duration-200 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
              >
                Get Resume
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-72 md:w-[450px] md:h-[450px]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-indigo-500/30 rounded-full blur-3xl" />
              <div className="absolute inset-6 bg-gradient-to-br from-indigo-400/40 to-blue-500/30 rounded-full blur-2xl" />
              <div className="absolute inset-10 bg-white/70 dark:bg-slate-900/70 rounded-full" />
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
