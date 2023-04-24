import { Router } from "express";
import userRouter from "../routes/userRouter.js";
import categoryRouter from "../routes/categoryRouter.js";
import productRouter from "./productRouter.js";
import basketRouter from "./basketRouter.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
const router = new Router();

router.use("/product", checkRoleMiddleware("ADMIN"), productRouter);
router.use("/category", categoryRouter);
router.use("/basket", checkRoleMiddleware("ADMIN"), basketRouter);
router.use("/user", userRouter);

export default router;
