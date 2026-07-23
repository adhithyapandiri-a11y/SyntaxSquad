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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        
        {/* Brand Logo */}
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <Building2 className="w-7 h-7" />
          </div>
          <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            RoomZen
          </span>
        </Link>
        
        <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Welcome back to RoomZen OS
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Sign in to access your student housing workspace
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 shadow-xl rounded-3xl border border-slate-200/80 dark:border-slate-800 sm:px-10">
          
          {/* Quick Demo Login Preset Buttons */}
          <div className="mb-6 p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/40">
            <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-blue-700 dark:text-blue-300">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Instant Demo 1-Click Login</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoRole('admin')}
                className="px-2.5 py-1.5 text-xs font-medium bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl border hover:border-blue-500 text-left transition-all"
              >
                🏢 Admin / Owner
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoRole('student')}
                className="px-2.5 py-1.5 text-xs font-medium bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl border hover:border-emerald-500 text-left transition-all"
              >
                🎓 Student Portal
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoRole('warden')}
                className="px-2.5 py-1.5 text-xs font-medium bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl border hover:border-indigo-500 text-left transition-all"
              >
                🛡️ Warden Desk
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoRole('staff')}
                className="px-2.5 py-1.5 text-xs font-medium bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl border hover:border-amber-500 text-left transition-all"
              >
                🔧 Repair Staff
              </button>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            
            {/* Role Selection Tabs */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Select Your Role
              </label>
              <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                {(['admin', 'student', 'warden'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRole(r)}
                    className={`py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                      selectedRole === r
                        ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full py-3">
              Sign In to Workspace
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Don’t have an account yet?{' '}
            <Link href="/signup" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Create student/admin account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
