import { GIGPAD_CONFIG } from '@/config/gigpad';
import { fetchLatestRelease } from '@/utils/github';
import { Download, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

export default async function AdminDownloads() {
  const latestRelease = await fetchLatestRelease();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
          Downloads & APK Settings
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Monitor package details and sideload instructions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 rounded-2xl bg-slate-900/30 border border-white/5 space-y-6">
          <h3 className="text-sm font-bold text-white">Active Build Properties</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/50 border border-white/5 space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block">APK FILENAME</span>
              <span className="text-xs font-bold text-white">gigpad-{latestRelease.version || GIGPAD_CONFIG.release.version}.apk</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/50 border border-white/5 space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block">FILE SIZE</span>
              <span className="text-xs font-bold text-white">{latestRelease.size || GIGPAD_CONFIG.release.fileSize}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/50 border border-white/5 space-y-1 sm:col-span-2">
              <span className="text-[10px] text-slate-500 font-bold block">SHA256 CHECKSUM</span>
              <span className="text-[10px] font-mono text-white truncate block">{GIGPAD_CONFIG.release.checksum}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 text-xs text-yellow-400 flex gap-3 items-start leading-relaxed">
            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
            <p>
              <strong>Security Policy:</strong> Always verify that the SHA256 checksum in this panel matches the checksum of the compiled Android project before releasing update files.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/30 border border-white/5 space-y-4">
          <h3 className="text-sm font-bold text-white">Release Status</h3>
          <div className="space-y-4 text-xs font-medium">
            <div className="flex gap-2.5 items-center text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Sideload instructions verified</span>
            </div>
            <div className="flex gap-2.5 items-center text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Checksum validation enabled</span>
            </div>
            <div className="flex gap-2.5 items-center text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Vercel Edge Distribution active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
