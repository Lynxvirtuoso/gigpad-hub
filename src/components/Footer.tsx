import Link from 'next/link';
import { Music, Code2, Heart } from 'lucide-react';
import Image from 'next/image';
import { GIGPAD_CONFIG } from '@/config/gigpad';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-950 border-t border-white/5 py-12 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg overflow-hidden">
                <Image
                  src="/Gigpad_logo.png"
                  alt="GigPad Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold text-white">
                {GIGPAD_CONFIG.projectName}
                <span className="text-xs ml-1 px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-normal">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              {GIGPAD_CONFIG.description}
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub Repository"
              >
                <Code2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links: Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Ecosystem</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/downloads" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Download APK
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Changelogs
                </Link>
              </li>
              <li>
                <Link href="/update-ecosystem" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Update Ecosystem
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Project Roadmap
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Feedback Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: Documentation */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Help & Docs</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/docs" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Documentation Home
                </Link>
              </li>
              <li>
                <Link href="/docs?topic=installing-gigpad" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Installation Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Frequently Asked FAQs
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About the Project
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} {GIGPAD_CONFIG.projectName} Hub. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            Built for musicians with <Heart className="w-3 h-3 text-red-500 fill-red-500" />. Not affiliated with Google Play.
          </p>
        </div>
      </div>
    </footer>
  );
}
