"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  DoorOpen,
  QrCode,
  CreditCard,
  Utensils,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { AuroraBackground } from "@/components/ui/aurora-background";

// Configuration for staggered fade-up animations
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "annual",
  );
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Lenis smooth scrolling setup
    let lenis: any;
    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };
    initLenis();

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (lenis) lenis.destroy();
    };
  }, []);

  const features = [
    {
      icon: DoorOpen,
      title: "Room Matrix",
      description:
        "Visual floor-by-floor room grid with occupancy tracking, bed allocations, and instant vacancy filters.",
    },
    {
      icon: Sparkles,
      title: "AI Triage",
      description:
        "AI categorizes issues (HVAC, Plumbing), determines urgency, and predicts maintenance fix time instantly.",
    },
    {
      icon: QrCode,
      title: "Gate Pass QR",
      description:
        "Students request out-passes. Automated cryptographic QR code generation scannable by gate security.",
    },
    {
      icon: CreditCard,
      title: "Fee Invoicing",
      description:
        "Collect hostel rent and mess fees automatically with on-the-fly PDF receipts & revenue analytics.",
    },
    {
      icon: Utensils,
      title: "Mess Planner",
      description:
        "Dynamic 7-day meal schedules, calorie transparency, and daily meal attendance counters.",
    },
    {
      icon: ShieldCheck,
      title: "Visitor Logs",
      description:
        "Digitize visitor registers with instant check-in/out timestamps and emergency contact lookups.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] font-sans selection:bg-[#0A0A0A] selection:text-white overflow-x-hidden">
      {/* Premium Minimal Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] h-[76px] transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-[rgba(0,0,0,0.06)] shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight">
              RoomZen
            </span>
            <span className="font-serif italic text-lg text-[#757575] mt-0.5">
              OS
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#757575]">
            <a
              href="#features"
              className="hover:text-[#0A0A0A] transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="hover:text-[#0A0A0A] transition-colors"
            >
              Pricing
            </a>
            <a
              href="#footer"
              className="hover:text-[#0A0A0A] transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden md:block text-[14px] font-medium text-[#757575] hover:text-[#0A0A0A] transition-colors"
            >
              Sign In
            </Link>
            <Link href="/dashboard/admin">
              <button className="h-10 px-5 rounded-full bg-[#0A0A0A] text-white text-[14px] font-medium hover:bg-[#1A1A1A] btn-premium">
                Book Demo
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Architectural Background */}
      <div className="absolute inset-0 architectural-bg pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative pt-[160px] pb-[160px] md:pb-[160px] min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-10 overflow-hidden">
        <AuroraBackground />
        <BackgroundPaths />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-[700px] mx-auto flex flex-col items-center"
        >
          <motion.h1
            variants={fadeUpVariants}
            className="text-[clamp(60px,8vw,92px)] font-bold leading-[1.05] tracking-[-0.08em] text-[#0A0A0A]"
          >
            The <span className="font-serif italic font-medium">smarter</span>{" "}
            way to manage hostels and PGs.
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="mt-8 text-[17px] text-[#757575] max-w-[580px] leading-relaxed"
          >
            Replace fragmented tools, spreadsheets, and WhatsApp groups with a
            single unified platform. Manage complaints, gate passes, room
            allocation, and fee payments instantly.
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            className="mt-12 flex flex-col sm:flex-row items-center gap-4"
          >
            <Link href="/dashboard/admin">
              <button className="h-14 px-8 rounded-full bg-[#0A0A0A] text-white text-[16px] font-medium btn-premium flex items-center gap-2">
                Start Free
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/login">
              <button className="h-14 px-8 rounded-full bg-white border border-[rgba(0,0,0,0.06)] text-[#0A0A0A] text-[16px] font-medium hover:bg-slate-50 transition-colors">
                Book Demo
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="relative z-10 mt-24 w-full max-w-[1080px] bg-white rounded-[28px] border border-[rgba(0,0,0,0.06)] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-2 md:p-4"
        >
          <div className="bg-[#FAFAFA] rounded-[20px] overflow-hidden border border-[rgba(0,0,0,0.04)] h-auto p-8 md:p-12">
            <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] pb-8 mb-8">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#E5E5E5]" />
                <div className="w-3 h-3 rounded-full bg-[#E5E5E5]" />
                <div className="w-3 h-3 rounded-full bg-[#E5E5E5]" />
              </div>
              <div className="text-[12px] font-medium text-[#757575]">
                Overview
              </div>
            </div>

            {/* Minimalist Dashboard Representation */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "Occupancy", value: "98%", sub: "428 Students" },
                { label: "Maintenance", value: "3", sub: "Pending Tickets" },
                { label: "Gate Passes", value: "18", sub: "Approved" },
                { label: "Revenue", value: "₹4.2L", sub: "Monthly" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-6 bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                >
                  <p className="text-[13px] text-[#757575] font-medium">
                    {stat.label}
                  </p>
                  <p className="text-[32px] font-semibold tracking-tight mt-2">
                    {stat.value}
                  </p>
                  <p className="text-[12px] text-[#757575] mt-1">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="py-[100px] md:py-[160px] px-6 md:px-10 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="aspect-square w-full max-w-[500px] bg-[#FAFAFA] rounded-full border border-[rgba(0,0,0,0.06)] relative flex items-center justify-center overflow-hidden">
            {/* Geometric Shapes */}
            <div className="absolute w-[60%] h-[60%] border-[1px] border-[#E5E5E5] rounded-full" />
            <div className="absolute w-[40%] h-[40%] bg-white border border-[#E5E5E5] shadow-sm rounded-2xl rotate-12" />
            <div className="absolute w-[30%] h-[30%] bg-white border border-[#E5E5E5] shadow-sm rounded-full -translate-x-12 translate-y-12" />
          </div>

          <div>
            <h2 className="text-[40px] md:text-[56px] font-bold leading-[1.1] tracking-[-0.05em] mb-12">
              Running a hostel shouldn't feel like paperwork.
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Paper Registers",
                  desc: "Lost logs, impossible to search, and prone to damage.",
                },
                {
                  title: "Maintenance Chaos",
                  desc: "Issues buried in group chats with no tracking or accountability.",
                },
                {
                  title: "WhatsApp Spam",
                  desc: "Endless notifications that distract rather than organize.",
                },
              ].map((prob, i) => (
                <div
                  key={i}
                  className="p-8 bg-white border border-[rgba(0,0,0,0.06)] rounded-2xl"
                >
                  <h3 className="text-[18px] font-semibold">{prob.title}</h3>
                  <p className="text-[15px] text-[#757575] mt-2 leading-relaxed">
                    {prob.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        id="features"
        className="py-[100px] md:py-[160px] px-6 md:px-10 max-w-[1280px] mx-auto"
      >
        <div className="mb-20">
          <h2 className="text-[40px] md:text-[56px] font-bold leading-[1.1] tracking-[-0.05em] max-w-[600px]">
            Everything you need. <br />
            Nothing you don't.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="group p-10 rounded-3xl bg-white border border-[rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(0,0,0,0.12)] hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.05)]"
              >
                <div className="w-12 h-12 rounded-full bg-[#FAFAFA] border border-[rgba(0,0,0,0.04)] flex items-center justify-center mb-8 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[20px] font-semibold mb-3">{f.title}</h3>
                <p className="text-[15px] text-[#757575] leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI Section (Dark) */}
      <section className="py-[100px] md:py-[160px] px-6 md:px-10 bg-[#0A0A0A] text-white">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-[48px] md:text-[80px] font-bold leading-[1] tracking-[-0.06em] max-w-[800px] mb-24">
            Intelligence built into the foundation.
          </h2>

          <div className="space-y-12 border-t border-[rgba(255,255,255,0.1)] pt-12">
            {[
              {
                title: "Grammar Polish",
                desc: "Automatically cleans up student complaints for professional reading.",
              },
              {
                title: "Smart Categorization",
                desc: "Instantly routes HVAC, Plumbing, or Wi-Fi issues to the right staff.",
              },
              {
                title: "Time Prediction",
                desc: "Calculates urgency and estimates fix time based on historical data.",
              },
            ].map((ai, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row md:items-center gap-6 md:gap-16 pb-12 border-b border-[rgba(255,255,255,0.1)]"
              >
                <div className="w-12 h-12 shrink-0 rounded-full bg-white/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16">
                  <h3 className="text-[24px] font-medium">{ai.title}</h3>
                  <p className="text-[16px] text-[rgba(255,255,255,0.6)] leading-relaxed">
                    {ai.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-[100px] md:py-[160px] px-6 md:px-10 max-w-[1280px] mx-auto">
        <h2 className="text-[40px] md:text-[56px] font-bold leading-[1.1] tracking-[-0.05em] mb-20">
          Trusted by modern campuses.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "RoomZen completely eliminated our paper registers. Security guards love the QR scanner, and students love not waiting in lines.",
              author: "Dr. Sarah Jenkins",
              role: "Hostel Director",
            },
            {
              quote:
                "The AI complaint triage is incredible. It assigns plumbing issues straight to the plumber without me playing middleman.",
              author: "Arthur Mitchell",
              role: "Chief Warden",
            },
            {
              quote:
                "Fee collection used to take weeks of spreadsheets. Now it's automated, and receipts generate instantly. A massive time saver.",
              author: "Priya Sharma",
              role: "Finance Head",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="flex flex-col justify-between p-10 bg-[#FAFAFA] rounded-3xl border border-[rgba(0,0,0,0.04)]"
            >
              <p className="text-[18px] text-[#0A0A0A] leading-relaxed mb-12">
                "{t.quote}"
              </p>
              <div>
                <p className="text-[15px] font-semibold">{t.author}</p>
                <p className="text-[14px] text-[#757575] mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="py-[100px] md:py-[160px] px-6 md:px-10 max-w-[1280px] mx-auto border-t border-[rgba(0,0,0,0.06)]"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <h2 className="text-[40px] md:text-[56px] font-bold leading-[1.1] tracking-[-0.05em]">
            Simple pricing.
            <br />
            No surprises.
          </h2>
          <div className="flex items-center gap-2 p-1.5 bg-[#FAFAFA] rounded-full border border-[rgba(0,0,0,0.06)]">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-full text-[13px] font-medium transition-colors ${billingCycle === "monthly" ? "bg-white shadow-sm border border-[rgba(0,0,0,0.04)]" : "text-[#757575]"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-5 py-2 rounded-full text-[13px] font-medium transition-colors ${billingCycle === "annual" ? "bg-white shadow-sm border border-[rgba(0,0,0,0.04)]" : "text-[#757575]"}`}
            >
              Annual
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Plan */}
          <div className="p-10 md:p-14 bg-white rounded-3xl border border-[rgba(0,0,0,0.06)] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
            <h3 className="text-[24px] font-semibold">Growth Campus</h3>
            <p className="text-[15px] text-[#757575] mt-2">
              Everything you need to run a modern hostel.
            </p>
            <div className="mt-10 mb-12">
              <span className="text-[64px] font-bold tracking-[-0.05em]">
                {billingCycle === "annual" ? "₹5,999" : "₹6,999"}
              </span>
              <span className="text-[16px] text-[#757575] font-medium ml-2">
                / month
              </span>
            </div>

            <div className="space-y-4 mb-12 flex-1">
              {[
                "Up to 250 Student Beds",
                "AI Complaint Assistant",
                "Gate Pass & QR System",
                "Automated Invoicing & PDF Receipts",
                "Security Guard Gate Scanner",
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#0A0A0A]" strokeWidth={2} />
                  <span className="text-[15px] text-[#757575]">{feat}</span>
                </div>
              ))}
            </div>

            <Link href="/dashboard/admin">
              <button className="w-full h-14 rounded-full bg-[#0A0A0A] text-white text-[16px] font-medium btn-premium">
                Start 14-Day Free Trial
              </button>
            </Link>
          </div>

          {/* Enterprise */}
          <div className="p-10 md:p-14 bg-[#FAFAFA] rounded-3xl border border-[rgba(0,0,0,0.06)] flex flex-col">
            <h3 className="text-[24px] font-semibold">Enterprise</h3>
            <p className="text-[15px] text-[#757575] mt-2">
              For university campuses and massive residential chains.
            </p>
            <div className="mt-10 mb-12">
              <span className="text-[64px] font-bold tracking-[-0.05em]">
                Custom
              </span>
            </div>

            <div className="space-y-4 mb-12 flex-1">
              {[
                "Unlimited Student Capacity",
                "Custom Domain & Branding",
                "Dedicated Account Manager",
                "On-premise / SLA Support",
                "Custom API Integrations",
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#0A0A0A]" strokeWidth={2} />
                  <span className="text-[15px] text-[#757575]">{feat}</span>
                </div>
              ))}
            </div>

            <Link href="/login">
              <button className="w-full h-14 rounded-full bg-white border border-[rgba(0,0,0,0.06)] text-[#0A0A0A] text-[16px] font-medium hover:bg-slate-50 transition-colors">
                Contact Sales
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[100px] md:py-[200px] px-6 text-center max-w-[800px] mx-auto">
        <h2 className="text-[48px] md:text-[80px] font-bold leading-[1.05] tracking-[-0.06em] mb-12">
          Ready to modernize your hostel?
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/dashboard/admin">
            <button className="h-14 px-8 rounded-full bg-[#0A0A0A] text-white text-[16px] font-medium btn-premium w-full sm:w-auto">
              Launch Workspace
            </button>
          </Link>
          <Link href="/login">
            <button className="h-14 px-8 rounded-full bg-white border border-[rgba(0,0,0,0.06)] text-[#0A0A0A] text-[16px] font-medium hover:bg-slate-50 transition-colors w-full sm:w-auto">
              Contact Sales
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="footer"
        className="bg-[#FAFAFA] border-t border-[rgba(0,0,0,0.06)] py-20 px-6 md:px-10"
      >
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="text-[18px] font-semibold tracking-tight text-[#0A0A0A]">
                RoomZen
              </span>
            </Link>
            <p className="text-[13px] text-[#757575]">
              © 2026 RoomZen Inc.
              <br />
              All rights reserved.
            </p>
          </div>
          <div>
            <h4 className="text-[13px] font-semibold text-[#0A0A0A] mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-[13px] text-[#757575] hover:text-[#0A0A0A] transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-[13px] text-[#757575] hover:text-[#0A0A0A] transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/admin"
                  className="text-[13px] text-[#757575] hover:text-[#0A0A0A] transition-colors"
                >
                  Live Demo
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[13px] font-semibold text-[#0A0A0A] mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/login"
                  className="text-[13px] text-[#757575] hover:text-[#0A0A0A] transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-[13px] text-[#757575] hover:text-[#0A0A0A] transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-[13px] text-[#757575] hover:text-[#0A0A0A] transition-colors"
                >
                  API Reference
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[13px] font-semibold text-[#0A0A0A] mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/login"
                  className="text-[13px] text-[#757575] hover:text-[#0A0A0A] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-[13px] text-[#757575] hover:text-[#0A0A0A] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-[13px] text-[#757575] hover:text-[#0A0A0A] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
