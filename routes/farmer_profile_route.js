import { Router } from "express";
import { remoteUpload } from "../middlewares/upload.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { hasPermission } from "../middlewares/auth.js";
import { addFarmerProfile, getFarmerUserProfile } from "../controllers/farmer_profile_controller.js";

//Setting up Route
const farmerRouter = Router();

//Creating routes
farmerRouter.get ('/users/farmers/profiles', isAuthenticated, getFarmerUserProfile);

farmerRouter.post('/users/farmers/profiles',remoteUpload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "certification", maxCount: 1 },
  ]), isAuthenticated, addFarmerProfile);

  farmerRouter.patch ('/users/farmers/profiles/:id',remoteUpload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "certification", maxCount: 1 },
  ]),isAuthenticated,  );

  export default farmerRouter


  

  