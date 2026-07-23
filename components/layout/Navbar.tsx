'use client';

import React, { useState } from 'react';
import { 
  Bell, Search, Moon, Sun, Shield, User, Wrench, GraduationCap, 
  ChevronDown, Building2, CheckCircle2, Command
} from 'lucide-react';
import { useStore } from '@/lib/store/useStore';
import { UserRole } from '@/types';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const { 
    currentUser, activeRole, setActiveRole, theme, toggleTheme, 
    notifications, markNotificationsRead, setCommandPaletteOpen 
  } = useStore();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const roles: { role: UserRole; label: string; icon: React.ReactNode; color: string }[] = [
    { role: 'admin', label: 'Hostel Admin / Owner', icon: <Building2 className="w-4 h-4" />, color: 'text-blue-500' },
    { role: 'student', label: 'Student Portal', icon: <GraduationCap className="w-4 h-4" />, color: 'text-emerald-500' },
    { role: 'warden', label: 'Chief Warden', icon: <Shield className="w-4 h-4" />, color: 'text-indigo-500' },
    { role: 'staff', label: 'Maintenance Staff', icon: <Wrench className="w-4 h-4" />, color: 'text-amber-500' },
    { role: 'security', label: 'Security Guard', icon: <User className="w-4 h-4" />, color: 'text-rose-500' },
  ];

  const currentRoleObj = roles.find((r) => r.role === activeRole);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        
        {/* Left: Search Trigger & Quick Info */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-3 px-3.5 py-2 text-sm text-slate-400 bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-all w-48 md:w-64"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="flex-1 text-left hidden sm:inline">Search app...</span>
            <kbd className="hidden md:flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-500">
              <Command className="w-3 h-3" /> K
            </kbd>
          </button>
        </div>

        {/* Right Action Icons & Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Role Switcher Pill (Interactive Demo Feature) */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 hover:bg-blue-100/80 transition-all"
            >
              <span className={currentRoleObj?.color}>{currentRoleObj?.icon}</span>
              <span className="hidden sm:inline">{currentRoleObj?.label}</span>
              <ChevronDown className="w-3.5 h-3.5 ml-0.5 text-blue-500" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 py-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Switch Role View</p>
                </div>
                {roles.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => {
                      setActiveRole(r.role);
                      setIsRoleDropdownOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60',
                      activeRole === r.role ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20 font-semibold' : 'text-slate-700 dark:text-slate-300'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className={r.color}>{r.icon}</span>
                      {r.label}
                    </span>
                    {activeRole === r.role && <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotifDropdownOpen(!isNotifDropdownOpen);
                if (!isNotifDropdownOpen) markNotificationsRead();
              }}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
              )}
            </button>

            {isNotifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 py-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 z-50">
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Notifications</h4>
                  <span className="text-[10px] text-blue-600 font-semibold">{notifications.length} total</span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/50">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{n.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{n.message}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">Just now</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <img
              src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={currentUser.fullName}
              className="w-8 h-8 rounded-full ring-2 ring-blue-500/30 object-cover"
            />
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">{currentUser.fullName}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">{currentUser.role}</p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
