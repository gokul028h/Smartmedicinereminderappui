import prisma from '../config/database';
import { ApiError } from '../utils/ApiError';
import { CreateDoseLogInput } from '../validators/schedule.validator';

export class DoseLogService {
  async getAll(userId: string, filters?: {
    medicineId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = { userId };

    if (filters?.medicineId) {
      where.medicineId = filters.medicineId;
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.startDate || filters?.endDate) {
      where.scheduledTime = {};
      if (filters.startDate) {
        where.scheduledTime.gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        where.scheduledTime.lte = new Date(filters.endDate);
      }
    }

    const [logs, total] = await Promise.all([
      prisma.doseLog.findMany({
        where,
        include: {
          medicine: {
            select: { id: true, name: true, dosage: true, form: true },
          },
        },
        orderBy: { scheduledTime: 'desc' },
        skip,
        take: limit,
      }),
      prisma.doseLog.count({ where }),
    ]);

    return {
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(userId: string, data: CreateDoseLogInput) {
    // Verify medicine belongs to user
    const medicine = await prisma.medicine.findFirst({
      where: { id: data.medicineId, userId },
    });

    if (!medicine) {
      throw ApiError.notFound('Medicine not found');
    }

    const doseLog = await prisma.doseLog.create({
      data: {
        userId,
        medicineId: data.medicineId,
        status: data.status,
        scheduledTime: new Date(data.scheduledTime),
        takenTime: data.takenTime ? new Date(data.takenTime) : null,
        reason: data.reason,
        notes: data.notes,
      },
      include: {
        medicine: {
          select: { id: true, name: true, dosage: true },
        },
      },
    });

    // Decrement stock if dose was taken
    if (data.status === 'TAKEN') {
      await prisma.medicine.update({
        where: { id: data.medicineId },
        data: { stockQuantity: { decrement: 1 } },
      });
    }

    return doseLog;
  }

  async getAdherenceStats(userId: string, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const logs = await prisma.doseLog.findMany({
      where: {
        userId,
        createdAt: { gte: startDate },
      },
      include: {
        medicine: {
          select: { id: true, name: true },
        },
      },
    });

    const total = logs.length;
    const taken = logs.filter((log) => log.status === 'TAKEN').length;
    const missed = logs.filter((log) => log.status === 'MISSED').length;
    const skipped = logs.filter((log) => log.status === 'SKIPPED').length;
    const adherenceRate = total > 0 ? Math.round((taken / total) * 100) : 0;

    // Adherence by medicine
    const medicineMap = new Map<string, { name: string; taken: number; total: number }>();
    for (const log of logs) {
      const key = log.medicineId;
      if (!medicineMap.has(key)) {
        medicineMap.set(key, { name: log.medicine.name, taken: 0, total: 0 });
      }
      const entry = medicineMap.get(key)!;
      entry.total++;
      if (log.status === 'TAKEN') entry.taken++;
    }

    const adherenceByMedicine = Array.from(medicineMap.entries()).map(([id, data]) => ({
      medicineId: id,
      name: data.name,
      adherenceRate: data.total > 0 ? Math.round((data.taken / data.total) * 100) : 0,
      taken: data.taken,
      total: data.total,
    }));

    // Daily adherence for the period
    const dailyMap = new Map<string, { taken: number; total: number }>();
    for (const log of logs) {
      const dateKey = log.scheduledTime.toISOString().split('T')[0];
      if (!dailyMap.has(dateKey)) {
        dailyMap.set(dateKey, { taken: 0, total: 0 });
      }
      const entry = dailyMap.get(dateKey)!;
      entry.total++;
      if (log.status === 'TAKEN') entry.taken++;
    }

    const dailyAdherence = Array.from(dailyMap.entries())
      .map(([date, data]) => ({
        date,
        adherenceRate: data.total > 0 ? Math.round((data.taken / data.total) * 100) : 0,
        taken: data.taken,
        total: data.total,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return {
      overall: { total, taken, missed, skipped, adherenceRate },
      byMedicine: adherenceByMedicine,
      daily: dailyAdherence,
    };
  }
}

export const doseLogService = new DoseLogService();
