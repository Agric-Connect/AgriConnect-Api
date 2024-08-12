import { UserModel } from "../models/user.js";
import { buyerValidator } from "../validators/user_profile_validator.js";
import { Buyer } from "../models/buyer.js";
import { ProfileTypeModel } from "../models/user_profile.js";

//Create farmer profile
export const addBuyerProfile = async (req, res, next) => {
  //Validating
  try {
    const { error, value } = buyerValidator.validate({
      ...req.body,
      profilePicture: req.file?.filename,
    });
    if (error) {
      return res.status(400).send(error.details[0].message)
    };

    //find the user
    const userId = req.session?.user?.id || req.user?.id
    const user = await UserModel.findById(userId)

    if (!user) {
      return res.status(404).send('User not found')
    }

    //Create the farmer profile
    const buyerProfile = await Buyer.create({ ...value, user: userId })

    //Find profile
    let profileType = await ProfileTypeModel.findOne({ type: 'buyerProfile', profileRef: buyerProfile._id })

    if (!profileType) {
      profileType = await ProfileTypeModel.create({
        type: 'buyerProfile',
        profileRef: buyerProfile._id,
      });
    }

    // Ensure profileType is not null
    if (!profileType) {
      return res.status(500).send('Failed to create or retrieve ProfileType');
    }

    // Update the User document with the new ProfileType
    // user.profilePicture = 'buyerProfile';
    user.userProfile = profileType.id
    await user.save();

    return res.status(201).json(buyerProfile);

  } catch (error) {
    next(error)
  }
}

export const getBuyerUserProfile = async (req, res) => {
  try {
    //  Get user id 
    const userId = req.session?.user?.id || req.user?.id

    // Find the user
    const user = await UserModel.findById(userId).populate({
      path: 'userProfile',
      populate: {
        path: 'profileRef', // Reference to the actual profile document
        select: '-user' // Exclude user field from the populated profile
      }
    })

    // Check the profile type and populate accordingly
    let profile;
    if (user.profileType === 'buyerProfile') {
      profile = await Buyer.findById(user.userProfile.profileRef).populate({
        path: 'user',
        select: '-password' // Exclude sensitive information
      });
    } else {
      return res.status(404).json({ message: 'Profile type not recognized' });
    }

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found', profile });
    }

    res.status(200).json({ profile });
  } catch (error) {
    return res.status(500).json({ error })
  }
};

//Updating  farmer profile

export const updateBuyerProfile = async (req, res) => {
  const { error, value } = buyerValidator.validate({
    ...req.body,
    profilePicture: req.file?.filename
  });
  if (error) {
    return res.status(400).send(error.details[0].message)
  };

  const userId = req.session?.user?.id || req.user.id
  //find
  const user = await UserModel.findById(userId)
  if (!user) {
    return res.status(404).send("User not found");
  }

  //find the farmer profile type
  const userProfileId  = user.userProfile;
  console.log(`UserProfile ID: ${userProfileId}`);
   
  const profileType = await ProfileTypeModel.findById(userProfileId)
  if (!profileType) {
    console.log(`ProfileType not found for user ${user}`);
      return res.status(404).send("ProfileType not found");
  }
  console.log(`ProfileType found: ${profileType}`);

  //find the farmer profile id
  const buyerProfileId = profileType.profileRef;
  console.log(`BuyerProfile ID: ${buyerProfileId}`);

  const buyerProfile = await Buyer.findById(buyerProfileId);

    if (!buyerProfile) {
      console.log(`Buyer profile not found for user ${user}`);
      return res.status(404).send("Buyer profile not found");
    }

  console.log(`Buyer profile found: ${buyerProfile}`);

  // Update the Farmer profile with validated data
  const updatedProfile = await Buyer.findByIdAndUpdate(
    buyerProfile._id,
    { ...value },
    { new: true }
  )

  if (!updatedProfile) {
    return res.status(500).send("Error updating Farmer profile");
  }

  // Send the updated profile in the response
  res.status(200).json({ updatedProfile });
};

// Delete a farmer profile
export const deleteFarmerProfile = async (req, res) => {
  try {
    const userId = req.session?.user?.id || req?.user?.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const userProfileId = user.userProfile;
    const profileType = await ProfileTypeModel.findById(userProfileId);
    if (!profileType) {
      return res.status(404).send("ProfileType not found");
    }

    const farmerProfileId = profileType.profileRef;
    const deletedProfile = await Farmer.findByIdAndDelete(farmerProfileId);
    if (!deletedProfile) {
      return res.status(404).send('Farmer profile not found');
    }

    user.userProfile = null;
    await user.save();

    res.status(200).json("Farmer profile deleted successfully");
  } catch (error) {
    res.status(500).send('Server error');
  }
};