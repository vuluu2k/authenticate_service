import { Router } from 'express';
import authenticatedController from '../controllers/authenticated.controller';
import authenToken from "../middlewares/authen.middleware";

const router = Router();

router.post('/register', authenticatedController.register);

router.post('/login', authenticatedController.login);

router.post('/logout', authenticatedController.logout);

router.post('/refresh', authenticatedController.refresh)

router.get('/info', authenToken)

export default router;
