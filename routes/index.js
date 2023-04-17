import { Router } from "express";
import userRouter from "../routes/userRouter.js";
import typeRouter from "../routes/typeRouter.js";
import brandRouter from "../routes/brandRouter.js";
import goodsRouter from "../routes/goodsRouter.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
const router = new Router();

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", checkRoleMiddleware("ADMIN"), brandRouter);
router.use("/goods", checkRoleMiddleware("ADMIN"), goodsRouter);

export default router;
