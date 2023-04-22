import { Router } from "express";
import cartController from "../controllers/cartController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
const router = new Router();

router.post("/", cartController.addItemsToCart);
router.get("/", cartController.getAllCartItems);

export default router;
