import { Router } from "express";
import userRouter from "../routes/userRouter.js";
import typeRouter from "../routes/typeRouter.js";
import goodsRouter from "../routes/goodsRouter.js";
import cartRouter from "../routes/cartRouter.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
const router = new Router();

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/goods", checkRoleMiddleware("ADMIN"), goodsRouter);
router.use("/cart", checkRoleMiddleware("ADMIN"), cartRouter);

export default router;
