'use client';

import React, { useState } from 'react';
import { 
  AlertCircle, Sparkles, Plus, Clock, CheckCircle2, MessageSquare, Wrench, Send 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AIComplaintModal } from '@/components/complaints/AIComplaintModal';
import { useStore } from '@/lib/store/useStore';
import { formatDateTime } from '@/lib/utils';
import { ComplaintCategory, ComplaintStatus } from '@/types';

export default function ComplaintsPage() {
  const { complaints, addComplaintComment, updateComplaintStatus } = useStore();

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ComplaintCategory | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<ComplaintStatus | 'all'>('all');

  // Comment input state
  const [commentInput, setCommentInput] = useState<Record<string, string>>({});

  const filteredComplaints = complaints.filter((c) => {
    if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
    if (selectedStatus !== 'all' && c.status !== selectedStatus) return false;
    return true;
  });

  const handleAddComment = (complaintId: string) => {
    const text = commentInput[complaintId];
    if (!text) return;
    addComplaintComment(complaintId, text);
    setCommentInput({ ...commentInput, [complaintId]: '' });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <AlertCircle className="w-7 h-7 text-amber-500" />
            AI Maintenance & Complaint Board
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time complaint triage, AI grammar polish, estimated repair duration, and resolution timelines.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setIsAiModalOpen(true)}>
          <Sparkles className="w-4 h-4 mr-1.5 text-amber-400" />
          Raise Complaint with AI
        </Button>
      </div>

      {/* Filters */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white capitalize"
          >
            <option value="all">All Categories</option>
            <option value="electrical">⚡ Electrical</option>
            <option value="plumbing">🚰 Plumbing</option>
            <option value="hvac">❄️ HVAC / AC</option>
            <option value="wifi">📶 Wi-Fi</option>
            <option value="furniture">🪑 Furniture</option>
            <option value="cleanliness">🧹 Housekeeping</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white capitalize"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="assigned">Assigned</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <span className="text-xs font-semibold text-slate-500">
          Showing {filteredComplaints.length} Complaints
        </span>
      </div>

      {/* Complaints List Feed */}
      <div className="space-y-4">
        {filteredComplaints.map((cmp) => (
          <Card key={cmp.id} hoverEffect className="overflow-hidden">
            <CardContent className="p-6 space-y-4">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs capitalize">
                      {cmp.category}
                    </span>
                    <Badge variant={cmp.priority === 'high' || cmp.priority === 'emergency' ? 'danger' : 'warning'}>
                      {cmp.priority} Priority
                    </Badge>
                    <Badge variant={cmp.status === 'resolved' ? 'success' : 'secondary'}>
                      {cmp.status}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">{cmp.title}</h3>
                  <p className="text-xs text-slate-500">
                    Logged by <span className="font-semibold text-slate-800 dark:text-slate-200">{cmp.studentName}</span> (Room {cmp.roomNumber}) • {formatDateTime(cmp.createdAt)}
                  </p>
                </div>

                {cmp.status !== 'resolved' && (
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => updateComplaintStatus(cmp.id, 'resolved', undefined, undefined, 'Marked resolved by user')}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Mark Resolved
                  </Button>
                )}
              </div>

              {/* Body Description & AI Triage */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 space-y-2">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {cmp.description}
                  </p>

                  {cmp.photoUrl && (
                    <img
                      src={cmp.photoUrl}
                      alt="Complaint attachment"
                      className="w-48 h-32 rounded-xl object-cover border border-slate-200 dark:border-slate-800 mt-2"
                    />
                  )}
                </div>

                {/* AI & Staff Card */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/80 text-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>AI Triage Insights</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">{cmp.aiSummary || 'AI auto-categorized.'}</p>
                  
                  {cmp.estimatedFixTime && (
                    <div className="flex items-center gap-1.5 text-emerald-600 font-semibold pt-1">
                      <Clock className="w-3.5 h-3.5" /> Target Fix Time: {cmp.estimatedFixTime}
                    </div>
                  )}

                  {cmp.assignedStaffName && (
                    <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-semibold pt-1">
                      <Wrench className="w-3.5 h-3.5 text-amber-500" /> Assigned: {cmp.assignedStaffName}
                    </div>
                  )}
                </div>
              </div>

              {/* Comments Thread */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Timeline & Comments ({cmp.comments.length})
                </p>

                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {cmp.comments.map((cmt) => (
                    <div key={cmt.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs space-y-1">
                      <div className="flex items-center justify-between font-semibold">
                        <span className="text-slate-900 dark:text-white">{cmt.userName} ({cmt.userRole})</span>
                        <span className="text-[10px] text-slate-400">{formatDateTime(cmt.createdAt)}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">{cmt.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Add Comment Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={commentInput[cmp.id] || ''}
                    onChange={(e) => setCommentInput({ ...commentInput, [cmp.id]: e.target.value })}
                    placeholder="Add an update comment..."
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white"
                  />
                  <Button size="sm" variant="secondary" onClick={() => handleAddComment(cmp.id)}>
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Complaint Modal */}
      <AIComplaintModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />

    </div>
  );
}
