'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, CheckCheck, User, Shield, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useStore } from '@/lib/store/useStore';
import { formatDateTime } from '@/lib/utils';

export default function ChatPage() {
  const { chatMessages, sendChatMessage, currentUser, activeRole } = useStore();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <MessageSquare className="w-7 h-7 text-blue-600" />
            Live Student ↔ Warden Communication Chat
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Instant messaging channel between students and hostel administration with seen status.
          </p>
        </div>
      </div>

      {/* Chat Container */}
      <Card className="h-[600px] flex flex-col justify-between overflow-hidden">
        
        {/* Chat Top Bar */}
        <CardHeader className="bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Hostel Warden Desk</h4>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  ● Online • Instant Warden AI Response Enabled
                </p>
              </div>
            </div>
            <Badge variant="primary">Role: {activeRole.toUpperCase()}</Badge>
          </div>
        </CardHeader>

        {/* Chat Feed */}
        <CardContent className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/40 dark:bg-slate-950/40">
          {chatMessages.map((msg) => {
            const isMe = msg.senderRole === activeRole;
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400">
                  <span>{msg.senderName}</span>
                  <span>•</span>
                  <span>{formatDateTime(msg.timestamp)}</span>
                </div>
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    isMe
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-bl-none'
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400">
                  <CheckCheck className="w-3 h-3 text-blue-500" />
                  <span>Seen</span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Warden Mitchell is typing a response...</span>
            </div>
          )}
        </CardContent>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form onSubmit={handleSend} className="flex gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message to warden or admin..."
              className="flex-1 px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
            />
            <Button type="submit" variant="primary">
              <Send className="w-4 h-4 mr-1" /> Send Message
            </Button>
          </form>
        </div>

      </Card>

    </div>
  );
}
