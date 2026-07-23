import { create } from 'zustand';
import { 
  User, UserRole, Student, Room, Complaint, GatePass, Payment, 
  Visitor, MessMenuItem, Announcement, NotificationItem, ActivityLog, ChatMessage,
  ComplaintCategory, ComplaintPriority, GatePassStatus
} from '@/types';
import { generateId } from '@/lib/utils';

// --- MOCK SEED DATA ---
const initialUser: User = {
  id: 'usr_admin_1',
  email: 'admin@uninest.com',
  fullName: 'Dr. Sarah Jenkins',
  role: 'admin',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  phone: '+1 (555) 234-5678',
  createdAt: '2024-01-15T08:00:00Z',
};

const mockStudents: Student[] = [
  {
    id: 'std_101',
    userId: 'usr_std_1',
    fullName: 'Alex Rivera',
    email: 'alex.rivera@university.edu',
    phone: '+1 (555) 987-6543',
    studentIdNumber: 'UN-2024-1001',
    roomId: 'rm_204',
    roomNumber: 'A-204',
    floor: 2,
    block: 'Block A',
    course: 'B.Tech Computer Science',
    batch: '2022-2026',
    status: 'active',
    joinedDate: '2022-08-15',
    emergencyContact: {
      name: 'Maria Rivera',
      phone: '+1 (555) 987-0001',
      relation: 'Mother',
    },
    parentDetails: {
      name: 'Carlos Rivera',
      phone: '+1 (555) 987-0002',
      email: 'carlos.rivera@gmail.com',
    },
  },
  {
    id: 'std_102',
    userId: 'usr_std_2',
    fullName: 'Priya Sharma',
    email: 'priya.sharma@university.edu',
    phone: '+1 (555) 432-1098',
    studentIdNumber: 'UN-2024-1002',
    roomId: 'rm_102',
    roomNumber: 'A-102',
    floor: 1,
    block: 'Block A',
    course: 'M.Sc Data Science',
    batch: '2023-2025',
    status: 'active',
    joinedDate: '2023-08-10',
    emergencyContact: {
      name: 'Rajesh Sharma',
      phone: '+1 (555) 432-0001',
      relation: 'Father',
    },
    parentDetails: {
      name: 'Rajesh Sharma',
      phone: '+1 (555) 432-0001',
      email: 'rajesh.sharma@outlook.com',
    },
  },
  {
    id: 'std_103',
    userId: 'usr_std_3',
    fullName: 'Liam Chen',
    email: 'liam.chen@university.edu',
    phone: '+1 (555) 678-1234',
    studentIdNumber: 'UN-2024-1003',
    roomId: 'rm_301',
    roomNumber: 'B-301',
    floor: 3,
    block: 'Block B',
    course: 'B.Sc Electronics',
    batch: '2023-2027',
    status: 'active',
    joinedDate: '2023-08-12',
    emergencyContact: {
      name: 'David Chen',
      phone: '+1 (555) 678-0001',
      relation: 'Father',
    },
    parentDetails: {
      name: 'David Chen',
      phone: '+1 (555) 678-0001',
      email: 'dchen@techcorp.com',
    },
  },
  {
    id: 'std_104',
    userId: 'usr_std_4',
    fullName: 'Sophia Martinez',
    email: 'sophia.m@university.edu',
    phone: '+1 (555) 345-6789',
    studentIdNumber: 'UN-2024-1004',
    roomId: 'rm_204',
    roomNumber: 'A-204',
    floor: 2,
    block: 'Block A',
    course: 'B.Arch Architecture',
    batch: '2022-2027',
    status: 'active',
    joinedDate: '2022-08-14',
    emergencyContact: {
      name: 'Elena Martinez',
      phone: '+1 (555) 345-0001',
      relation: 'Mother',
    },
    parentDetails: {
      name: 'Elena Martinez',
      phone: '+1 (555) 345-0001',
      email: 'elena.m@designstudio.com',
    },
  },
];

const mockRooms: Room[] = [
  {
    id: 'rm_101',
    roomNumber: 'A-101',
    floor: 1,
    block: 'Block A',
    capacity: 2,
    occupied: 2,
    status: 'full',
    rentAmount: 14000,
    amenities: ['Air Conditioner', 'Study Desk', 'Attached Bathroom', 'Wi-Fi'],
    occupants: [
      { id: 'std_105', name: 'Rohan Gupta', studentIdNumber: 'UN-2024-1005', course: 'B.Com' },
      { id: 'std_106', name: 'Kevin Durant', studentIdNumber: 'UN-2024-1006', course: 'BBA' }
    ]
  },
  {
    id: 'rm_102',
    roomNumber: 'A-102',
    floor: 1,
    block: 'Block A',
    capacity: 2,
    occupied: 1,
    status: 'available',
    rentAmount: 14000,
    amenities: ['Air Conditioner', 'Study Desk', 'Attached Bathroom', 'Wi-Fi'],
    occupants: [
      { id: 'std_102', name: 'Priya Sharma', studentIdNumber: 'UN-2024-1002', course: 'M.Sc Data Science' }
    ]
  },
  {
    id: 'rm_204',
    roomNumber: 'A-204',
    floor: 2,
    block: 'Block A',
    capacity: 2,
    occupied: 2,
    status: 'full',
    rentAmount: 16000,
    amenities: ['Air Conditioner', 'Study Desk', 'Attached Bathroom', 'High-Speed Wi-Fi', 'Balcony'],
    occupants: [
      { id: 'std_101', name: 'Alex Rivera', studentIdNumber: 'UN-2024-1001', course: 'B.Tech CS' },
      { id: 'std_104', name: 'Sophia Martinez', studentIdNumber: 'UN-2024-1004', course: 'B.Arch' }
    ]
  },
  {
    id: 'rm_301',
    roomNumber: 'B-301',
    floor: 3,
    block: 'Block B',
    capacity: 3,
    occupied: 1,
    status: 'available',
    rentAmount: 11000,
    amenities: ['Ceiling Fan', 'Study Desk', 'Shared Bathroom', 'Wi-Fi'],
    occupants: [
      { id: 'std_103', name: 'Liam Chen', studentIdNumber: 'UN-2024-1003', course: 'B.Sc Electronics' }
    ]
  },
  {
    id: 'rm_302',
    roomNumber: 'B-302',
    floor: 3,
    block: 'Block B',
    capacity: 2,
    occupied: 0,
    status: 'available',
    rentAmount: 12000,
    amenities: ['Air Conditioner', 'Study Desk', 'Attached Bathroom', 'Wi-Fi'],
    occupants: []
  },
  {
    id: 'rm_303',
    roomNumber: 'B-303',
    floor: 3,
    block: 'Block B',
    capacity: 2,
    occupied: 0,
    status: 'maintenance',
    rentAmount: 12000,
    amenities: ['Air Conditioner', 'Study Desk', 'Attached Bathroom'],
    occupants: []
  }
];

const mockComplaints: Complaint[] = [
  {
    id: 'cmp_1',
    studentId: 'std_101',
    studentName: 'Alex Rivera',
    roomNumber: 'A-204',
    title: 'Air Conditioner Blowing Warm Air & Making Noise',
    category: 'hvac',
    priority: 'high',
    description: 'The AC unit in A-204 has stopped cooling since yesterday afternoon. It produces a loud humming sound every 10 minutes.',
    photoUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500',
    status: 'assigned',
    assignedStaffId: 'stf_1',
    assignedStaffName: 'Robert Vance (HVAC Specialist)',
    estimatedFixTime: '2 hours',
    aiSummary: 'AC cooling failure accompanied by mechanical compressor noise.',
    aiSuggestedCategory: 'hvac',
    aiSuggestedPriority: 'high',
    createdAt: '2026-07-22T14:30:00Z',
    comments: [
      {
        id: 'cmt_1',
        complaintId: 'cmp_1',
        userId: 'usr_admin_1',
        userName: 'Warden Mitchell',
        userRole: 'warden',
        comment: 'Assigned Robert from HVAC team. He will inspect by 3 PM.',
        createdAt: '2026-07-22T15:00:00Z',
      }
    ]
  },
  {
    id: 'cmp_2',
    studentId: 'std_102',
    studentName: 'Priya Sharma',
    roomNumber: 'A-102',
    title: 'Bathroom Sink Faucet Dripping Constantly',
    category: 'plumbing',
    priority: 'medium',
    description: 'Water leak from the main bathroom tap faucet causing water waste.',
    status: 'in_progress',
    assignedStaffId: 'stf_2',
    assignedStaffName: 'Carlos Plumbing Team',
    estimatedFixTime: '1 hour',
    aiSummary: 'Plumbing leak in sink fixture.',
    aiSuggestedCategory: 'plumbing',
    aiSuggestedPriority: 'medium',
    createdAt: '2026-07-23T09:15:00Z',
    comments: []
  },
  {
    id: 'cmp_3',
    studentId: 'std_103',
    studentName: 'Liam Chen',
    roomNumber: 'B-301',
    title: 'Study Desk Drawer Lock Broken',
    category: 'furniture',
    priority: 'low',
    description: 'The key snapped inside the lock cylinder of my study desk drawer.',
    status: 'resolved',
    assignedStaffId: 'stf_3',
    assignedStaffName: 'Mike Carpentry',
    estimatedFixTime: '45 mins',
    resolutionNotes: 'Replaced lock cylinder with fresh master key copy.',
    completionPhotoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500',
    createdAt: '2026-07-21T11:00:00Z',
    resolvedAt: '2026-07-21T14:20:00Z',
    comments: []
  }
];

const mockGatePasses: GatePass[] = [
  {
    id: 'gp_901',
    studentId: 'std_101',
    studentName: 'Alex Rivera',
    roomNumber: 'A-204',
    reason: 'Weekend Home Visit & Family Function',
    destination: 'Boston, MA',
    leavingDate: '2026-07-25T17:00',
    returnDate: '2026-07-27T21:00',
    guardianContact: '+1 (555) 987-0002',
    status: 'approved',
    qrCodeHash: 'UN-GP-ALEX-20260725-8831',
    approvedBy: 'usr_warden_1',
    approvedByName: 'Warden Arthur Mitchell',
    approvedAt: '2026-07-23T10:00:00Z',
    createdAt: '2026-07-23T08:30:00Z',
  },
  {
    id: 'gp_902',
    studentId: 'std_102',
    studentName: 'Priya Sharma',
    roomNumber: 'A-102',
    reason: 'Late Night Library Study Session & Hackathon',
    destination: 'Campus Tech Center',
    leavingDate: '2026-07-23T20:00',
    returnDate: '2026-07-24T02:00',
    guardianContact: '+1 (555) 432-0001',
    status: 'pending',
    qrCodeHash: 'UN-GP-PRIYA-20260723-9912',
    createdAt: '2026-07-23T12:00:00Z',
  }
];

const mockPayments: Payment[] = [
  {
    id: 'pay_1001',
    invoiceNo: 'INV-2026-0711',
    studentId: 'std_101',
    studentName: 'Alex Rivera',
    roomNumber: 'A-204',
    title: 'Monsoon Semester Hostel Fee',
    amount: 16000,
    type: 'hostel_fee',
    dueDate: '2026-08-01',
    status: 'paid',
    paidDate: '2026-07-20T14:10:00Z',
    paymentMethod: 'UPI',
    receiptUrl: '#',
    createdAt: '2026-07-01T00:00:00Z'
  },
  {
    id: 'pay_1002',
    invoiceNo: 'INV-2026-0712',
    studentId: 'std_101',
    studentName: 'Alex Rivera',
    roomNumber: 'A-204',
    title: 'July Monthly Mess Charges',
    amount: 4500,
    type: 'mess_fee',
    dueDate: '2026-07-30',
    status: 'pending',
    createdAt: '2026-07-15T00:00:00Z'
  },
  {
    id: 'pay_1003',
    invoiceNo: 'INV-2026-0713',
    studentId: 'std_102',
    studentName: 'Priya Sharma',
    roomNumber: 'A-102',
    title: 'July Monthly Mess Charges',
    amount: 4500,
    type: 'mess_fee',
    dueDate: '2026-07-30',
    status: 'paid',
    paidDate: '2026-07-22T11:45:00Z',
    paymentMethod: 'Credit Card',
    createdAt: '2026-07-15T00:00:00Z'
  }
];

const mockVisitors: Visitor[] = [
  {
    id: 'vis_501',
    studentId: 'std_101',
    studentName: 'Alex Rivera',
    roomNumber: 'A-204',
    visitorName: 'Carlos Rivera',
    visitorPhone: '+1 (555) 987-0002',
    relation: 'Father',
    purpose: 'Dropping off luggage & textbooks',
    timeIn: '2026-07-23T11:30:00Z',
    status: 'active',
    qrCodeHash: 'UN-VIS-501-992'
  }
];

const mockMessMenu: MessMenuItem[] = [
  {
    id: 'menu_mon',
    dayOfWeek: 'Monday',
    mealType: 'breakfast',
    items: ['Fluffy Pancakes', 'Maple Syrup', 'Fresh Fruit Bowl', 'Espresso / Tea'],
    specialItem: 'Fresh Berry Smoothie',
    calories: 520
  },
  {
    id: 'menu_mon_lunch',
    dayOfWeek: 'Monday',
    mealType: 'lunch',
    items: ['Paneer Butter Masala', 'Jeera Rice', 'Butter Naan', 'Cucumber Salad', 'Gulab Jamun'],
    specialItem: 'Mango Lassi',
    calories: 780
  },
  {
    id: 'menu_tue_breakfast',
    dayOfWeek: 'Tuesday',
    mealType: 'breakfast',
    items: ['South Indian Masala Dosa', 'Coconut Chutney', 'Sambar', 'Filter Coffee'],
    calories: 460
  },
  {
    id: 'menu_wed_dinner',
    dayOfWeek: 'Wednesday',
    mealType: 'dinner',
    items: ['Grilled Chicken / Tofu Steak', 'Mashed Potatoes', 'Steamed Broccoli', 'Garlic Bread'],
    specialItem: 'Chocolate Mousse',
    calories: 650
  }
];

const mockAnnouncements: Announcement[] = [
  {
    id: 'ann_1',
    title: 'Scheduled High-Speed Fiber Internet Maintenance',
    content: 'Wi-Fi services in Block A and B will undergo optical line upgrades this Saturday between 02:00 AM and 05:00 AM.',
    priority: 'important',
    audience: 'all',
    createdBy: 'usr_admin_1',
    createdByName: 'Hostel Administration',
    createdAt: '2026-07-22T09:00:00Z'
  },
  {
    id: 'ann_2',
    title: 'Grand Annual Inter-Hostel Sports Fest Registration Open',
    content: 'Register your teams for Football, Basketball, Table Tennis, and Esports by July 28th at the Warden Office.',
    priority: 'normal',
    audience: 'students',
    createdBy: 'usr_warden_1',
    createdByName: 'Arthur Mitchell (Sports Convener)',
    createdAt: '2026-07-21T15:30:00Z'
  }
];

const mockNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    userId: 'usr_admin_1',
    title: 'New Gate Pass Request',
    message: 'Alex Rivera has submitted a weekend gate pass request to Boston.',
    type: 'gate_pass',
    isRead: false,
    createdAt: '2026-07-23T08:30:00Z'
  },
  {
    id: 'notif_2',
    userId: 'usr_admin_1',
    title: 'High Priority Complaint',
    message: 'New HVAC complaint logged for Room A-204.',
    type: 'complaint',
    isRead: false,
    createdAt: '2026-07-22T14:30:00Z'
  }
];

const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg_1',
    senderId: 'usr_std_1',
    senderName: 'Alex Rivera',
    senderRole: 'student',
    recipientId: 'usr_admin_1',
    content: 'Good morning Warden Mitchell, could you check my gate pass status for Boston visit?',
    isRead: true,
    timestamp: '2026-07-23T09:00:00Z'
  },
  {
    id: 'msg_2',
    senderId: 'usr_admin_1',
    senderName: 'Warden Mitchell',
    senderRole: 'warden',
    recipientId: 'usr_std_1',
    content: 'Hi Alex, I verified with your guardian contact. Your gate pass GP-901 has been approved!',
    isRead: true,
    timestamp: '2026-07-23T10:01:00Z'
  }
];

// --- ZUSTAND STORE INTERFACE ---
interface StoreState {
  // Current user & Auth Role Toggling
  currentUser: User;
  activeRole: UserRole;
  theme: 'light' | 'dark';
  searchQuery: string;
  isCommandPaletteOpen: boolean;

  // Domain Datasets
  students: Student[];
  rooms: Room[];
  complaints: Complaint[];
  gatePasses: GatePass[];
  payments: Payment[];
  visitors: Visitor[];
  messMenu: MessMenuItem[];
  announcements: Announcement[];
  notifications: NotificationItem[];
  chatMessages: ChatMessage[];
  activityLogs: ActivityLog[];

  // Mutators & Actions
  setActiveRole: (role: UserRole) => void;
  toggleTheme: () => void;
  setSearchQuery: (query: string) => void;
  setCommandPaletteOpen: (open: boolean) => void;

  // Student CRUD
  addStudent: (student: Omit<Student, 'id' | 'joinedDate'>) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;

  // Room Actions
  allocateRoom: (roomId: string, studentId: string) => void;
  vacateRoom: (roomId: string, studentId: string) => void;

  // Complaint Actions
  addComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt' | 'comments' | 'status'>) => void;
  updateComplaintStatus: (id: string, status: Complaint['status'], staffId?: string, staffName?: string, notes?: string, photo?: string) => void;
  addComplaintComment: (complaintId: string, commentText: string) => void;

  // Gate Pass Actions
  addGatePass: (pass: Omit<GatePass, 'id' | 'createdAt' | 'status' | 'qrCodeHash'>) => void;
  updateGatePassStatus: (id: string, status: GatePassStatus, rejectionReason?: string) => void;

  // Payment Actions
  addPayment: (payment: Omit<Payment, 'id' | 'createdAt' | 'invoiceNo' | 'status'>) => void;
  markPaymentPaid: (id: string, method: Payment['paymentMethod']) => void;

  // Visitor Actions
  checkInVisitor: (visitor: Omit<Visitor, 'id' | 'timeIn' | 'status' | 'qrCodeHash'>) => void;
  checkOutVisitor: (id: string) => void;

  // Notice Actions
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'createdAt' | 'createdBy' | 'createdByName'>) => void;

  // Chat Actions
  sendChatMessage: (content: string, recipientId?: string) => void;
  markNotificationsRead: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  currentUser: initialUser,
  activeRole: 'admin',
  theme: 'light',
  searchQuery: '',
  isCommandPaletteOpen: false,

  students: mockStudents,
  rooms: mockRooms,
  complaints: mockComplaints,
  gatePasses: mockGatePasses,
  payments: mockPayments,
  visitors: mockVisitors,
  messMenu: mockMessMenu,
  announcements: mockAnnouncements,
  notifications: mockNotifications,
  chatMessages: mockChatMessages,
  activityLogs: [
    {
      id: 'log_1',
      userId: 'usr_admin_1',
      userName: 'Dr. Sarah Jenkins',
      userRole: 'admin',
      action: 'System Initialized',
      details: 'RoomZen Smart OS launched with pre-seeded hostel dataset.',
      timestamp: new Date().toISOString()
    }
  ],

  setActiveRole: (role: UserRole) => {
    let name = 'Dr. Sarah Jenkins (Admin)';
    let email = 'admin@uninest.com';
    let avatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150';

    if (role === 'student') {
      name = 'Alex Rivera (Student)';
      email = 'alex.rivera@university.edu';
      avatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150';
    } else if (role === 'warden') {
      name = 'Arthur Mitchell (Chief Warden)';
      email = 'warden.mitchell@uninest.com';
      avatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150';
    } else if (role === 'staff') {
      name = 'Robert Vance (Maintenance Lead)';
      email = 'robert.vance@uninest.com';
      avatar = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150';
    } else if (role === 'security') {
      name = 'Officer Marcus Vance (Gate Security)';
      email = 'security.marcus@uninest.com';
      avatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150';
    }

    set({
      activeRole: role,
      currentUser: {
        id: `usr_${role}_1`,
        email,
        fullName: name,
        role,
        avatarUrl: avatar,
        createdAt: new Date().toISOString()
      }
    });
  },

  toggleTheme: () => {
    set((state) => {
      const nextTheme = state.theme === 'light' ? 'dark' : 'light';
      if (typeof document !== 'undefined') {
        if (nextTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return { theme: nextTheme };
    });
  },

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setCommandPaletteOpen: (open: boolean) => set({ isCommandPaletteOpen: open }),

  // Student CRUD
  addStudent: (newStudentData) => {
    const newStudent: Student = {
      ...newStudentData,
      id: generateId('std'),
      joinedDate: new Date().toISOString().split('T')[0],
    };
    set((state) => ({
      students: [newStudent, ...state.students],
      activityLogs: [
        {
          id: generateId('log'),
          userId: state.currentUser.id,
          userName: state.currentUser.fullName,
          userRole: state.currentUser.role,
          action: 'Student Added',
          details: `Enrolled student ${newStudent.fullName} (${newStudent.studentIdNumber})`,
          timestamp: new Date().toISOString()
        },
        ...state.activityLogs
      ]
    }));
  },

  updateStudent: (id, updates) => {
    set((state) => ({
      students: state.students.map((s) => (s.id === id ? { ...s, ...updates } : s))
    }));
  },

  deleteStudent: (id) => {
    set((state) => ({
      students: state.students.filter((s) => s.id !== id)
    }));
  },

  // Room Actions
  allocateRoom: (roomId, studentId) => {
    const student = get().students.find((s) => s.id === studentId);
    if (!student) return;

    set((state) => {
      const updatedRooms = state.rooms.map((rm) => {
        if (rm.id === roomId) {
          const newOccupancy = rm.occupied + 1;
          return {
            ...rm,
            occupied: newOccupancy,
            status: newOccupancy >= rm.capacity ? ('full' as const) : ('available' as const),
            occupants: [
              ...(rm.occupants || []),
              {
                id: student.id,
                name: student.fullName,
                studentIdNumber: student.studentIdNumber,
                course: student.course
              }
            ]
          };
        }
        return rm;
      });

      const targetRoom = updatedRooms.find((r) => r.id === roomId);

      const updatedStudents = state.students.map((s) =>
        s.id === studentId
          ? {
              ...s,
              roomId: targetRoom?.id || s.roomId,
              roomNumber: targetRoom?.roomNumber || s.roomNumber,
              floor: targetRoom?.floor || s.floor,
              block: targetRoom?.block || s.block
            }
          : s
      );

      return { rooms: updatedRooms, students: updatedStudents };
    });
  },

  vacateRoom: (roomId, studentId) => {
    set((state) => {
      const updatedRooms = state.rooms.map((rm) => {
        if (rm.id === roomId) {
          const newOccupancy = Math.max(0, rm.occupied - 1);
          return {
            ...rm,
            occupied: newOccupancy,
            status: 'available' as const,
            occupants: (rm.occupants || []).filter((o) => o.id !== studentId)
          };
        }
        return rm;
      });

      const updatedStudents = state.students.map((s) =>
        s.id === studentId ? { ...s, status: 'vacated' as const } : s
      );

      return { rooms: updatedRooms, students: updatedStudents };
    });
  },

  // Complaint Actions
  addComplaint: (data) => {
    const newComplaint: Complaint = {
      ...data,
      id: generateId('cmp'),
      status: 'open',
      createdAt: new Date().toISOString(),
      comments: []
    };

    set((state) => ({
      complaints: [newComplaint, ...state.complaints],
      notifications: [
        {
          id: generateId('notif'),
          userId: 'usr_admin_1',
          title: 'New Complaint Submitted',
          message: `${newComplaint.studentName} logged a ${newComplaint.category} complaint for Room ${newComplaint.roomNumber}.`,
          type: 'complaint',
          isRead: false,
          createdAt: new Date().toISOString()
        },
        ...state.notifications
      ]
    }));
  },

  updateComplaintStatus: (id, status, staffId, staffName, notes, photo) => {
    set((state) => ({
      complaints: state.complaints.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            status,
            assignedStaffId: staffId || c.assignedStaffId,
            assignedStaffName: staffName || c.assignedStaffName,
            resolutionNotes: notes || c.resolutionNotes,
            completionPhotoUrl: photo || c.completionPhotoUrl,
            resolvedAt: status === 'resolved' ? new Date().toISOString() : c.resolvedAt
          };
        }
        return c;
      })
    }));
  },

  addComplaintComment: (complaintId, commentText) => {
    const user = get().currentUser;
    const commentObj = {
      id: generateId('cmt'),
      complaintId,
      userId: user.id,
      userName: user.fullName,
      userRole: user.role,
      comment: commentText,
      createdAt: new Date().toISOString()
    };

    set((state) => ({
      complaints: state.complaints.map((c) =>
        c.id === complaintId ? { ...c, comments: [...c.comments, commentObj] } : c
      )
    }));
  },

  // Gate Pass Actions
  addGatePass: (passData) => {
    const hash = `UN-GP-${passData.studentName.split(' ')[0].toUpperCase()}-${Date.now().toString().slice(-6)}`;
    const newPass: GatePass = {
      ...passData,
      id: generateId('gp'),
      status: 'pending',
      qrCodeHash: hash,
      createdAt: new Date().toISOString()
    };

    set((state) => ({
      gatePasses: [newPass, ...state.gatePasses],
      notifications: [
        {
          id: generateId('notif'),
          userId: 'usr_warden_1',
          title: 'Gate Pass Request Pending',
          message: `${passData.studentName} requested out-pass to ${passData.destination}`,
          type: 'gate_pass',
          isRead: false,
          createdAt: new Date().toISOString()
        },
        ...state.notifications
      ]
    }));
  },

  updateGatePassStatus: (id, status, rejectionReason) => {
    const user = get().currentUser;
    set((state) => ({
      gatePasses: state.gatePasses.map((gp) => {
        if (gp.id === id) {
          return {
            ...gp,
            status,
            approvedBy: user.id,
            approvedByName: user.fullName,
            approvedAt: new Date().toISOString(),
            rejectionReason
          };
        }
        return gp;
      })
    }));
  },

  // Payments
  addPayment: (paymentData) => {
    const newPay: Payment = {
      ...paymentData,
      id: generateId('pay'),
      invoiceNo: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    set((state) => ({
      payments: [newPay, ...state.payments]
    }));
  },

  markPaymentPaid: (id, method = 'UPI') => {
    set((state) => ({
      payments: state.payments.map((p) =>
        p.id === id
          ? {
              ...p,
              status: 'paid' as const,
              paidDate: new Date().toISOString(),
              paymentMethod: method,
              receiptUrl: '#'
            }
          : p
      )
    }));
  },

  // Visitor
  checkInVisitor: (vData) => {
    const newVis: Visitor = {
      ...vData,
      id: generateId('vis'),
      timeIn: new Date().toISOString(),
      status: 'active',
      qrCodeHash: `UN-VIS-${Math.floor(100 + Math.random() * 900)}`
    };
    set((state) => ({
      visitors: [newVis, ...state.visitors]
    }));
  },

  checkOutVisitor: (id) => {
    set((state) => ({
      visitors: state.visitors.map((v) =>
        v.id === id ? { ...v, status: 'checked_out' as const, timeOut: new Date().toISOString() } : v
      )
    }));
  },

  // Notices
  addAnnouncement: (annData) => {
    const user = get().currentUser;
    const newAnn: Announcement = {
      ...annData,
      id: generateId('ann'),
      createdBy: user.id,
      createdByName: user.fullName,
      createdAt: new Date().toISOString()
    };
    set((state) => ({
      announcements: [newAnn, ...state.announcements]
    }));
  },

  // Chat
  sendChatMessage: (content, recipientId = 'usr_admin_1') => {
    const user = get().currentUser;
    const msg: ChatMessage = {
      id: generateId('msg'),
      senderId: user.id,
      senderName: user.fullName,
      senderRole: user.role,
      recipientId,
      content,
      isRead: false,
      timestamp: new Date().toISOString()
    };
    set((state) => ({
      chatMessages: [...state.chatMessages, msg]
    }));

    // Simulate warden AI/Auto response if student messages warden
    if (user.role === 'student') {
      setTimeout(() => {
        const reply: ChatMessage = {
          id: generateId('msg_reply'),
          senderId: 'usr_warden_1',
          senderName: 'Warden Arthur Mitchell',
          senderRole: 'warden',
          recipientId: user.id,
          content: `Hello ${user.fullName.split(' ')[0]}, I have received your note regarding "${content.slice(0, 30)}...". I am reviewing it right now.`,
          isRead: false,
          timestamp: new Date().toISOString()
        };
        set((state) => ({
          chatMessages: [...state.chatMessages, reply]
        }));
      }, 2000);
    }
  },

  markNotificationsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true }))
    }));
  }
}));
