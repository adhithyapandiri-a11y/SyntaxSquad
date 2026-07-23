'use client';

import React, { useState } from 'react';
import { Sparkles, AlertCircle, Clock, Wrench, CheckCircle2, Send, Upload } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useStore } from '@/lib/store/useStore';
import { ComplaintCategory, ComplaintPriority } from '@/types';

interface AIComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIComplaintModal: React.FC<AIComplaintModalProps> = ({ isOpen, onClose }) => {
  const { addComplaint, currentUser, students } = useStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ComplaintCategory>('electrical');
  const [priority, setPriority] = useState<ComplaintPriority>('medium');
  const [photoUrl, setPhotoUrl] = useState('');

  // AI state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<{
    estimatedFixTime: string;
    suggestedStaff: string;
    aiSummary: string;
  } | null>(null);

  const currentStudent = students[0] || {
    id: 'std_101',
    fullName: currentUser.fullName,
    roomNumber: 'A-204'
  };

  const handleAiAnalyze = async () => {
    if (!description && !title) return;
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/ai/complaint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, text: description }),
      });
      const data = await res.json();
      if (data.success) {
        setCategory(data.category);
        setPriority(data.priority);
        if (data.polishedDescription) {
          setDescription(data.polishedDescription);
        }
        setAiResult({
          estimatedFixTime: data.estimatedFixTime,
          suggestedStaff: data.suggestedStaff,
          aiSummary: data.aiSummary,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    addComplaint({
      studentId: currentStudent.id,
      studentName: currentStudent.fullName,
      roomNumber: currentStudent.roomNumber || 'A-204',
      title,
      category,
      priority,
      description,
      photoUrl: photoUrl || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500',
      estimatedFixTime: aiResult?.estimatedFixTime || '2 hours',
      aiSummary: aiResult?.aiSummary || 'Student reported room issue.',
      aiSuggestedCategory: category,
      aiSuggestedPriority: priority,
    });

    onClose();
    // Reset form
    setTitle('');
    setDescription('');
    setAiResult(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Raise a Maintenance Complaint"
      subtitle="AI-assisted triage auto-categorizes & estimates repair time."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Title Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
            Complaint Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Broken Fan in Room A-204"
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
          />
        </div>

        {/* Description Input */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Detailed Description *
            </label>
            <button
              type="button"
              onClick={handleAiAnalyze}
              disabled={isAnalyzing || (!description && !title)}
              className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {isAnalyzing ? 'Analyzing with AI...' : 'Auto-Fix & Categorize with AI'}
            </button>
          </div>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what is wrong (e.g. ac is leaking water onto desk and making loud sound)"
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
          />
        </div>

        {/* AI Analysis Insight Card */}
        {aiResult && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-teal-500/10 border border-indigo-500/20 animate-in fade-in">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-indigo-700 dark:text-indigo-300">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>AI Triage Analysis Complete</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500">Auto Category:</span>
                <p className="font-semibold text-slate-900 dark:text-white capitalize">{category}</p>
              </div>
              <div>
                <span className="text-slate-500">Assessed Urgency:</span>
                <p className="font-semibold text-slate-900 dark:text-white capitalize">{priority}</p>
              </div>
              <div>
                <span className="text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-blue-500" /> Est. Fix Time:
                </span>
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">{aiResult.estimatedFixTime}</p>
              </div>
              <div>
                <span className="text-slate-500 flex items-center gap-1">
                  <Wrench className="w-3 h-3 text-amber-500" /> Assigned Team:
                </span>
                <p className="font-semibold text-slate-900 dark:text-white">{aiResult.suggestedStaff}</p>
              </div>
            </div>
          </div>
        )}

        {/* Category & Priority Selectors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white capitalize"
            >
              <option value="electrical">⚡ Electrical</option>
              <option value="plumbing">🚰 Plumbing</option>
              <option value="hvac">❄️ HVAC / AC</option>
              <option value="furniture">🪑 Furniture</option>
              <option value="wifi">📶 Wi-Fi / Network</option>
              <option value="cleanliness">🧹 Housekeeping</option>
              <option value="other">📦 Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Priority Level
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as ComplaintPriority)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white capitalize"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
              <option value="emergency">🚨 Emergency</option>
            </select>
          </div>
        </div>

        {/* Photo URL Input / Simulation */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5" /> Photo Attachment (Optional)
          </label>
          <input
            type="url"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="Paste image URL or use default preview image"
            className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            <Send className="w-4 h-4 mr-1.5" />
            Submit Complaint
          </Button>
        </div>
      </form>
    </Modal>
  );
};
