// ─── Shared Types ──────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  bloodType?: string;
  allergies?: string[];
  dateOfBirth?: string;
  createdAt?: string;
  lastLoginAt?: string;
  _count?: { medicines: number };
}

export interface Medicine {
  id: string;
  userId?: string;
  name: string;
  dosage: string;
  form: MedicineForm;
  frequency: Frequency;
  instructions?: string;
  startDate: string;
  endDate?: string | null;
  stockQuantity: number;
  refillThreshold: number;
  expiryDate?: string | null;
  color?: string;
  isActive: boolean;
  schedules?: Schedule[];
  _count?: { doseLogs: number };
  createdAt?: string;
  updatedAt?: string;
}

export type MedicineForm = 'tablet' | 'capsule' | 'liquid' | 'injection' | 'cream' | 'drops' | 'inhaler' | 'patch' | 'other';

export type Frequency = 'once-daily' | 'twice-daily' | 'three-times-daily' | 'four-times-daily' | 'as-needed' | 'weekly' | 'custom';

export interface Schedule {
  id: string;
  medicineId: string;
  time: string;
  dayOfWeek?: number | null;
  isActive: boolean;
  notificationsEnabled: boolean;
  snoozeMinutes: number;
  medicine?: Pick<Medicine, 'id' | 'name' | 'dosage' | 'form' | 'color'>;
}

export interface DoseLog {
  id: string;
  userId: string;
  medicineId: string;
  status: DoseStatus;
  scheduledTime: string;
  takenTime?: string | null;
  reason?: string;
  notes?: string;
  snoozed?: boolean;
  snoozeCount?: number;
  medicine?: Pick<Medicine, 'id' | 'name' | 'dosage' | 'form'>;
  createdAt: string;
}

export type DoseStatus = 'TAKEN' | 'MISSED' | 'SKIPPED' | 'SNOOZED' | 'PENDING';

export interface EmergencyContact {
  id: string;
  userId: string;
  name: string;
  phone: string;
  email?: string;
  relation: string;
  isPrimary: boolean;
}

export interface SOSEvent {
  id: string;
  userId: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  status: 'TRIGGERED' | 'NOTIFIED' | 'RESPONDED' | 'RESOLVED' | 'CANCELLED';
  resolvedAt?: string;
  notes?: string;
  createdAt: string;
}

export interface AdherenceStats {
  overall: {
    total: number;
    taken: number;
    missed: number;
    skipped: number;
    adherenceRate: number;
  };
  byMedicine: Array<{
    medicineId: string;
    name: string;
    adherenceRate: number;
    taken: number;
    total: number;
  }>;
  daily: Array<{
    date: string;
    adherenceRate: number;
    taken: number;
    total: number;
  }>;
}

// ─── API Response types ────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  logs: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// ─── Form Input types ──────────────────────────────────

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface CreateMedicineInput {
  name: string;
  dosage: string;
  form?: MedicineForm;
  frequency: Frequency;
  instructions?: string;
  startDate: string;
  endDate?: string | null;
  stockQuantity: number;
  refillThreshold?: number;
  expiryDate?: string | null;
  color?: string;
}

export interface CreateScheduleInput {
  medicineId: string;
  times: string[];
  frequency: string;
  notificationsEnabled?: boolean;
  snoozeMinutes?: number;
}

export interface CreateDoseLogInput {
  medicineId: string;
  status: DoseStatus;
  scheduledTime: string;
  takenTime?: string | null;
  reason?: string;
  notes?: string;
}
