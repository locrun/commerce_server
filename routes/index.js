import { Router } from "express";
import userRouter from "../routes/userRouter.js";
import typeRouter from "../routes/typeRouter.js";
import productRouter from "../routes/productRouter.js";
import basketRouter from "../routes/basketRouter.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
const router = new Router();

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/product", productRouter);
router.use("/basket", basketRouter);

export default router;
