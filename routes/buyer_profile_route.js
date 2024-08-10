import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/upload.js";
import { hasPermission } from "../middlewares/auth.js";

//Setting up Route
const buyerRouter = Router()

//Creating routes

buyerRouter.get('/users/buyers/profiles',isAuthenticated, )

buyerRouter.post('/users/buyers/profiles', isAuthenticated, remoteUpload.single('profilePicture'), )

buyerRouter.patch('/users/buyers/profiles/:id', isAuthenticated, remoteUpload.single('profilePicture'), )

export default buyerRouter