'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Key, ShieldCheck, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { requestLoginCode, verifyLoginCode } from '../actions';

export default function AdminLogin() {
  const router = useRouter();
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const res = await requestLoginCode(email);
      if (res.error) {
        setError(res.error);
      } else {
        setSuccess('A verification code has been generated and logged to the server terminal.');
        setStep('code');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await verifyLoginCode(email, code);
      if (res.error) {
        setError(res.error);
      } else {
        setSuccess('Authentication successful! Redirecting...');
        setTimeout(() => {
          router.push('/admin/dashboard');
          router.refresh();
        }, 1000);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-950 px-4 py-12 sm:px-6 lg:px-8">
      {/* Decorative background glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden blur-3xl" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] rounded-full bg-blue-600/10 opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full bg-violet-600/10 opacity-30"></div>
      </div>

      <div className="w-full max-w-md space-y-8 p-8 rounded-3xl glass-card glow-blue border border-white/10">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden mb-4 shadow-xl shadow-blue-500/10 border border-white/10 bg-slate-900/50 flex items-center justify-center p-1.5">
            <Image
              src="/Gigpad_logo.png"
              alt="GigPad Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
            GigPad Hub
          </h1>
          <p className="mt-1.5 text-xs font-semibold text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Admin Portal
          </p>
        </div>

        {/* Message banners */}
        {error && (
          <div className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/10 text-xs font-medium text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-xs font-medium text-emerald-400">
            {success}
          </div>
        )}

        {/* Auth Steps */}
        {step === 'email' ? (
          <form onSubmit={handleEmailSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold text-gray-300">
                Administrator Email Address
              </label>
              <div className="relative rounded-xl border border-white/10 bg-slate-950/80 transition-all focus-within:border-blue-500/50">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="block w-full rounded-xl border-0 bg-transparent py-3.5 pl-10 pr-4 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-3.5 text-xs font-bold text-white hover:from-blue-500 hover:to-violet-500 shadow-lg shadow-blue-500/25 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Checking authorization...
                </>
              ) : (
                <>
                  Request Verification Code <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleCodeSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="code" className="text-xs font-bold text-gray-300">
                  Verification Code
                </label>
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="text-[10px] font-bold text-blue-400 hover:underline flex items-center gap-1 bg-transparent border-0 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Change email
                </button>
              </div>
              
              <div className="relative rounded-xl border border-white/10 bg-slate-950/80 transition-all focus-within:border-blue-500/50">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Key className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  maxLength={6}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={isLoading}
                  className="block w-full rounded-xl border-0 bg-transparent py-3.5 pl-10 pr-4 text-xs font-bold tracking-widest text-white placeholder-slate-500 placeholder:tracking-normal focus:outline-none focus:ring-0"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1 font-medium">
                Please check your server logs/terminal for the 6-digit verification code.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-3.5 text-xs font-bold text-white hover:from-blue-500 hover:to-violet-500 shadow-lg shadow-blue-500/25 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  Verify & Log In <ShieldCheck className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
