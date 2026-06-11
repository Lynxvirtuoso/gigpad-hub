'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, Cpu, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

interface LatestRelease {
  version: string;
  releaseDate: string;
  apkUrl: string;
  releaseNotes: string;
  size: string;
}

export default function UpdateEcosystem() {
  const [latestRelease, setLatestRelease] = useState<LatestRelease | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Interactive Version Checker States
  const [userVersion, setUserVersion] = useState('v1.3.0');
  const [checkResult, setCheckResult] = useState<{
    status: 'idle' | 'checking' | 'update-available' | 'up-to-date' | 'error';
    message: string;
    details?: string;
  }>({ status: 'idle', message: 'Enter your version above to simulate an update check.' });

  useEffect(() => {
    async function loadLatest() {
      try {
        const res = await fetch('/api/releases/latest');
        if (res.ok) {
          const data = await res.json();
          setLatestRelease(data);
        }
      } catch (err) {
        console.error('Failed to load latest release for update check', err);
      } finally {
        setLoading(false);
      }
    }
    loadLatest();
  }, []);

  const handleVersionCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!latestRelease) {
      setCheckResult({ status: 'error', message: 'Could not fetch latest release info from GitHub API.' });
      return;
    }

    setCheckResult({ status: 'checking', message: 'Querying update check endpoint...' });

    setTimeout(() => {
      // Clean up version inputs for comparison (remove 'v' prefix, split by '.')
      const cleanUser = userVersion.toLowerCase().replace('v', '').trim();
      const cleanLatest = latestRelease.version.toLowerCase().replace('v', '').trim();

      const userParts = cleanUser.split('.').map(Number);
      const latestParts = cleanLatest.split('.').map(Number);

      let isOutdated = false;
      for (let i = 0; i < Math.max(userParts.length, latestParts.length); i++) {
        const u = userParts[i] || 0;
        const l = latestParts[i] || 0;
        if (l > u) {
          isOutdated = true;
          break;
        } else if (u > l) {
          break;
        }
      }

      if (isOutdated) {
        setCheckResult({
          status: 'update-available',
          message: `Update Available! Version ${latestRelease.version} is ready.`,
          details: `Your app (Version ${userVersion}) is behind the latest release. Recommended update size is ${latestRelease.size}.`
        });
      } else {
        setCheckResult({
          status: 'up-to-date',
          message: 'Your app is fully up-to-date.',
          details: `You are running version ${userVersion}, which matches or exceeds the latest release (${latestRelease.version}).`
        });
      }
    }, 600);
  };

  return (
    <div className="relative isolate bg-gray-950 min-h-screen py-16 sm:py-24">
      {/* Background glow */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%-10rem)] aspect-1155/678 w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-violet-600/15 to-blue-600/15 opacity-30 sm:w-[72rem]"></div>
      </div>

      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        {/* Heading */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Update Ecosystem
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Understand how GigPad manages versions, downloads, and performs seamless in-app checks directly against the official GitHub Releases repository.
          </p>
        </div>

        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-16">
          
          {/* Section: Live Version Info */}
          <div className="md:col-span-2 rounded-2xl glass-card p-6 sm:p-8 border border-white/5 glow-blue">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-400" />
              Live Ecosystem Status
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-white/5">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Latest GitHub Release</span>
                <div className="text-2xl font-black text-white mt-1">
                  {loading ? (
                    <span className="text-sm font-semibold text-slate-500 flex items-center gap-1.5 animate-pulse">
                      <RefreshCw className="w-4 h-4 animate-spin text-blue-400" /> Connecting to GitHub...
                    </span>
                  ) : (
                    latestRelease?.version || 'Unknown'
                  )}
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Release Date</span>
                <div className="text-base font-bold text-slate-300 mt-2">
                  {loading ? '...' : latestRelease?.releaseDate || 'N/A'}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="text-sm font-bold text-white">How In-App Updates Work</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                GigPad contains a lightweight, background-compatible updater class. Upon launch, it queries our latest release endpoints to verify compatibility:
              </p>
              
              <div className="relative border-l-2 border-blue-500/30 pl-4 space-y-3 mt-4">
                <div className="text-xs">
                  <strong className="text-white block">1. Version Checking</strong>
                  <span className="text-slate-400 text-[11px]">The app makes an unauthenticated request to the official <code className="text-blue-400 font-mono">/api/releases/latest</code> endpoint.</span>
                </div>
                <div className="text-xs">
                  <strong className="text-white block">2. Comparison</strong>
                  <span className="text-slate-400 text-[11px]">It parses the version tag (e.g. <code className="text-blue-400 font-mono">v1.4.2</code>) and compares it semantic-by-semantic against its compiled package header.</span>
                </div>
                <div className="text-xs">
                  <strong className="text-white block">3. In-App Download Prompt</strong>
                  <span className="text-slate-400 text-[11px]">If a newer APK exists, a non-intrusive dialog is displayed, allowing the user to download the update asset and install it instantly.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Version Simulator */}
          <div className="rounded-2xl glass-card p-6 border border-white/5 space-y-6">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-violet-400" />
              Update Simulator
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Test how the Android application reacts to different version checks.
            </p>

            <form onSubmit={handleVersionCheck} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Simulated Local Version
                </label>
                <input
                  type="text"
                  value={userVersion}
                  onChange={(e) => setUserVersion(e.target.value)}
                  placeholder="e.g. v1.3.0"
                  className="w-full rounded-lg bg-slate-950 border border-white/10 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg text-xs transition-colors cursor-pointer"
              >
                Perform Check
              </button>
            </form>

            {/* Check Results UI */}
            <div className={`p-4 rounded-xl border text-xs ${
              checkResult.status === 'checking' ? 'bg-slate-900/50 border-white/10 text-slate-300' :
              checkResult.status === 'update-available' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
              checkResult.status === 'up-to-date' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
              'bg-slate-950 border-white/5 text-slate-500'
            }`}>
              <div className="font-bold flex items-center gap-1.5">
                {checkResult.status === 'update-available' && <AlertTriangle className="w-4 h-4 shrink-0" />}
                {checkResult.status === 'up-to-date' && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                {checkResult.message}
              </div>
              {checkResult.details && (
                <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">{checkResult.details}</p>
              )}
            </div>
          </div>
        </div>

        {/* API Endpoint Documentation Section */}
        <div className="border-t border-white/5 pt-12">
          <h2 className="text-xl font-bold text-white mb-6">Developer API Reference</h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            The GigPad Android App connects to the following official endpoint to retrieve release metadata:
          </p>

          <div className="rounded-2xl bg-slate-950 border border-white/5 overflow-hidden">
            {/* Header / Verb */}
            <div className="flex items-center gap-3 bg-slate-900 px-4 py-3 border-b border-white/5">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase">
                GET
              </span>
              <code className="text-xs font-mono text-slate-200">/api/releases/latest</code>
            </div>

            {/* Response Schema */}
            <div className="p-4 sm:p-6 space-y-4">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">JSON Response Body</span>
              <pre className="text-xs font-mono text-blue-300 overflow-x-auto p-4 rounded-xl bg-slate-900 border border-white/5">
{`{
  "version": "${latestRelease?.version || 'v1.4.2'}",
  "releaseDate": "${latestRelease?.releaseDate || 'June 08, 2026'}",
  "apkUrl": "${latestRelease?.apkUrl || 'https://github.com/Lingeswaran/Gigpad/releases/download/v1.4.2/gigpad-v1.4.2.apk'}",
  "releaseNotes": "### New Features\\n- Transposition sliders\\n- Preset auto scroll speed...",
  "size": "${latestRelease?.size || '16.4 MB'}"
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Security & Update Trust FAQ */}
        <div className="mt-16 border-t border-white/5 pt-12">
          <h2 className="text-xl font-bold text-white mb-6">Safety & Trust</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4.5 h-4.5 text-blue-400" />
                Is the update process secure?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Yes. Since GigPad is compiled directly from the official open-source repository and distributed via secure HTTPS, the APK installer is fully authenticated. Android verify-signatures guarantee that updates will overwrite existing installs only if signed with the matching developer key.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <HelpCircle className="w-4.5 h-4.5 text-blue-400" />
                Will I lose songs during updates?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                No. Android side-loading updates replace the binary package while preserving all app-specific directories, including your local SQLite song library, setlist playlists, and user settings intact.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
