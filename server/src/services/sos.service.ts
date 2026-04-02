import prisma from '../config/database';
import { ApiError } from '../utils/ApiError';
import { TriggerSOSInput, CreateEmergencyContactInput } from '../validators/schedule.validator';

export class SOSService {
  async trigger(userId: string, data: TriggerSOSInput) {
    const sosEvent = await prisma.sOSEvent.create({
      data: {
        userId,
        latitude: data.latitude,
        longitude: data.longitude,
        address: data.address,
        notes: data.notes,
        status: 'TRIGGERED',
      },
    });

    // Get emergency contacts for notification
    const contacts = await prisma.emergencyContact.findMany({
      where: { userId },
      orderBy: { isPrimary: 'desc' },
    });

    // Get user's medical info for the alert
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        phone: true,
        bloodType: true,
        allergies: true,
        medicines: {
          where: { isActive: true },
          select: { name: true, dosage: true },
        },
      },
    });

    // In production, this would send actual notifications (SMS, push, etc.)
    // For now, we update the status to NOTIFIED
    await prisma.sOSEvent.update({
      where: { id: sosEvent.id },
      data: { status: 'NOTIFIED' },
    });

    return {
      event: sosEvent,
      contacts,
      userInfo: user,
    };
  }

  async getContacts(userId: string) {
    return prisma.emergencyContact.findMany({
      where: { userId },
      orderBy: [{ isPrimary: 'desc' }, { createdAt: 'asc' }],
    });
  }

  async addContact(userId: string, data: CreateEmergencyContactInput) {
    // If this is primary, unset other primaries
    if (data.isPrimary) {
      await prisma.emergencyContact.updateMany({
        where: { userId, isPrimary: true },
        data: { isPrimary: false },
      });
    }

    return prisma.emergencyContact.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async updateContact(userId: string, contactId: string, data: Partial<CreateEmergencyContactInput>) {
    const contact = await prisma.emergencyContact.findFirst({
      where: { id: contactId, userId },
    });

    if (!contact) {
      throw ApiError.notFound('Emergency contact not found');
    }

    if (data.isPrimary) {
      await prisma.emergencyContact.updateMany({
        where: { userId, isPrimary: true },
        data: { isPrimary: false },
      });
    }

    return prisma.emergencyContact.update({
      where: { id: contactId },
      data,
    });
  }

  async deleteContact(userId: string, contactId: string) {
    const contact = await prisma.emergencyContact.findFirst({
      where: { id: contactId, userId },
    });

    if (!contact) {
      throw ApiError.notFound('Emergency contact not found');
    }

    await prisma.emergencyContact.delete({
      where: { id: contactId },
    });
  }

  async getSOSHistory(userId: string) {
    return prisma.sOSEvent.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
  }

  async resolveEvent(userId: string, eventId: string) {
    const event = await prisma.sOSEvent.findFirst({
      where: { id: eventId, userId },
    });

    if (!event) {
      throw ApiError.notFound('SOS event not found');
    }

    return prisma.sOSEvent.update({
      where: { id: eventId },
      data: { status: 'RESOLVED', resolvedAt: new Date() },
    });
  }
}

export const sosService = new SOSService();
