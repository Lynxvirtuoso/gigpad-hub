import { GIGPAD_CONFIG } from '@/config/gigpad';
import { fetchLatestRelease } from '@/utils/github';
import { 
  Activity, 
  ArrowUpRight, 
  MessageSquare, 
  Download, 
  Tag, 
  Clock 
} from 'lucide-react';

export default async function DashboardOverview() {
  const latestRelease = await fetchLatestRelease();

  // Mock telemetry metrics
  const stats = [
    {
      name: 'Total Downloads',
      value: GIGPAD_CONFIG.stats.find(s => s.label.includes('Downloads'))?.value || '4.8k+',
      change: '+12% this week',
      icon: Download,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    },
    {
      name: 'Latest App Version',
      value: latestRelease.version || GIGPAD_CONFIG.release.version,
      change: `Released ${latestRelease.releaseDate || GIGPAD_CONFIG.release.releaseDate}`,
      icon: Tag,
      color: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
    },
    {
      name: 'Feedback Received',
      value: '182',
      change: '+14 new today',
      icon: MessageSquare,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      name: 'API Server Status',
      value: 'Healthy',
      change: '100% Uptime (30d)',
      icon: Activity,
      color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Welcome to the GigPad Hub administrator area. Monitor website health and active stats telemetry.
        </p>
      </div>

      {/* Grid of Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-6 rounded-2xl glass-card border border-white/5 space-y-4">
              <div className="flex justify-between items-start">
                <div className={`p-2.5 rounded-xl border ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-500 flex items-center gap-0.5">
                  Live <Clock className="w-3 h-3 text-emerald-500 animate-pulse" />
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">{stat.name}</p>
                <p className="text-2xl font-extrabold text-white mt-1 tracking-tight">{stat.value}</p>
              </div>
              <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Mock Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/30 border border-white/5 space-y-4">
          <h2 className="text-base font-bold text-white">System Logs</h2>
          <div className="space-y-3 font-mono text-[10px] leading-relaxed text-slate-400">
            <div className="flex gap-2.5 items-start p-2 rounded bg-slate-950/50">
              <span className="text-slate-500">[2026-06-11 17:15:32]</span>
              <span className="text-emerald-400">[INFO]</span>
              <span>Successfully fetched latest releases from GitHub API.</span>
            </div>
            <div className="flex gap-2.5 items-start p-2 rounded bg-slate-950/50">
              <span className="text-slate-500">[2026-06-11 16:48:10]</span>
              <span className="text-blue-400">[AUTH]</span>
              <span>Admin session verification requested for user lynxvirtuoso@admin.com.</span>
            </div>
            <div className="flex gap-2.5 items-start p-2 rounded bg-slate-950/50">
              <span className="text-slate-500">[2026-06-11 14:20:05]</span>
              <span className="text-yellow-400">[WARN]</span>
              <span>High rate of downloads recorded from client IP range 192.168.1.*.</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/30 border border-white/5 space-y-4">
          <h2 className="text-base font-bold text-white">Quick Tasks</h2>
          <div className="space-y-2.5">
            <button className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 text-xs font-semibold text-slate-300 hover:text-white transition-all">
              Verify GitHub Release Hook
            </button>
            <button className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/5 hover:border-violet-500/30 text-xs font-semibold text-slate-300 hover:text-white transition-all">
              Purge Vercel Static Cache
            </button>
            <button className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 text-xs font-semibold text-slate-300 hover:text-white transition-all">
              Backup Feedback Responses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
