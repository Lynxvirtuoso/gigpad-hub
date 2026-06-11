'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface ScreenMockup {
  title: string;
  subtitle: string;
  type: 'viewer' | 'bandsync' | 'settings' | 'members' | 'joining';
  imageSrc: string;
}

export default function ScreenshotCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const screens: ScreenMockup[] = [
    {
      title: 'Performance Song Viewer and Editor',
      subtitle: 'Auto-scrolling, transposed chords, and high contrast text.',
      type: 'viewer',
      imageSrc: '/screenshots/screenshot_1.jpg',
    },
    {
      title: 'Realtime Bandsync',
      subtitle: 'Sync lyrics and chords with your band members in real-time.',
      type: 'bandsync',
      imageSrc: '/screenshots/screenshot_2.jpg',
    },
    {
      title: 'Fully Customizable Settings',
      subtitle: 'Configure scrolling presets, font styles, and app preferences.',
      type: 'settings',
      imageSrc: '/screenshots/screenshot_3.jpg',
    },
    {
      title: 'Members Management and Activity',
      subtitle: 'Keep track of active band members and review historical set activities.',
      type: 'members',
      imageSrc: '/screenshots/screenshot_4.jpg',
    },
    {
      title: 'Seamless Member Joining',
      subtitle: 'Quickly invite band members to your session via QR codes or invite links.',
      type: 'joining',
      imageSrc: '/screenshots/screenshot_5.jpg',
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % screens.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + screens.length) % screens.length);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Dynamic Screen Viewer */}
      <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 pt-8 pb-12">
        {/* Carousel controls - Desktop Left */}
        <button
          onClick={handlePrev}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-950/60 text-slate-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
          aria-label="Previous screenshot"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Smartphone Wrapper */}
        <div className="relative w-[280px] h-[560px] rounded-[40px] border-[10px] border-slate-800 bg-slate-950 shadow-2xl glow-blue p-2.5 transition-transform hover:scale-[1.01]">
          {/* Top Notch/Speaker */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-800 rounded-full flex items-center justify-center z-20">
            <div className="w-12 h-1 bg-slate-950 rounded-full"></div>
          </div>
          
          {/* App Screen Content Box */}
          <div className="relative w-full h-full rounded-[30px] overflow-hidden border border-white/5 bg-slate-900">
            <Image
              src={screens[activeIndex].imageSrc}
              alt={screens[activeIndex].title}
              fill
              className="object-cover"
              sizes="280px"
              priority={activeIndex === 0}
            />
          </div>
        </div>

        {/* Info panel */}
        <div className="flex flex-col text-center md:text-left md:max-w-xs px-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold self-center md:self-start mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            App Screen Showcase
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            {screens[activeIndex].title}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            {screens[activeIndex].subtitle}
          </p>

          {/* Indicators / Selector dots */}
          <div className="flex justify-center md:justify-start gap-2">
            {screens.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === activeIndex ? 'w-8 bg-blue-500' : 'w-2 bg-gray-700 hover:bg-gray-600'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              ></button>
            ))}
          </div>

          <div className="flex md:hidden items-center justify-center gap-8 mt-6">
            <button
              onClick={handlePrev}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-950/60 text-slate-400 hover:text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-950/60 text-slate-400 hover:text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel controls - Desktop Right */}
        <button
          onClick={handleNext}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-950/60 text-slate-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
          aria-label="Next screenshot"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <p className="text-xs text-slate-500 mt-2 text-center max-w-md">
        This simulator showcases actual screen captures from the GigPad application running on Android.
      </p>
    </div>
  );
}
