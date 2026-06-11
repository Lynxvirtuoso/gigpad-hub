'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send, Bug, Sparkles, MessageSquare, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      setStatus('error');
      setResponseMsg('Please fill in your name and message.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setResponseMsg(data.message || 'Thank you! Your feedback has been received.');
        setFormData({ name: '', email: '', category: 'general', message: '' });
      } else {
        setStatus('error');
        setResponseMsg(data.error || 'Failed to submit feedback. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setResponseMsg('Something went wrong. Please check your connection and try again.');
    }
  };

  return (
    <div className="relative isolate bg-gray-950 min-h-screen py-16 sm:py-24">
      {/* Background glow */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%-10rem)] aspect-1155/678 w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-violet-600/10 to-indigo-600/10 opacity-30 sm:w-[72rem]"></div>
      </div>

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        {/* Heading */}
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Feedback Portal
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Report bugs, request features, or share your overall experience using GigPad. We read all community submissions!
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-2xl glass-card p-6 sm:p-8 border border-white/5 glow-blue">
          {status === 'success' && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-start gap-2.5 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Submission Successful</strong>
                {responseMsg}
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Error Encountered</strong>
                {responseMsg}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. David"
                  className="w-full rounded-lg bg-slate-950 border border-white/15 px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Email Address <span className="text-slate-500">(Optional)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. david@example.com"
                  className="w-full rounded-lg bg-slate-950 border border-white/15 px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Category Selector */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Feedback Category <span className="text-red-500">*</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* General */}
                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.category === 'general'
                    ? 'bg-blue-500/10 border-blue-500 text-blue-400 font-semibold'
                    : 'bg-slate-950 border-white/15 hover:bg-slate-900 text-slate-400'
                }`}>
                  <input
                    type="radio"
                    name="category"
                    value="general"
                    checked={formData.category === 'general'}
                    onChange={() => setFormData({ ...formData, category: 'general' })}
                    className="sr-only"
                  />
                  <MessageSquare className="w-4.5 h-4.5" />
                  <span className="text-xs">General Feedback</span>
                </label>

                {/* Bug Report */}
                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.category === 'bug'
                    ? 'bg-red-500/10 border-red-500 text-red-400 font-semibold'
                    : 'bg-slate-950 border-white/15 hover:bg-slate-900 text-slate-400'
                }`}>
                  <input
                    type="radio"
                    name="category"
                    value="bug"
                    checked={formData.category === 'bug'}
                    onChange={() => setFormData({ ...formData, category: 'bug' })}
                    className="sr-only"
                  />
                  <Bug className="w-4.5 h-4.5" />
                  <span className="text-xs">Bug Report</span>
                </label>

                {/* Feature Request */}
                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.category === 'feature'
                    ? 'bg-violet-500/10 border-violet-500 text-violet-400 font-semibold'
                    : 'bg-slate-950 border-white/15 hover:bg-slate-900 text-slate-400'
                }`}>
                  <input
                    type="radio"
                    name="category"
                    value="feature"
                    checked={formData.category === 'feature'}
                    onChange={() => setFormData({ ...formData, category: 'feature' })}
                    className="sr-only"
                  />
                  <Sparkles className="w-4.5 h-4.5" />
                  <span className="text-xs">Feature Request</span>
                </label>
              </div>
            </div>

            {/* Message Box */}
            <div>
              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Message Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share the details here..."
                className="w-full rounded-lg bg-slate-950 border border-white/15 px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors resize-y"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-500 hover:to-violet-500 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {status === 'loading' ? 'Sending Submissions...' : (
                <>
                  <Send className="w-4 h-4" /> Send Feedback
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
