'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, DoorOpen, Sparkles, QrCode, CreditCard, Utensils, 
  Plus, Calendar, Clock, AlertCircle, CheckCircle2, Download, Shield
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AIComplaintModal } from '@/components/complaints/AIComplaintModal';
import { useStore } from '@/lib/store/useStore';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function StudentDashboardPage() {
  const { students, complaints, gatePasses, payments, messMenu, announcements, markPaymentPaid } = useStore();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [selectedPassForQr, setSelectedPassForQr] = useState<any | null>(null);

  const currentStudent = students[0] || {
    fullName: 'Alex Rivera',
    studentIdNumber: 'UN-2024-1001',
    roomNumber: 'A-204',
    floor: 2,
    block: 'Block A',
    course: 'B.Tech Computer Science',
    batch: '2022-2026'
  };

  const studentComplaints = complaints.filter((c) => c.studentId === currentStudent.id || c.studentName.includes('Alex'));
  const studentPasses = gatePasses.filter((g) => g.studentId === currentStudent.id || g.studentName.includes('Alex'));
  const studentPayments = payments.filter((p) => p.studentId === currentStudent.id || p.studentName.includes('Alex'));

  const todayMenu = messMenu.find((m) => m.dayOfWeek === 'Monday') || messMenu[0];

  return (
    <div className="space-y-6">
      
      {/* Student Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white shadow-lg shadow-teal-500/20">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
            alt={currentStudent.fullName}
            className="w-16 h-16 rounded-2xl ring-4 ring-white/30 object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase">
                Student Workspace
              </span>
              <span className="text-xs text-teal-100 font-mono">{currentStudent.studentIdNumber}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              Welcome, {currentStudent.fullName}!
            </h1>
            <p className="text-sm text-teal-100 mt-0.5">
              Room {currentStudent.roomNumber} • {currentStudent.course} ({currentStudent.batch})
            </p>
          </div>
        </div>

        {/* Quick Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            onClick={() => setIsAiModalOpen(true)}
            variant="secondary"
            size="sm"
            className="bg-white text-teal-800 hover:bg-teal-50 font-bold"
          >
            <Sparkles className="w-4 h-4 mr-1 text-amber-500" />
            Raise AI Complaint
          </Button>
          <Link href="/dashboard/gate-pass">
            <Button variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-0">
              <QrCode className="w-4 h-4 mr-1" /> Request Gate Pass
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid Row 1: Active Passes & Room Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Room Card */}
        <Card hoverEffect>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DoorOpen className="w-5 h-5 text-blue-500" />
              Room Metadata
            </CardTitle>
            <Badge variant="primary">Active Resident</Badge>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-slate-500">Room Number</span>
              <span className="font-bold text-slate-900 dark:text-white">{currentStudent.roomNumber}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-slate-500">Floor & Block</span>
              <span className="font-bold text-slate-900 dark:text-white">Floor {currentStudent.floor}, {currentStudent.block}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-slate-500">Roommate</span>
              <span className="font-bold text-slate-900 dark:text-white">Sophia Martinez</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Wi-Fi Network</span>
              <span className="font-bold text-emerald-600">RoomZen_5G_A204</span>
            </div>
          </CardContent>
        </Card>

        {/* Gate Pass Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-teal-500" />
              My Digital Gate Passes
            </CardTitle>
            <Link href="/dashboard/gate-pass" className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline">
              Request Out-Pass
            </Link>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-slate-100 dark:divide-slate-800">
            {studentPasses.map((pass) => (
              <div key={pass.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{pass.reason}</p>
                    <Badge variant={pass.status === 'approved' ? 'success' : 'warning'}>{pass.status}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Destination: {pass.destination} • Valid until {formatDate(pass.returnDate)}
                  </p>
                </div>
                {pass.status === 'approved' && (
                  <Button size="sm" variant="outline" onClick={() => setSelectedPassForQr(pass)}>
                    View QR Pass
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

      {/* Grid Row 2: Complaints & Mess Menu */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Active Complaints */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              My Complaints Status
            </CardTitle>
            <Button size="sm" variant="ghost" onClick={() => setIsAiModalOpen(true)}>
              + Raise New
            </Button>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-slate-100 dark:divide-slate-800">
            {studentComplaints.map((cmp) => (
              <div key={cmp.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{cmp.title}</span>
                  <Badge variant={cmp.status === 'resolved' ? 'success' : 'warning'}>{cmp.status}</Badge>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">{cmp.description}</p>
                {cmp.estimatedFixTime && (
                  <div className="flex items-center gap-2 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                    <Clock className="w-3.5 h-3.5" /> Est. Fix Time: {cmp.estimatedFixTime}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mess Menu & Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-orange-500" />
              Today's Mess Schedule ({todayMenu.dayOfWeek})
            </CardTitle>
            <Link href="/dashboard/mess" className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline">
              Full Menu
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200/60 dark:border-orange-800/40">
              <span className="text-xs font-bold text-orange-800 dark:text-orange-300 uppercase">
                {todayMenu.mealType} Special
              </span>
              <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                {todayMenu.items.join(' • ')}
              </p>
              {todayMenu.specialItem && (
                <span className="text-[11px] text-amber-600 font-bold mt-1 block">
                  🌟 Chef Special: {todayMenu.specialItem}
                </span>
              )}
            </div>

            {/* Fees Widget */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Pending Invoices</span>
                <Link href="/dashboard/payments" className="text-xs text-blue-600 font-semibold">View Payments</Link>
              </div>
              {studentPayments.filter((p) => p.status === 'pending').map((pay) => (
                <div key={pay.id} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{pay.title}</p>
                    <p className="text-[11px] text-slate-500">Due {formatDate(pay.dueDate)}</p>
                  </div>
                  <Button size="sm" variant="primary" onClick={() => markPaymentPaid(pay.id, 'UPI')}>
                    Pay {formatCurrency(pay.amount)}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* AI Complaint Modal */}
      <AIComplaintModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />

    </div>
  );
}
