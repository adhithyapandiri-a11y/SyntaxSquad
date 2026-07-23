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
        className="fixed inset-0 bg-[#0A0A0A]/10 backdrop-blur-sm animate-in fade-in duration-150"
        onClick={() => setCommandPaletteOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-[rgba(0,0,0,0.06)] z-10 overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Bar Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-[rgba(0,0,0,0.04)]">
          <Search className="w-5 h-5 text-[#757575] mr-3" strokeWidth={1.5} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a student name, room number, complaint or page..."
            className="w-full bg-transparent text-sm text-[#0A0A0A] placeholder:text-[#757575] focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1.5 text-[#757575] hover:text-[#0A0A0A] rounded-lg hover:bg-[#FAFAFA]"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-4">
          
          {/* Quick Pages Navigation */}
          <div>
            <p className="px-3 py-1 text-[10px] font-medium text-[#757575] uppercase tracking-tight">Quick Actions & Pages</p>
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
                    className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#757575] rounded-xl hover:bg-[#FAFAFA] hover:text-[#0A0A0A] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-[#757575]" strokeWidth={1.5} />
                      {item.label}
                    </span>
                    <ArrowRight className="w-3 h-3 text-[#757575]" strokeWidth={1.5} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Students Section */}
          {filteredStudents.length > 0 && (
            <div>
              <p className="px-3 py-1 text-[10px] font-medium text-[#757575] uppercase tracking-tight">Students</p>
              <div className="space-y-1 mt-1">
                {filteredStudents.map((std) => (
                  <button
                    key={std.id}
                    onClick={() => navigateTo('/dashboard/students')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-[#FAFAFA] transition-colors"
                  >
                    <div>
                      <p className="text-xs font-medium text-[#0A0A0A]">{std.fullName}</p>
                      <p className="text-[10px] text-[#757575]">{std.studentIdNumber} • Room {std.roomNumber}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-[rgba(0,0,0,0.06)] bg-white text-[#757575] font-medium">
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
              <p className="px-3 py-1 text-[10px] font-medium text-[#757575] uppercase tracking-tight">Rooms</p>
              <div className="space-y-1 mt-1">
                {filteredRooms.map((rm) => (
                  <button
                    key={rm.id}
                    onClick={() => navigateTo('/dashboard/rooms')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-[#FAFAFA] transition-colors"
                  >
                    <div>
                      <p className="text-xs font-medium text-[#0A0A0A]">Room {rm.roomNumber}</p>
                      <p className="text-[10px] text-[#757575]">Floor {rm.floor} • {rm.block} • Rent ₹{rm.rentAmount}/mo</p>
                    </div>
                    <span className="text-[10px] font-medium text-[#757575]">
                      {rm.occupied}/{rm.capacity} Beds
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-[rgba(0,0,0,0.04)] bg-[#FAFAFA] flex items-center justify-between text-[11px] text-[#757575]">
          <span>Search RoomZen database</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
