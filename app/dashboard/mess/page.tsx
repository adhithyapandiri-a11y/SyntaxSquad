'use client';

import React, { useState } from 'react';
import { Utensils, Star, Calendar, ThumbsUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useStore } from '@/lib/store/useStore';

export default function MessPage() {
  const { messMenu } = useStore();
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'>('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

  const dayMenu = messMenu.filter((m) => m.dayOfWeek === selectedDay);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Utensils className="w-7 h-7 text-orange-500" />
            Mess Operations & Weekly Food Menu
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            View 7-day meal schedules and student feedback ratings.
          </p>
        </div>
      </div>

      {/* Days Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              selectedDay === day
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 border border-slate-200/80 dark:border-slate-800'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Menu Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dayMenu.length === 0 ? (
          <Card className="col-span-2 p-8 text-center text-xs text-slate-500">
            Standard buffet menu active for {selectedDay}.
          </Card>
        ) : (
          dayMenu.map((m) => (
            <Card key={m.id} hoverEffect>
              <CardHeader>
                <div>
                  <Badge variant="warning" className="capitalize">{m.mealType}</Badge>
                  <CardTitle className="text-lg mt-1 capitalize">{m.dayOfWeek} {m.mealType}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {m.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {m.specialItem && (
                  <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 text-xs font-bold text-orange-800 dark:text-orange-300">
                    🌟 Chef Special: {m.specialItem}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

    </div>
  );
}
