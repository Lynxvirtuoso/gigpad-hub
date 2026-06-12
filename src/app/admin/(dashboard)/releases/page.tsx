import { GIGPAD_CONFIG } from '@/config/gigpad';
import { fetchLatestRelease, fetchGitHubReleases } from '@/utils/github';
import { Tag, Calendar, Database, RefreshCw, GitBranch } from 'lucide-react';

export default async function AdminReleases() {
  const latestRelease = await fetchLatestRelease();
  const releases = await fetchGitHubReleases();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
          Manage Releases
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Monitor current versions and manage GitHub Release configurations.
        </p>
      </div>

      {/* GitHub Sync Status Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-tr from-slate-900/50 to-blue-950/10 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 glow-blue">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
            Connected Repository
          </span>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <GitBranch className="w-4.5 h-4.5 text-blue-400" />
            Lynxvirtuoso/gigpad-release
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Status: Fully synced with GitHub API. Webhook notifications are active.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all cursor-pointer">
          <RefreshCw className="w-3.5 h-3.5" /> Force Sync Repository
        </button>
      </div>

      {/* Release details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 rounded-2xl bg-slate-900/30 border border-white/5 space-y-4">
          <h3 className="text-sm font-bold text-white">Version Release History</h3>
          
          <div className="space-y-4">
            {releases.length > 0 ? (
              releases.map((release, index) => (
                <div key={release.version} className="p-4 rounded-xl bg-slate-950/50 border border-white/5 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{release.version}</span>
                      {index === 0 && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold">
                          Latest stable
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {release.releaseDate}
                    </p>
                    <ul className="text-[10px] text-slate-500 pl-4 list-disc space-y-0.5 pt-1.5">
                      {release.parsedNotes.features.slice(0, 2).map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase">
                    Verified
                  </span>
                </div>
              ))
            ) : (
              <div className="p-8 text-center rounded-xl bg-slate-950/50 border border-white/5 text-xs text-slate-500">
                No releases found in Lynxvirtuoso/gigpad-release yet.
              </div>
            )}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/30 border border-white/5 space-y-4">
          <h3 className="text-sm font-bold text-white">GitHub Integration Info</h3>
          <div className="space-y-3.5 text-xs text-slate-400 leading-relaxed font-medium">
            <p>
              Releases are auto-populated from GitHub using the fetch utility. The current cache TTL is set to 5 minutes.
            </p>
            <div className="p-3.5 rounded-lg bg-slate-950/50 border border-white/5 flex gap-2 items-center">
              <Database className="w-4 h-4 text-violet-400" />
              <div>
                <span className="text-[10px] text-slate-500 font-bold block">ACTIVE VERSION</span>
                <span className="text-xs font-bold text-white">{latestRelease ? latestRelease.version : 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
