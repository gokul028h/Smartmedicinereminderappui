import { z } from 'zod';

export const createScheduleSchema = z.object({
  medicineId: z.string().min(1, 'Medicine ID is required'),
  times: z.array(z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:mm format')).min(1, 'At least one time is required'),
  frequency: z.enum(['once-daily', 'twice-daily', 'three-times-daily', 'four-times-daily']),
  notificationsEnabled: z.boolean().default(true),
  snoozeMinutes: z.number().int().min(1).max(60).default(10),
});

export const updateScheduleSchema = z.object({
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional(),
  isActive: z.boolean().optional(),
  notificationsEnabled: z.boolean().optional(),
  snoozeMinutes: z.number().int().min(1).max(60).optional(),
});

export const createDoseLogSchema = z.object({
  medicineId: z.string().min(1, 'Medicine ID is required'),
  status: z.enum(['TAKEN', 'MISSED', 'SKIPPED', 'SNOOZED']),
  scheduledTime: z.string().datetime(),
  takenTime: z.string().datetime().optional().nullable(),
  reason: z.string().optional(),
  notes: z.string().optional(),
});

export const triggerSOSSchema = z.object({
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
});

export const createEmergencyContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  email: z.string().email().optional(),
  relation: z.string().min(1, 'Relation is required'),
  isPrimary: z.boolean().default(false),
});

export type CreateScheduleInput = z.infer<typeof createScheduleSchema>;
export type CreateDoseLogInput = z.infer<typeof createDoseLogSchema>;
export type TriggerSOSInput = z.infer<typeof triggerSOSSchema>;
export type CreateEmergencyContactInput = z.infer<typeof createEmergencyContactSchema>;
