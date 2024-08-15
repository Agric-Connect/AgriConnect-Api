import { Router } from "express";
import { remoteUpload } from "../middlewares/upload.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { hasPermission } from "../middlewares/auth.js";
import { addFarmerProfile, deleteFarmerProfile, getFarmerUserProfile, updateFarmerProfile } from "../controllers/farmer_profile_controller.js";

//Setting up Route
const farmerRouter = Router();

//Creating routes
farmerRouter.get ('/users/farmers/profiles', isAuthenticated, getFarmerUserProfile);

farmerRouter.post ('/users/farmers/profiles',isAuthenticated,remoteUpload.fields([
  {name: 'profilePicture', maxCount: 1},
  {name: 'certification', maxCount: 2}
]),hasPermission('update_Farmer_profile'), addFarmerProfile)
 
farmerRouter.patch ('/users/farmers/profiles/:id',isAuthenticated, remoteUpload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "certification", maxCount: 2 },
  ]), hasPermission('update_Farmer_profile'),  updateFarmerProfile);

  farmerRouter.delete ('/users/farmers/profiles/:id', isAuthenticated, deleteFarmerProfile)

  export default farmerRouter


  

  