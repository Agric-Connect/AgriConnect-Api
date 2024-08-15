import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getFavourites, removeSavedListins, savelistings } from "../controllers/savedlistings.js";

const savedListingsRouter = Router();

savedListingsRouter.get('/users/savedlistings', isAuthenticated, getFavourites)

savedListingsRouter.post('/users/savedlistings/:id', isAuthenticated, savelistings)

savedListingsRouter.delete('/users/savedlistings/:id', isAuthenticated, removeSavedListins)



export default savedListingsRouter