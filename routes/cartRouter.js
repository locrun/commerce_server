import { Router } from "express";
import cartController from "../controllers/cartController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
const router = new Router();

router.post("/cart", cartController.addItemsToCart);
router.get("/cart", cartController.getAllCartItems);

export default router;

