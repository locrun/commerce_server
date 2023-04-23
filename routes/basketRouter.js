import { Router } from "express";
import basketController from "../controllers/basketController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
const router = new Router();

router.post("/", basketController.addProduct);
router.get("/", basketController.getAllProduct);

export default router;
