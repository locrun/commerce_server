import { Router } from "express";
import categoryController from "../controllers/categoryController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post("/", checkRoleMiddleware("ADMIN"), categoryController.create);
router.get("/", categoryController.getAll);

export default router;
