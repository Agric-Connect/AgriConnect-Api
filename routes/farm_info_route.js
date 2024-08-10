import { Router } from "express";
import { remoteUpload } from "../middlewares/upload.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { createFarmInfo, getAllFarmInfo } from "../controllers/farm_Info_controller.js";


const farmInfoRouter = Router()

//Routes
farmInfoRouter.get('/users/farmland/information', getAllFarmInfo)

farmInfoRouter.post('/users/farmland/information', remoteUpload.single('image'), isAuthenticated, createFarmInfo)


export default farmInfoRouter