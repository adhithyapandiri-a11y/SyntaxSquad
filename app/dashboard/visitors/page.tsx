"use client";
import React, { useState } from "react";
import { UserCheck, Plus, Clock, Search, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { useStore } from "@/lib/store/useStore";
import { formatDateTime } from "@/lib/utils";
export default function VisitorsPage() {
  const { visitors, checkInVisitor, checkOutVisitor, students } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [relation, setRelation] = useState("Parent");
  const [purpose, setPurpose] = useState("");
  const [studentId, setStudentId] = useState("std_101");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const std = students.find((s) => s.id === studentId) || students[0];
    checkInVisitor({
      studentId: std.id,
      studentName: std.fullName,
      roomNumber: std.roomNumber,
      visitorName,
      visitorPhone,
      relation,
      purpose: purpose || "General Visit",
    });
    setIsModalOpen(false);
    setVisitorName("");
    setVisitorPhone("");
    setPurpose("");
  };
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <div>
          
          <h1 className="text-2xl font-extrabold text-[#0A0A0A] tracking-[-0.05em] flex items-center gap-2.5">
            
            <UserCheck
              className="w-7 h-7 text-[#0A0A0A]"
              strokeWidth={1.5}
            />
            Visitor Entry Register & Check-In
          </h1>
          <p className="text-sm text-[#757575] mt-1">
            
            Digitized visitor entry logs with timestamp check-ins and security
            check-outs.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
        >
          
          <Plus className="w-4 h-4 mr-1.5" strokeWidth={1.5} /> Check-In New
          Visitor
        </Button>
      </div>
      {/* Visitors Data Table */}
      <Card className="bg-white border border-[rgba(0,0,0,0.06)] rounded-2xl p-6">
        
        <CardContent className="p-0 overflow-x-auto">
          
          <table className="w-full text-left text-xs">
            
            <thead className="bg-[#FAFAFA] text-[#757575] font-bold uppercase border-b border-[rgba(0,0,0,0.06)] ">
              
              <tr>
                
                <th className="p-4">Visitor</th>
                <th className="p-4">Student & Room</th>
                <th className="p-4">Relation & Purpose</th>
                <th className="p-4">Check-In Time</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(0,0,0,0.06)] ">
              
              {visitors.map((vis) => (
                <tr key={vis.id} className="hover:bg-[#FAFAFA] ">
                  
                  <td className="p-4">
                    
                    <p className="font-bold text-[#0A0A0A] ">
                      {vis.visitorName}
                    </p>
                    <p className="text-[10px] text-[#757575]">
                      {vis.visitorPhone}
                    </p>
                  </td>
                  <td className="p-4">
                    
                    <p className="font-bold text-[#0A0A0A] ">
                      {vis.studentName}
                    </p>
                    <p className="text-[10px] text-[#0A0A0A] font-semibold">
                      Room {vis.roomNumber}
                    </p>
                  </td>
                  <td className="p-4">
                    
                    <p className="font-semibold text-[#0A0A0A] ">
                      {vis.relation}
                    </p>
                    <p className="text-[10px] text-[#757575]">
                      {vis.purpose}
                    </p>
                  </td>
                  <td className="p-4 text-[#757575]">
                    {formatDateTime(vis.timeIn)}
                  </td>
                  <td className="p-4">
                    
                    <Badge
                      variant={vis.status === "active" ? "success" : "outline"}
                    >
                      {vis.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    
                    {vis.status === "active" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => checkOutVisitor(vis.id)}
                      >
                        
                        Check Out
                      </Button>
                    ) : (
                      <span className="text-[10px] text-[#757575]">
                        Out: {formatDateTime(vis.timeOut || "")}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      {/* New Visitor Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="New Visitor Entry Check-In"
          subtitle="Log visitor details at main security gate"
        >
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              
              <label className="block text-xs font-bold uppercase tracking-wider text-[#757575] mb-1">
                
                Visiting Student *
              </label>
              <select
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#FAFAFA] border rounded-xl focus:outline-none "
              >
                
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    
                    {s.fullName} (Room {s.roomNumber})
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              
              <div>
                
                <label className="block text-xs font-bold uppercase tracking-wider text-[#757575] mb-1">
                  
                  Visitor Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  placeholder="e.g. Carlos Rivera"
                  className="w-full px-3 py-2 text-sm bg-[#FAFAFA] border rounded-xl focus:outline-none "
                />
              </div>
              <div>
                
                <label className="block text-xs font-bold uppercase tracking-wider text-[#757575] mb-1">
                  
                  Visitor Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={visitorPhone}
                  onChange={(e) => setVisitorPhone(e.target.value)}
                  placeholder="+1 (555) 987-0002"
                  className="w-full px-3 py-2 text-sm bg-[#FAFAFA] border rounded-xl focus:outline-none "
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              
              <div>
                
                <label className="block text-xs font-bold uppercase tracking-wider text-[#757575] mb-1">
                  
                  Relation
                </label>
                <input
                  type="text"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  placeholder="Father, Mother, Friend"
                  className="w-full px-3 py-2 text-sm bg-[#FAFAFA] border rounded-xl focus:outline-none "
                />
              </div>
              <div>
                
                <label className="block text-xs font-bold uppercase tracking-wider text-[#757575] mb-1">
                  
                  Purpose of Visit
                </label>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Luggage dropoff, meeting"
                  className="w-full px-3 py-2 text-sm bg-[#FAFAFA] border rounded-xl focus:outline-none "
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-[rgba(0,0,0,0.06)] ">
              
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Confirm Visitor Check-In
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
