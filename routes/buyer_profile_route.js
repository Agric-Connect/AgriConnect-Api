import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/upload.js";
import { hasPermission } from "../middlewares/auth.js";
import { addBuyerProfile, getBuyerUserProfile, updateBuyerProfile } from "../controllers/buyer_profile_controller.js";

//Setting up Route
const buyerRouter = Router()

//Creating routes

buyerRouter.get('/users/buyers/profiles',isAuthenticated, getBuyerUserProfile)

buyerRouter.post('/users/buyers/profiles', isAuthenticated, remoteUpload.single('profilePicture'), addBuyerProfile)

buyerRouter.patch('/users/buyers/profiles/:id', isAuthenticated, remoteUpload.single('profilePicture'), updateBuyerProfile)

export default buyerRouter