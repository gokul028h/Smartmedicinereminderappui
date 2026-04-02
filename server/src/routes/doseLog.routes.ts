import { Router } from 'express';
import { doseLogController } from '../controllers/doseLog.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createDoseLogSchema } from '../validators/schedule.validator';

const router = Router();

router.use(authMiddleware);

router.get('/', doseLogController.getAll);
router.post('/', validate(createDoseLogSchema), doseLogController.create);
router.get('/adherence', doseLogController.getAdherenceStats);

export default router;
