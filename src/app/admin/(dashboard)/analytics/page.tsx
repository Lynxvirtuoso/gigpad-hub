import { BarChart3, TrendingUp, Users, ArrowUpRight, Globe, ShieldAlert } from 'lucide-react';

export default function AdminAnalytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
          Visitor Analytics
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Monitor website traffic, page views, and download channel conversion telemetry.
        </p>
      </div>

      <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 text-xs text-blue-400 flex gap-3 items-start leading-relaxed">
        <ShieldAlert className="w-5 h-5 flex-shrink-0" />
        <p>
          <strong>Privacy Compliance Note:</strong> GigPad is strictly privacy-focused. No personal identifiable information (PII), cookies, or client device tracking scripts are active. Analytics are derived exclusively from server request telemetry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Visitors card */}
        <div className="p-6 rounded-2xl bg-slate-900/30 border border-white/5 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-slate-400">Unique Visitors</h3>
            <span className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-white">2,840</p>
            <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +24% vs last month
            </p>
          </div>
        </div>

        {/* Page views */}
        <div className="p-6 rounded-2xl bg-slate-900/30 border border-white/5 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-slate-400">Page Views</h3>
            <span className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
              <BarChart3 className="w-4 h-4" />
            </span>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-white">12,480</p>
            <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +18% vs last month
            </p>
          </div>
        </div>

        {/* Regional Conversion */}
        <div className="p-6 rounded-2xl bg-slate-900/30 border border-white/5 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-slate-400">Conversion Rate</h3>
            <span className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Globe className="w-4 h-4" />
            </span>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-white">38.4%</p>
            <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +2.1% conversion lift
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
