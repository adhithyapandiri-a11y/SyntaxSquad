'use client';

import React, { useState } from 'react';
import { 
  Users, UserPlus, Search, Download, Upload, Phone, Mail, 
  Trash2, Edit, ShieldAlert, FileText, CheckCircle2 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useStore } from '@/lib/store/useStore';
import { Student } from '@/types';

export default function StudentsPage() {
  const { students, addStudent, deleteStudent } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentForView, setSelectedStudentForView] = useState<Student | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Student Form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [studentIdNumber, setStudentIdNumber] = useState('');
  const [course, setCourse] = useState('B.Tech CS');
  const [batch, setBatch] = useState('2023-2027');
  const [roomNumber, setRoomNumber] = useState('A-102');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  const filteredStudents = students.filter((s) =>
    s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.studentIdNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStudent({
      userId: `usr_new_${Date.now()}`,
      fullName,
      email,
      phone,
      studentIdNumber: studentIdNumber || `UN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      roomId: 'rm_102',
      roomNumber,
      floor: 1,
      block: 'Block A',
      course,
      batch,
      status: 'active',
      emergencyContact: {
        name: emergencyName || 'Guardian',
        phone: emergencyPhone || '+1 (555) 000-1122',
        relation: 'Parent',
      },
      parentDetails: {
        name: emergencyName || 'Guardian',
        phone: emergencyPhone || '+1 (555) 000-1122',
        email: email,
      },
    });

    setIsAddModalOpen(false);
    // Reset
    setFullName('');
    setEmail('');
    setPhone('');
  };

  const exportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['ID,Name,Email,Room,Course,Batch,Phone']
        .concat(students.map((s) => `${s.studentIdNumber},${s.fullName},${s.email},${s.roomNumber},${s.course},${s.batch},${s.phone}`))
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'uninest_students_export.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-7 h-7 text-blue-600" />
            Student Directory & Profiles
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage student enrollments, room assignments, emergency contacts, and CSV exports.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="w-4 h-4 mr-1.5" /> Export CSV
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsAddModalOpen(true)}>
            <UserPlus className="w-4 h-4 mr-1.5" /> Enrol New Student
          </Button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-4 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student name, ID number, course..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
          />
        </div>
        <span className="text-xs font-semibold text-slate-500">{filteredStudents.length} Students Registered</span>
      </div>

      {/* Student Data Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">ID Number</th>
                <th className="p-4">Room</th>
                <th className="p-4">Course & Batch</th>
                <th className="p-4">Emergency Contact</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredStudents.map((std) => (
                <tr key={std.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-500/10 text-blue-600 font-bold flex items-center justify-center">
                        {std.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">{std.fullName}</p>
                        <p className="text-[11px] text-slate-500">{std.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-semibold text-slate-700 dark:text-slate-300">
                    {std.studentIdNumber}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold">
                      Room {std.roomNumber}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{std.course}</p>
                    <p className="text-[10px] text-slate-500">{std.batch}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{std.emergencyContact.name}</p>
                    <p className="text-[10px] text-emerald-600">{std.emergencyContact.phone}</p>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => setSelectedStudentForView(std)}>
                        View Profile
                      </Button>
                      <button
                        onClick={() => deleteStudent(std.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg transition-colors"
                        title="Delete Student"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* View Student Profile Modal */}
      {selectedStudentForView && (
        <Modal
          isOpen={!!selectedStudentForView}
          onClose={() => setSelectedStudentForView(null)}
          title={`Student Profile: ${selectedStudentForView.fullName}`}
          subtitle={`ID: ${selectedStudentForView.studentIdNumber} • Enrolled: ${selectedStudentForView.joinedDate}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Academic Info</h4>
              <p>Course: <span className="font-semibold">{selectedStudentForView.course}</span></p>
              <p>Batch Year: <span className="font-semibold">{selectedStudentForView.batch}</span></p>
              <p>Assigned Room: <span className="font-semibold">Room {selectedStudentForView.roomNumber} (Floor {selectedStudentForView.floor})</span></p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 text-emerald-900 dark:text-emerald-300 space-y-1">
              <h4 className="font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> Emergency & Guardian Contacts
              </h4>
              <p>Emergency Contact: <span className="font-bold">{selectedStudentForView.emergencyContact.name} ({selectedStudentForView.emergencyContact.relation})</span></p>
              <p>Phone: <span className="font-bold font-mono">{selectedStudentForView.emergencyContact.phone}</span></p>
              <p>Parent Name: <span className="font-semibold">{selectedStudentForView.parentDetails.name}</span></p>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Enrol New Student"
          subtitle="Add student details into RoomZen system"
        >
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Jordan Miller"
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl focus:outline-none dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jordan@university.edu"
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl focus:outline-none dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl focus:outline-none dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Course
                </label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl focus:outline-none dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Assign Room
                </label>
                <input
                  type="text"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl focus:outline-none dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary">Enrol Student</Button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
}
