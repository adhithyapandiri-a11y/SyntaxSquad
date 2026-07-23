'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building2, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/lib/store/useStore';
import { UserRole } from '@/types';

export default function SignupPage() {
  const router = useRouter();
  const { setActiveRole } = useStore();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveRole(role);
    router.push('/dashboard/' + role);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[rgba(0,0,0,0.06)] shadow-sm flex items-center justify-center text-[#0A0A0A]">
            <Building2 className="w-7 h-7" strokeWidth={1.5} />
          </div>
          <span className="text-3xl font-extrabold text-[#0A0A0A] tracking-[-0.05em]">
            RoomZen
          </span>
        </Link>
        
        <h2 className="mt-6 text-2xl font-bold text-[#0A0A0A] tracking-[-0.05em]">
          Create your RoomZen Account
        </h2>
        <p className="mt-2 text-sm text-[#757575]">
          Get started with digital student housing management
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-2xl border border-[rgba(0,0,0,0.06)] sm:px-10">
          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#757575] mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full px-4 py-2.5 text-sm bg-[#FAFAFA] border border-[rgba(0,0,0,0.06)] rounded-xl focus:ring-1 focus:ring-[#0A0A0A] focus:outline-none text-[#0A0A0A] placeholder:text-[#757575]/50"
              />
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
                placeholder="alex@university.edu"
                className="w-full px-4 py-2.5 text-sm bg-[#FAFAFA] border border-[rgba(0,0,0,0.06)] rounded-xl focus:ring-1 focus:ring-[#0A0A0A] focus:outline-none text-[#0A0A0A] placeholder:text-[#757575]/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#757575] mb-1">
                Account Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-4 py-2.5 text-sm bg-[#FAFAFA] border border-[rgba(0,0,0,0.06)] rounded-xl focus:ring-1 focus:ring-[#0A0A0A] focus:outline-none text-[#0A0A0A] capitalize"
              >
                <option value="student">Student Account</option>
                <option value="admin">Hostel Owner / Administrator</option>
                <option value="warden">Hostel Warden</option>
                <option value="staff">Maintenance Staff</option>
                <option value="security">Security Guard</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#757575] mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-[#FAFAFA] border border-[rgba(0,0,0,0.06)] rounded-xl focus:ring-1 focus:ring-[#0A0A0A] focus:outline-none text-[#0A0A0A]"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full py-3 mt-2 bg-[#0A0A0A] text-white hover:bg-[#222222] border border-[rgba(0,0,0,0.06)] shadow-sm">
              Create Account & Launch
              <ArrowRight className="w-4 h-4 ml-1" strokeWidth={1.5} />
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-[#757575]">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-[#0A0A0A] hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
