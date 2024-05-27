import express from "express";
// import { verifyToken } from "../middleware/auth.js";
import UserController from "../controller/User.js";

const { createAccount, login } = UserController;

const userRouter = express.Router();

userRouter.post(`/auth/signup`, createAccount);
userRouter.post(`/auth/login`, login);

export default userRouter;
