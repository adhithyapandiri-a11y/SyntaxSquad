"use client";

import React, { useState } from "react";
import {
  Settings,
  User,
  Moon,
  Sun,
  Shield,
  Bell,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/lib/store/useStore";

export default function SettingsPage() {
  const { currentUser, theme, toggleTheme, activeRole } = useStore();
  const [fullName, setFullName] = useState(currentUser.fullName);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone || "+1 (555) 234-5678");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#0A0A0A] tracking-[-0.05em] flex items-center gap-2.5 font-sans">
          <Settings className="w-7 h-7 text-[#0A0A0A]" strokeWidth={1.5} />
          Workspace & Profile Settings
        </h1>
        <p className="text-sm text-[#757575] mt-1 font-sans">
          Manage your profile preferences, dark mode theme, notification alerts,
          and security.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-white border border-[rgba(0,0,0,0.06)] text-[#0A0A0A] flex items-center gap-2 text-xs font-bold animate-in fade-in shadow-[0_2px_8px_rgba(0,0,0,0.02)] font-sans">
          <CheckCircle2 className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />{" "}
          Settings updated successfully!
        </div>
      )}

      {/* Profile Form */}
      <Card className="bg-white border border-[rgba(0,0,0,0.06)] rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] font-sans">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base text-[#0A0A0A] tracking-[-0.05em]">
            <User className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />{" "}
            Account Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-[rgba(0,0,0,0.06)]">
              <img
                src={
                  currentUser.avatarUrl ||
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
                }
                alt={currentUser.fullName}
                className="w-16 h-16 rounded-2xl object-cover border border-[rgba(0,0,0,0.06)]"
              />
              <div>
                <Button size="sm" variant="outline" type="button">
                  Change Avatar
                </Button>
                <p className="text-[11px] text-[#757575] mt-1">
                  Role:{" "}
                  <span className="font-bold text-[#0A0A0A] capitalize">
                    {activeRole}
                  </span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#757575] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAFA] text-[#0A0A0A] border border-[rgba(0,0,0,0.06)] rounded-xl focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#757575] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAFA] text-[#0A0A0A] border border-[rgba(0,0,0,0.06)] rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#757575] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAFA] text-[#0A0A0A] border border-[rgba(0,0,0,0.06)] rounded-xl focus:outline-none"
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Preferences & Appearance */}
      <Card className="bg-white border border-[rgba(0,0,0,0.06)] rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] font-sans">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base text-[#0A0A0A] tracking-[-0.05em]">
            {theme === "dark" ? (
              <Moon className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
            ) : (
              <Sun className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
            )}
            Appearance & Theme Mode
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-[#0A0A0A]">Dark Mode Theme</p>
            <p className="text-xs text-[#757575]">
              Currently active theme:{" "}
              <span className="font-semibold capitalize">{theme}</span>
            </p>
          </div>
          <Button variant="outline" onClick={toggleTheme}>
            Switch to {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
