import Link from 'next/link';
import { Award, Music, ShieldAlert, Heart, ArrowLeft, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { GIGPAD_CONFIG } from '@/config/gigpad';

export default function About() {
  const { story, vision, contributors } = GIGPAD_CONFIG.about;

  return (
    <div className="relative isolate bg-gray-950 min-h-screen py-16 sm:py-24">
      {/* Background glow */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%-10rem)] aspect-1155/678 w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-violet-600/10 to-indigo-600/10 opacity-30 sm:w-[72rem]"></div>
      </div>

      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        {/* Heading */}
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            About GigPad
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            The story behind the digital songbook app made for performing musicians.
          </p>
        </div>

        {/* Story & Vision Sections */}
        <div className="space-y-12">
          {/* Story Card */}
          <div className="rounded-2xl glass-card p-6 sm:p-8 border border-white/5 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Music className="w-5 h-5 text-blue-400" />
              Our Story
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              {story}
            </p>
          </div>

          {/* Vision Card */}
          <div className="rounded-2xl glass-card p-6 sm:p-8 border border-white/5 glow-purple space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-violet-400" />
              Project Vision
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              {vision}
            </p>
          </div>

          {/* Design Values / Tenets */}
          <div>
            <h2 className="text-lg font-bold text-white mb-6">Core Design Tenets</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-slate-900/50 border border-white/5 space-y-2">
                <h3 className="text-xs font-bold text-white">Privacy Focused</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  No tracking scripts, ads, or cookies. Your database is 100% yours, stored locally on your own storage disk.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/50 border border-white/5 space-y-2">
                <h3 className="text-xs font-bold text-white">Stage Ready</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  High-contrast typography, screen wake limits, auto-scroll sliders, and dark-mode designs built for stage stands.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/50 border border-white/5 space-y-2">
                <h3 className="text-xs font-bold text-white">100% Free</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  All features remain free for worship teams, street performers, and hobbyists without subscription locks.
                </p>
              </div>
            </div>
          </div>

          {/* Contributors Section (Structured with placeholders, no fake contributors) */}
          <div className="border-t border-white/5 pt-12">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-emerald-400" />
              Contributors & Core Team
            </h2>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Meet the maintainers and community contributors who keep the GigPad project alive and growing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contributors.map((contrib, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/30 border border-white/5"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-slate-300 font-bold text-xs uppercase">
                    {contrib.name.substring(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">{contrib.name}</h3>
                    <p className="text-[10px] text-slate-500 font-medium">{contrib.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl bg-slate-950 border border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-yellow-500" />
                Want to help contribute code or translate songs?
              </span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                Join the GitHub project <CheckCircle2 className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
