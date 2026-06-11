import { cookies } from 'next/headers';
import { verifyToken, getJwtSecret } from '@/utils/auth';
import { adminLogout } from '../../actions';
import { User, ShieldAlert, LogOut, Lock, Key } from 'lucide-react';

export default async function AdminSettings() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('gigpad_admin_session');
  
  let email = 'Unknown';
  let role = 'Admin';
  let expDate = 'N/A';

  if (sessionCookie && sessionCookie.value) {
    const secret = getJwtSecret();
    const payload = await verifyToken(sessionCookie.value, secret);
    if (payload) {
      email = payload.email;
      role = payload.role;
      expDate = new Date(payload.exp).toLocaleString();
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
          Admin Settings
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Manage your administrator profile, active session lifetimes, and authorization roles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Profile Card */}
          <div className="p-6 rounded-2xl bg-slate-900/30 border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <User className="w-4.5 h-4.5 text-blue-400" />
              Account Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/50 border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold block">EMAIL ADDRESS</span>
                <span className="text-xs font-bold text-white">{email}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/50 border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold block">ASSIGNED ROLE</span>
                <span className="text-xs font-bold text-blue-400">{role}</span>
              </div>
            </div>
          </div>

          {/* Session Details Card */}
          <div className="p-6 rounded-2xl bg-slate-900/30 border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Key className="w-4.5 h-4.5 text-violet-400" />
              Session Status
            </h3>
            <div className="p-4 rounded-xl bg-slate-950/50 border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-semibold">Session Token Cookie:</span>
                <span className="text-emerald-400 font-bold">Active & Secure</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-semibold">Expires at:</span>
                <span className="text-white font-mono">{expDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/30 border border-white/5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Lock className="w-4.5 h-4.5 text-red-500" />
            Security Actions
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            Terminating your session will revoke your authentication credentials immediately.
          </p>
          <form action={adminLogout}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white py-3 text-xs font-bold text-red-400 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Revoke Session & Log Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
