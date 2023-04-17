import { Router } from "express";
import typeController from "../controllers/typeController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post("/", checkRoleMiddleware("ADMIN"), typeController.create);
router.get("/", typeController.getAll);

export default router;
