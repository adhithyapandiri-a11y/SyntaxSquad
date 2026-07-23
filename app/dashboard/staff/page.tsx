'use client';

import React, { useState } from 'react';
import { 
  Wrench, CheckSquare, Clock, CheckCircle2, Upload, AlertCircle, Sparkles 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useStore } from '@/lib/store/useStore';
import { formatDateTime } from '@/lib/utils';

export default function StaffDashboardPage() {
  const { complaints, updateComplaintStatus } = useStore();
  const [selectedComplaint, setSelectedComplaint] = useState<any | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [completionPhoto, setCompletionPhoto] = useState('');

  const handleResolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    updateComplaintStatus(
      selectedComplaint.id,
      'resolved',
      'stf_1',
      'Robert Vance',
      resolutionNotes || 'Fixed successfully. Tested operation.',
      completionPhoto || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500'
    );
    setSelectedComplaint(null);
    setResolutionNotes('');
  };

  return (
    <div className="space-y-6">
      
      {/* Staff Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white shadow-lg shadow-orange-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase">
              Maintenance Staff Workspace
            </span>
            <span className="text-xs text-amber-100">Robert Vance • HVAC Lead</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Assigned Work Orders & Repair Jobs
          </h1>
          <p className="text-sm text-amber-100 mt-1">
            Update work order status, upload repair proof photos, and resolve student complaints.
          </p>
        </div>
      </div>

      {/* Complaints Kanban / List for Staff */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Active Work Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              Active Maintenance Orders ({complaints.filter(c => c.status !== 'resolved').length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-slate-100 dark:divide-slate-800">
            {complaints.filter(c => c.status !== 'resolved').map((cmp) => (
              <div key={cmp.id} className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 capitalize">
                      {cmp.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">{cmp.title}</h4>
                    <p className="text-xs text-slate-500">Room {cmp.roomNumber} • Student: {cmp.studentName}</p>
                  </div>
                  <Badge variant={cmp.priority === 'high' ? 'danger' : 'warning'}>{cmp.priority}</Badge>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300">{cmp.description}</p>

                {cmp.estimatedFixTime && (
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    ⏱️ Target Fix Time: {cmp.estimatedFixTime}
                  </p>
                )}

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateComplaintStatus(cmp.id, 'in_progress')}
                  >
                    Mark In Progress
                  </Button>
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => setSelectedComplaint(cmp)}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Complete & Resolve
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Work History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-500" />
              Completed Repairs Log
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-slate-100 dark:divide-slate-800">
            {complaints.filter(c => c.status === 'resolved').map((cmp) => (
              <div key={cmp.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{cmp.title}</h4>
                  <Badge variant="success">Resolved</Badge>
                </div>
                <p className="text-xs text-slate-500">Room {cmp.roomNumber} • Resolved on {formatDateTime(cmp.resolvedAt || cmp.createdAt)}</p>
                {cmp.resolutionNotes && (
                  <p className="text-xs text-emerald-600 font-medium">Notes: {cmp.resolutionNotes}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

      {/* Completion Modal */}
      {selectedComplaint && (
        <Modal
          isOpen={!!selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          title="Mark Job Order as Resolved"
          subtitle={`Upload completion photo & resolution note for ${selectedComplaint.title}`}
        >
          <form onSubmit={handleResolveSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Resolution Summary & Technician Notes
              </label>
              <textarea
                required
                rows={3}
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                placeholder="e.g. Replaced compressor valve and recharged refrigerant gas. Tested cooling."
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Completion Photo URL (Optional)
              </label>
              <input
                type="url"
                value={completionPhoto}
                onChange={(e) => setCompletionPhoto(e.target.value)}
                placeholder="Paste proof image URL or use default"
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="ghost" onClick={() => setSelectedComplaint(null)}>Cancel</Button>
              <Button type="submit" variant="success">Submit Completion Report</Button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
}
