'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, Sparkles, ArrowRight, ShieldCheck, DoorOpen, AlertCircle, 
  QrCode, CreditCard, Utensils, CheckCircle2, ChevronRight, Users, 
  Star, HelpCircle, Layers, BarChart3, Clock, Zap, Check
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import AuroraBackground from '@/components/ui/aurora-background-1';

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTabRole, setActiveTabRole] = useState<'admin' | 'student' | 'warden'>('admin');

  const stats = [
    { label: 'Gate Passes Verified', value: '50,000+', change: '+24% this month' },
    { label: 'Complaint Resolution Rate', value: '99.4%', change: 'Under 3 hours avg' },
    { label: 'Hostels & Campus Housing', value: '120+', change: 'Across 18 cities' },
    { label: 'Active Students & Staff', value: '25,000+', change: '99.99% Uptime' },
  ];

  const features = [
    {
      icon: DoorOpen,
      color: 'from-blue-500 to-indigo-600',
      title: 'Interactive Room Matrix',
      description: 'Visual floor-by-floor room grid with occupancy tracking, bed allocations, room transfer wizard, and instant vacancy filters.'
    },
    {
      icon: Sparkles,
      color: 'from-amber-500 to-rose-500',
      title: 'AI Complaint Triage',
      description: 'AI automatically cleans up grammar, categorizes issues (HVAC, Plumbing, Wi-Fi), determines urgency, and predicts maintenance fix time.'
    },
    {
      icon: QrCode,
      color: 'from-emerald-500 to-teal-600',
      title: 'Digital Gate Pass & QR',
      description: 'Students request out-passes with guardian verification. Automated QR code pass generation scannable by gate security guards.'
    },
    {
      icon: CreditCard,
      color: 'from-violet-500 to-purple-600',
      title: 'Automated Fee Invoicing',
      description: 'Collect hostel rent, mess fees, and electricity utility bills automatically. Instant PDF receipts & revenue analytics charts.'
    },
    {
      icon: Utensils,
      color: 'from-orange-500 to-amber-600',
      title: 'Weekly Mess Planner',
      description: 'Dynamic 7-day meal menu schedules and student rating feedback.'
    },
    {
      icon: ShieldCheck,
      color: 'from-cyan-500 to-blue-600',
      title: 'Visitor & Security Logs',
      description: 'Digitize visitor registers with instant check-in/out timestamps, relation verification, and emergency contact lookups.'
    }
  ];

  const faqs = [
    {
      q: 'How long does it take to onboard a hostel onto RoomZen?',
      a: 'Most hostels can be fully operational in less than 24 hours. You can import room numbers and student lists via CSV with 1-click.'
    },
    {
      q: 'Does RoomZen support multiple user roles with custom permissions?',
      a: 'Yes! RoomZen includes dedicated dashboards for Hostel Admins/Owners, Students, Wardens, Maintenance Staff, and Security Guards.'
    },
    {
      q: 'How does the AI Complaint Assistant work?',
      a: 'When a student types a complaint, our built-in AI analyzes the raw description, fixes grammar, tags the issue (e.g. Electrical or Plumbing), calculates urgency level, and estimates repair duration for maintenance staff.'
    },
    {
      q: 'Is student gate pass QR verification secure?',
      a: 'Every approved gate pass generates a cryptographic QR code hash. Security guards can scan the QR on a mobile device or tablet at the main gate to log timestamps instantly.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight">RoomZen</span>
              <span className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 uppercase">OS</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#preview" className="hover:text-blue-600 transition-colors">Live Preview</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/dashboard/admin">
              <Button variant="primary" size="sm">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <AuroraBackground className="w-full h-auto min-h-screen">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full pt-32 pb-16">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-8 animate-in fade-in slide-in-from-bottom-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Next-Gen Student Housing Operating System</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1]">
            Run Your Hostel Without the{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-400 bg-clip-text text-transparent">
              Chaos
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Manage complaints, gate passes, room allocation, fee payments, and mess menus from one intelligent AI platform.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard/admin" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto px-8 py-4 text-base">
                Launch Workspace
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 text-base">
                Book a Live Demo
              </Button>
            </Link>
          </div>

          {/* Feature Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Paperless Gate Passes</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> AI Complaint Triage</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Real-time QR Verification</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Multi-Role Auth</span>
          </div>

          {/* Hero App Interface Mockup */}
          <div className="mt-16 relative max-w-5xl mx-auto rounded-3xl p-3 bg-slate-900/10 dark:bg-white/5 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl">
            <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 text-left shadow-2xl">
              
              {/* Mockup Header */}
              <div className="h-10 bg-slate-950 px-4 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-500">roomzen-app.com/dashboard/admin</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">● LIVE DEMO PREVIEW</span>
              </div>

              {/* Mockup Body Preview */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-950/90 text-white">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-xs text-slate-400">Total Students</p>
                  <p className="text-2xl font-bold text-white mt-1">428</p>
                  <span className="text-[10px] text-emerald-400">98% Occupancy</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-xs text-slate-400">Pending Complaints</p>
                  <p className="text-2xl font-bold text-amber-400 mt-1">3</p>
                  <span className="text-[10px] text-slate-400">AI Triage Active</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-xs text-slate-400">Approved Gate Passes</p>
                  <p className="text-2xl font-bold text-blue-400 mt-1">18</p>
                  <span className="text-[10px] text-blue-400">QR Code Ready</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-xs text-slate-400">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">₹4,28,000</p>
                  <span className="text-[10px] text-emerald-400">+12% vs last mo</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </AuroraBackground>

      {/* Stats Counter Section */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">{s.value}</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{s.label}</p>
              <p className="text-xs text-slate-500">{s.change}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Everything You Need</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
            Designed for Modern Student Residences
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-base sm:text-lg">
            Replace fragmented tools, spreadsheets, and WhatsApp groups with a single unified platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${f.color} flex items-center justify-center text-white shadow-md mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Role Preview Widget */}
      <section id="preview" className="py-20 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Interactive Experience</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 tracking-tight">Experience RoomZen for Every Role</h2>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Click a role below to preview how RoomZen adapts specifically for each stakeholder.
          </p>

          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveTabRole('admin')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTabRole === 'admin' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              🏢 Hostel Owner / Admin
            </button>
            <button
              onClick={() => setActiveTabRole('student')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTabRole === 'student' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              🎓 Student Portal
            </button>
            <button
              onClick={() => setActiveTabRole('warden')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTabRole === 'warden' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              🛡️ Warden Control
            </button>
          </div>

          <div className="mt-8 p-8 rounded-3xl bg-slate-950 border border-slate-800 max-w-4xl mx-auto text-left">
            {activeTabRole === 'admin' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-blue-400">Hostel Owner & Admin Dashboard</h3>
                <p className="text-sm text-slate-300">Complete bird-eye view of revenue, total vacant/occupied rooms, monthly billing collection, staff management, and system-wide analytics.</p>
                <Link href="/dashboard/admin">
                  <Button variant="primary" size="sm" className="mt-2">Open Admin Dashboard</Button>
                </Link>
              </div>
            )}
            {activeTabRole === 'student' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-emerald-400">Student Portal & Mobile Workspace</h3>
                <p className="text-sm text-slate-300">Request weekend gate passes with instant QR generation, submit maintenance complaints with AI grammar polish, check today mess menu, and pay fees.</p>
                <Link href="/dashboard/student">
                  <Button variant="success" size="sm" className="mt-2">Open Student Portal</Button>
                </Link>
              </div>
            )}
            {activeTabRole === 'warden' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-indigo-400">Chief Warden Operations</h3>
                <p className="text-sm text-slate-300">Approve or reject student gate passes with automated guardian phone lookup, assign repair tickets to maintenance staff, and check visitor registers.</p>
                <Link href="/dashboard/warden">
                  <Button variant="secondary" size="sm" className="mt-2">Open Warden Desk</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Transparent Pricing</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
            Plans That Scale With Your Housing
          </h2>

          <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800 mt-8">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                billingCycle === 'monthly' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                billingCycle === 'annual' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500'
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Starter Plan */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Starter PG / Hostel</h3>
              <p className="text-xs text-slate-500 mt-1">For small hostels & PGs up to 50 beds.</p>
              <div className="mt-6">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{billingCycle === 'annual' ? '₹2,499' : '₹2,999'}</span>
                <span className="text-xs text-slate-500"> / month</span>
              </div>
              <ul className="mt-6 space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Up to 50 Student Beds</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> AI Complaint Assistant</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Gate Pass & QR System</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Weekly Mess Menu</li>
              </ul>
            </div>
            <Link href="/dashboard/admin" className="mt-8">
              <Button variant="outline" className="w-full">Get Started</Button>
            </Link>
          </div>

          {/* Growth Plan */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-blue-900 to-indigo-950 text-white border-2 border-blue-500 shadow-2xl relative flex flex-col justify-between">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-[10px] font-bold uppercase rounded-full tracking-wider shadow-md">
              MOST POPULAR
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">Growth Campus</h3>
              <p className="text-xs text-blue-200 mt-1">For medium to large hostels up to 250 beds.</p>
              <div className="mt-6">
                <span className="text-4xl font-extrabold text-white">{billingCycle === 'annual' ? '₹5,999' : '₹6,999'}</span>
                <span className="text-xs text-blue-200"> / month</span>
              </div>
              <ul className="mt-6 space-y-3 text-xs text-blue-100">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-400" /> Up to 250 Student Beds</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-400" /> All Starter Features Included</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-400" /> Automated Invoicing & PDF Receipts</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-teal-400" /> Security Guard Gate Pass Scanner</li>
              </ul>
            </div>
            <Link href="/dashboard/admin" className="mt-8">
              <Button variant="primary" className="w-full py-3 bg-blue-500 hover:bg-blue-600">Start 14-Day Free Trial</Button>
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">University Enterprise</h3>
              <p className="text-xs text-slate-500 mt-1">Multi-building campuses with unlimited beds.</p>
              <div className="mt-6">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">Custom</span>
              </div>
              <ul className="mt-6 space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Unlimited Student Capacity</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Custom Domain & Branding</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Dedicated Account Manager</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> On-premise / SLA Support</li>
              </ul>
            </div>
            <Link href="/login" className="mt-8">
              <Button variant="outline" className="w-full">Contact Sales</Button>
            </Link>
          </div>

        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="py-20 bg-slate-100/70 dark:bg-slate-900/50 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left font-bold text-slate-900 dark:text-white text-base"
                >
                  <span>{faq.q}</span>
                  <ChevronRight className={`w-5 h-5 transition-transform ${openFaq === idx ? 'rotate-90 text-blue-500' : 'text-slate-400'}`} />
                </button>
                {openFaq === idx && (
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed animate-in fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center text-white">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-white text-base">RoomZen OS</span>
          </div>

          <p className="text-xs text-slate-500">© 2026 RoomZen Inc. The Smart Operating System for Student Housing.</p>

          <div className="flex gap-6 text-xs font-medium">
            <Link href="/login" className="hover:text-white">Privacy Policy</Link>
            <Link href="/login" className="hover:text-white">Terms of Service</Link>
            <Link href="/login" className="hover:text-white">Contact Support</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
