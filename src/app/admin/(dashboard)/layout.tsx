import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { 
  LayoutDashboard, 
  Tag, 
  Download, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut, 
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { verifyToken, getJwtSecret } from '@/utils/auth';
import { adminLogout } from '../actions';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('gigpad_admin_session');
  
  if (!sessionCookie || !sessionCookie.value) {
    redirect('/admin/login');
  }

  const secret = getJwtSecret();
  const session = await verifyToken(sessionCookie.value, secret);

  if (!session) {
    redirect('/admin/login');
  }

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Releases', href: '/admin/releases', icon: Tag },
    { name: 'Downloads', href: '/admin/downloads', icon: Download },
    { name: 'Feedback', href: '/admin/feedback', icon: MessageSquare },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/5 bg-gray-950/80 backdrop-blur-md flex flex-col fixed inset-y-0 left-0 z-20">
        {/* Brand/Header */}
        <div className="flex h-16 items-center gap-3 px-6 border-b border-white/5">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 bg-slate-900 flex items-center justify-center p-1">
            <Image
              src="/Gigpad_logo.png"
              alt="GigPad Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <div>
            <span className="text-sm font-bold text-white block">GigPad Hub</span>
            <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1">
              <ShieldCheck className="w-2.5 h-2.5" /> Admin Panel
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all group"
              >
                <Icon className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logged in User Meta & Logout */}
        <div className="p-4 border-t border-white/5 bg-slate-900/10">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <UserCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold text-white truncate">{session.email}</p>
              <p className="text-[9px] font-semibold text-slate-400">{session.role}</p>
            </div>
          </div>
          
          <form action={adminLogout}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 py-2.5 text-xs font-bold text-slate-300 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Log Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 pl-64">
        {/* Top bar */}
        <header className="h-16 border-b border-white/5 flex items-center justify-end px-8 bg-gray-950/20 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span>Server Status:</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-400 font-bold">Online</span>
          </div>
        </header>

        {/* Main section wrapper */}
        <main className="p-8 max-w-6xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
