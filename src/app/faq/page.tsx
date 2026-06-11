'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ChevronUp, ArrowLeft, ArrowRight } from 'lucide-react';
import { GIGPAD_CONFIG } from '@/config/gigpad';

export default function FAQ() {
  const faqs = GIGPAD_CONFIG.faqs;
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleFAQ = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((idx) => idx !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <div className="relative isolate bg-gray-950 min-h-screen py-16 sm:py-24">
      {/* Background glow */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%-10rem)] aspect-1155/678 w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-violet-600/10 to-indigo-600/10 opacity-30 sm:w-[72rem]"></div>
      </div>

      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        {/* Heading */}
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Find answers to common questions regarding downloading, safety, pricing, and live stage features of GigPad.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndexes.includes(index);
            return (
              <div
                key={index}
                className="rounded-2xl glass-card border border-white/5 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left text-sm font-bold text-white hover:text-blue-400 transition-colors focus:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4.5 h-4.5 text-blue-400 shrink-0" />
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6 text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-4 bg-slate-900/10 animate-slideDown">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Section Footer */}
        <div className="mt-16 text-center rounded-2xl glass-card p-6 sm:p-8 border border-white/5">
          <h3 className="text-base font-bold text-white mb-2">Still have questions?</h3>
          <p className="text-xs text-slate-400 mb-6 max-w-lg mx-auto leading-relaxed">
            Can&apos;t find what you&apos;re looking for? Submit a ticket directly to the development board via our Feedback Portal.
          </p>
          <Link
            href="/feedback"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold rounded-lg bg-white text-gray-950 hover:bg-slate-100 transition-colors"
          >
            Go to Feedback Portal <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
