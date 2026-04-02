import prisma from '../config/database';
import { ApiError } from '../utils/ApiError';
import { CreateMedicineInput, UpdateMedicineInput } from '../validators/medicine.validator';

export class MedicineService {
  async getAll(userId: string, filters?: { isActive?: boolean; search?: string }) {
    const where: any = { userId };

    if (filters?.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    if (filters?.search) {
      where.name = { contains: filters.search, mode: 'insensitive' };
    }

    return prisma.medicine.findMany({
      where,
      include: {
        schedules: { where: { isActive: true } },
        _count: { select: { doseLogs: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(userId: string, medicineId: string) {
    const medicine = await prisma.medicine.findFirst({
      where: { id: medicineId, userId },
      include: {
        schedules: true,
        doseLogs: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!medicine) {
      throw ApiError.notFound('Medicine not found');
    }

    return medicine;
  }

  async create(userId: string, data: CreateMedicineInput) {
    return prisma.medicine.create({
      data: {
        ...data,
        userId,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
      },
      include: {
        schedules: true,
      },
    });
  }

  async update(userId: string, medicineId: string, data: UpdateMedicineInput) {
    const medicine = await prisma.medicine.findFirst({
      where: { id: medicineId, userId },
    });

    if (!medicine) {
      throw ApiError.notFound('Medicine not found');
    }

    return prisma.medicine.update({
      where: { id: medicineId },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : undefined,
      },
      include: {
        schedules: true,
      },
    });
  }

  async delete(userId: string, medicineId: string) {
    const medicine = await prisma.medicine.findFirst({
      where: { id: medicineId, userId },
    });

    if (!medicine) {
      throw ApiError.notFound('Medicine not found');
    }

    await prisma.medicine.delete({
      where: { id: medicineId },
    });
  }

  async getLowStock(userId: string) {
    return prisma.medicine.findMany({
      where: {
        userId,
        isActive: true,
        stockQuantity: { lte: prisma.medicine.fields.refillThreshold as any },
      },
      orderBy: { stockQuantity: 'asc' },
    });
  }

  async getExpiringSoon(userId: string, days = 30) {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);

    return prisma.medicine.findMany({
      where: {
        userId,
        isActive: true,
        expiryDate: {
          lte: futureDate,
          gte: new Date(),
        },
      },
      orderBy: { expiryDate: 'asc' },
    });
  }
}

export const medicineService = new MedicineService();
