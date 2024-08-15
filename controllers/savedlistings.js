import { UserModel } from "../models/user.js";
import { ListingsModel } from "../models/listings.js";

export const savelistings = async(req,res,next) => {
   try {
     //Adding favourite listings
     //Find user id
     const userId = req.session?.user?.id || req.user?.id
     
     //Get id from listings
     const listingId = req.params.id
 
     //Find user in the database
     const user = await UserModel.findById(userId)
     if (!user) {
         return res.status(404).json({ message: 'User not found' });
     }
     
     const listing = await ListingsModel.findById(listingId);
 if (!listing) {
     return res.status(404).json({ message: 'Listing not found' });
 }
 // Find if listings is already in user's favourites
 if (user.savedListings.includes(listingId)) {
     return res.status(400).json({ message: 'Listings already in favourites' });
 }else{
     // Add listingsId to favourites array
 user.savedListings.push(listingId);
 await user.save();
 res.status(200).json({ message: 'Listings added to favourites', savedListings: user.savedListings });
 
 }
 
   } catch (error) {
    next(error)
   }
}

export const removeSavedListins = async (req, res, next) => {
    try {
        // Get id from user
        const userId = req.user.id
        // Get id from code snippet
        const listingId = req.params.id;
        // Find user by Id in database
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const listing = await ListingsModel.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        // Find if snippet is already in user's favourites
        if (!user.savedListings.includes(listingId)) {
            return res.status(400).json({ message: 'Snippet not found in favourites' });
        }

        // Filter out the snippetId from the user's favourites array
        user.savedListings = user.savedListings.filter(id => id.toString() !== listingId);
        await user.save();

        res.status(200).json({ message: 'Listings removed from favorites', savedlistings: user.savedlistings });
    } catch (error) {
        next(error);
    }
};

// Get all favourites
export const getFavourites = async (req, res, next)=> {
    try {
        // get user id from request
        const userId = req.user.id;

        // Find user by Id and populate favourites
        const user = await UserModel.findById(userId).populate('savedListings');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
            }

            // send popultaed array as respponse
            res.status(200).json({savedListings: user.savedListings});
    } catch (error) {
       next(error) 
    }
}

// export const getSavedListings = async (req, res, next) => {
//     try {
//       // Find user id
//       const userId = req.user.id;
  
//       // Find user in the database
//       const user = await UserModel.findById(userId);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       // Get the saved listings IDs
//       const savedListingsIds = user.savedListings;
  
//       // Find the listings corresponding to the saved IDs
//       const savedListings = await ListingsModel.find({ _id: { $in: savedListingsIds } });
  
//       res.status(200).json({ message: 'Saved listings retrieved', savedListings });
//     } catch (error) {
//       next(error);
//     }
//   };