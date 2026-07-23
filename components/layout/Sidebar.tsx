'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, LayoutDashboard, DoorOpen, Users, AlertCircle, 
  QrCode, CreditCard, Utensils, Megaphone, MessageSquare, 
  FileText, Settings, ShieldCheck, UserCheck, CheckSquare, Sparkles, LogOut
} from 'lucide-react';
import { useStore } from '@/lib/store/useStore';
import { cn } from '@/lib/utils';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { activeRole } = useStore();

  const adminNav = [
    { href: '/dashboard/admin', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/rooms', label: 'Room Matrix', icon: DoorOpen },
    { href: '/dashboard/students', label: 'Students', icon: Users },
    { href: '/dashboard/complaints', label: 'Complaints & AI', icon: AlertCircle },
    { href: '/dashboard/gate-pass', label: 'Gate Passes', icon: QrCode },
    { href: '/dashboard/visitors', label: 'Visitor Register', icon: UserCheck },
    { href: '/dashboard/payments', label: 'Financials', icon: CreditCard },
    { href: '/dashboard/mess', label: 'Mess Operations', icon: Utensils },
    { href: '/dashboard/notices', label: 'Notices Board', icon: Megaphone },
    { href: '/dashboard/chat', label: 'Live Chat', icon: MessageSquare },
    { href: '/dashboard/reports', label: 'PDF Reports', icon: FileText },
    { href: '/dashboard/settings', label: 'System Settings', icon: Settings },
  ];

  const studentNav = [
    { href: '/dashboard/student', label: 'My Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/complaints', label: 'My Complaints (AI)', icon: AlertCircle },
    { href: '/dashboard/gate-pass', label: 'Out-Pass Request', icon: QrCode },
    { href: '/dashboard/payments', label: 'Fee Payments', icon: CreditCard },
    { href: '/dashboard/mess', label: 'Mess Menu', icon: Utensils },
    { href: '/dashboard/notices', label: 'Hostel Notices', icon: Megaphone },
    { href: '/dashboard/chat', label: 'Chat with Warden', icon: MessageSquare },
    { href: '/dashboard/settings', label: 'My Profile', icon: Settings },
  ];

  const wardenNav = [
    { href: '/dashboard/warden', label: 'Warden Control', icon: LayoutDashboard },
    { href: '/dashboard/gate-pass', label: 'Pass Approvals', icon: QrCode },
    { href: '/dashboard/complaints', label: 'Complaint Triage', icon: AlertCircle },
    { href: '/dashboard/students', label: 'Student Directory', icon: Users },
    { href: '/dashboard/visitors', label: 'Visitor Logs', icon: UserCheck },
    { href: '/dashboard/notices', label: 'Publish Notice', icon: Megaphone },
    { href: '/dashboard/chat', label: 'Student Messages', icon: MessageSquare },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  const staffNav = [
    { href: '/dashboard/staff', label: 'My Work Orders', icon: CheckSquare },
    { href: '/dashboard/complaints', label: 'All Repairs', icon: AlertCircle },
    { href: '/dashboard/settings', label: 'Profile', icon: Settings },
  ];

  const securityNav = [
    { href: '/dashboard/security', label: 'Gate Scanner', icon: ShieldCheck },
    { href: '/dashboard/visitors', label: 'Visitor Log', icon: UserCheck },
    { href: '/dashboard/gate-pass', label: 'Pass Verification', icon: QrCode },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  let navItems = adminNav;
  if (activeRole === 'student') navItems = studentNav;
  if (activeRole === 'warden') navItems = wardenNav;
  if (activeRole === 'staff') navItems = staffNav;
  if (activeRole === 'security') navItems = securityNav;

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 flex flex-col justify-between h-screen sticky top-0 z-30 select-none">
      <div>
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">RoomZen</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">OS</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Smart Student Housing</p>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          <p className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            {activeRole} Workspace
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                <Icon className={cn('w-4 h-4', isActive ? 'text-white' : 'text-slate-400')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Banner */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <div className="p-3 rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white dark:from-slate-800/80 dark:to-slate-900 border border-indigo-500/20 shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold">RoomZen AI v2.4</span>
          </div>
          <p className="text-[11px] text-slate-300 mt-1">Smart Hostel Operating System</p>
          <Link
            href="/"
            className="mt-2.5 flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Back to Landing
          </Link>
        </div>
      </div>
    </aside>
  );
};
