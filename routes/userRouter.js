import { Router } from "express";
import UserController from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router();

router.post("/registration", UserController.registration, () => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://tehno-store.vercel.app"
  );
});
router.post("/login", UserController.login, () => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://tehno-store.vercel.app"
  );
});
router.get("/check", authMiddleware, UserController.check, () => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://tehno-store.vercel.app"
  );
});

export default router;
