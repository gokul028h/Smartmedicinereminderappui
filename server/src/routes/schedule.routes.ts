import { Router } from 'express';
import { scheduleController } from '../controllers/schedule.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createScheduleSchema, updateScheduleSchema } from '../validators/schedule.validator';

const router = Router();

router.use(authMiddleware);

router.get('/', scheduleController.getAll);
router.get('/today', scheduleController.getTodaySchedules);
router.post('/', validate(createScheduleSchema), scheduleController.create);
router.put('/:id', validate(updateScheduleSchema), scheduleController.update);
router.delete('/:id', scheduleController.delete);

export default router;
