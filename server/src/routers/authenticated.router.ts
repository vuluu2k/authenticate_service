import { Router } from "express";
import authenticatedController from "../controllers/authenticated.controller";

const router = Router();

router.post("/register", authenticatedController.register);

router.post("/login", authenticatedController.login);

router.post("/logout", authenticatedController.logout);

router.post("/refresh", authenticatedController.refresh);

export default router;
