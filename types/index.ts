export type UserRole = 'admin' | 'student' | 'warden' | 'staff' | 'security';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  createdAt: string;
}

export interface Student {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  studentIdNumber: string; // e.g. "UN-2024-8841"
  roomId: string;
  roomNumber: string;
  floor: number;
  block: string;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  parentDetails: {
    name: string;
    phone: string;
    email: string;
  };
  course: string;
  batch: string;
  status: 'active' | 'graduated' | 'suspended' | 'vacated';
  joinedDate: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  floor: number;
  block: string;
  capacity: number;
  occupied: number;
  status: 'available' | 'full' | 'maintenance' | 'reserved';
  rentAmount: number;
  amenities: string[];
  occupants?: Array<{
    id: string;
    name: string;
    studentIdNumber: string;
    course: string;
  }>;
}

export type ComplaintCategory = 'electrical' | 'plumbing' | 'furniture' | 'hvac' | 'wifi' | 'cleanliness' | 'other';
export type ComplaintPriority = 'low' | 'medium' | 'high' | 'emergency';
export type ComplaintStatus = 'open' | 'assigned' | 'in_progress' | 'resolved' | 'closed';

export interface ComplaintComment {
  id: string;
  complaintId: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  comment: string;
  createdAt: string;
}

export interface Complaint {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  title: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  description: string;
  photoUrl?: string;
  status: ComplaintStatus;
  assignedStaffId?: string;
  assignedStaffName?: string;
  estimatedFixTime?: string; // e.g. "2 hours"
  aiSummary?: string;
  aiSuggestedCategory?: ComplaintCategory;
  aiSuggestedPriority?: ComplaintPriority;
  completionPhotoUrl?: string;
  resolutionNotes?: string;
  createdAt: string;
  resolvedAt?: string;
  comments: ComplaintComment[];
}

export type GatePassStatus = 'pending' | 'approved' | 'rejected' | 'out_now' | 'returned' | 'expired';

export interface GatePass {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  reason: string;
  destination: string;
  leavingDate: string;
  returnDate: string;
  guardianContact: string;
  status: GatePassStatus;
  qrCodeHash: string;
  approvedBy?: string;
  approvedByName?: string;
  approvedAt?: string;
  actualOutTime?: string;
  actualInTime?: string;
  rejectionReason?: string;
  createdAt: string;
}

export type PaymentType = 'hostel_fee' | 'mess_fee' | 'electricity' | 'maintenance' | 'security_deposit';
export type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'failed';

export interface Payment {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  title: string;
  amount: number;
  type: PaymentType;
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
  receiptUrl?: string;
  paymentMethod?: 'UPI' | 'Credit Card' | 'Debit Card' | 'Net Banking' | 'Cash';
  createdAt: string;
}

export interface Visitor {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  visitorName: string;
  visitorPhone: string;
  relation: string;
  timeIn: string;
  timeOut?: string;
  status: 'active' | 'checked_out';
  purpose: string;
  qrCodeHash: string;
}

export type MealType = 'breakfast' | 'lunch' | 'snacks' | 'dinner';

export interface MessMenuItem {
  id: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  mealType: MealType;
  items: string[];
  specialItem?: string;
}

export interface MessFeedback {
  id: string;
  studentId: string;
  studentName: string;
  rating: number; // 1-5
  mealType: MealType;
  comment: string;
  date: string;
}

export type NoticePriority = 'normal' | 'important' | 'emergency';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: NoticePriority;
  audience: 'all' | 'students' | 'wardens' | 'staff';
  createdBy: string;
  createdByName: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'complaint' | 'gate_pass' | 'payment' | 'announcement' | 'visitor';
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientId: string;
  content: string;
  attachmentUrl?: string;
  isRead: boolean;
  timestamp: string;
}
