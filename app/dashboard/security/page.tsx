'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, QrCode, UserCheck, Search, CheckCircle2, XCircle, Clock 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useStore } from '@/lib/store/useStore';
import { formatDateTime } from '@/lib/utils';

export default function SecurityDashboardPage() {
  const { gatePasses, visitors, updateGatePassStatus, checkOutVisitor } = useStore();
  const [scanInput, setScanInput] = useState('');
  const [scanResult, setScanResult] = useState<any | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleSimulateScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanInput) return;
    setIsScanning(true);

    setTimeout(() => {
      const matchedPass = gatePasses.find(
        (g) => g.qrCodeHash.toLowerCase() === scanInput.toLowerCase() || g.studentName.toLowerCase().includes(scanInput.toLowerCase())
      );
      setScanResult(matchedPass || 'not_found');
      setIsScanning(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* Security Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-rose-700 via-red-700 to-amber-700 text-white shadow-lg shadow-rose-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase">
              Main Gate Security Desk
            </span>
            <span className="text-xs text-rose-100">Officer Marcus Vance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Gate Pass & Visitor Scanner
          </h1>
          <p className="text-sm text-rose-100 mt-1">
            Scan student QR out-passes and check-in/out visitors at hostel entrance gates.
          </p>
        </div>
      </div>

      {/* QR Scanner Simulator */}
      <Card className="border-2 border-rose-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-rose-500" />
            Live QR Pass & Student ID Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSimulateScan} className="flex gap-3">
            <input
              type="text"
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              placeholder="Scan QR hash (e.g. UN-GP-ALEX-20260725-8831) or enter student name"
              className="flex-1 px-4 py-3 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none dark:text-white"
            />
            <Button type="submit" variant="danger" isLoading={isScanning}>
              <Search className="w-4 h-4 mr-1.5" /> Scan QR Pass
            </Button>
          </form>

          {/* Quick Demo Pre-fill helper */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Quick test QR hash:</span>
            <button
              onClick={() => setScanInput('UN-GP-ALEX-20260725-8831')}
              className="font-mono text-rose-600 dark:text-rose-400 font-bold hover:underline"
            >
              UN-GP-ALEX-20260725-8831
            </button>
          </div>

          {/* Scan Result Box */}
          {scanResult === 'not_found' && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-700 dark:text-rose-300 flex items-center gap-3">
              <XCircle className="w-6 h-6 text-rose-500 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">Pass Not Found or Invalid Hash</p>
                <p className="text-xs">The scanned QR hash does not match any approved gate pass in the database.</p>
              </div>
            </div>
          )}

          {scanResult && scanResult !== 'not_found' && (
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-slate-900 dark:text-white space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  <span className="font-extrabold text-base text-emerald-700 dark:text-emerald-300">
                    VERIFIED & APPROVED PASS
                  </span>
                </div>
                <Badge variant="success">Status: {scanResult.status}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500">Student Name:</span>
                  <p className="font-bold text-sm text-slate-900 dark:text-white">{scanResult.studentName}</p>
                </div>
                <div>
                  <span className="text-slate-500">Room Number:</span>
                  <p className="font-bold text-sm text-slate-900 dark:text-white">Room {scanResult.roomNumber}</p>
                </div>
                <div>
                  <span className="text-slate-500">Reason & Destination:</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{scanResult.reason} ({scanResult.destination})</p>
                </div>
                <div>
                  <span className="text-slate-500">Approved By:</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{scanResult.approvedByName}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-emerald-200 dark:border-emerald-800 flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => {
                    updateGatePassStatus(scanResult.id, 'out_now');
                    alert(`Timestamp logged! Student ${scanResult.studentName} marked as EXIT.`);
                  }}
                >
                  Confirm Exit Timestamp
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Visitors Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-rose-500" />
            Currently Active Campus Visitors ({visitors.filter(v => v.status === 'active').length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-slate-100 dark:divide-slate-800">
          {visitors.map((v) => (
            <div key={v.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{v.visitorName} ({v.relation})</p>
                <p className="text-xs text-slate-500">Visiting {v.studentName} (Room {v.roomNumber}) • Phone: {v.visitorPhone}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Checked In: {formatDateTime(v.timeIn)}</p>
              </div>
              {v.status === 'active' ? (
                <Button size="sm" variant="outline" onClick={() => checkOutVisitor(v.id)}>
                  Check Out
                </Button>
              ) : (
                <Badge variant="outline">Checked Out</Badge>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}
