"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  DoorOpen,
  Sparkles,
  QrCode,
  CreditCard,
  Utensils,
  Plus,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  Download,
  Shield,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AIComplaintModal } from "@/components/complaints/AIComplaintModal";
import { useStore } from "@/lib/store/useStore";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function StudentDashboardPage() {
  const {
    students,
    complaints,
    gatePasses,
    payments,
    messMenu,
    announcements,
    markPaymentPaid,
  } = useStore();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [selectedPassForQr, setSelectedPassForQr] = useState<any | null>(null);

  const currentStudent = students[0] || {
    fullName: "Alex Rivera",
    studentIdNumber: "UN-2024-1001",
    roomNumber: "A-204",
    floor: 2,
    block: "Block A",
    course: "B.Tech Computer Science",
    batch: "2022-2026",
  };

  const studentComplaints = complaints.filter(
    (c) => c.studentId === currentStudent.id || c.studentName.includes("Alex"),
  );
  const studentPasses = gatePasses.filter(
    (g) => g.studentId === currentStudent.id || g.studentName.includes("Alex"),
  );
  const studentPayments = payments.filter(
    (p) => p.studentId === currentStudent.id || p.studentName.includes("Alex"),
  );

  const todayMenu =
    messMenu.find((m) => m.dayOfWeek === "Monday") || messMenu[0];

  return (
    <div className="space-y-6 font-sans">
      {/* Student Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[rgba(0,0,0,0.06)] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
            alt={currentStudent.fullName}
            className="w-16 h-16 rounded-2xl border border-[rgba(0,0,0,0.06)] object-cover grayscale"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#FAFAFA] border border-[rgba(0,0,0,0.04)] text-[#0A0A0A] text-xs font-bold uppercase">
                Student Workspace
              </span>
              <span className="text-xs text-[#757575] font-mono">
                {currentStudent.studentIdNumber}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.05em] text-[#0A0A0A] mt-1">
              Welcome, {currentStudent.fullName}!
            </h1>
            <p className="text-sm text-[#757575] mt-0.5">
              Room {currentStudent.roomNumber} • {currentStudent.course} (
              {currentStudent.batch})
            </p>
          </div>
        </div>

        {/* Quick Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            onClick={() => setIsAiModalOpen(true)}
            variant="secondary"
            size="sm"
            className="bg-[#0A0A0A] text-white hover:bg-[#222222] border border-[rgba(0,0,0,0.06)] shadow-sm font-bold"
          >
            <Sparkles className="w-4 h-4 mr-1" strokeWidth={1.5} />
            Raise AI Complaint
          </Button>
          <Link href="/dashboard/gate-pass">
            <Button
              variant="secondary"
              size="sm"
              className="bg-[#FAFAFA] hover:bg-[#F0F0F0] text-[#0A0A0A] border border-[rgba(0,0,0,0.06)] shadow-sm"
            >
              <QrCode className="w-4 h-4 mr-1" strokeWidth={1.5} /> Request Gate
              Pass
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid Row 1: Active Passes & Room Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Room Card */}
        <Card
          hoverEffect
          className="bg-white border border-[rgba(0,0,0,0.06)] rounded-2xl shadow-sm"
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0A0A0A] tracking-tight font-bold">
              <DoorOpen className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
              Room Metadata
            </CardTitle>
            <Badge
              variant="primary"
              className="bg-[#FAFAFA] border border-[rgba(0,0,0,0.06)] text-[#0A0A0A]"
            >
              Active Resident
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex justify-between border-b border-[rgba(0,0,0,0.04)] pb-2">
              <span className="text-[#757575]">Room Number</span>
              <span className="font-bold text-[#0A0A0A]">
                {currentStudent.roomNumber}
              </span>
            </div>
            <div className="flex justify-between border-b border-[rgba(0,0,0,0.04)] pb-2">
              <span className="text-[#757575]">Floor & Block</span>
              <span className="font-bold text-[#0A0A0A]">
                Floor {currentStudent.floor}, {currentStudent.block}
              </span>
            </div>
            <div className="flex justify-between border-b border-[rgba(0,0,0,0.04)] pb-2">
              <span className="text-[#757575]">Roommate</span>
              <span className="font-bold text-[#0A0A0A]">Sophia Martinez</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#757575]">Wi-Fi Network</span>
              <span className="font-bold text-[#0A0A0A]">RoomZen_5G_A204</span>
            </div>
          </CardContent>
        </Card>

        {/* Gate Pass Card */}
        <Card className="md:col-span-2 bg-white border border-[rgba(0,0,0,0.06)] rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0A0A0A] tracking-tight font-bold">
              <QrCode className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
              My Digital Gate Passes
            </CardTitle>
            <Link
              href="/dashboard/gate-pass"
              className="text-xs font-semibold text-[#757575] hover:text-[#0A0A0A] transition-colors"
            >
              Request Out-Pass
            </Link>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-[rgba(0,0,0,0.04)]">
            {studentPasses.map((pass) => (
              <div
                key={pass.id}
                className="p-4 flex items-center justify-between hover:bg-[#FAFAFA] transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-[#0A0A0A]">
                      {pass.reason}
                    </p>
                    <Badge
                      variant={
                        pass.status === "approved" ? "success" : "warning"
                      }
                      className="bg-[#FAFAFA] border border-[rgba(0,0,0,0.06)] text-[#0A0A0A]"
                    >
                      {pass.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#757575] mt-0.5">
                    Destination: {pass.destination} • Valid until{" "}
                    {formatDate(pass.returnDate)}
                  </p>
                </div>
                {pass.status === "approved" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[rgba(0,0,0,0.06)] text-[#0A0A0A] hover:bg-[#FAFAFA]"
                    onClick={() => setSelectedPassForQr(pass)}
                  >
                    View QR Pass
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Grid Row 2: Complaints & Mess Menu */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Complaints */}
        <Card className="bg-white border border-[rgba(0,0,0,0.06)] rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0A0A0A] tracking-tight font-bold">
              <AlertCircle
                className="w-5 h-5 text-[#0A0A0A]"
                strokeWidth={1.5}
              />
              My Complaints Status
            </CardTitle>
            <Button
              size="sm"
              variant="ghost"
              className="text-[#0A0A0A] hover:bg-[#FAFAFA]"
              onClick={() => setIsAiModalOpen(true)}
            >
              + Raise New
            </Button>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-[rgba(0,0,0,0.04)]">
            {studentComplaints.map((cmp) => (
              <div
                key={cmp.id}
                className="p-4 space-y-2 hover:bg-[#FAFAFA] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0A0A0A]">
                    {cmp.title}
                  </span>
                  <Badge
                    variant={cmp.status === "resolved" ? "success" : "warning"}
                    className="bg-[#FAFAFA] border border-[rgba(0,0,0,0.06)] text-[#0A0A0A]"
                  >
                    {cmp.status}
                  </Badge>
                </div>
                <p className="text-xs text-[#757575] line-clamp-2">
                  {cmp.description}
                </p>
                {cmp.estimatedFixTime && (
                  <div className="flex items-center gap-2 text-[11px] text-[#0A0A0A] font-medium">
                    <Clock className="w-3.5 h-3.5" strokeWidth={1.5} /> Est. Fix
                    Time: {cmp.estimatedFixTime}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mess Menu & Payments */}
        <Card className="bg-white border border-[rgba(0,0,0,0.06)] rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0A0A0A] tracking-tight font-bold">
              <Utensils className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
              Today's Mess Schedule ({todayMenu.dayOfWeek})
            </CardTitle>
            <Link
              href="/dashboard/mess"
              className="text-xs font-semibold text-[#757575] hover:text-[#0A0A0A] transition-colors"
            >
              Full Menu
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[rgba(0,0,0,0.04)]">
              <span className="text-xs font-bold text-[#757575] uppercase">
                {todayMenu.mealType} Special
              </span>
              <p className="text-sm font-semibold text-[#0A0A0A] mt-1">
                {todayMenu.items.join(" • ")}
              </p>
              {todayMenu.specialItem && (
                <span className="text-[11px] text-[#0A0A0A] font-bold mt-1 block">
                  Chef Special: {todayMenu.specialItem}
                </span>
              )}
            </div>

            {/* Fees Widget */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#757575]">
                  Pending Invoices
                </span>
                <Link
                  href="/dashboard/payments"
                  className="text-xs text-[#0A0A0A] font-semibold hover:underline"
                >
                  View Payments
                </Link>
              </div>
              {studentPayments
                .filter((p) => p.status === "pending")
                .map((pay) => (
                  <div
                    key={pay.id}
                    className="p-3 rounded-xl bg-[#FAFAFA] border border-[rgba(0,0,0,0.04)] flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#0A0A0A]">
                        {pay.title}
                      </p>
                      <p className="text-[11px] text-[#757575]">
                        Due {formatDate(pay.dueDate)}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="primary"
                      className="bg-[#0A0A0A] text-white hover:bg-[#222222]"
                      onClick={() => markPaymentPaid(pay.id, "UPI")}
                    >
                      Pay {formatCurrency(pay.amount)}
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Complaint Modal */}
      <AIComplaintModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
    </div>
  );
}
