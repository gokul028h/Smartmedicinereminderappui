import { Response, NextFunction } from 'express';
import { doseLogService } from '../services/doseLog.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export class DoseLogController {
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { medicineId, status, startDate, endDate, page, limit } = req.query;
      const result = await doseLogService.getAll(req.userId!, {
        medicineId: medicineId as string,
        status: status as string,
        startDate: startDate as string,
        endDate: endDate as string,
        page: page ? parseInt(page as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
      });
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const doseLog = await doseLogService.create(req.userId!, req.body);
      res.status(201).json({
        success: true,
        message: 'Dose logged successfully',
        data: doseLog,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAdherenceStats(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const stats = await doseLogService.getAdherenceStats(req.userId!, days);
      res.json({ success: true, data: stats });
    } catch (error) {
      next(error);
    }
  }
}

export const doseLogController = new DoseLogController();
