'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building2, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/lib/store/useStore';
import { UserRole } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const { setActiveRole } = useStore();
  const [email, setEmail] = useState('admin@roomzen.com');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveRole(selectedRole);
    if (selectedRole === 'admin') router.push('/dashboard/admin');
    else if (selectedRole === 'student') router.push('/dashboard/student');
    else if (selectedRole === 'warden') router.push('/dashboard/warden');
    else if (selectedRole === 'staff') router.push('/dashboard/staff');
    else if (selectedRole === 'security') router.push('/dashboard/security');
  };

  const handleQuickDemoRole = (role: UserRole) => {
    setSelectedRole(role);
    setActiveRole(role);
    if (role === 'admin') router.push('/dashboard/admin');
    else if (role === 'student') router.push('/dashboard/student');
    else if (role === 'warden') router.push('/dashboard/warden');
    else if (role === 'staff') router.push('/dashboard/staff');
    else if (role === 'security') router.push('/dashboard/security');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        
        {/* Brand Logo */}
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[rgba(0,0,0,0.06)] shadow-sm flex items-center justify-center text-[#0A0A0A]">
            <Building2 className="w-7 h-7" strokeWidth={1.5} />
          </div>
          <span className="text-3xl font-extrabold text-[#0A0A0A] tracking-[-0.05em]">
            RoomZen
          </span>
        </Link>
        
        <h2 className="mt-6 text-2xl font-bold text-[#0A0A0A] tracking-[-0.05em]">
          Welcome back to RoomZen OS
        </h2>
        <p className="mt-2 text-sm text-[#757575]">
          Sign in to access your student housing workspace
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-2xl border border-[rgba(0,0,0,0.06)] sm:px-10">
          
          {/* Quick Demo Login Preset Buttons */}
          <div className="mb-6 p-4 rounded-2xl bg-[#FAFAFA] border border-[rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-[#0A0A0A]">
              <Sparkles className="w-4 h-4 text-[#757575]" strokeWidth={1.5} />
              <span>Instant Demo 1-Click Login</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoRole('admin')}
                className="px-2.5 py-1.5 text-xs font-medium bg-white text-[#0A0A0A] rounded-xl border border-[rgba(0,0,0,0.06)] hover:bg-[#FAFAFA] text-left transition-all"
              >
                🏢 Admin / Owner
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoRole('student')}
                className="px-2.5 py-1.5 text-xs font-medium bg-white text-[#0A0A0A] rounded-xl border border-[rgba(0,0,0,0.06)] hover:bg-[#FAFAFA] text-left transition-all"
              >
                🎓 Student Portal
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoRole('warden')}
                className="px-2.5 py-1.5 text-xs font-medium bg-white text-[#0A0A0A] rounded-xl border border-[rgba(0,0,0,0.06)] hover:bg-[#FAFAFA] text-left transition-all"
              >
                🛡️ Warden Desk
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoRole('staff')}
                className="px-2.5 py-1.5 text-xs font-medium bg-white text-[#0A0A0A] rounded-xl border border-[rgba(0,0,0,0.06)] hover:bg-[#FAFAFA] text-left transition-all"
              >
                🔧 Repair Staff
              </button>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            
            {/* Role Selection Tabs */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#757575] mb-1.5">
                Select Your Role
              </label>
              <div className="grid grid-cols-3 gap-1 p-1 bg-[#FAFAFA] border border-[rgba(0,0,0,0.04)] rounded-xl">
                {(['admin', 'student', 'warden'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRole(r)}
                    className={`py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                      selectedRole === r
                        ? 'bg-white text-[#0A0A0A] shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-[rgba(0,0,0,0.04)]'
                        : 'text-[#757575] hover:text-[#0A0A0A]'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#757575] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-[#FAFAFA] border border-[rgba(0,0,0,0.06)] rounded-xl focus:ring-1 focus:ring-[#0A0A0A] focus:outline-none text-[#0A0A0A]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#757575]">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-[#757575] hover:text-[#0A0A0A] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-[#FAFAFA] border border-[rgba(0,0,0,0.06)] rounded-xl focus:ring-1 focus:ring-[#0A0A0A] focus:outline-none text-[#0A0A0A]"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full py-3 bg-[#0A0A0A] text-white hover:bg-[#222222] border border-[rgba(0,0,0,0.06)] shadow-sm">
              Sign In to Workspace
              <ArrowRight className="w-4 h-4 ml-1" strokeWidth={1.5} />
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-[#757575]">
            Don’t have an account yet?{' '}
            <Link href="/signup" className="font-semibold text-[#0A0A0A] hover:underline">
              Create student/admin account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
