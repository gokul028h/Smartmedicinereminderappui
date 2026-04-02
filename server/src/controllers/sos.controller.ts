import { Response, NextFunction } from 'express';
import { sosService } from '../services/sos.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export class SOSController {
  async trigger(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await sosService.trigger(req.userId!, req.body);
      res.status(201).json({
        success: true,
        message: 'SOS triggered successfully. Emergency contacts have been notified.',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getContacts(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const contacts = await sosService.getContacts(req.userId!);
      res.json({ success: true, data: contacts });
    } catch (error) {
      next(error);
    }
  }

  async addContact(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const contact = await sosService.addContact(req.userId!, req.body);
      res.status(201).json({
        success: true,
        message: 'Emergency contact added',
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateContact(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const contact = await sosService.updateContact(req.userId!, req.params.id, req.body);
      res.json({
        success: true,
        message: 'Emergency contact updated',
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteContact(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await sosService.deleteContact(req.userId!, req.params.id);
      res.json({ success: true, message: 'Emergency contact deleted' });
    } catch (error) {
      next(error);
    }
  }

  async getHistory(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const history = await sosService.getSOSHistory(req.userId!);
      res.json({ success: true, data: history });
    } catch (error) {
      next(error);
    }
  }

  async resolveEvent(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const event = await sosService.resolveEvent(req.userId!, req.params.id);
      res.json({
        success: true,
        message: 'SOS event resolved',
        data: event,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const sosController = new SOSController();
