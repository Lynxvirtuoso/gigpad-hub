'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Download, Music, HelpCircle, FileText, Info } from 'lucide-react';
import Image from 'next/image';
import { GIGPAD_CONFIG } from '@/config/gigpad';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Features', href: '/#features' },
    { name: 'Docs', href: '/docs' },
    { name: 'Changelog', href: '/changelog' },
    { name: 'Updates', href: '/update-ecosystem' },
    { name: 'Roadmap', href: '/roadmap' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Feedback', href: '/feedback' },
    { name: 'About', href: '/about' },
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) return false;
    return pathname === path || pathname.startsWith(path + '/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-gray-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                <Image
                  src="/Gigpad_logo.png"
                  alt="GigPad Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                {GIGPAD_CONFIG.projectName}
                <span className="text-xs ml-1 px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-normal">Hub</span>
              </span>
            </Link>

            {/* Soundwave Animation Graphic */}
            <div className="hidden sm:flex items-center h-4 ml-2 pl-2 border-l border-white/10">
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-white ${
                  isActive(item.href) ? 'text-blue-400' : 'text-gray-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/downloads"
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-white/5 text-gray-200 border border-white/10 hover:bg-white/10 hover:text-white transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              Get APK
            </Link>
            <Link
              href="/downloads"
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-500 hover:to-violet-500 shadow-lg shadow-blue-500/25 transition-all"
            >
              <Download className="w-3.5 h-3.5 animate-bounce" />
              Download
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-900 hover:text-white focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-950 border-b border-white/5" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  isActive(item.href)
                    ? 'bg-gray-900 text-blue-400'
                    : 'text-gray-300 hover:bg-gray-900 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-white/5 px-3 flex flex-col gap-2">
              <Link
                href="/downloads"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold rounded-lg bg-white/5 text-gray-200 border border-white/10"
              >
                <FileText className="w-4 h-4" />
                APK Instructions
              </Link>
              <Link
                href="/downloads"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg"
              >
                <Download className="w-4 h-4" />
                Download {GIGPAD_CONFIG.release.version}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
