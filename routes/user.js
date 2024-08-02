import { login, signup } from "../controllers/user_controller.js";

const userRouter = Router();

//Routes
userRouter.post("/users/auth/signup", signup)

userRouter.post("/users/auth/signup", login)


export default userRouter