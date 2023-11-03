import { Router } from 'express';

const router = Router();

router.get('/register', (req, res) => {
  res.json({ text: 'register' });
});
router.get('/login', (req, res) => {
  res.json({ text: 'login' });
});

export default router;
