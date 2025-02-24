import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="pt-20 min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 leading-tight">
                Hi, I'm Elroy Mbabazi
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400">
                Computer Science Senior at University of Washington
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="group bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-2xl font-medium inline-flex items-center gap-2 hover:scale-105 transition-all duration-200"
              >
                Contact Me
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#projects"
                className="group px-8 py-4 rounded-2xl font-medium inline-flex items-center gap-2 bg-white dark:bg-gray-800 hover:scale-105 transition-all duration-200 border border-gray-200 dark:border-gray-700"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-72 md:w-[450px] md:h-[450px]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full opacity-10 blur-3xl animate-pulse" />
              <div className="absolute inset-4 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full opacity-10 blur-2xl animate-pulse delay-100" />
              <img
                src="/elroyheadshot.jpg"
                alt="Elroy Mbabazi"
                className="relative w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
