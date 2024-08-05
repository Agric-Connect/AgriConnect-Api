import { Router } from "express";
import { getUserByUsername, getUsers, login, signup,  } from "../controllers/user_controller.js";

const userRouter = Router();

//Routes
userRouter.post("/users/auth/signup", signup)

userRouter.post("/users/auth/login", login)

userRouter.get("/users/auth/:username", getUserByUsername)

userRouter.get("/users", getUsers)

export default userRouter