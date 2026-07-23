'use client';

import React, { useState } from 'react';
import { 
  DoorOpen, Plus, Users, Search, Filter, ShieldCheck, CheckCircle2, ArrowRightLeft, UserMinus 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useStore } from '@/lib/store/useStore';
import { formatCurrency } from '@/lib/utils';
import { Room } from '@/types';

export default function RoomsPage() {
  const { rooms, students, allocateRoom, vacateRoom } = useStore();

  const [selectedFloor, setSelectedFloor] = useState<number | 'all'>('all');
  const [selectedBlock, setSelectedBlock] = useState<string | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Allocation Modal State
  const [allocateModalRoom, setAllocateModalRoom] = useState<Room | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  const filteredRooms = rooms.filter((r) => {
    if (selectedFloor !== 'all' && r.floor !== selectedFloor) return false;
    if (selectedBlock !== 'all' && r.block !== selectedBlock) return false;
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (searchQuery && !r.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleAllocateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allocateModalRoom || !selectedStudentId) return;
    allocateRoom(allocateModalRoom.id, selectedStudentId);
    setAllocateModalRoom(null);
    setSelectedStudentId('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <DoorOpen className="w-7 h-7 text-blue-600" />
            Hostel Room & Floor Plan Matrix
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Visual bed allocation, floor occupancy, room transfers, and maintenance tracking.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search room number..."
              className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white w-48"
            />
          </div>

          <select
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white"
          >
            <option value="all">All Floors</option>
            <option value="1">Floor 1</option>
            <option value="2">Floor 2</option>
            <option value="3">Floor 3</option>
          </select>

          <select
            value={selectedBlock}
            onChange={(e) => setSelectedBlock(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white"
          >
            <option value="all">All Blocks</option>
            <option value="Block A">Block A</option>
            <option value="Block B">Block B</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white capitalize"
          >
            <option value="all">All Statuses</option>
            <option value="available">Available</option>
            <option value="full">Full</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Available</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Occupied</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Maintenance</span>
        </div>
      </div>

      {/* Visual Floor Matrix Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => {
          const isFull = room.occupied >= room.capacity;
          return (
            <Card key={room.id} hoverEffect className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Room {room.roomNumber}</CardTitle>
                    <p className="text-xs text-slate-500">Floor {room.floor} • {room.block}</p>
                  </div>
                  <Badge variant={room.status === 'full' ? 'primary' : room.status === 'available' ? 'success' : 'warning'}>
                    {room.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Bed Capacity Indicator */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Beds Occupancy</span>
                    <span className="font-bold text-slate-900 dark:text-white">{room.occupied} / {room.capacity} Beds</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isFull ? 'bg-blue-600' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${(room.occupied / room.capacity) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Occupants List */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Current Occupants</p>
                  {room.occupants && room.occupants.length > 0 ? (
                    room.occupants.map((occ) => (
                      <div key={occ.id} className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 border text-xs">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{occ.name}</p>
                          <p className="text-[10px] text-slate-500">{occ.course}</p>
                        </div>
                        <button
                          onClick={() => vacateRoom(room.id, occ.id)}
                          className="text-[10px] text-rose-500 font-semibold hover:underline flex items-center gap-0.5"
                          title="Vacate bed"
                        >
                          <UserMinus className="w-3 h-3" /> Vacate
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">No students allocated yet.</p>
                  )}
                </div>

                {/* Amenities Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {room.amenities.map((a, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {a}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{formatCurrency(room.rentAmount)} / mo</span>
                  {!isFull && room.status !== 'maintenance' && (
                    <Button size="sm" variant="primary" onClick={() => setAllocateModalRoom(room)}>
                      + Assign Student
                    </Button>
                  )}
                </div>

              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Allocate Student Modal */}
      {allocateModalRoom && (
        <Modal
          isOpen={!!allocateModalRoom}
          onClose={() => setAllocateModalRoom(null)}
          title={`Assign Student to Room ${allocateModalRoom.roomNumber}`}
          subtitle={`Select an unallocated student for Floor ${allocateModalRoom.floor}, ${allocateModalRoom.block}`}
        >
          <form onSubmit={handleAllocateSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Select Student
              </label>
              <select
                required
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white"
              >
                <option value="">-- Choose Student --</option>
                {students.map((std) => (
                  <option key={std.id} value={std.id}>
                    {std.fullName} ({std.studentIdNumber}) - {std.course}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="ghost" onClick={() => setAllocateModalRoom(null)}>Cancel</Button>
              <Button type="submit" variant="primary">Confirm Bed Allocation</Button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
}
