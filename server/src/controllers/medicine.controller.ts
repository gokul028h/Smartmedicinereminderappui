import { Response, NextFunction } from 'express';
import { medicineService } from '../services/medicine.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export class MedicineController {
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { search, isActive } = req.query;
      const medicines = await medicineService.getAll(req.userId!, {
        search: search as string,
        isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
      });
      res.json({ success: true, data: medicines });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const medicine = await medicineService.getById(req.userId!, req.params.id);
      res.json({ success: true, data: medicine });
    } catch (error) {
      next(error);
    }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const medicine = await medicineService.create(req.userId!, req.body);
      res.status(201).json({
        success: true,
        message: 'Medicine added successfully',
        data: medicine,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const medicine = await medicineService.update(req.userId!, req.params.id, req.body);
      res.json({
        success: true,
        message: 'Medicine updated successfully',
        data: medicine,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await medicineService.delete(req.userId!, req.params.id);
      res.json({ success: true, message: 'Medicine deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  async getLowStock(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const medicines = await medicineService.getLowStock(req.userId!);
      res.json({ success: true, data: medicines });
    } catch (error) {
      next(error);
    }
  }

  async getExpiringSoon(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const medicines = await medicineService.getExpiringSoon(req.userId!, days);
      res.json({ success: true, data: medicines });
    } catch (error) {
      next(error);
    }
  }
}

export const medicineController = new MedicineController();
