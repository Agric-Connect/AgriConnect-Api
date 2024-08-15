import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addUserlistings, deleteUserListings, getAllUserListings, getListingsById, updateUserListings } from "../controllers/listings.js";
import { remoteUpload } from "../middlewares/upload.js";

const listingsRouter = Router();

listingsRouter.post('/users/listings', isAuthenticated, remoteUpload.single('image'), addUserlistings);

listingsRouter.get('/users/listings', isAuthenticated, getAllUserListings);

listingsRouter.get('/users/listings/:id', isAuthenticated, getListingsById);

listingsRouter.patch('/users/listings/:id', isAuthenticated, remoteUpload.single('image'), updateUserListings);

listingsRouter.delete('/users/listings/:id', isAuthenticated, deleteUserListings);

export default listingsRouter