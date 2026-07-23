'use client';

import React, { useState } from 'react';
import { 
  Shield, QrCode, AlertCircle, Check, X, PhoneCall, Users, 
  UserCheck, Moon, FileText, CheckCircle2, Search
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useStore } from '@/lib/store/useStore';
import { formatDateTime } from '@/lib/utils';

export default function WardenDashboardPage() {
  const { gatePasses, complaints, students, visitors, updateGatePassStatus, updateComplaintStatus } = useStore();
  const [selectedStaff, setSelectedStaff] = useState('Robert Vance (HVAC Specialist)');
  const [nightAttendance, setNightAttendance] = useState<Record<string, boolean>>({
    std_101: true,
    std_102: true,
    std_103: false,
    std_104: true,
  });

  const pendingPasses = gatePasses.filter((g) => g.status === 'pending');
  const openComplaints = complaints.filter((c) => c.status === 'open' || c.status === 'assigned');

  return (
    <div className="space-y-6">
      
      {/* Warden Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 text-white shadow-lg shadow-indigo-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase">
              Warden Desk
            </span>
            <span className="text-xs text-indigo-200">Arthur Mitchell • Chief Warden</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Student Discipline & Pass Control
          </h1>
          <p className="text-sm text-indigo-100 mt-1">
            Review gate pass approvals, guardian calls, maintenance staff dispatch, and night attendance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="warning" className="bg-amber-400/20 text-amber-200 border-amber-400/30 text-xs px-3 py-1">
            {pendingPasses.length} Pending Passes
          </Badge>
        </div>
      </div>

      {/* Grid Row 1: Gate Pass Queue & Guardian Call */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Gate Pass Approvals Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-indigo-500" />
              Gate Pass Approval Requests ({pendingPasses.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-slate-100 dark:divide-slate-800">
            {pendingPasses.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                No pending gate passes right now!
              </div>
            ) : (
              pendingPasses.map((pass) => (
                <div key={pass.id} className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{pass.studentName}</h4>
                      <p className="text-xs text-slate-500">Room {pass.roomNumber} • Reason: {pass.reason}</p>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">
                        Destination: {pass.destination}
                      </p>
                    </div>
                    <Badge variant="warning">Pending Approval</Badge>
                  </div>

                  {/* Guardian Contact Quick Action */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 text-xs">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">
                      Guardian: {pass.guardianContact}
                    </span>
                    <a
                      href={`tel:${pass.guardianContact}`}
                      className="flex items-center gap-1 text-emerald-600 font-bold hover:underline"
                    >
                      <PhoneCall className="w-3.5 h-3.5" /> Call Parent
                    </a>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => updateGatePassStatus(pass.id, 'rejected', 'Guardian unverified')}
                    >
                      <X className="w-4 h-4 mr-1" /> Reject
                    </Button>
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => updateGatePassStatus(pass.id, 'approved')}
                    >
                      <Check className="w-4 h-4 mr-1" /> Approve & Issue QR
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Complaint Triage & Staff Assignment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Complaint Triage & Staff Dispatch
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-slate-100 dark:divide-slate-800">
            {openComplaints.map((cmp) => (
              <div key={cmp.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{cmp.title}</h4>
                    <p className="text-[11px] text-slate-500">By {cmp.studentName} ({cmp.roomNumber})</p>
                  </div>
                  <Badge variant={cmp.priority === 'high' ? 'danger' : 'warning'}>{cmp.priority} priority</Badge>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={cmp.assignedStaffName || selectedStaff}
                    onChange={(e) => setSelectedStaff(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none dark:text-white"
                  >
                    <option value="Robert Vance (HVAC Specialist)">Robert Vance (HVAC)</option>
                    <option value="Carlos Plumbing Team">Carlos Plumbing Team</option>
                    <option value="Mike Carpentry">Mike Carpentry</option>
                    <option value="Electra Tech Services">Electra Tech Services</option>
                  </select>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => updateComplaintStatus(cmp.id, 'assigned', 'stf_1', selectedStaff)}
                  >
                    Assign Staff
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

      {/* Grid Row 2: Night Attendance Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-indigo-500" />
            Night Attendance Check Sheet (Tonight)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-slate-100 dark:divide-slate-800">
          {students.map((std) => (
            <div key={std.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{std.fullName}</p>
                <p className="text-xs text-slate-500">Room {std.roomNumber} • {std.course}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setNightAttendance({ ...nightAttendance, [std.id]: true })}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    nightAttendance[std.id]
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Present
                </button>
                <button
                  onClick={() => setNightAttendance({ ...nightAttendance, [std.id]: false })}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    !nightAttendance[std.id]
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Absent / Out-Pass
                </button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}
