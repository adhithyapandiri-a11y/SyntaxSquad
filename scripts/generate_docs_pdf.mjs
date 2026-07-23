import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

async function generateDocumentationPDF() {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let y = 20;

  function checkPageBreak(neededHeight = 15) {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = 20;
    }
  }

  // PAGE 1: TITLE & COVER
  doc.setFillColor(37, 99, 235); // Primary Blue
  doc.rect(0, 0, pageWidth, 45, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.text('RoomZen OS', margin, 25);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('The Smart Operating System for Student Housing', margin, 35);

  y = 60;

  // EXECUTIVE SUMMARY
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('1. Executive Summary & Vision', margin, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  const summaryText = 
    'RoomZen is an AI-powered student housing and hostel management SaaS platform designed to eliminate ' +
    'paper registers, unorganized WhatsApp complaint groups, spreadsheets, and manual room allocation. ' +
    'By providing digitized workflows for Students, Hostel Admins, Wardens, Repair Staff, and Gate Security Guards, ' +
    'RoomZen brings operating efficiency, safety, and financial transparency to campus housing.';
  
  const splitSummary = doc.splitTextToSize(summaryText, pageWidth - margin * 2);
  doc.text(splitSummary, margin, y);
  y += splitSummary.length * 5 + 10;

  // TECH STACK
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('2. Technology Stack & Architecture', margin, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const techStack = [
    '• Framework: Next.js 16 (App Router with Turbopack & Server Components)',
    '• Frontend Language & Styling: TypeScript, TailwindCSS v4, Framer Motion',
    '• UI Components & Icons: Custom Primitives, Glassmorphism Cards, Lucide React',
    '• Database & Backend: Supabase PostgreSQL, Row Level Security (RLS), Auth',
    '• State Management: Zustand Unified Store with Hybrid Fallback State',
    '• Analytics & Visuals: Recharts (Revenue, Occupancy, Complaint Triage)',
    '• Form Validation & Utilities: React Hook Form, Zod, date-fns, qrcode.react, jsPDF',
  ];

  techStack.forEach((item) => {
    checkPageBreak(8);
    doc.text(item, margin, y);
    y += 6;
  });

  y += 10;

  // USER ROLES & DASHBOARDS
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  checkPageBreak(20);
  doc.text('3. Multi-Role Dashboard Specifications', margin, y);
  y += 8;

  const roles = [
    {
      title: 'Hostel Owner / Admin Dashboard',
      desc: 'Real-time KPI metrics (Total Students, Bed Occupancy, Revenue, Pending Complaints), Recharts analytics area charts, quick room assignment, and notice creation.'
    },
    {
      title: 'Student Portal & Mobile App',
      desc: 'Room details, AI-assisted complaint submission, digital weekend gate pass requests with QR generation, mess menu schedule, and fee payment history.'
    },
    {
      title: 'Chief Warden Control Desk',
      desc: 'Gate pass approval queue with guardian contact phone call trigger, complaint triage & staff assignment, night attendance check sheet, and incident reports.'
    },
    {
      title: 'Maintenance Staff Workspace',
      desc: 'Work order job board (HVAC, Plumbing, Electrical, Wi-Fi), status transitions (Open -> In Progress -> Resolved), and repair completion photo uploads.'
    },
    {
      title: 'Security Guard Gate Portal',
      desc: 'Live QR Code pass scanner, student hash verifier, visitor check-in/check-out register, and gate exit timestamp logging.'
    }
  ];

  roles.forEach((r) => {
    checkPageBreak(18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text(`• ${r.title}`, margin, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    const splitDesc = doc.splitTextToSize(r.desc, pageWidth - margin * 2 - 5);
    doc.text(splitDesc, margin + 5, y);
    y += splitDesc.length * 5 + 4;
  });

  y += 6;

  // DATABASE SCHEMA
  checkPageBreak(25);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('4. Supabase Database Schema Architecture', margin, y);
  y += 8;

  const tables = [
    'users (id, email, full_name, role, phone, avatar_url)',
    'students (id, user_id, student_id_number, room_id, emergency_contact, parent_name)',
    'rooms (id, room_number, floor, block, capacity, occupied, status, rent_amount)',
    'complaints (id, student_id, title, category, priority, description, status, assigned_staff_id)',
    'gate_passes (id, student_id, reason, destination, status, qr_code_hash, approved_by)',
    'payments (id, invoice_no, student_id, title, amount, status, paid_date, payment_method)',
    'visitors (id, student_id, visitor_name, visitor_phone, relation, time_in, time_out, status)',
    'mess_menu (id, day_of_week, meal_type, items, special_item, calories)',
    'announcements (id, title, content, priority, audience, created_by)',
    'chat_messages (id, sender_id, recipient_id, content, is_read, timestamp)',
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  tables.forEach((t) => {
    checkPageBreak(6);
    doc.text(`- ${t}`, margin, y);
    y += 5.5;
  });

  y += 10;

  // TEAM & BRANCHES
  checkPageBreak(25);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('5. Git Team Branches & Repository Structure', margin, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('• Repository: https://github.com/adhithyapandiri-a11y/SyntaxSquad.git', margin, y); y += 6;
  doc.text('• Production Branch: main', margin, y); y += 6;
  doc.text('• Teammate Branches: sravan, shivam, umair, aryan, nishpray', margin, y); y += 10;

  // FOOTER SIGNATURE
  checkPageBreak(20);
  doc.setLineWidth(0.5);
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text('RoomZen Student Housing SaaS Platform — Complete Technical Documentation', margin, y);

  const pdfBuffer = doc.output('arraybuffer');
  fs.writeFileSync(path.join(process.cwd(), 'RoomZen_Complete_Project_Documentation.pdf'), Buffer.from(pdfBuffer));
  console.log('PDF documentation generated successfully!');
}

generateDocumentationPDF();
