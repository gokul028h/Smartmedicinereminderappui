import { Router } from 'express';
import { medicineController } from '../controllers/medicine.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createMedicineSchema, updateMedicineSchema } from '../validators/medicine.validator';

const router = Router();

router.use(authMiddleware);

router.get('/', medicineController.getAll);
router.get('/low-stock', medicineController.getLowStock);
router.get('/expiring', medicineController.getExpiringSoon);
router.get('/:id', medicineController.getById);
router.post('/', validate(createMedicineSchema), medicineController.create);
router.put('/:id', validate(updateMedicineSchema), medicineController.update);
router.delete('/:id', medicineController.delete);

export default router;
