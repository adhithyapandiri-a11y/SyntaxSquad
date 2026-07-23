'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, DoorOpen, CreditCard, AlertCircle, QrCode, UserCheck, 
  TrendingUp, Plus, ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles, Building2
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useStore } from '@/lib/store/useStore';
import { formatCurrency, formatDateTime } from '@/lib/utils';

export default function AdminDashboardPage() {
  const { students, rooms, complaints, gatePasses, payments, visitors, activityLogs } = useStore();

  const totalStudents = students.length;
  const totalBeds = rooms.reduce((acc, r) => acc + r.capacity, 0);
  const occupiedBeds = rooms.reduce((acc, r) => acc + r.occupied, 0);
  const vacantBeds = totalBeds - occupiedBeds;
  const pendingComplaints = complaints.filter((c) => c.status !== 'resolved' && c.status !== 'closed').length;
  const pendingGatePasses = gatePasses.filter((g) => g.status === 'pending').length;
  const totalRevenue = payments.filter((p) => p.status === 'paid').reduce((acc, p) => acc + p.amount, 0);
  const activeVisitors = visitors.filter((v) => v.status === 'active').length;

  // Chart datasets
  const revenueData = [
    { month: 'Feb', revenue: 320000 },
    { month: 'Mar', revenue: 380000 },
    { month: 'Apr', revenue: 410000 },
    { month: 'May', revenue: 390000 },
    { month: 'Jun', revenue: 450000 },
    { month: 'Jul', revenue: 480000 },
  ];

  const complaintTrendData = [
    { category: 'HVAC', count: 12 },
    { category: 'Plumbing', count: 18 },
    { category: 'Electrical', count: 8 },
    { category: 'Wi-Fi', count: 22 },
    { category: 'Furniture', count: 5 },
  ];

  const occupancyPieData = [
    { name: 'Occupied Beds', value: occupiedBeds, color: '#2563EB' },
    { name: 'Vacant Beds', value: vacantBeds, color: '#10B981' },
    { name: 'Maintenance', value: 2, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 text-white shadow-lg shadow-blue-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase">
              Hostel Admin Desk
            </span>
            <span className="text-xs text-blue-100 font-mono">RoomZen OS v2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Hostel Operations Center
          </h1>
          <p className="text-sm text-blue-100 mt-1">
            Real-time occupancy metrics, AI complaint status, revenue, and active gate pass monitoring.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/dashboard/rooms">
            <Button variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-0">
              <Plus className="w-4 h-4 mr-1" /> Assign Room
            </Button>
          </Link>
          <Link href="/dashboard/notices">
            <Button variant="secondary" size="sm" className="bg-white text-blue-700 hover:bg-blue-50 border-0 font-bold">
              <Sparkles className="w-4 h-4 mr-1 text-amber-500" /> Create Notice
            </Button>
          </Link>
        </div>
      </div>

      {/* 8 Overview Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Card hoverEffect>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Students</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{totalStudents}</h3>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +8 this month
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card hoverEffect>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Occupancy Rate</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {Math.round((occupiedBeds / totalBeds) * 100)}%
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {occupiedBeds}/{totalBeds} Beds Filled
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <DoorOpen className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card hoverEffect>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monthly Revenue</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{formatCurrency(totalRevenue)}</h3>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                92% Collected
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card hoverEffect>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Complaints</p>
              <h3 className="text-2xl font-bold text-amber-500 mt-1">{pendingComplaints}</h3>
              <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> AI Triage Active
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Trend Area Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Monthly Revenue Growth</CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">Hostel fee & mess bill collection breakdown</p>
            </div>
            <Badge variant="success">+14.2% YoY</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                  <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={(v) => `₹${v/1000}k`} />
                  <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Occupancy Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Bed Occupancy Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={occupancyPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {occupancyPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full space-y-2 text-xs pt-2">
              {occupancyPieData.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">{item.value} beds</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Bottom Grid: Quick Tables & Live Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Gate Passes Requiring Attention */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-blue-500" />
              Pending Gate Passes
            </CardTitle>
            <Link href="/dashboard/gate-pass" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              View All ({gatePasses.length})
            </Link>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-slate-100 dark:divide-slate-800">
            {gatePasses.slice(0, 3).map((gp) => (
              <div key={gp.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{gp.studentName}</p>
                    <Badge variant={gp.status === 'approved' ? 'success' : 'warning'}>{gp.status}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Destination: {gp.destination} • Room {gp.roomNumber}</p>
                </div>
                <Link href="/dashboard/gate-pass">
                  <Button size="sm" variant="outline">Review</Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Live Activity Stream */}
        <Card>
          <CardHeader>
            <CardTitle>System Activity Log</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activityLogs.slice(0, 4).map((log) => (
              <div key={log.id} className="flex items-start gap-3 text-xs">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 dark:text-white">{log.action}</p>
                  <p className="text-slate-500 mt-0.5">{log.details}</p>
                  <span className="text-[10px] text-slate-400 block mt-1">{formatDateTime(log.timestamp)}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

    </div>
  );
}
