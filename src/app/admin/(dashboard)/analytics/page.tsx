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

      <div className="p-12 text-center rounded-2xl bg-slate-900/10 border border-white/5 flex flex-col items-center justify-center space-y-3">
        <BarChart3 className="w-8 h-8 text-slate-500 animate-pulse" />
        <h3 className="text-sm font-bold text-white">No Analytics Data Available Yet</h3>
        <p className="text-xs text-slate-400 max-w-sm leading-relaxed animate-pulse">
          Analytics will appear once data is collected.
        </p>
      </div>
    </div>
  );
}
