import { MessageSquare, User, Calendar, Tag } from 'lucide-react';

interface FeedbackItem {
  id: string;
  name: string;
  email: string;
  category: 'bug' | 'feature' | 'question' | 'other';
  message: string;
  date: string;
}

export default function AdminFeedback() {
  const feedbackSubmissions: FeedbackItem[] = [];

  const categoryBadges = {
    bug: 'bg-red-500/10 text-red-400 border-red-500/20',
    feature: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    question: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    other: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
          Feedback Portal
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Review feature suggestions, bug reports, and user questions submitted via the Hub website.
        </p>
      </div>

      <div className="space-y-4">
        {feedbackSubmissions.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/10 border border-white/5 flex flex-col items-center justify-center space-y-3">
            <MessageSquare className="w-8 h-8 text-slate-500 animate-pulse" />
            <h3 className="text-sm font-bold text-white">No Feedback Submissions Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              When users submit feedback or bug reports on the home page, they will show up here for administration review.
            </p>
          </div>
        ) : (
          feedbackSubmissions.map((item) => (
            <div key={item.id} className="p-6 rounded-2xl bg-slate-900/30 border border-white/5 space-y-4 hover:border-white/10 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-bold text-xs">
                    {item.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">{item.name}</h3>
                    <p className="text-[10px] text-slate-500 font-medium">{item.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${categoryBadges[item.category]}`}>
                    {item.category}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {item.date}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {item.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
