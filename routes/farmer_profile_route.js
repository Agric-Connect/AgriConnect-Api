import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createUserProfile, getUserProfile, patchProfile } from "../controllers/user_profile.js";
import { remoteUpload } from "../middlewares/upload.js";

//Setting up Route
const farmerRouter = Router()

//Creating routes
farmerRouter.get ('/users/farmers/profiles', isAuthenticated, getUserProfile);

farmerRouter.post('/users/farmers/profiles', isAuthenticated, remoteUpload.fieldsremoteUpload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "certification", maxCount: 1 },
  ]), createUserProfile);

  farmerRouter.patch ('/users/farmers/profiles/:id',isAuthenticated, remoteUpload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "certification", maxCount: 1 },
  ]), patchProfile );

  export default farmerRouter


  

  