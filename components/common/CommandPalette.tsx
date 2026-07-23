'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, DoorOpen, Users, AlertCircle, QrCode, CreditCard, X, ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store/useStore';

export const CommandPalette: React.FC = () => {
  const router = useRouter();
  const { isCommandPaletteOpen, setCommandPaletteOpen, students, rooms, complaints, gatePasses } = useStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredStudents = query
    ? students.filter((s) => s.fullName.toLowerCase().includes(query.toLowerCase()) || s.studentIdNumber.toLowerCase().includes(query.toLowerCase()))
    : students.slice(0, 3);

  const filteredRooms = query
    ? rooms.filter((r) => r.roomNumber.toLowerCase().includes(query.toLowerCase()))
    : rooms.slice(0, 3);

  const filteredComplaints = query
    ? complaints.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()) || c.category.toLowerCase().includes(query.toLowerCase()))
    : complaints.slice(0, 2);

  const navigateTo = (path: string) => {
    router.push(path);
    setCommandPaletteOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150"
        onClick={() => setCommandPaletteOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-10 overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Bar Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a student name, room number, complaint or page..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-4">
          
          {/* Quick Pages Navigation */}
          <div>
            <p className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quick Actions & Pages</p>
            <div className="grid grid-cols-2 gap-1.5 mt-1">
              {[
                { label: 'Room Matrix & Floor Plan', href: '/dashboard/rooms', icon: DoorOpen },
                { label: 'Student Directory', href: '/dashboard/students', icon: Users },
                { label: 'AI Complaints Board', href: '/dashboard/complaints', icon: AlertCircle },
                { label: 'Gate Pass QR System', href: '/dashboard/gate-pass', icon: QrCode },
                { label: 'Fee Payments', href: '/dashboard/payments', icon: CreditCard },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => navigateTo(item.href)}
                    className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-blue-500" />
                      {item.label}
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Students Section */}
          {filteredStudents.length > 0 && (
            <div>
              <p className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Students</p>
              <div className="space-y-1 mt-1">
                {filteredStudents.map((std) => (
                  <button
                    key={std.id}
                    onClick={() => navigateTo('/dashboard/students')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">{std.fullName}</p>
                      <p className="text-[10px] text-slate-500">{std.studentIdNumber} • Room {std.roomNumber}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-medium">
                      {std.course}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Rooms Section */}
          {filteredRooms.length > 0 && (
            <div>
              <p className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rooms</p>
              <div className="space-y-1 mt-1">
                {filteredRooms.map((rm) => (
                  <button
                    key={rm.id}
                    onClick={() => navigateTo('/dashboard/rooms')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">Room {rm.roomNumber}</p>
                      <p className="text-[10px] text-slate-500">Floor {rm.floor} • {rm.block} • Rent ₹{rm.rentAmount}/mo</p>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                      {rm.occupied}/{rm.capacity} Beds
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between text-[11px] text-slate-400">
          <span>Search RoomZen database</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
