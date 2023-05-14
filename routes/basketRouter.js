import { Router } from "express";
import BasketController from "../controllers/basketController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
const router = new Router();

router.get("/getone", BasketController.getOne);
router.put(
  "/product/:productId([0-9]+)/append/:quantity([0-9]+)",
  BasketController.append
);
router.put(
  "/product/:productId([0-9]+)/increment/:quantity([0-9]+)",
  BasketController.increment
);
router.put(
  "/product/:productId([0-9]+)/decrement/:quantity([0-9]+)",
  BasketController.decrement
);
router.put("/product/:productId([0-9]+)/remove", BasketController.remove);
// router.put("/clear", Basket.clear);

export default router;
