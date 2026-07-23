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
    { role: 'admin', label: 'Hostel Admin / Owner', icon: <Building2 className="w-4 h-4" strokeWidth={1.5} />, color: 'text-[#0A0A0A]' },
    { role: 'student', label: 'Student Portal', icon: <GraduationCap className="w-4 h-4" strokeWidth={1.5} />, color: 'text-[#0A0A0A]' },
    { role: 'warden', label: 'Chief Warden', icon: <Shield className="w-4 h-4" strokeWidth={1.5} />, color: 'text-[#0A0A0A]' },
    { role: 'staff', label: 'Maintenance Staff', icon: <Wrench className="w-4 h-4" strokeWidth={1.5} />, color: 'text-[#0A0A0A]' },
    { role: 'security', label: 'Security Guard', icon: <User className="w-4 h-4" strokeWidth={1.5} />, color: 'text-[#0A0A0A]' },
  ];

  const currentRoleObj = roles.find((r) => r.role === activeRole);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-[rgba(0,0,0,0.04)] transition-colors">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        
        {/* Left: Search Trigger & Quick Info */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-3 px-3.5 py-2 text-sm text-[#757575] bg-[#FAFAFA] border border-[rgba(0,0,0,0.04)] rounded-xl hover:bg-[rgba(0,0,0,0.02)] transition-all w-48 md:w-64"
          >
            <Search className="w-4 h-4 text-[#757575]" strokeWidth={1.5} />
            <span className="flex-1 text-left hidden sm:inline">Search app...</span>
            <kbd className="hidden md:flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium bg-white border border-[rgba(0,0,0,0.06)] rounded text-[#757575]">
              <Command className="w-3 h-3" strokeWidth={1.5} /> K
            </kbd>
          </button>
        </div>

        {/* Right Action Icons & Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Role Switcher Pill (Interactive Demo Feature) */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-xl bg-white text-[#0A0A0A] border border-[rgba(0,0,0,0.06)] hover:bg-[#FAFAFA] transition-all"
            >
              <span className={currentRoleObj?.color}>{currentRoleObj?.icon}</span>
              <span className="hidden sm:inline">{currentRoleObj?.label}</span>
              <ChevronDown className="w-3.5 h-3.5 ml-0.5 text-[#757575]" strokeWidth={1.5} />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 py-2 bg-white rounded-2xl shadow-sm border border-[rgba(0,0,0,0.06)] z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 border-b border-[rgba(0,0,0,0.04)]">
                  <p className="text-[11px] font-medium uppercase tracking-tight text-[#757575]">Switch Role View</p>
                </div>
                {roles.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => {
                      setActiveRole(r.role);
                      setIsRoleDropdownOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors hover:bg-[#FAFAFA]',
                      activeRole === r.role ? 'text-[#0A0A0A] bg-[#FAFAFA]' : 'text-[#757575]'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className={r.color}>{r.icon}</span>
                      {r.label}
                    </span>
                    {activeRole === r.role && <CheckCircle2 className="w-4 h-4 text-[#0A0A0A]" strokeWidth={1.5} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-[#757575] hover:bg-[#FAFAFA] rounded-xl transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} /> : <Moon className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotifDropdownOpen(!isNotifDropdownOpen);
                if (!isNotifDropdownOpen) markNotificationsRead();
              }}
              className="relative p-2 text-[#757575] hover:bg-[#FAFAFA] rounded-xl transition-colors"
            >
              <Bell className="w-5 h-5" strokeWidth={1.5} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#0A0A0A] rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {isNotifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 py-2 bg-white rounded-2xl shadow-sm border border-[rgba(0,0,0,0.06)] z-50">
                <div className="flex items-center justify-between px-4 py-2 border-b border-[rgba(0,0,0,0.04)]">
                  <h4 className="text-xs font-medium text-[#0A0A0A] uppercase tracking-tight">Notifications</h4>
                  <span className="text-[10px] text-[#757575] font-medium">{notifications.length} total</span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-[rgba(0,0,0,0.04)]">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3.5 hover:bg-[#FAFAFA] transition-colors">
                      <p className="text-xs font-medium text-[#0A0A0A]">{n.title}</p>
                      <p className="text-xs text-[#757575] mt-0.5">{n.message}</p>
                      <span className="text-[10px] text-[#757575] mt-1 block">Just now</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-[rgba(0,0,0,0.06)]">
            <img
              src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={currentUser.fullName}
              className="w-8 h-8 rounded-full ring-1 ring-[rgba(0,0,0,0.06)] object-cover"
            />
            <div className="hidden lg:block text-left">
              <p className="text-xs font-medium text-[#0A0A0A] leading-tight tracking-tight">{currentUser.fullName}</p>
              <p className="text-[10px] text-[#757575] capitalize">{currentUser.role}</p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
