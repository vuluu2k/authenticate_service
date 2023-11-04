import { Router } from 'express';
import authenticatedController from '../controllers/authenticated.controller';

const router = Router();

router.post('/register/:id', authenticatedController.register);

router.post('/login', authenticatedController.login);

router.post('/logout', authenticatedController.logout);

export default router;
