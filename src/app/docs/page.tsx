'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, ChevronRight, BookOpen, AlertCircle, FileText, ArrowLeft, Terminal } from 'lucide-react';
import { GIGPAD_CONFIG, DocArticle } from '@/config/gigpad';

// Simple markdown formatter helper to keep the site extremely fast
function renderMarkdown(content: string) {
  const lines = content.split('\n');
  let insideCodeBlock = false;
  let codeContent: string[] = [];

  return lines.map((line, idx) => {
    // Code Blocks
    if (line.startsWith('```')) {
      if (insideCodeBlock) {
        insideCodeBlock = false;
        const codeText = codeContent.join('\n');
        codeContent = [];
        return (
          <pre key={idx} className="bg-slate-950 border border-white/5 rounded-xl p-4 my-4 overflow-x-auto text-xs text-blue-300 font-mono">
            <code>{codeText}</code>
          </pre>
        );
      } else {
        insideCodeBlock = true;
        return null;
      }
    }

    if (insideCodeBlock) {
      codeContent.push(line);
      return null;
    }

    // Headers
    if (line.startsWith('#### ')) {
      return (
        <h4 key={idx} className="text-base font-bold text-white mt-6 mb-2">
          {line.replace('#### ', '')}
        </h4>
      );
    }
    if (line.startsWith('### ')) {
      return (
        <h3 key={idx} className="text-lg font-extrabold text-white mt-8 mb-3 border-b border-white/5 pb-1">
          {line.replace('### ', '')}
        </h3>
      );
    }

    // Callout alerts
    if (line.startsWith('> [!NOTE]')) {
      return null; // Handle note flag, contents are parsed below
    }
    if (line.startsWith('> ')) {
      return (
        <div key={idx} className="my-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs flex gap-2.5 items-start">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            {line.replace('> ', '').replace('Installing updates follows the same steps. Your current data is fully safe and will not be overwritten or lost during updates.', 'Installing updates follows the same steps. Your current data is fully safe and will not be overwritten or lost during updates.')}
          </div>
        </div>
      );
    }

    // Unordered lists
    if (line.startsWith('- ')) {
      return (
        <li key={idx} className="text-xs text-slate-400 leading-relaxed list-disc ml-5 mb-1.5">
          {line.replace('- ', '')}
        </li>
      );
    }

    // Ordered lists
    if (/^\d+\.\s/.test(line)) {
      return (
        <li key={idx} className="text-xs text-slate-400 leading-relaxed list-decimal ml-5 mb-1.5">
          {line.replace(/^\d+\.\s/, '')}
        </li>
      );
    }

    // Empty space
    if (line.trim() === '') {
      return <div key={idx} className="h-2"></div>;
    }

    // Standard paragraphs
    // Bold replacement helper
    const formattedLine = line.split('**').map((part, i) => 
      i % 2 === 1 ? <strong key={i} className="text-white font-semibold">{part}</strong> : part
    ).map((part, i) => {
      if (typeof part === 'string') {
        return part.split('`').map((subpart, j) => 
          j % 2 === 1 ? <code key={j} className="bg-slate-900 border border-white/10 px-1 py-0.5 rounded text-xs text-blue-400 font-mono">{subpart}</code> : subpart
        );
      }
      return part;
    });

    return (
      <p key={idx} className="text-xs text-slate-400 leading-relaxed mb-3">
        {formattedLine}
      </p>
    );
  });
}

function DocsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeSlug = searchParams.get('topic') || GIGPAD_CONFIG.docs[0].slug;
  const [searchQuery, setSearchQuery] = useState('');

  const activeArticle = GIGPAD_CONFIG.docs.find((doc) => doc.slug === activeSlug) || GIGPAD_CONFIG.docs[0];

  // Group documentation by category
  const categories: { [key: string]: DocArticle[] } = {};
  GIGPAD_CONFIG.docs.forEach((doc) => {
    if (!categories[doc.category]) {
      categories[doc.category] = [];
    }
    categories[doc.category].push(doc);
  });

  const handleSelectTopic = (slug: string) => {
    router.push(`/docs?topic=${slug}`);
  };

  // Filter docs on search
  const filteredDocs = GIGPAD_CONFIG.docs.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative isolate bg-gray-950 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search docs..."
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 pl-9 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>

            {/* Sidebar menu */}
            <nav className="space-y-6">
              {searchQuery ? (
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-2">Search Results</h4>
                  <ul className="space-y-1">
                    {filteredDocs.map((doc) => (
                      <li key={doc.slug}>
                        <button
                          onClick={() => handleSelectTopic(doc.slug)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                            activeSlug === doc.slug
                              ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold'
                              : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                          }`}
                        >
                          {doc.title}
                          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                        </button>
                      </li>
                    ))}
                    {filteredDocs.length === 0 && (
                      <li className="text-xs text-slate-500 italic px-3">No matching articles.</li>
                    )}
                  </ul>
                </div>
              ) : (
                Object.entries(categories).map(([category, articles]) => (
                  <div key={category}>
                    <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-2 px-3">{category}</h4>
                    <ul className="space-y-1">
                      {articles.map((doc) => (
                        <li key={doc.slug}>
                          <button
                            onClick={() => handleSelectTopic(doc.slug)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                              activeSlug === doc.slug
                                ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold'
                                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                            }`}
                          >
                            {doc.title}
                            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </nav>
          </div>

          {/* Article Viewer Pane */}
          <div className="lg:col-span-3 rounded-2xl glass-card border border-white/5 p-6 sm:p-10 glow-blue">
            <div className="pb-4 border-b border-white/5 mb-6">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block mb-1">
                {activeArticle.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {activeArticle.title}
              </h1>
            </div>

            <article className="prose prose-invert max-w-none">
              {renderMarkdown(activeArticle.content)}
            </article>

            {/* Quick help banner */}
            <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-xs text-slate-400">
                Was this article helpful? If you still need help, feel free to contact us.
              </span>
              <Link
                href="/feedback?category=bug"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10"
              >
                <Terminal className="w-3.5 h-3.5" /> Submit Support Ticket
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Docs() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-slate-400 text-xs">
        Loading documentation...
      </div>
    }>
      <DocsContent />
    </Suspense>
  );
}
