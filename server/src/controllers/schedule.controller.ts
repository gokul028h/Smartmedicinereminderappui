import { Response, NextFunction } from 'express';
import { scheduleService } from '../services/schedule.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export class ScheduleController {
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const schedules = await scheduleService.getAll(req.userId!);
      res.json({ success: true, data: schedules });
    } catch (error) {
      next(error);
    }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const schedules = await scheduleService.create(req.userId!, req.body);
      res.status(201).json({
        success: true,
        message: 'Schedule created successfully',
        data: schedules,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const schedule = await scheduleService.update(req.userId!, req.params.id, req.body);
      res.json({
        success: true,
        message: 'Schedule updated successfully',
        data: schedule,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await scheduleService.delete(req.userId!, req.params.id);
      res.json({ success: true, message: 'Schedule deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  async getTodaySchedules(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const schedules = await scheduleService.getTodaySchedules(req.userId!);
      res.json({ success: true, data: schedules });
    } catch (error) {
      next(error);
    }
  }
}

export const scheduleController = new ScheduleController();
