import prisma from '../config/database';
import { ApiError } from '../utils/ApiError';
import { CreateScheduleInput } from '../validators/schedule.validator';

export class ScheduleService {
  async getAll(userId: string) {
    return prisma.schedule.findMany({
      where: {
        medicine: { userId },
      },
      include: {
        medicine: {
          select: { id: true, name: true, dosage: true, form: true },
        },
      },
      orderBy: { time: 'asc' },
    });
  }

  async create(userId: string, data: CreateScheduleInput) {
    // Verify medicine belongs to user
    const medicine = await prisma.medicine.findFirst({
      where: { id: data.medicineId, userId },
    });

    if (!medicine) {
      throw ApiError.notFound('Medicine not found');
    }

    // Create a schedule for each time
    const schedules = await Promise.all(
      data.times.map((time) =>
        prisma.schedule.create({
          data: {
            medicineId: data.medicineId,
            time,
            notificationsEnabled: data.notificationsEnabled,
            snoozeMinutes: data.snoozeMinutes,
          },
          include: {
            medicine: {
              select: { id: true, name: true, dosage: true },
            },
          },
        })
      )
    );

    return schedules;
  }

  async update(userId: string, scheduleId: string, data: Partial<{ time: string; isActive: boolean; notificationsEnabled: boolean; snoozeMinutes: number }>) {
    const schedule = await prisma.schedule.findFirst({
      where: {
        id: scheduleId,
        medicine: { userId },
      },
    });

    if (!schedule) {
      throw ApiError.notFound('Schedule not found');
    }

    return prisma.schedule.update({
      where: { id: scheduleId },
      data,
      include: {
        medicine: {
          select: { id: true, name: true, dosage: true },
        },
      },
    });
  }

  async delete(userId: string, scheduleId: string) {
    const schedule = await prisma.schedule.findFirst({
      where: {
        id: scheduleId,
        medicine: { userId },
      },
    });

    if (!schedule) {
      throw ApiError.notFound('Schedule not found');
    }

    await prisma.schedule.delete({
      where: { id: scheduleId },
    });
  }

  async getTodaySchedules(userId: string) {
    const today = new Date().getDay(); // 0-6

    return prisma.schedule.findMany({
      where: {
        medicine: { userId, isActive: true },
        isActive: true,
        OR: [
          { dayOfWeek: null }, // Every day
          { dayOfWeek: today },
        ],
      },
      include: {
        medicine: {
          select: { id: true, name: true, dosage: true, form: true, color: true },
        },
      },
      orderBy: { time: 'asc' },
    });
  }
}

export const scheduleService = new ScheduleService();
