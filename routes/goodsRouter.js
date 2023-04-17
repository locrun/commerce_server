import { Router } from "express";
import goodsController from "../controllers/goodsController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
const router = new Router();

router.post("/", goodsController.create);
router.get("/", goodsController.getAll);
router.get("/:id", goodsController.getOne);

export default router;
