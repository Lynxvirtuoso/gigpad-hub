import Link from 'next/link';
import { Download, ArrowRight, Activity, Calendar, FileText, CheckCircle2, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { GIGPAD_CONFIG } from '@/config/gigpad';
import ScreenshotCarousel from '@/components/ScreenshotCarousel';
import FeatureIcon from '@/components/FeatureIcon';
import { fetchLatestRelease } from '@/utils/github';

export default async function Home() {
  const latestRelease = await fetchLatestRelease();

  return (
    <div className="relative isolate overflow-hidden bg-gray-950">
      {/* Background glow effects */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div 
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-violet-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative px-6 pt-12 pb-20 sm:pt-20 sm:pb-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {latestRelease && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              Latest Version: {latestRelease.version} Available Now
            </div>
          )}

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            {GIGPAD_CONFIG.tagline}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            {GIGPAD_CONFIG.description}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {latestRelease ? (
              <a
                href={latestRelease.apkUrl}
                className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-500 hover:to-violet-500 shadow-xl shadow-blue-500/25 transition-all group animate-pulse"
              >
                <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Download Latest APK
              </a>
            ) : (
              <span className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 text-sm font-semibold rounded-xl bg-slate-900 text-slate-500 border border-white/5 cursor-not-allowed">
                <Download className="w-4 h-4" />
                No APK Release Available
              </span>
            )}
            <Link
              href="/changelog"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 text-sm font-semibold rounded-xl bg-slate-900 text-slate-200 border border-white/10 hover:bg-slate-800 hover:border-white/20 transition-all"
            >
              View Changelog
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Screenshot / Showcase Section */}
      <section className="py-8 bg-slate-950/40 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Inside the GigPad Application
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Interactive interface walk-throughs designed for performing musicians.
            </p>
          </div>
          <ScreenshotCarousel />
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 sm:py-32 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              All the Tools You Need to Perform
            </h2>
            <p className="mt-4 text-base text-slate-400">
              GigPad replaces paper binders with a fast, customizable digital experience optimized for stage use.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GIGPAD_CONFIG.features.map((feature) => (
              <div
                key={feature.id}
                className="group relative flex flex-col p-6 rounded-2xl glass-card transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/30 hover:bg-slate-900/50"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/10 to-violet-600/10 text-blue-400 border border-blue-500/20 mb-4 group-hover:from-blue-600/20 group-hover:to-violet-600/20 transition-colors">
                  <FeatureIcon name={feature.iconName} className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section (With clean placeholders and integration hints) */}
      <section className="py-16 sm:py-24 bg-slate-950/60 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Project Performance & Health
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Real-time project metrics. Integration placeholders are structured below for connection to active telemetry.
            </p>
          </div>

          {GIGPAD_CONFIG.stats && GIGPAD_CONFIG.stats.length > 0 ? (
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4">
              {GIGPAD_CONFIG.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
                >
                  <span className="text-3xl font-extrabold text-blue-400 tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-sm font-semibold text-white mt-1">
                    {stat.label}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1">
                    {stat.description}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-xl text-center p-8 rounded-2xl bg-white/5 border border-white/5">
              <p className="text-sm text-slate-400 font-semibold">No analytics data available yet</p>
              <p className="text-xs text-slate-500 mt-1">Analytics will appear once data is collected</p>
            </div>
          )}
          <div className="mt-8 text-center text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 border border-white/5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              Developer Note: Ready for integration with GitHub API or App Center SDK for automated download counts.
            </span>
          </div>
        </div>
      </section>

      {/* Latest Release Card Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {latestRelease ? (
            <div className="rounded-3xl glass-card overflow-hidden relative p-8 sm:p-12 glow-purple">
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl -z-10"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
                <div>
                  <span className="px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-wider">
                    Latest Stable Release
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-2">
                    GigPad {latestRelease.version}
                  </h3>
                </div>
                <div className="flex flex-col text-slate-400 text-xs md:text-right gap-1 font-medium">
                  <span className="flex items-center gap-1.5 md:justify-end">
                    <Calendar className="w-3.5 h-3.5" />
                    Released: {latestRelease.releaseDate}
                  </span>
                  <span>Size: {latestRelease.size}</span>
                </div>
              </div>

              {latestRelease.parsedNotes.features.length === 0 &&
              latestRelease.parsedNotes.improvements.length === 0 &&
              latestRelease.parsedNotes.bugFixes.length === 0 ? (
                <div className="text-xs text-slate-400 leading-relaxed whitespace-pre-wrap bg-slate-950/50 p-6 rounded-xl border border-white/5 max-h-60 overflow-y-auto mb-8 font-mono">
                  {latestRelease.releaseNotes}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      New Features & Enhancements
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-400 pl-6 list-disc">
                      {latestRelease.parsedNotes.features.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                      {latestRelease.parsedNotes.improvements.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-400" />
                      Bug Fixes
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-400 pl-6 list-disc">
                      {latestRelease.parsedNotes.bugFixes.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={latestRelease.apkUrl}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 text-xs font-semibold rounded-lg bg-white text-gray-950 hover:bg-slate-100 transition-colors shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  Download APK
                </a>
                <Link
                  href="/changelog"
                  className="text-xs text-slate-300 hover:text-white font-medium flex items-center gap-1"
                >
                  View full version history
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl glass-card overflow-hidden relative p-8 sm:p-12 text-center bg-slate-900/10 border border-white/5 space-y-3">
              <Sparkles className="w-8 h-8 text-slate-500 mx-auto animate-pulse" />
              <h3 className="text-sm font-bold text-white">No Releases Available Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                We are preparing our production build. Check back soon for the official release notes and download packages.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Decorative background glow bottom */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div 
          className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-violet-600 to-indigo-600 opacity-10 sm:left-[calc(50%+36rem)] sm:w-[72rem]"
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>
    </div>
  );
}
