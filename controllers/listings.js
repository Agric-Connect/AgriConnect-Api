import { UserModel } from "../models/user.js";
import { ListingsModel } from "../models/listings.js";
import { listingsValidator } from "../validators/listings_validator.js";

export const addUserlistings = async (req, res, next) => {
    try {
        //validate
        const { error, value } = listingsValidator.validate({
            ...req.body,
            image: req.file.filename
        });
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const vendorId = req.session?.user?.id || req.user?.id

        const user = await UserModel.findById(vendorId)
        if (!user) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        //Create listings
        const listings = await ListingsModel.create({
            ...value,
            user: vendorId,
        })
        user.listings.push(listings.id);
        await user.save();
        // respond with the created listings item
        res.status(201).json({ message: "Your listings has been added successfully", listings });

    } catch (error) {

    }
}

// Get all user listings
export const getAllUserListings = async (req, res) => {
    try {
        const userId = req.session?.user?.id || req?.user?.id
        const allListings = await ListingsModel.find({ user: userId });

        res.status(200).json({ listings: allListings });
    } catch (error) {
        next(error)
    }
};

// Update listings
export const updateUserListings = async (req, res) => {
    try {
        const { error, value } = listingsValidator.validate({
            ...req.body,
            image: req.file.filename,
        });
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userId = req.session?.user?.id || req.user?.id
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const updatedListings = await ListingsModel.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!updatedListings) {
            return res.status(404).send({ listings: updatedListings });
        }

        return res.status(200).json({ message: 'Listings updated successfully', updatedListings });
    } catch (error) {
        return res.status(500).send("Server error");
    }
};

//Delete listings
// Delete a user project
export const deleteUserListings = async (req, res) => {
    try {


        const userId = req.session?.user?.id || req.user?.id
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const deletedListings = await ListingsModel.findByIdAndDelete(req.params.id);
        if (!deletedListings) {
            return res.status(404).send('Listings not found');
        }

        user.listings.pull(req.params.id)
        await user.save();

        res.status(200).json('Listings deleted successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

//Get listings by id

export const getListingsById = async (req, res, next) => {
    try {

        const userId = req.session?.user?.id || req?.user?.id;
        const user = await UserModel.findById(userId)

        // //Check if user exits
        if (!user) {
            return res.status(404).send("User not found");
        }

        //Get listing by id
        const listingId = await ListingsModel.findById(req.params.id);
        //Return response
        res.status(200).json(listingId)
    } catch (error) {
        next(error)
    }
} 