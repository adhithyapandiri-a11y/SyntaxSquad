'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, LayoutDashboard, DoorOpen, Users, AlertCircle, 
  QrCode, CreditCard, Utensils, Megaphone, FileText, 
  Settings, ShieldCheck, UserCheck, CheckSquare, Sparkles, LogOut
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
    { href: '/dashboard/settings', label: 'My Profile', icon: Settings },
  ];

  const wardenNav = [
    { href: '/dashboard/warden', label: 'Warden Control', icon: LayoutDashboard },
    { href: '/dashboard/gate-pass', label: 'Pass Approvals', icon: QrCode },
    { href: '/dashboard/complaints', label: 'Complaint Triage', icon: AlertCircle },
    { href: '/dashboard/students', label: 'Student Directory', icon: Users },
    { href: '/dashboard/visitors', label: 'Visitor Logs', icon: UserCheck },
    { href: '/dashboard/notices', label: 'Publish Notice', icon: Megaphone },
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
    <aside className="w-64 flex-shrink-0 border-r border-[rgba(0,0,0,0.06)] bg-[#FAFAFA] flex flex-col justify-between h-screen sticky top-0 z-30 select-none">
      <div>
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center gap-3 border-b border-[rgba(0,0,0,0.04)]">
          <div className="w-9 h-9 rounded-xl bg-white border border-[rgba(0,0,0,0.06)] flex items-center justify-center text-[#0A0A0A] shadow-sm">
            <Building2 className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-lg text-[#0A0A0A] tracking-tight">RoomZen</span>
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-white border border-[rgba(0,0,0,0.06)] text-[#757575]">OS</span>
            </div>
            <p className="text-[10px] text-[#757575] font-medium">Smart Student Housing</p>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          <p className="px-3 py-1.5 text-[10px] font-medium uppercase tracking-tight text-[#757575]">
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
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 border',
                  isActive
                    ? 'bg-white text-[#0A0A0A] border-[rgba(0,0,0,0.06)] shadow-sm'
                    : 'border-transparent text-[#757575] hover:bg-[rgba(0,0,0,0.02)] hover:text-[#0A0A0A]'
                )}
              >
                <Icon className={cn('w-4 h-4', isActive ? 'text-[#0A0A0A]' : 'text-[#757575]')} strokeWidth={1.5} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Banner */}
      <div className="p-4 border-t border-[rgba(0,0,0,0.04)]">
        <div className="p-3 rounded-xl bg-white border border-[rgba(0,0,0,0.06)] shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0A0A0A]" strokeWidth={1.5} />
            <span className="text-xs font-medium text-[#0A0A0A]">RoomZen AI v2.4</span>
          </div>
          <p className="text-[11px] text-[#757575] mt-1">Smart Hostel Operating System</p>
          <Link
            href="/"
            className="mt-2.5 flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-medium bg-[#FAFAFA] hover:bg-[rgba(0,0,0,0.02)] text-[#0A0A0A] border border-[rgba(0,0,0,0.06)] rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" strokeWidth={1.5} />
            Back to Landing
          </Link>
        </div>
      </div>
    </aside>
  );
};
