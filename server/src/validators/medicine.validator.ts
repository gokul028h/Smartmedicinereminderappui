import { z } from 'zod';

export const createMedicineSchema = z.object({
  name: z.string().min(1, 'Medicine name is required').max(200),
  dosage: z.string().min(1, 'Dosage is required'),
  form: z.enum(['tablet', 'capsule', 'liquid', 'injection', 'cream', 'drops', 'inhaler', 'patch', 'other']).default('tablet'),
  frequency: z.enum(['once-daily', 'twice-daily', 'three-times-daily', 'four-times-daily', 'as-needed', 'weekly', 'custom']),
  instructions: z.string().optional(),
  startDate: z.string().datetime({ message: 'Invalid start date' }),
  endDate: z.string().datetime().optional().nullable(),
  stockQuantity: z.number().int().min(0, 'Stock quantity must be 0 or more'),
  refillThreshold: z.number().int().min(1).default(7),
  expiryDate: z.string().datetime().optional().nullable(),
  color: z.string().optional(),
});

export const updateMedicineSchema = createMedicineSchema.partial();

export type CreateMedicineInput = z.infer<typeof createMedicineSchema>;
export type UpdateMedicineInput = z.infer<typeof updateMedicineSchema>;
