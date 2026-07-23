'use client';

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  QrCode, Plus, CheckCircle2, Clock, XCircle, ShieldCheck, Download, Calendar 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useStore } from '@/lib/store/useStore';
import { formatDateTime, formatDate } from '@/lib/utils';
import { GatePass } from '@/types';

export default function GatePassPage() {
  const { gatePasses, addGatePass, updateGatePassStatus, students } = useStore();

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedPassForQr, setSelectedPassForQr] = useState<GatePass | null>(null);

  // Form State
  const [reason, setReason] = useState('');
  const [destination, setDestination] = useState('');
  const [leavingDate, setLeavingDate] = useState('2026-07-25T17:00');
  const [returnDate, setReturnDate] = useState('2026-07-27T21:00');
  const [guardianContact, setGuardianContact] = useState('+1 (555) 987-0002');

  const currentStudent = students[0] || {
    id: 'std_101',
    fullName: 'Alex Rivera',
    roomNumber: 'A-204'
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    addGatePass({
      studentId: currentStudent.id,
      studentName: currentStudent.fullName,
      roomNumber: currentStudent.roomNumber || 'A-204',
      reason,
      destination,
      leavingDate,
      returnDate,
      guardianContact,
    });

    setIsRequestModalOpen(false);
    setReason('');
    setDestination('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <QrCode className="w-7 h-7 text-teal-600" />
            Digital Gate Pass & QR System
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Request out-passes, track warden approval status, and present scannable QR passes to gate security.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setIsRequestModalOpen(true)}>
          <Plus className="w-4 h-4 mr-1.5" /> Request New Gate Pass
        </Button>
      </div>

      {/* Gate Pass Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gatePasses.map((pass) => (
          <Card key={pass.id} hoverEffect className="relative">
            <CardHeader>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant={pass.status === 'approved' ? 'success' : pass.status === 'rejected' ? 'danger' : 'warning'}>
                    {pass.status.toUpperCase()}
                  </Badge>
                  <span className="text-[10px] font-mono text-slate-400">{pass.qrCodeHash}</span>
                </div>
                <CardTitle className="text-base mt-2">{pass.reason}</CardTitle>
                <p className="text-xs text-slate-500">Destination: <span className="font-semibold text-slate-800 dark:text-slate-200">{pass.destination}</span></p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Student Name:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{pass.studentName} (Room {pass.roomNumber})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Leaving Date:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{formatDateTime(pass.leavingDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Expected Return:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{formatDateTime(pass.returnDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Guardian Contact:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{pass.guardianContact}</span>
                </div>
              </div>

              {/* Approval Info */}
              {pass.approvedByName && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Approved by {pass.approvedByName}
                </div>
              )}

              {/* Actions */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                {pass.status === 'pending' && (
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="success" onClick={() => updateGatePassStatus(pass.id, 'approved')}>
                      Approve (Warden)
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => updateGatePassStatus(pass.id, 'rejected')}>
                      Reject
                    </Button>
                  </div>
                )}
                {pass.status === 'approved' && (
                  <Button size="sm" variant="primary" onClick={() => setSelectedPassForQr(pass)}>
                    <QrCode className="w-4 h-4 mr-1.5" /> Show QR Gate Pass
                  </Button>
                )}
              </div>

            </CardContent>
          </Card>
        ))}
      </div>

      {/* QR Code Pass Card Modal */}
      {selectedPassForQr && (
        <Modal
          isOpen={!!selectedPassForQr}
          onClose={() => setSelectedPassForQr(null)}
          title="Digital QR Gate Pass"
          subtitle="Present this QR code to main gate security guards"
          maxWidth="sm"
        >
          <div className="flex flex-col items-center justify-center p-4 text-center space-y-4">
            <div className="p-4 bg-white rounded-2xl border-4 border-teal-500 shadow-xl">
              <QRCodeSVG value={selectedPassForQr.qrCodeHash} size={200} />
            </div>

            <div>
              <p className="font-extrabold text-lg text-slate-900 dark:text-white">{selectedPassForQr.studentName}</p>
              <p className="text-xs text-slate-500">Room {selectedPassForQr.roomNumber} • {selectedPassForQr.destination}</p>
              <p className="text-[11px] font-mono font-bold text-teal-600 dark:text-teal-400 mt-1">{selectedPassForQr.qrCodeHash}</p>
            </div>

            <div className="w-full p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 text-xs text-teal-800 dark:text-teal-300">
              ✓ Verified by {selectedPassForQr.approvedByName || 'Hostel Warden'}
            </div>
          </div>
        </Modal>
      )}

      {/* Request Modal */}
      {isRequestModalOpen && (
        <Modal
          isOpen={isRequestModalOpen}
          onClose={() => setIsRequestModalOpen(false)}
          title="Request Out-Pass / Gate Pass"
          subtitle="Submit out-station or late-entry request for warden authorization"
        >
          <form onSubmit={handleSubmitRequest} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Reason for Out-Pass *
              </label>
              <input
                type="text"
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Weekend Family Function"
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl focus:outline-none dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Destination City / Place *
              </label>
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Boston, MA"
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl focus:outline-none dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Leaving Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={leavingDate}
                  onChange={(e) => setLeavingDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl focus:outline-none dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Expected Return *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl focus:outline-none dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Guardian Phone Number *
              </label>
              <input
                type="tel"
                required
                value={guardianContact}
                onChange={(e) => setGuardianContact(e.target.value)}
                placeholder="+1 (555) 987-0002"
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl focus:outline-none dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="ghost" onClick={() => setIsRequestModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary">Submit Gate Pass Request</Button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
}
