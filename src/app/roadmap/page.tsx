import Link from 'next/link';
import { CheckCircle2, PlayCircle, Calendar, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { GIGPAD_CONFIG, RoadmapItem } from '@/config/gigpad';

export default function Roadmap() {
  const roadmapItems = GIGPAD_CONFIG.roadmap;

  // Categorize items
  const completed = roadmapItems.filter((item) => item.status === 'completed');
  const inProgress = roadmapItems.filter((item) => item.status === 'in-progress');
  const planned = roadmapItems.filter((item) => item.status === 'planned');

  const SectionHeader = ({ title, count, icon }: { title: string; count: number; icon: React.ReactNode }) => (
    <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/5">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-lg font-bold text-white tracking-tight">{title}</h2>
      </div>
      <span className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-400 font-semibold">
        {count}
      </span>
    </div>
  );

  const RoadmapCard = ({ item }: { item: RoadmapItem }) => (
    <div className="p-5 rounded-xl bg-slate-900/40 border border-white/5 hover:border-white/10 transition-all space-y-2">
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-sm font-bold text-white">{item.title}</h3>
        {item.status === 'completed' && (
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-semibold uppercase tracking-wider">
            Completed
          </span>
        )}
        {item.status === 'in-progress' && (
          <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-semibold uppercase tracking-wider flex items-center gap-1">
            <Loader2 className="w-2.5 h-2.5 animate-spin" /> In Dev
          </span>
        )}
        {item.status === 'planned' && (
          <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] font-semibold uppercase tracking-wider">
            Planned
          </span>
        )}
      </div>
      <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
    </div>
  );

  return (
    <div className="relative isolate bg-gray-950 min-h-screen py-16 sm:py-24">
      {/* Background glow */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%-12rem)] aspect-1155/678 w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-blue-600/10 to-violet-600/10 opacity-35 sm:w-[72rem]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        {/* Heading */}
        <div className="max-w-2xl mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Project Roadmap
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            See what we have completed, what is active in development, and what features we have scheduled for future updates.
          </p>
        </div>

        {/* Three Column Board Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Planned Column */}
          <div className="rounded-2xl glass-card p-6 border border-white/5">
            <SectionHeader
              title="Planned"
              count={planned.length}
              icon={<Calendar className="w-4 h-4 text-blue-400" />}
            />
            <div className="space-y-4">
              {planned.map((item) => (
                <RoadmapCard key={item.id} item={item} />
              ))}
              {planned.length === 0 && (
                <p className="text-xs text-slate-500 italic text-center py-4">No planned items.</p>
              )}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="rounded-2xl glass-card p-6 border border-white/5 glow-purple">
            <SectionHeader
              title="In Progress"
              count={inProgress.length}
              icon={<PlayCircle className="w-4 h-4 text-purple-400" />}
            />
            <div className="space-y-4">
              {inProgress.map((item) => (
                <RoadmapCard key={item.id} item={item} />
              ))}
              {inProgress.length === 0 && (
                <p className="text-xs text-slate-500 italic text-center py-4">No active development items.</p>
              )}
            </div>
          </div>

          {/* Completed Column */}
          <div className="rounded-2xl glass-card p-6 border border-white/5">
            <SectionHeader
              title="Completed"
              count={completed.length}
              icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            />
            <div className="space-y-4">
              {completed.map((item) => (
                <RoadmapCard key={item.id} item={item} />
              ))}
              {completed.length === 0 && (
                <p className="text-xs text-slate-500 italic text-center py-4">No completed items.</p>
              )}
            </div>
          </div>
        </div>

        {/* Suggestion Card */}
        <div className="mt-16 rounded-2xl glass-card p-6 sm:p-8 border border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="max-w-xl">
            <h3 className="text-base font-bold text-white">Have a feature suggestion?</h3>
            <p className="text-xs text-slate-400 leading-relaxed mt-1">
              We shape our roadmap based on community feature requests and bug reports. Submit yours today and join the builder board!
            </p>
          </div>
          <Link
            href="/feedback"
            className="flex items-center gap-1 text-xs font-semibold rounded-lg bg-white text-gray-950 px-4 py-2 hover:bg-slate-100 transition-colors"
          >
            Submit Feedback <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
