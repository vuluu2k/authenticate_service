import { Router } from 'express-serve-static-core';
import authenticatedRouter from './authenticated.router';

const router = (app: { use: (arg0: string, arg1: Router) => void }) => {
  const v1Prefix = '/api/v1';

  app.use(`${v1Prefix}/auth`, authenticatedRouter);
};

export default router;
