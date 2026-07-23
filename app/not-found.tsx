import React from 'react';
import Link from 'next/link';
import { Building2, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center text-center p-6">
      <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/30 mb-6">
        <Building2 className="w-8 h-8" />
      </div>
      <h1 className="text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">404</h1>
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-2">Hostel Room Not Found</h2>
      <p className="text-sm text-slate-500 max-w-md mt-2">
        The page or resource you are looking for has been relocated or does not exist in the RoomZen database.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <Link href="/dashboard/admin">
          <Button variant="primary">
            <Home className="w-4 h-4 mr-1.5" /> Return to Dashboard
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Landing Page
          </Button>
        </Link>
      </div>
    </div>
  );
}
