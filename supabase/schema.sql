-- RoomZen Supabase Schema Definition
-- Smart Operating System for Student Housing

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS & PROFILES
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'student', 'warden', 'staff', 'security')),
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ROOMS
CREATE TABLE IF NOT EXISTS public.rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_number TEXT UNIQUE NOT NULL,
  floor INTEGER NOT NULL,
  block TEXT NOT NULL DEFAULT 'A',
  capacity INTEGER NOT NULL DEFAULT 2,
  occupied INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'full', 'maintenance', 'reserved')),
  rent_amount NUMERIC(10, 2) NOT NULL DEFAULT 12000.00,
  amenities TEXT[] DEFAULT ARRAY['Air Conditioner', 'Study Desk', 'Attached Bathroom', 'High-speed Wi-Fi', 'Balcony'],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. STUDENTS
CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  student_id_number TEXT UNIQUE NOT NULL,
  room_id UUID REFERENCES public.rooms(id) ON DELETE SET NULL,
  course TEXT NOT NULL,
  batch TEXT NOT NULL,
  emergency_contact_name TEXT NOT NULL,
  emergency_contact_phone TEXT NOT NULL,
  emergency_contact_relation TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  parent_email TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'graduated', 'suspended', 'vacated')),
  joined_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ROOM ALLOCATIONS HISTORY
CREATE TABLE IF NOT EXISTS public.room_allocations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE,
  allocated_at TIMESTAMPTZ DEFAULT NOW(),
  vacated_at TIMESTAMPTZ
);

-- 5. COMPLAINTS
CREATE TABLE IF NOT EXISTS public.complaints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('electrical', 'plumbing', 'furniture', 'hvac', 'wifi', 'cleanliness', 'other')),
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'emergency')),
  description TEXT NOT NULL,
  photo_url TEXT,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'assigned', 'in_progress', 'resolved', 'closed')),
  assigned_staff_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  estimated_fix_time TEXT,
  completion_photo_url TEXT,
  resolution_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- 6. COMPLAINT COMMENTS
CREATE TABLE IF NOT EXISTS public.complaint_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_id UUID REFERENCES public.complaints(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. GATE PASSES
CREATE TABLE IF NOT EXISTS public.gate_passes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  destination TEXT NOT NULL,
  leaving_date TIMESTAMPTZ NOT NULL,
  return_date TIMESTAMPTZ NOT NULL,
  guardian_contact TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'out_now', 'returned', 'expired')),
  qr_code_hash TEXT UNIQUE NOT NULL,
  approved_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  approved_at TIMESTAMPTZ,
  actual_out_time TIMESTAMPTZ,
  actual_in_time TIMESTAMPTZ,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. PAYMENTS & INVOICES
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_no TEXT UNIQUE NOT NULL,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('hostel_fee', 'mess_fee', 'electricity', 'maintenance', 'security_deposit')),
  due_date DATE NOT NULL,
  paid_date TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('paid', 'pending', 'overdue', 'failed')),
  payment_method TEXT,
  receipt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. VISITORS LOG
CREATE TABLE IF NOT EXISTS public.visitors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  visitor_name TEXT NOT NULL,
  visitor_phone TEXT NOT NULL,
  relation TEXT NOT NULL,
  purpose TEXT NOT NULL,
  time_in TIMESTAMPTZ DEFAULT NOW(),
  time_out TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'checked_out')),
  qr_code_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. MESS MENU
CREATE TABLE IF NOT EXISTS public.mess_menu (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  day_of_week TEXT NOT NULL CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
  meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'snacks', 'dinner')),
  items TEXT[] NOT NULL,
  special_item TEXT
);

-- 11. ANNOUNCEMENTS / NOTICES
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('normal', 'important', 'emergency')),
  audience TEXT NOT NULL DEFAULT 'all' CHECK (audience IN ('all', 'students', 'wardens', 'staff')),
  created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('complaint', 'gate_pass', 'payment', 'announcement', 'visitor')),
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. ACTIVITY LOGS
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  details TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR HIGH-PERFORMANCE SEARCH & DASHBOARDS
CREATE INDEX IF NOT EXISTS idx_students_user_id ON public.students(user_id);
CREATE INDEX IF NOT EXISTS idx_students_room_id ON public.students(room_id);
CREATE INDEX IF NOT EXISTS idx_complaints_student_id ON public.complaints(student_id);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON public.complaints(status);
CREATE INDEX IF NOT EXISTS idx_gate_passes_student_id ON public.gate_passes(student_id);
CREATE INDEX IF NOT EXISTS idx_gate_passes_status ON public.gate_passes(status);
CREATE INDEX IF NOT EXISTS idx_payments_student_id ON public.payments(student_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gate_passes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR DEMO / PUBLIC READ/WRITE (Can be refined per role)
CREATE POLICY "Public read access for users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Public read access for rooms" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "Public read access for announcements" ON public.announcements FOR SELECT USING (true);
