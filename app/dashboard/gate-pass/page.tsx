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
          <h1 className="text-2xl font-extrabold text-[#0A0A0A] tracking-[-0.05em] flex items-center gap-2.5">
            <QrCode className="w-7 h-7 text-[#0A0A0A]" strokeWidth={1.5} />
            Digital Gate Pass & QR System
          </h1>
          <p className="text-sm text-[#757575] mt-1">
            Request out-passes, track warden approval status, and present scannable QR passes to gate security.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setIsRequestModalOpen(true)}>
          <Plus className="w-4 h-4 mr-1.5" strokeWidth={1.5} /> Request New Gate Pass
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
                  <span className="text-[10px] font-mono text-[#757575]">{pass.qrCodeHash}</span>
                </div>
                <CardTitle className="text-base mt-2 tracking-tight text-[#0A0A0A]">{pass.reason}</CardTitle>
                <p className="text-xs text-[#757575]">Destination: <span className="font-semibold text-[#0A0A0A]">{pass.destination}</span></p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-[rgba(0,0,0,0.04)] text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#757575]">Student Name:</span>
                  <span className="font-bold text-[#0A0A0A]">{pass.studentName} (Room {pass.roomNumber})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#757575]">Leaving Date:</span>
                  <span className="font-medium text-[#0A0A0A]">{formatDateTime(pass.leavingDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#757575]">Expected Return:</span>
                  <span className="font-medium text-[#0A0A0A]">{formatDateTime(pass.returnDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#757575]">Guardian Contact:</span>
                  <span className="font-mono text-[#0A0A0A] font-bold">{pass.guardianContact}</span>
                </div>
              </div>

              {/* Approval Info */}
              {pass.approvedByName && (
                <div className="flex items-center gap-1.5 text-xs text-[#0A0A0A] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#0A0A0A]" strokeWidth={1.5} /> Approved by {pass.approvedByName}
                </div>
              )}

              {/* Actions */}
              <div className="pt-2 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between">
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
                    <QrCode className="w-4 h-4 mr-1.5 text-white" strokeWidth={1.5} /> Show QR Gate Pass
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
            <div className="p-6 bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <QRCodeSVG value={selectedPassForQr.qrCodeHash} size={200} />
            </div>

            <div>
              <p className="font-extrabold text-lg text-[#0A0A0A]">{selectedPassForQr.studentName}</p>
              <p className="text-xs text-[#757575]">Room {selectedPassForQr.roomNumber} • {selectedPassForQr.destination}</p>
              <p className="text-[11px] font-mono font-bold text-[#0A0A0A] mt-1">{selectedPassForQr.qrCodeHash}</p>
            </div>

            <div className="w-full p-4 rounded-2xl bg-[#FAFAFA] border border-[rgba(0,0,0,0.04)] text-xs text-[#0A0A0A]">
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
              <label className="block text-xs font-bold uppercase tracking-wider text-[#757575] mb-1">
                Reason for Out-Pass *
              </label>
              <input
                type="text"
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Weekend Family Function"
                className="w-full px-3 py-2 text-sm bg-[#FAFAFA] border border-[rgba(0,0,0,0.06)] rounded-2xl focus:outline-none text-[#0A0A0A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#757575] mb-1">
                Destination City / Place *
              </label>
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Boston, MA"
                className="w-full px-3 py-2 text-sm bg-[#FAFAFA] border border-[rgba(0,0,0,0.06)] rounded-2xl focus:outline-none text-[#0A0A0A]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#757575] mb-1">
                  Leaving Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={leavingDate}
                  onChange={(e) => setLeavingDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#FAFAFA] border border-[rgba(0,0,0,0.06)] rounded-2xl focus:outline-none text-[#0A0A0A]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#757575] mb-1">
                  Expected Return *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#FAFAFA] border border-[rgba(0,0,0,0.06)] rounded-2xl focus:outline-none text-[#0A0A0A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#757575] mb-1">
                Guardian Phone Number *
              </label>
              <input
                type="tel"
                required
                value={guardianContact}
                onChange={(e) => setGuardianContact(e.target.value)}
                placeholder="+1 (555) 987-0002"
                className="w-full px-3 py-2 text-sm bg-[#FAFAFA] border border-[rgba(0,0,0,0.06)] rounded-2xl focus:outline-none text-[#0A0A0A]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-[rgba(0,0,0,0.06)]">
              <Button type="button" variant="ghost" onClick={() => setIsRequestModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary">Submit Gate Pass Request</Button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
}
