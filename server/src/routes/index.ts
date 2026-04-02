import { Router } from 'express';
import authRoutes from './auth.routes';
import medicineRoutes from './medicine.routes';
import scheduleRoutes from './schedule.routes';
import doseLogRoutes from './doseLog.routes';
import sosRoutes from './sos.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/medicines', medicineRoutes);
router.use('/schedules', scheduleRoutes);
router.use('/dose-logs', doseLogRoutes);
router.use('/sos', sosRoutes);

// Health check
router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default router;
