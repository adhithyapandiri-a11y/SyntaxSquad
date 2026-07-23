'use client';

import React, { useState } from 'react';
import { Megaphone, Plus, Bell, AlertTriangle, Info, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useStore } from '@/lib/store/useStore';
import { formatDateTime } from '@/lib/utils';
import { NoticePriority } from '@/types';

export default function NoticesPage() {
  const { announcements, addAnnouncement } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<NoticePriority>('normal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAnnouncement({
      title,
      content,
      priority,
      audience: 'all',
    });
    setIsModalOpen(false);
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0A0A0A] tracking-[-0.05em] flex items-center gap-2.5">
            <Megaphone className="w-7 h-7 text-[#0A0A0A]" strokeWidth={1.5} />
            Hostel Announcements & Notice Board
          </h1>
          <p className="text-sm text-[#757575] mt-1">
            Broadcast emergency alerts, maintenance schedules, and student council notices.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-1.5 text-white" strokeWidth={1.5} /> Publish New Notice
        </Button>
      </div>

      {/* Notices Feed */}
      <div className="space-y-4">
        {announcements.map((ann) => (
          <Card key={ann.id} hoverEffect className="overflow-hidden">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={ann.priority === 'emergency' ? 'danger' : ann.priority === 'important' ? 'warning' : 'primary'}>
                    {ann.priority.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-[#757575]">Target Audience: {ann.audience}</span>
                </div>
                <span className="text-xs text-[#757575]">{formatDateTime(ann.createdAt)}</span>
              </div>

              <h3 className="text-lg font-bold text-[#0A0A0A] tracking-tight">{ann.title}</h3>
              <p className="text-sm text-[#757575] leading-relaxed">{ann.content}</p>

              <div className="pt-4 border-t border-[rgba(0,0,0,0.06)] text-xs text-[#757575] flex items-center justify-between">
                <span>Published by {ann.createdByName}</span>
                <span className="text-[#0A0A0A] font-semibold flex items-center gap-1">
                  <Bell className="w-3.5 h-3.5 text-[#0A0A0A]" strokeWidth={1.5} /> Delivered to all active residents
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Notice Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Publish Hostel Announcement"
          subtitle="Broadcast notice to student dashboards"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#757575] mb-1">
                Notice Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Scheduled High-Speed Fiber Internet Maintenance"
                className="w-full px-3 py-2 text-sm bg-[#FAFAFA] border border-[rgba(0,0,0,0.06)] rounded-2xl focus:outline-none text-[#0A0A0A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#757575] mb-1">
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as NoticePriority)}
                className="w-full px-3 py-2 text-sm bg-[#FAFAFA] border border-[rgba(0,0,0,0.06)] rounded-2xl focus:outline-none text-[#0A0A0A] capitalize"
              >
                <option value="normal">Normal Announcement</option>
                <option value="important">Important Notice</option>
                <option value="emergency">🚨 Emergency Alert</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#757575] mb-1">
                Announcement Details *
              </label>
              <textarea
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type your notice text here..."
                className="w-full px-3 py-2 text-sm bg-[#FAFAFA] border border-[rgba(0,0,0,0.06)] rounded-2xl focus:outline-none text-[#0A0A0A]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-[rgba(0,0,0,0.06)]">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary">Broadcast Notice</Button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
}
