import { Router } from "express";
import { getUsersController } from "../controllers/user.controller";

const userRouter = Router();
// /api/users
userRouter.get('/init', getUsersController);

export default userRouter;