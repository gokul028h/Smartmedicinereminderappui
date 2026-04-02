import { Router } from 'express';
import { sosController } from '../controllers/sos.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { sosLimiter } from '../middlewares/rateLimit.middleware';
import { triggerSOSSchema, createEmergencyContactSchema } from '../validators/schedule.validator';

const router = Router();

router.use(authMiddleware);

// SOS trigger
router.post('/trigger', sosLimiter, validate(triggerSOSSchema), sosController.trigger);
router.get('/history', sosController.getHistory);
router.put('/resolve/:id', sosController.resolveEvent);

// Emergency contacts
router.get('/contacts', sosController.getContacts);
router.post('/contacts', validate(createEmergencyContactSchema), sosController.addContact);
router.put('/contacts/:id', sosController.updateContact);
router.delete('/contacts/:id', sosController.deleteContact);

export default router;
