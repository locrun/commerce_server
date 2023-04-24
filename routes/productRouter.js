import { Router } from "express";
import productController from "../controllers/productController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
const router = new Router();

router.post("/", checkRoleMiddleware("ADMIN"), productController.create);
router.get("/", checkRoleMiddleware("ADMIN"), productController.getAll);
router.get("/:id", productController.getOne);

export default router;
