import Link from 'next/link';
import { Calendar, Tag, Check, Award, Flame, Bug, ArrowLeft, Download } from 'lucide-react';
import { fetchGitHubReleases } from '@/utils/github';

export default async function Changelog() {
  const releases = await fetchGitHubReleases();

  return (
    <div className="relative isolate bg-gray-950 min-h-screen py-16 sm:py-24">
      {/* Background radial gradient */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%-10rem)] aspect-1155/678 w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-violet-600/20 to-indigo-600/20 opacity-30 sm:w-[72rem]"></div>
      </div>

      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        {/* Heading */}
        <div className="max-w-2xl mb-16">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Release History & Changelog
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Follow our progress as we build the ultimate digital songbook. Check here for bug fixes, new features, and layout enhancements.
          </p>
        </div>

        {/* Timeline Layout */}
        {releases.length > 0 ? (
          <div className="relative border-l border-white/10 pl-6 sm:pl-8 space-y-12 sm:space-y-16">
            {releases.map((entry, index) => {
              const isLatest = index === 0;
              const hasStructuredNotes = 
                entry.parsedNotes.features.length > 0 ||
                entry.parsedNotes.improvements.length > 0 ||
                entry.parsedNotes.bugFixes.length > 0;

              return (
                <div key={entry.version} className="relative group">
                  {/* Timeline Bullet Node */}
                  <span className={`absolute -left-[31px] sm:-left-[39px] top-1.5 flex items-center justify-center w-6 h-6 rounded-full border ${
                    isLatest 
                      ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/20' 
                      : 'bg-slate-900 border-white/10 text-slate-400'
                  }`}>
                    {isLatest ? <Flame className="w-3.5 h-3.5" /> : <Tag className="w-3 h-3" />}
                  </span>

                  {/* Entry header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-white tracking-tight">
                        Version {entry.version}
                      </h2>
                      {isLatest && (
                        <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-semibold">
                          Latest Release
                        </span>
                      )}
                      {entry.prerelease && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-semibold">
                          Beta
                        </span>
                      )}
                    </div>
                    
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium font-sans">
                      <Calendar className="w-3.5 h-3.5" />
                      {entry.releaseDate}
                    </span>
                  </div>

                  {/* Detail block */}
                  <div className="p-6 sm:p-8 rounded-2xl glass-card border border-white/5 space-y-6">
                    {!hasStructuredNotes ? (
                      <div className="text-xs text-slate-400 leading-relaxed whitespace-pre-wrap font-mono">
                        {entry.releaseNotes}
                      </div>
                    ) : (
                      <>
                        {/* New Features */}
                        {entry.parsedNotes.features.length > 0 && (
                          <div>
                            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-1.5">
                              <Award className="w-4 h-4 text-emerald-400" />
                              New Features
                            </h3>
                            <ul className="space-y-2 text-xs text-slate-400 pl-5 list-disc leading-relaxed">
                              {entry.parsedNotes.features.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Improvements */}
                        {entry.parsedNotes.improvements.length > 0 && (
                          <div>
                            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-1.5">
                              <Check className="w-4 h-4 text-blue-400" />
                              Improvements
                            </h3>
                            <ul className="space-y-2 text-xs text-slate-400 pl-5 list-disc leading-relaxed">
                              {entry.parsedNotes.improvements.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Bug Fixes */}
                        {entry.parsedNotes.bugFixes.length > 0 && (
                          <div>
                            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-1.5">
                              <Bug className="w-4 h-4 text-red-400" />
                              Bug Fixes
                            </h3>
                            <ul className="space-y-2 text-xs text-slate-400 pl-5 list-disc leading-relaxed">
                              {entry.parsedNotes.bugFixes.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">
                        Package Size: {entry.size}
                      </span>
                      <a
                        href={entry.apkUrl}
                        className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" /> Download APK
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900/10 border border-white/5 flex flex-col items-center justify-center space-y-3">
            <Tag className="w-8 h-8 text-slate-500 animate-pulse" />
            <h3 className="text-sm font-bold text-white">No Release Changelogs Available Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              When releases are published on GitHub, the complete version history and changelogs will be displayed here automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
