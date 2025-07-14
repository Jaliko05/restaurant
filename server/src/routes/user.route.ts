import { Router } from "express";
import { getUsersController, createUserController, getUserController } from "../controllers/user.controller";


const userRouter = Router();
// /api/users
userRouter.get('/getmany', getUsersController);
userRouter.post('/create', createUserController);
userRouter.post('/get', getUserController);


export default userRouter;