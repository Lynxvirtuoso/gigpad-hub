import Link from 'next/link';
import { Download, Info, CheckCircle2, ChevronRight, FileText, ArrowLeft } from 'lucide-react';
import { GIGPAD_CONFIG } from '@/config/gigpad';
import { fetchGitHubReleases } from '@/utils/github';

export default async function Downloads() {
  const releases = await fetchGitHubReleases();
  const latestRelease = releases[0];
  const previousReleases = releases.slice(1);
  const checksum = latestRelease?.checksum || GIGPAD_CONFIG.release.checksum;

  return (
    <div className="relative isolate bg-gray-950 min-h-screen py-16 sm:py-24">
      {/* Background glow */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-15rem)] aspect-1155/678 w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-blue-600/20 to-violet-600/20 opacity-30 sm:w-[72rem]"></div>
      </div>

      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        {/* Heading */}
        <div className="max-w-2xl mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Download Center
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Get the latest version of the GigPad Android App. Download the APK package below to install it on your smartphone or tablet.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Download Card */}
          <div className="lg:col-span-2 rounded-2xl glass-card p-6 sm:p-8 glow-blue">
            <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              Latest Stable
            </span>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pb-6 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold text-white">GigPad App Installer</h2>
                <p className="text-xs text-slate-400 mt-1">Package Name: <code className="text-blue-400 font-mono">com.gigpad.app</code></p>
              </div>
              
              <div className="flex flex-col gap-1 text-xs text-slate-400 sm:text-right">
                <span className="font-semibold text-white">Version {latestRelease?.version || GIGPAD_CONFIG.release.version}</span>
                <span>Released: {latestRelease?.releaseDate || GIGPAD_CONFIG.release.releaseDate}</span>
                <span>Size: {latestRelease?.size || GIGPAD_CONFIG.release.fileSize}</span>
              </div>
            </div>

            {/* Action */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {latestRelease ? (
                <a
                  href={latestRelease.apkUrl}
                  className="flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm font-semibold rounded-xl bg-white text-gray-950 hover:bg-slate-100 transition-colors shadow-lg animate-pulse font-sans"
                >
                  <Download className="w-4 h-4" />
                  Download APK File
                </a>
              ) : (
                <span className="flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm font-semibold rounded-xl bg-slate-900 text-slate-500 border border-white/5 cursor-not-allowed font-sans">
                  <Download className="w-4 h-4" />
                  No APK Release Available
                </span>
              )}
              <Link
                href="/changelog"
                className="flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl bg-slate-900 text-slate-200 border border-white/10 hover:bg-slate-800 transition-all font-sans"
              >
                <FileText className="w-4 h-4" />
                View Release Notes
              </Link>
            </div>

            {/* Checksums */}
            {checksum && (
              <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">SHA-256 Checksum</span>
                <code className="text-[10px] font-mono text-slate-300 break-all select-all block">{checksum}</code>
              </div>
            )}

            <div className="mt-6 flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Integration Note:</strong> Download buttons pull assets dynamically from GitHub Releases. APK sizes and release details reflect real-time production compiles.
              </span>
            </div>
          </div>

          {/* Quick FAQ / Stats Sidebar */}
          <div className="space-y-6">
            {/* Quick instructions trigger */}
            <div className="rounded-2xl glass-card p-6 border border-white/5">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Minimum Requirements
              </h3>
              <ul className="space-y-2 text-xs text-slate-400 pl-4 list-disc leading-relaxed">
                <li>Android 8.0 (Oreo) or higher</li>
                <li>Monospace font enabled (default)</li>
                <li>At least 50MB of free space</li>
              </ul>
            </div>

            {/* Help / Safety note */}
            <div className="rounded-2xl glass-card p-6 border border-white/5">
              <h3 className="text-sm font-bold text-white mb-2">Is this safe to install?</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Yes. Since GigPad is compiled directly from the open-source codebase, it is completely secure. You can verify the build hash above.
              </p>
              <Link href="/faq" className="text-xs text-blue-400 hover:underline inline-flex items-center gap-1">
                More Safety FAQs <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Previous Releases */}
        {previousReleases.length > 0 && (
          <div className="mt-16 border-t border-white/5 pt-12">
            <h2 className="text-xl font-bold text-white mb-6">Previous Releases</h2>
            <div className="grid grid-cols-1 gap-4">
              {previousReleases.map((rel) => (
                <div
                  key={rel.version}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl bg-slate-900/30 border border-white/5 gap-4 hover:border-white/10 hover:bg-slate-900/50 transition-all"
                >
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      GigPad {rel.version}
                      {rel.prerelease && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-semibold uppercase tracking-wider">
                          Beta
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">Released on {rel.releaseDate} • Size: {rel.size}</p>
                  </div>
                  <a
                    href={rel.apkUrl}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-white/5 text-slate-200 border border-white/10 hover:bg-white/15 hover:text-white transition-all self-start sm:self-center cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download APK
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Installation Guide Component */}
        <div className="mt-16 border-t border-white/5 pt-12">
          <h2 className="text-xl font-bold text-white mb-6">How to Install GigPad on Android</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-900/50 border border-white/5">
              <span className="text-2xl font-extrabold text-blue-500 font-mono block mb-2">01</span>
              <h4 className="text-sm font-bold text-white mb-2">Download APK</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tap the &quot;Download APK&quot; button above using your Android browser to fetch the package file.
              </p>
            </div>
            
            <div className="p-5 rounded-xl bg-slate-900/50 border border-white/5">
              <span className="text-2xl font-extrabold text-blue-500 font-mono block mb-2">02</span>
              <h4 className="text-sm font-bold text-white mb-2">Allow Unknown Sources</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                If prompted, enable the &quot;Install Unknown Apps&quot; toggle for your browser or file manager inside device settings.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/50 border border-white/5">
              <span className="text-2xl font-extrabold text-blue-500 font-mono block mb-2">03</span>
              <h4 className="text-sm font-bold text-white mb-2">Run Installer</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Open your device Downloads folder and select the downloaded file to finalize setup and start performing!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
