import { Router } from "express";
import TypeController from "../controllers/typeController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post("/", checkRoleMiddleware("ADMIN"), TypeController.create);
router.get("/", TypeController.getAll);

export default router;
