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
    <div className="space-y-6 font-sans">
      
      {/* Warden Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[rgba(0,0,0,0.06)] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FAFAFA] border border-[rgba(0,0,0,0.04)] text-[#0A0A0A] text-xs font-bold uppercase">
              Warden Desk
            </span>
            <span className="text-xs text-[#757575]">Arthur Mitchell • Chief Warden</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.05em] text-[#0A0A0A] mt-1">
            Student Discipline & Pass Control
          </h1>
          <p className="text-sm text-[#757575] mt-1">
            Review gate pass approvals, guardian calls, maintenance staff dispatch, and night attendance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="warning" className="bg-[#FAFAFA] border border-[rgba(0,0,0,0.06)] text-[#0A0A0A] text-xs px-3 py-1">
            {pendingPasses.length} Pending Passes
          </Badge>
        </div>
      </div>

      {/* Grid Row 1: Gate Pass Queue & Guardian Call */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Gate Pass Approvals Queue */}
        <Card className="bg-white border border-[rgba(0,0,0,0.06)] rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0A0A0A] tracking-tight font-bold">
              <QrCode className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
              Gate Pass Approval Requests ({pendingPasses.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-[rgba(0,0,0,0.04)]">
            {pendingPasses.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#757575]">
                <CheckCircle2 className="w-8 h-8 text-[#0A0A0A] mx-auto mb-2" strokeWidth={1.5} />
                No pending gate passes right now!
              </div>
            ) : (
              pendingPasses.map((pass) => (
                <div key={pass.id} className="p-5 space-y-3 hover:bg-[#FAFAFA] transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#0A0A0A]">{pass.studentName}</h4>
                      <p className="text-xs text-[#757575]">Room {pass.roomNumber} • Reason: {pass.reason}</p>
                      <p className="text-xs text-[#0A0A0A] mt-0.5">
                        Destination: {pass.destination}
                      </p>
                    </div>
                    <Badge variant="warning" className="bg-[#FAFAFA] border border-[rgba(0,0,0,0.06)] text-[#0A0A0A]">Pending Approval</Badge>
                  </div>

                  {/* Guardian Contact Quick Action */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAFAFA] border border-[rgba(0,0,0,0.04)] text-xs">
                    <span className="text-[#0A0A0A] font-medium">
                      Guardian: {pass.guardianContact}
                    </span>
                    <a
                      href={`tel:${pass.guardianContact}`}
                      className="flex items-center gap-1 text-[#0A0A0A] font-bold hover:underline"
                    >
                      <PhoneCall className="w-3.5 h-3.5" strokeWidth={1.5} /> Call Parent
                    </a>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <Button
                      size="sm"
                      variant="danger"
                      className="bg-white border border-[rgba(0,0,0,0.06)] text-[#0A0A0A] hover:bg-[#FAFAFA]"
                      onClick={() => updateGatePassStatus(pass.id, 'rejected', 'Guardian unverified')}
                    >
                      <X className="w-4 h-4 mr-1" strokeWidth={1.5} /> Reject
                    </Button>
                    <Button
                      size="sm"
                      variant="success"
                      className="bg-[#0A0A0A] text-white hover:bg-[#222222]"
                      onClick={() => updateGatePassStatus(pass.id, 'approved')}
                    >
                      <Check className="w-4 h-4 mr-1" strokeWidth={1.5} /> Approve & Issue QR
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Complaint Triage & Staff Assignment */}
        <Card className="bg-white border border-[rgba(0,0,0,0.06)] rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0A0A0A] tracking-tight font-bold">
              <AlertCircle className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
              Complaint Triage & Staff Dispatch
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-[rgba(0,0,0,0.04)]">
            {openComplaints.map((cmp) => (
              <div key={cmp.id} className="p-4 space-y-3 hover:bg-[#FAFAFA] transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#0A0A0A]">{cmp.title}</h4>
                    <p className="text-[11px] text-[#757575]">By {cmp.studentName} ({cmp.roomNumber})</p>
                  </div>
                  <Badge variant={cmp.priority === 'high' ? 'danger' : 'warning'} className="bg-[#FAFAFA] border border-[rgba(0,0,0,0.06)] text-[#0A0A0A]">{cmp.priority} priority</Badge>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={cmp.assignedStaffName || selectedStaff}
                    onChange={(e) => setSelectedStaff(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-[#FAFAFA] border border-[rgba(0,0,0,0.06)] rounded-lg focus:ring-1 focus:ring-[#0A0A0A] focus:outline-none text-[#0A0A0A]"
                  >
                    <option value="Robert Vance (HVAC Specialist)">Robert Vance (HVAC)</option>
                    <option value="Carlos Plumbing Team">Carlos Plumbing Team</option>
                    <option value="Mike Carpentry">Mike Carpentry</option>
                    <option value="Electra Tech Services">Electra Tech Services</option>
                  </select>
                  <Button
                    size="sm"
                    variant="primary"
                    className="bg-[#0A0A0A] text-white hover:bg-[#222222]"
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
      <Card className="bg-white border border-[rgba(0,0,0,0.06)] rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#0A0A0A] tracking-tight font-bold">
            <Moon className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
            Night Attendance Check Sheet (Tonight)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-[rgba(0,0,0,0.04)]">
          {students.map((std) => (
            <div key={std.id} className="p-4 flex items-center justify-between hover:bg-[#FAFAFA] transition-colors">
              <div>
                <p className="text-sm font-bold text-[#0A0A0A]">{std.fullName}</p>
                <p className="text-xs text-[#757575]">Room {std.roomNumber} • {std.course}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setNightAttendance({ ...nightAttendance, [std.id]: true })}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all border ${
                    nightAttendance[std.id]
                      ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-sm'
                      : 'bg-[#FAFAFA] text-[#757575] border-[rgba(0,0,0,0.04)] hover:text-[#0A0A0A]'
                  }`}
                >
                  Present
                </button>
                <button
                  onClick={() => setNightAttendance({ ...nightAttendance, [std.id]: false })}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all border ${
                    !nightAttendance[std.id]
                      ? 'bg-white text-[#0A0A0A] border-[rgba(0,0,0,0.06)] shadow-sm'
                      : 'bg-[#FAFAFA] text-[#757575] border-[rgba(0,0,0,0.04)] hover:text-[#0A0A0A]'
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
