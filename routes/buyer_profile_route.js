import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/upload.js";
import { createUserProfile, getUserProfile, patchProfile } from "../controllers/user_profile.js";

//Setting up Route
const buyerRouter = Router()

//Creating routes

buyerRouter.get('/users/buyers/profiles', getUserProfile)

buyerRouter.post('/users/buyers/profiles', isAuthenticated, remoteUpload.single('profilePicture'), createUserProfile)

buyerRouter.patch('/users/buyers/profiles/:id', isAuthenticated, remoteUpload.single('profilePicture'), patchProfile)

export default buyerRouter